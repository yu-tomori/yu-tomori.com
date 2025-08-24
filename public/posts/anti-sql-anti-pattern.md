# DBカラムが取りうる値が数パターンしかない時の設計

例えば、ユーザの権限が`admin`か`member`の2種類しかないとします。

この場合、`users`テーブルの`role`カラムの取りうる値は`admin`か`member`のどちらかです。

どのようにテーブルを設計するのが良いのか、というのがこの記事のテーマです。

## 設計1: テーブル設計上は制約を設けずアプリケーションコードで制約をかける

```sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    role VARCHAR(255)
);
```

```go
// Golangでは以下のようにENUMを扱えます
type Role string

const (
    Admin Role = "admin"
    Member  Role = "member"
)

func RestoreRole( dbRole string) (Role, error) {
    switch dbRole {
    case "admin":
        return Admin, nil
    case "member":
        return Member, nil
    }
    return "", fmt.Errorf("invalid role")
}

func main() {
	dbRole := "admin"	
	appRole, err := RestoreRole(dbRole)
	fmt.Printf("appRole: %s, err: %v", appRole, err)
}
```

デメリットとしては、アプリケーションコードにバグがあった時に`admin`か`member`以外の値が入り込む可能性があることです。

もし実際にそのようなことが起こったらアプリケーション上でエラーが発生します。エラーハンドリングが適切に行われていなければ、最悪サーバプロセスが落ち、サービスが一時的にアクセスできなくなってしまいます。

エラーハンドリングを適切に行うにしても、どう実装するのが適切なのでしょうか？DBから想定していない値がきたら、あまりできることはないでしょう。せいぜい開発者にアラートメールを送るくらいしかないと思います。

この設計で問題を起こさないようにするには、アプリケーションコードにバグを含ませないことを徹底する必要があります。プルリクエストのレビューでuserテーブルのroleカラムに`admin`と`member`以外の値が入らないコードになっていることをちゃんと確認するなどの対策が考えられます。

お察しの通り、*この設計は良くない*と思います。

理由

- 第一に、開発者が全くミスをしないのはありえないです。開発者に限らず、人間はミスをします。
- プルリクエストのレビューで確認すれば良いと思うかもしれませんが、毎回レビューのときにuserテーブルのことを意識するのは無理です。roleカラムと同じように意識してレビューしなければならないカラムが他に100個くらいあるかもしれません。
- 本番環境のDBに間違ったroleをINSERTしてしまってもすぐには気づけない可能性があります。開発者は本番環境のDBに`admin`と`member`以外の値が入っている可能性を考慮しなければなりません。

## 設計2: DB上でCHECK制約をかける、もしくはENUM型を使う

CHECK制約をかける

```sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    role VARCHAR(255)
        CHECK (role IN (`admin`, `member`))
);
```

ENUM型を使う

```sql
CREATE TABLE users (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    role ENUM("admin", "member")
);
```

この設計はまあまあ良いと思います。

開発者が`INSERT INTO users (id, name, role) VALUES (1, 'John', 'manager')`のようなSQLを書いてしまった場合、開発環境ですぐにエラーが起きるため、このSQLが本番環境にリリースされることはないでしょう。

万が一、本番環境に前述のSQLがリリースされてしまっても、DBにrole=`manager`のuserが入ることはないです。

実はこの設計は、[SQL Antipatterns](https://pragprog.com/titles/bksqla/sql-antipatterns/)という本でアンチパターンとして紹介されています。

本で述べられているデメリットは以下です。

1. `role`カラムが取りうる値を取得するクエリーが複雑になる
2. `role`カラムが取りうる値を変更したいときに問題がおきる

それぞれ詳しく見ていきましょう。

### 設計2のデメリット1:`role`カラムが取りうる値を取得するクエリーが複雑になる

`role`カラムが取りうる値を取得するには、`DISTINCT`を使って`users`テーブル内の`role`カラムのユニークな値を取得する方法が考えられます。

```sql
SELECT DISTINCT role FROM users;
```

しかし、実際に利用されているデータが`member`のみで`admin`のユーザがまだいなかった場合、`member`しか取得できません。そんなことは現実的にはありえないかもしれませんが、新しいroleとして`manager`を追加し、新しいバージョンをリリースした直後であれば、`manager`は取得できないかもしれません。

確実に`role`カラムが取りうる値を取得するには、DBのメタデータにアクセスする必要があります。

*CHECK制約の場合*

```sql
$ SHOW CREATE TABLE users;

[実行結果]
| Table | Create Table |
+-------+------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
| users | CREATE TABLE `users` (
`id` int NOT NULL,
`name` varchar(255) DEFAULT NULL,
`role` varchar(255) DEFAULT NULL,
PRIMARY KEY (`id`),
CONSTRAINT `users_chk_1` CHECK ((`role` in (_utf8mb4'admin',_utf8mb4'member')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci |
```

*ENUMの場合*

```sql

$ SELECT COLUMN_TYPE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME='users' AND COLUMN_NAME = 'role';

[実行結果]
enum('admin','member')
```

開発者が取りうる値を知りたいケースではあまり問題にならないでしょう。

一方、アプリケーションコードが`role`カラムの取りうる値を取得したい場合は、上記SQLの実行結果をパースする必要があり、実装が複雑になりそうです。

### 設計2のデメリット2: `role`カラムが取りうる値を変更したいときに問題がおきる


例えば、MySQLでENUM型の変更を行うときに以下の問題があります。

- ENUM型の値の変更ができない。

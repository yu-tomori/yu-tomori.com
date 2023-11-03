<script lang="ts">
    import { formatDate } from "$lib/utils"
    export let data
</script>

<svelte:head>
    <title>{data.meta.title}</title>
    <meta property="og:type" content="article" />
    <meta property="og:title" content={data.meta.title} />
</svelte:head>

<article>
    <hgroup>
        <h1>{data.meta.title}</h1>
        <p>公開日: {formatDate(data.meta.date)}</p>
    </hgroup>

    <div>
        <svelte:component this={data.content} />
    </div>
</article>
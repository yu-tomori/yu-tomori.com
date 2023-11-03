import { error } from "@sveltejs/kit"

export async function load({ params }) {
    try {
        const blog = await import(`../../blogs/${params.slug}.md`)
        return {
            content: blog.default,
            meta: blog.metadata
        }
    } catch (e) {
        throw error(404, {
            message: `Could not find ${params.slug}`
        })
    }
}
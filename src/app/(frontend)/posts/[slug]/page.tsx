import { redirect } from 'next/navigation'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export default async function PostRedirect({ params }: Args) {
  const { slug } = await params
  redirect(`/blog/${slug}`)
}

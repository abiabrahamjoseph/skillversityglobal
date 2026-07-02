import { redirect } from 'next/navigation'

export default function PaginatedPostsRedirect() {
  redirect('/blog')
}

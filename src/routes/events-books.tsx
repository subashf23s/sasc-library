import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/events-books')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/events-books"!</div>
}

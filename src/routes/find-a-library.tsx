import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/find-a-library')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/find-a-library"!</div>
}

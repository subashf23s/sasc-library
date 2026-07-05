import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/contributes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/contributes"!</div>
}

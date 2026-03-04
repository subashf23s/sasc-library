import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { LayoutDashboard, BookOpen, User } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  const navItems = [
    { to: "/dashboard" as const, label: "Overview", icon: LayoutDashboard },
    { to: "/dashboard/my-books" as const, label: "My Books", icon: BookOpen },
    {
      to: "/dashboard/manage-books" as const,
      label: "Manage Books",
      icon: BookOpen,
    },
    { to: "/dashboard/profile" as const, label: "Profile", icon: User },
  ] as const;

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-muted/30">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold truncate">Welcome,</h2>
          <p className="text-sm text-muted-foreground truncate">Test</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/dashboard" }}
              activeProps={{
                className: "bg-primary text-primary-foreground",
              }}
              inactiveProps={{
                className:
                  "text-muted-foreground hover:bg-muted hover:text-foreground",
              }}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background">
        <nav className="flex justify-around p-2">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/dashboard" }}
              activeProps={{
                className: "text-primary",
              }}
              inactiveProps={{
                className: "text-muted-foreground",
              }}
              className="flex flex-col items-center gap-1 px-3 py-1 text-xs font-medium transition-colors"
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <main className="flex-1 p-6 md:p-8 pb-20 md:pb-8">
        <Outlet />
      </main>
    </div>
  );
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, CheckSquare, Scale, Settings, UserCog } from "lucide-react"

const navItems = [
  { href: "/", label: "Painel", icon: LayoutDashboard },
  { href: "/tarefas", label: "Tarefas", icon: CheckSquare },
  { href: "/clientes", label: "Clientes", icon: Users },
  { href: "/equipe", label: "Equipe", icon: UserCog },
  { href: "/configuracao", label: "Configuração", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-60 border-r border-sidebar-border bg-sidebar">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-6">
          <Scale className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold text-sidebar-foreground">Mega Advocacia</h1>
        </div>
        
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        
        <div className="border-t border-sidebar-border p-4">
          <p className="text-xs text-muted-foreground">Mega Advocacia v1.0</p>
        </div>
      </div>
    </aside>
  )
}

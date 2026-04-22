import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: number
  icon: LucideIcon
  variant?: "default" | "primary" | "success" | "warning" | "destructive"
  onClick?: () => void
  active?: boolean
}

const variantStyles = {
  default: "border-border",
  primary: "border-primary/30 bg-primary/5",
  success: "border-accent/30 bg-accent/5",
  warning: "border-chart-3/30 bg-chart-3/5",
  destructive: "border-destructive/30 bg-destructive/5",
}

const iconStyles = {
  default: "text-muted-foreground",
  primary: "text-primary",
  success: "text-accent",
  warning: "text-chart-3",
  destructive: "text-destructive",
}

export function StatCard({ title, value, icon: Icon, variant = "default", onClick, active }: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-xl border bg-card p-5 transition-all hover:shadow-lg",
        variantStyles[variant],
        onClick && "cursor-pointer hover:scale-[1.02]",
        active && "ring-2 ring-primary"
      )}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold text-card-foreground">{value}</p>
        </div>
        <div className={cn("rounded-lg bg-secondary p-3", iconStyles[variant])}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  )
}

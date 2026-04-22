"use client"

import { useState, useCallback } from "react"
import { StatCard } from "@/components/stat-card"
import { AddTaskDialog } from "@/components/add-task-dialog"
import { Clock, RefreshCw, FileSearch, CheckCircle, ListTodo } from "lucide-react"

interface Task {
  id: string
  titulo: string
  responsavel: string
  status: string
  data: string
}

type FilterType = "all" | "pendente" | "andamento" | "revisao" | "concluido"

export function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", titulo: "Petição inicial", responsavel: "Dr. João", status: "pendente", data: new Date().toISOString() },
    { id: "2", titulo: "Contestação", responsavel: "Dra. Maria", status: "andamento", data: new Date().toISOString() },
    { id: "3", titulo: "Recurso", responsavel: "Dr. João", status: "revisao", data: new Date().toISOString() },
    { id: "4", titulo: "Audiência", responsavel: "Dr. Carlos", status: "concluido", data: new Date().toISOString() },
    { id: "5", titulo: "Parecer", responsavel: "Dra. Ana", status: "pendente", data: new Date().toISOString() },
  ])

  const [filter, setFilter] = useState<FilterType>("all")

  const stats = {
    pendente: tasks.filter((t) => t.status === "pendente").length,
    andamento: tasks.filter((t) => t.status === "andamento").length,
    revisao: tasks.filter((t) => t.status === "revisao").length,
    concluido: tasks.filter((t) => t.status === "concluido").length,
    total: tasks.length,
  }

  const filteredTasks = filter === "all" 
    ? tasks 
    : tasks.filter((t) => t.status === filter)

  const handleAddTask = useCallback((newTask: { titulo: string; cliente: string; status: string }) => {
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        titulo: newTask.titulo,
        responsavel: newTask.cliente,
        status: newTask.status,
        data: new Date().toISOString(),
      },
    ])
  }, [])

  const handleFilter = (newFilter: FilterType) => {
    setFilter(newFilter === filter ? "all" : newFilter)
  }

  return (
    <div className="min-h-screen pl-60">
      <main className="p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="mt-1 text-muted-foreground">Visão geral do seu escritório</p>
          </div>
          <AddTaskDialog onAddTask={handleAddTask} />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <StatCard
            title="Pendentes"
            value={stats.pendente}
            icon={Clock}
            variant="warning"
            onClick={() => handleFilter("pendente")}
            active={filter === "pendente"}
          />
          <StatCard
            title="Em Andamento"
            value={stats.andamento}
            icon={RefreshCw}
            variant="primary"
            onClick={() => handleFilter("andamento")}
            active={filter === "andamento"}
          />
          <StatCard
            title="Em Revisão"
            value={stats.revisao}
            icon={FileSearch}
            variant="default"
            onClick={() => handleFilter("revisao")}
            active={filter === "revisao"}
          />
          <StatCard
            title="Concluídas"
            value={stats.concluido}
            icon={CheckCircle}
            variant="success"
            onClick={() => handleFilter("concluido")}
            active={filter === "concluido"}
          />
          <StatCard
            title="Total"
            value={stats.total}
            icon={ListTodo}
            variant="default"
            onClick={() => setFilter("all")}
            active={filter === "all"}
          />
        </div>

        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">
              {filter === "all" ? "Todas as Tarefas" : `Tarefas ${getFilterLabel(filter)}`}
            </h2>
            {filter !== "all" && (
              <button
                onClick={() => setFilter("all")}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Limpar filtro
              </button>
            )}
          </div>
          <div className="overflow-hidden rounded-xl border border-border bg-card">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-5 py-3.5 text-left text-sm font-medium text-muted-foreground">Título</th>
                  <th className="px-5 py-3.5 text-left text-sm font-medium text-muted-foreground">Responsável</th>
                  <th className="px-5 py-3.5 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-5 py-3.5 text-left text-sm font-medium text-muted-foreground">Data</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-8 text-center text-muted-foreground">
                      Nenhuma tarefa encontrada
                    </td>
                  </tr>
                ) : (
                  filteredTasks.map((task) => (
                    <tr key={task.id} className="border-b border-border last:border-0 hover:bg-secondary/30">
                      <td className="px-5 py-4 text-sm font-medium text-foreground">{task.titulo}</td>
                      <td className="px-5 py-4 text-sm text-foreground">{task.responsavel}</td>
                      <td className="px-5 py-4">
                        <StatusBadge status={task.status} />
                      </td>
                      <td className="px-5 py-4 text-sm text-muted-foreground">
                        {new Date(task.data).toLocaleDateString("pt-BR")}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

function getFilterLabel(filter: FilterType): string {
  const labels: Record<FilterType, string> = {
    all: "Todas",
    pendente: "Pendentes",
    andamento: "Em Andamento",
    revisao: "Em Revisão",
    concluido: "Concluídas",
  }
  return labels[filter]
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pendente: "bg-chart-3/20 text-chart-3",
    andamento: "bg-primary/20 text-primary",
    revisao: "bg-chart-5/20 text-chart-5",
    concluido: "bg-accent/20 text-accent",
  }

  const labels: Record<string, string> = {
    pendente: "Pendente",
    andamento: "Em Andamento",
    revisao: "Revisão",
    concluido: "Concluído",
  }

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${styles[status] || ""}`}>
      {labels[status] || status}
    </span>
  )
}

"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { AddTaskDialog } from "@/components/add-task-dialog"
import { TaskChat } from "@/components/task-chat"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Trash2, MessageCircle } from "lucide-react"

interface Task {
  id: string
  titulo: string
  cliente: string
  status: string
  data: string
}

export default function TarefasPage() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", titulo: "Petição inicial", cliente: "João Silva", status: "pendente", data: new Date().toISOString() },
    { id: "2", titulo: "Contestação", cliente: "Maria Santos", status: "andamento", data: new Date().toISOString() },
    { id: "3", titulo: "Recurso", cliente: "João Silva", status: "revisao", data: new Date().toISOString() },
    { id: "4", titulo: "Audiência", cliente: "Carlos Lima", status: "concluido", data: new Date().toISOString() },
    { id: "5", titulo: "Parecer", cliente: "Ana Costa", status: "pendente", data: new Date().toISOString() },
  ])
  const [filterStatus, setFilterStatus] = useState<string>("todos")
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null)

  const filteredTasks = filterStatus === "todos" 
    ? tasks 
    : tasks.filter((t) => t.status === filterStatus)

  const selectedTask = tasks.find((t) => t.id === selectedTaskId)

  const handleAddTask = (newTask: { titulo: string; cliente: string; status: string }) => {
    setTasks((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        ...newTask,
        data: new Date().toISOString(),
      },
    ])
  }

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
    if (selectedTaskId === id) {
      setSelectedTaskId(null)
    }
  }

  const handleUpdateStatus = (id: string, newStatus: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    )
  }

  const handleOpenChat = (taskId: string) => {
    setSelectedTaskId(selectedTaskId === taskId ? null : taskId)
  }

  const statusLabels: Record<string, string> = {
    pendente: "Pendente",
    andamento: "Em Andamento",
    revisao: "Revisão",
    concluido: "Concluído",
  }

  const statusStyles: Record<string, string> = {
    pendente: "bg-chart-3/20 text-chart-3",
    andamento: "bg-primary/20 text-primary",
    revisao: "bg-chart-5/20 text-chart-5",
    concluido: "bg-accent/20 text-accent",
  }

  return (
    <>
      <Sidebar />
      <div className="min-h-screen pl-60">
        <main className="p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Tarefas</h1>
              <p className="mt-1 text-muted-foreground">Gerencie todas as suas tarefas</p>
            </div>
            <AddTaskDialog onAddTask={handleAddTask} />
          </div>

          <div className="mb-6 flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Filtrar por:</span>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="andamento">Em Andamento</SelectItem>
                <SelectItem value="revisao">Revisão</SelectItem>
                <SelectItem value="concluido">Concluído</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-6">
            {/* Lista de Tarefas */}
            <div className={`space-y-3 transition-all ${selectedTaskId ? "flex-1" : "w-full"}`}>
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center justify-between rounded-xl border bg-card p-5 transition-all hover:shadow-lg ${
                    selectedTaskId === task.id ? "border-primary" : "border-border"
                  }`}
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{task.titulo}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Cliente: {task.cliente} &bull; {new Date(task.data).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Select
                      value={task.status}
                      onValueChange={(value) => handleUpdateStatus(task.id, value)}
                    >
                      <SelectTrigger className={`w-36 ${statusStyles[task.status]}`}>
                        <SelectValue>{statusLabels[task.status]}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pendente">Pendente</SelectItem>
                        <SelectItem value="andamento">Em Andamento</SelectItem>
                        <SelectItem value="revisao">Revisão</SelectItem>
                        <SelectItem value="concluido">Concluído</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant={selectedTaskId === task.id ? "default" : "ghost"}
                      size="icon"
                      className={selectedTaskId === task.id ? "" : "text-muted-foreground hover:text-primary"}
                      onClick={() => handleOpenChat(task.id)}
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {filteredTasks.length === 0 && (
                <div className="rounded-xl border border-border bg-card p-10 text-center">
                  <p className="text-muted-foreground">Nenhuma tarefa encontrada</p>
                </div>
              )}
            </div>

            {/* Chat Panel */}
            {selectedTask && (
              <div className="h-[calc(100vh-220px)] w-[400px] shrink-0 sticky top-8">
                <TaskChat
                  taskId={selectedTask.id}
                  taskTitle={selectedTask.titulo}
                  onClose={() => setSelectedTaskId(null)}
                />
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  )
}

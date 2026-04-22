"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"
import { Plus, Search, Mail, Phone } from "lucide-react"

interface Cliente {
  id: string
  nome: string
  email: string
  telefone: string
  dataCadastro: string
}

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([
    { id: "1", nome: "João Silva", email: "joao@email.com", telefone: "(11) 99999-0001", dataCadastro: new Date().toISOString() },
    { id: "2", nome: "Maria Santos", email: "maria@email.com", telefone: "(11) 99999-0002", dataCadastro: new Date().toISOString() },
    { id: "3", nome: "Carlos Lima", email: "carlos@email.com", telefone: "(11) 99999-0003", dataCadastro: new Date().toISOString() },
    { id: "4", nome: "Ana Costa", email: "ana@email.com", telefone: "(11) 99999-0004", dataCadastro: new Date().toISOString() },
  ])
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const [newCliente, setNewCliente] = useState({ nome: "", email: "", telefone: "" })

  const filteredClientes = clientes.filter((c) =>
    c.nome.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddCliente = (e: React.FormEvent) => {
    e.preventDefault()
    if (newCliente.nome && newCliente.email) {
      setClientes((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          ...newCliente,
          dataCadastro: new Date().toISOString(),
        },
      ])
      setNewCliente({ nome: "", email: "", telefone: "" })
      setOpen(false)
    }
  }

  return (
    <>
      <Sidebar />
      <div className="min-h-screen pl-60">
        <main className="p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Clientes</h1>
              <p className="mt-1 text-muted-foreground">Gerencie seus clientes</p>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Novo Cliente
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Adicionar Cliente</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddCliente}>
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="nome">Nome</FieldLabel>
                      <Input
                        id="nome"
                        placeholder="Nome completo"
                        value={newCliente.nome}
                        onChange={(e) => setNewCliente((prev) => ({ ...prev, nome: e.target.value }))}
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="email">E-mail</FieldLabel>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@exemplo.com"
                        value={newCliente.email}
                        onChange={(e) => setNewCliente((prev) => ({ ...prev, email: e.target.value }))}
                      />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="telefone">Telefone</FieldLabel>
                      <Input
                        id="telefone"
                        placeholder="(00) 00000-0000"
                        value={newCliente.telefone}
                        onChange={(e) => setNewCliente((prev) => ({ ...prev, telefone: e.target.value }))}
                      />
                    </Field>
                  </FieldGroup>
                  <div className="mt-6 flex justify-end gap-3">
                    <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                      Cancelar
                    </Button>
                    <Button type="submit">Adicionar</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="mb-6 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar cliente..."
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredClientes.map((cliente) => (
              <div
                key={cliente.id}
                className="rounded-xl border border-border bg-card p-5 transition-all hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold text-foreground">{cliente.nome}</h3>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {cliente.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {cliente.telefone}
                  </div>
                </div>
                <p className="mt-4 text-xs text-muted-foreground">
                  Cadastrado em {new Date(cliente.dataCadastro).toLocaleDateString("pt-BR")}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  )
}

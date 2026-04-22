"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Plus, Pencil, Trash2, Mail, Phone, UserCog, Shield, User } from "lucide-react"

type Cargo = "admin" | "advogado" | "estagiario" | "secretaria"

interface Membro {
  id: string
  nome: string
  email: string
  telefone: string
  cargo: Cargo
  oab?: string
  ativo: boolean
}

const cargoLabels: Record<Cargo, string> = {
  admin: "Administrador",
  advogado: "Advogado(a)",
  estagiario: "Estagiário(a)",
  secretaria: "Secretário(a)",
}

const cargoIcons: Record<Cargo, typeof Shield> = {
  admin: Shield,
  advogado: UserCog,
  estagiario: User,
  secretaria: User,
}

const membrosIniciais: Membro[] = [
  {
    id: "1",
    nome: "Dr. Carlos Silva",
    email: "carlos.silva@megaadvocacia.com.br",
    telefone: "(11) 99999-0001",
    cargo: "admin",
    oab: "SP 123.456",
    ativo: true,
  },
  {
    id: "2",
    nome: "Dra. Ana Souza",
    email: "ana.souza@megaadvocacia.com.br",
    telefone: "(11) 99999-0002",
    cargo: "advogado",
    oab: "SP 234.567",
    ativo: true,
  },
  {
    id: "3",
    nome: "Pedro Santos",
    email: "pedro.santos@megaadvocacia.com.br",
    telefone: "(11) 99999-0003",
    cargo: "estagiario",
    ativo: true,
  },
  {
    id: "4",
    nome: "Maria Oliveira",
    email: "maria.oliveira@megaadvocacia.com.br",
    telefone: "(11) 99999-0004",
    cargo: "secretaria",
    ativo: true,
  },
]

export default function EquipePage() {
  const [membros, setMembros] = useState<Membro[]>(membrosIniciais)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editando, setEditando] = useState<Membro | null>(null)
  const [filtro, setFiltro] = useState<Cargo | "todos">("todos")

  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    cargo: "advogado" as Cargo,
    oab: "",
  })

  const resetForm = () => {
    setForm({
      nome: "",
      email: "",
      telefone: "",
      cargo: "advogado",
      oab: "",
    })
    setEditando(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nome || !form.email) return

    if (editando) {
      setMembros(
        membros.map((m) =>
          m.id === editando.id
            ? { ...m, ...form }
            : m
        )
      )
    } else {
      const novoMembro: Membro = {
        id: Date.now().toString(),
        nome: form.nome,
        email: form.email,
        telefone: form.telefone,
        cargo: form.cargo,
        oab: form.oab || undefined,
        ativo: true,
      }
      setMembros([...membros, novoMembro])
    }

    resetForm()
    setDialogOpen(false)
  }

  const handleEditar = (membro: Membro) => {
    setEditando(membro)
    setForm({
      nome: membro.nome,
      email: membro.email,
      telefone: membro.telefone,
      cargo: membro.cargo,
      oab: membro.oab || "",
    })
    setDialogOpen(true)
  }

  const handleRemover = (id: string) => {
    setMembros(membros.filter((m) => m.id !== id))
  }

  const toggleAtivo = (id: string) => {
    setMembros(
      membros.map((m) =>
        m.id === id ? { ...m, ativo: !m.ativo } : m
      )
    )
  }

  const membrosFiltrados = filtro === "todos" 
    ? membros 
    : membros.filter((m) => m.cargo === filtro)

  const contagem = {
    total: membros.length,
    admin: membros.filter((m) => m.cargo === "admin").length,
    advogado: membros.filter((m) => m.cargo === "advogado").length,
    estagiario: membros.filter((m) => m.cargo === "estagiario").length,
    secretaria: membros.filter((m) => m.cargo === "secretaria").length,
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-60 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Equipe</h1>
            <p className="text-muted-foreground">
              Gerencie os advogados e colaboradores do escritório
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open)
            if (!open) resetForm()
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Membro
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editando ? "Editar Membro" : "Novo Membro"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome Completo</Label>
                  <Input
                    id="nome"
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    placeholder="Dr. João da Silva"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Comercial</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="joao.silva@megaadvocacia.com.br"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={form.telefone}
                    onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                    placeholder="(11) 99999-0000"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo</Label>
                  <Select
                    value={form.cargo}
                    onValueChange={(value: Cargo) => setForm({ ...form, cargo: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="advogado">Advogado(a)</SelectItem>
                      <SelectItem value="estagiario">Estagiário(a)</SelectItem>
                      <SelectItem value="secretaria">Secretário(a)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {(form.cargo === "advogado" || form.cargo === "admin") && (
                  <div className="space-y-2">
                    <Label htmlFor="oab">Número da OAB</Label>
                    <Input
                      id="oab"
                      value={form.oab}
                      onChange={(e) => setForm({ ...form, oab: e.target.value })}
                      placeholder="SP 123.456"
                    />
                  </div>
                )}
                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => {
                    setDialogOpen(false)
                    resetForm()
                  }}>
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {editando ? "Salvar" : "Adicionar"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          <Button
            variant={filtro === "todos" ? "default" : "outline"}
            size="sm"
            onClick={() => setFiltro("todos")}
          >
            Todos ({contagem.total})
          </Button>
          <Button
            variant={filtro === "admin" ? "default" : "outline"}
            size="sm"
            onClick={() => setFiltro("admin")}
          >
            Administradores ({contagem.admin})
          </Button>
          <Button
            variant={filtro === "advogado" ? "default" : "outline"}
            size="sm"
            onClick={() => setFiltro("advogado")}
          >
            Advogados ({contagem.advogado})
          </Button>
          <Button
            variant={filtro === "estagiario" ? "default" : "outline"}
            size="sm"
            onClick={() => setFiltro("estagiario")}
          >
            Estagiários ({contagem.estagiario})
          </Button>
          <Button
            variant={filtro === "secretaria" ? "default" : "outline"}
            size="sm"
            onClick={() => setFiltro("secretaria")}
          >
            Secretários ({contagem.secretaria})
          </Button>
        </div>

        <div className="rounded-xl border border-border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Cargo</TableHead>
                <TableHead>OAB</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {membrosFiltrados.map((membro) => {
                const CargoIcon = cargoIcons[membro.cargo]
                return (
                  <TableRow key={membro.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <CargoIcon className="h-5 w-5 text-primary" />
                        </div>
                        <span className="font-medium">{membro.nome}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{membro.email}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{membro.telefone || "-"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium">
                        {cargoLabels[membro.cargo]}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">{membro.oab || "-"}</span>
                    </TableCell>
                    <TableCell>
                      <button
                        onClick={() => toggleAtivo(membro.id)}
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                          membro.ativo
                            ? "bg-accent/20 text-accent"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {membro.ativo ? "Ativo" : "Inativo"}
                      </button>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditar(membro)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemover(membro.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
              {membrosFiltrados.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="py-8 text-center text-muted-foreground">
                    Nenhum membro encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  )
}

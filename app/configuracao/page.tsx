"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, Building2, User, Bell } from "lucide-react"

export default function ConfiguracaoPage() {
  const [config, setConfig] = useState({
    nomeEscritorio: "Mega Advocacia",
    responsavel: "Dr. João Silva",
    email: "contato@megaadvocacia.com.br",
    telefone: "(11) 99999-9999",
  })

  const handleSave = () => {
    alert("Configurações salvas com sucesso!")
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="pl-60">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
            <p className="mt-1 text-muted-foreground">Gerencie as configurações do sistema</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-foreground">Dados do Escritório</CardTitle>
                    <CardDescription>Informações gerais do escritório</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Nome do Escritório
                  </label>
                  <Input
                    value={config.nomeEscritorio}
                    onChange={(e) => setConfig({ ...config, nomeEscritorio: e.target.value })}
                    className="border-border bg-input text-foreground"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Responsável
                  </label>
                  <Input
                    value={config.responsavel}
                    onChange={(e) => setConfig({ ...config, responsavel: e.target.value })}
                    className="border-border bg-input text-foreground"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
                    <User className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-foreground">Contato</CardTitle>
                    <CardDescription>Informações de contato</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    E-mail
                  </label>
                  <Input
                    type="email"
                    value={config.email}
                    onChange={(e) => setConfig({ ...config, email: e.target.value })}
                    className="border-border bg-input text-foreground"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Telefone
                  </label>
                  <Input
                    value={config.telefone}
                    onChange={(e) => setConfig({ ...config, telefone: e.target.value })}
                    className="border-border bg-input text-foreground"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card md:col-span-2">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-chart-3/20">
                    <Bell className="h-5 w-5 text-chart-3" />
                  </div>
                  <div>
                    <CardTitle className="text-foreground">Notificações</CardTitle>
                    <CardDescription>Configurações de alertas e lembretes</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Em breve você poderá configurar notificações por e-mail e alertas de prazo.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 flex justify-end">
            <Button onClick={handleSave} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Save className="h-4 w-4" />
              Salvar Configurações
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}

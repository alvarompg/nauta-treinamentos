// ============================================
// PÁGINA DE GESTÃO DE ASSINATURAS
// ============================================
// Permite ao administrador gerenciar instrutores e responsáveis técnicos
// com suas respectivas assinaturas digitais para certificados

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { useAuth } from "@/lib/auth-context"
import { mockInstructorSignatures, type InstructorSignature, type SignatureRole } from "@/lib/data"
import { PenTool, Plus, Trash2, Edit, Eye, Search, UserCheck, User } from "lucide-react"

export default function AssinaturasPage() {
  const router = useRouter()
  const { user, isAdmin, isLoading } = useAuth()
  
  // Estado para lista de assinaturas
  const [signatures, setSignatures] = useState<InstructorSignature[]>(mockInstructorSignatures)
  
  // Estado para filtros
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<"all" | SignatureRole>("all")
  
  // Estado para modal de criação/edição
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingSignature, setEditingSignature] = useState<InstructorSignature | null>(null)
  
  // Estado para modal de visualização
  const [viewingSignature, setViewingSignature] = useState<InstructorSignature | null>(null)
  
  // Estado para confirmação de exclusão
  const [signatureToDelete, setSignatureToDelete] = useState<InstructorSignature | null>(null)
  
  // Estado do formulário
  const [formData, setFormData] = useState<Omit<InstructorSignature, "id" | "createdAt">>({
    fullName: "",
    role: "instrutor",
    crea: "",
    technicalFormation: "",
    cpf: "",
    phone: "",
    email: "",
    signatureImageUrl: "",
    isActive: true,
  })

  // Proteção: Aguarda carregar dados do localStorage antes de verificar
  useEffect(() => {
    if (isLoading) return
    
    if (!user) {
      router.push("/login")
    } else if (!isAdmin) {
      router.push("/")
    }
  }, [user, isAdmin, isLoading, router])

  // Mostra loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-neutral-600">Verificando acesso...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return null
  }

  // Filtra assinaturas baseado na busca e filtro de perfil
  const filteredSignatures = signatures.filter((sig) => {
    const matchesSearch =
      sig.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sig.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sig.technicalFormation.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || sig.role === roleFilter
    return matchesSearch && matchesRole
  })

  // Função para abrir modal de criação
  const handleOpenCreate = () => {
    setEditingSignature(null)
    setFormData({
      fullName: "",
      role: "instrutor",
      crea: "",
      technicalFormation: "",
      cpf: "",
      phone: "",
      email: "",
      signatureImageUrl: "",
      isActive: true,
    })
    setIsDialogOpen(true)
  }

  // Função para abrir modal de edição
  const handleOpenEdit = (signature: InstructorSignature) => {
    setEditingSignature(signature)
    setFormData({
      fullName: signature.fullName,
      role: signature.role,
      crea: signature.crea || "",
      technicalFormation: signature.technicalFormation,
      cpf: signature.cpf,
      phone: signature.phone,
      email: signature.email,
      signatureImageUrl: signature.signatureImageUrl,
      isActive: signature.isActive,
    })
    setIsDialogOpen(true)
  }

  // Função para salvar assinatura (criar ou editar)
  const handleSaveSignature = () => {
    if (editingSignature) {
      // Editando existente
      setSignatures(
        signatures.map((sig) =>
          sig.id === editingSignature.id
            ? { ...sig, ...formData }
            : sig
        )
      )
    } else {
      // Criando nova
      const newSignature: InstructorSignature = {
        id: `sig-${Date.now()}`,
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setSignatures([...signatures, newSignature])
    }
    setIsDialogOpen(false)
  }

  // Função para excluir assinatura
  const handleDeleteSignature = () => {
    if (signatureToDelete) {
      setSignatures(signatures.filter((sig) => sig.id !== signatureToDelete.id))
      setSignatureToDelete(null)
    }
  }

  // Função para alternar status ativo/inativo
  const toggleActiveStatus = (signatureId: string) => {
    setSignatures(
      signatures.map((sig) =>
        sig.id === signatureId ? { ...sig, isActive: !sig.isActive } : sig
      )
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-slate-50 py-8 px-4">
        <div className="container max-w-7xl mx-auto">
          {/* Breadcrumb e Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <div className="text-sm text-muted-foreground mb-2">
                <Link href="/painel" className="hover:text-teal-600">
                  Painel
                </Link>{" "}
                / Assinaturas
              </div>
              <h1 className="text-3xl font-bold text-neutral-900 flex items-center gap-3">
                <PenTool className="h-8 w-8 text-purple-600" />
                Gestão de Assinaturas
              </h1>
              <p className="text-muted-foreground mt-1">
                Gerencie instrutores e responsáveis técnicos para certificados
              </p>
            </div>
            <Button onClick={handleOpenCreate} size="lg" className="bg-teal-600 hover:bg-teal-700">
              <Plus className="h-5 w-5 mr-2" />
              Nova Assinatura
            </Button>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Cadastrados</CardDescription>
                <CardTitle className="text-2xl">{signatures.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Responsáveis Técnicos</CardDescription>
                <CardTitle className="text-2xl">
                  {signatures.filter((s) => s.role === "responsavel").length}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Instrutores</CardDescription>
                <CardTitle className="text-2xl">
                  {signatures.filter((s) => s.role === "instrutor").length}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Filtros */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por nome, email ou formação..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select
                  value={roleFilter}
                  onValueChange={(value) => setRoleFilter(value as "all" | SignatureRole)}
                >
                  <SelectTrigger className="w-full md:w-[200px]">
                    <SelectValue placeholder="Filtrar por perfil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os perfis</SelectItem>
                    <SelectItem value="responsavel">Responsáveis</SelectItem>
                    <SelectItem value="instrutor">Instrutores</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Tabela de Assinaturas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Assinaturas Cadastradas ({filteredSignatures.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredSignatures.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <PenTool className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Nenhuma assinatura encontrada</p>
                  <p className="text-sm">Clique em "Nova Assinatura" para cadastrar</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Perfil</TableHead>
                        <TableHead>Formação</TableHead>
                        <TableHead>CREA</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-center">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSignatures.map((signature) => (
                        <TableRow key={signature.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{signature.fullName}</p>
                              <p className="text-sm text-muted-foreground">{signature.email}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={signature.role === "responsavel" ? "default" : "secondary"}
                              className={
                                signature.role === "responsavel"
                                  ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                                  : "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              }
                            >
                              {signature.role === "responsavel" ? (
                                <><UserCheck className="h-3 w-3 mr-1" /> Responsável</>
                              ) : (
                                <><User className="h-3 w-3 mr-1" /> Instrutor</>
                              )}
                            </Badge>
                          </TableCell>
                          <TableCell>{signature.technicalFormation}</TableCell>
                          <TableCell>{signature.crea || "-"}</TableCell>
                          <TableCell>
                            <Badge
                              variant={signature.isActive ? "default" : "secondary"}
                              className={
                                signature.isActive
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                              }
                            >
                              {signature.isActive ? "Ativo" : "Inativo"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center justify-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setViewingSignature(signature)}
                                className="h-8 w-8"
                                title="Visualizar"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleOpenEdit(signature)}
                                className="h-8 w-8"
                                title="Editar"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSignatureToDelete(signature)}
                                className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                title="Excluir"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />

      {/* Modal de Criação/Edição */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingSignature ? "Editar Assinatura" : "Nova Assinatura"}
            </DialogTitle>
            <DialogDescription>
              Preencha os dados do instrutor ou responsável técnico
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Nome Completo */}
            <div className="space-y-2">
              <Label htmlFor="fullName">
                Nome Completo <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullName"
                placeholder="Ex: Dr. Carlos Eduardo da Silva"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
            </div>

            {/* Perfil */}
            <div className="space-y-2">
              <Label htmlFor="role">
                Perfil <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.role}
                onValueChange={(value: SignatureRole) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o perfil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="responsavel">Responsável Técnico</SelectItem>
                  <SelectItem value="instrutor">Instrutor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* CREA e Formação em linha */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="crea">Número do CREA</Label>
                <Input
                  id="crea"
                  placeholder="Ex: 123456/D-RJ"
                  value={formData.crea}
                  onChange={(e) => setFormData({ ...formData, crea: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="technicalFormation">
                  Formação Técnica <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="technicalFormation"
                  placeholder="Ex: Engenheiro Naval"
                  value={formData.technicalFormation}
                  onChange={(e) => setFormData({ ...formData, technicalFormation: e.target.value })}
                />
              </div>
            </div>

            {/* CPF */}
            <div className="space-y-2">
              <Label htmlFor="cpf">
                CPF <span className="text-red-500">*</span>
              </Label>
              <Input
                id="cpf"
                placeholder="000.000.000-00"
                value={formData.cpf}
                onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
              />
            </div>

            {/* Telefone e Email em linha */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">
                  Telefone <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  placeholder="(00) 00000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">
                  E-mail <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@exemplo.com.br"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Upload da Assinatura */}
            <div className="space-y-2">
              <Label htmlFor="signatureFile">
                Imagem da Assinatura <span className="text-red-500">*</span>
              </Label>
              <Input
                id="signatureFile"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    setFormData({ ...formData, signatureImageUrl: URL.createObjectURL(file) })
                  }
                }}
              />
              <p className="text-xs text-muted-foreground">
                Recomendado: PNG com fundo transparente (300x100 pixels)
              </p>

              {/* Preview da assinatura */}
              {formData.signatureImageUrl && (
                <div className="mt-3 border rounded p-3 bg-white">
                  <p className="text-xs text-muted-foreground mb-2">Preview da assinatura:</p>
                  <div className="border-b border-neutral-300 pb-2 mb-2">
                    <img
                      src={formData.signatureImageUrl}
                      alt="Preview da assinatura"
                      className="h-16 object-contain"
                    />
                  </div>
                  <p className="text-sm font-medium text-neutral-700">
                    {formData.fullName || "Nome do Profissional"}
                  </p>
                  <p className="text-xs text-neutral-500">{formData.technicalFormation}</p>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleSaveSignature}
              className="bg-teal-600 hover:bg-teal-700"
              disabled={!formData.fullName || !formData.technicalFormation || !formData.cpf}
            >
              {editingSignature ? "Salvar Alterações" : "Cadastrar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Visualização */}
      <Dialog open={!!viewingSignature} onOpenChange={() => setViewingSignature(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalhes da Assinatura</DialogTitle>
          </DialogHeader>
          {viewingSignature && (
            <div className="space-y-4">
              <div className="text-center border rounded-lg p-4 bg-slate-50">
                <img
                  src={viewingSignature.signatureImageUrl}
                  alt={`Assinatura de ${viewingSignature.fullName}`}
                  className="h-20 mx-auto object-contain mb-3"
                />
                <p className="font-semibold text-lg">{viewingSignature.fullName}</p>
                <p className="text-sm text-muted-foreground">{viewingSignature.technicalFormation}</p>
                {viewingSignature.crea && (
                  <p className="text-sm text-muted-foreground">CREA: {viewingSignature.crea}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Perfil</p>
                  <p className="font-medium">
                    {viewingSignature.role === "responsavel" ? "Responsável Técnico" : "Instrutor"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">CPF</p>
                  <p className="font-medium">{viewingSignature.cpf}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Telefone</p>
                  <p className="font-medium">{viewingSignature.phone}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">E-mail</p>
                  <p className="font-medium">{viewingSignature.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Cadastrado em</p>
                  <p className="font-medium">{viewingSignature.createdAt}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <Badge
                    variant={viewingSignature.isActive ? "default" : "secondary"}
                    className={
                      viewingSignature.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {viewingSignature.isActive ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewingSignature(null)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Confirmação de Exclusão */}
      <AlertDialog open={!!signatureToDelete} onOpenChange={() => setSignatureToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Você tem certeza que deseja excluir a assinatura de{" "}
              <strong>{signatureToDelete?.fullName}</strong>? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteSignature}
              className="bg-red-600 hover:bg-red-700"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

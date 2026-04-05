"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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
import {
  Save,
  Eye,
  FileText,
  DollarSign,
  BookOpen,
  MessageSquare,
  Upload,
  Plus,
  Trash2,
  GripVertical,
  Video,
  FileType,
  X,
  ChevronUp,
  ChevronDown,
  PenTool, // Icone para assinatura do instrutor
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { courses, mockInstructorSignatures, type InstructorSignature as DataInstructorSignature } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface CourseFormData {
  title: string
  shortDescription: string
  bannerDescription: string
  fullDescription: string
  popupDescription: string
  duration: number
  imageUrl: string
  videoUrl: string
  languages: string[]
  selectedInstructorIds: string[] // IDs dos instrutores selecionados (do banco de assinaturas)
  price: number
  promotionalPrice: number
  sections: CourseSection[]
  isPublished: boolean // Status de publicação do treinamento
}

interface CourseSection {
  id: string
  name: string
  learningObjectives: string
  items: CourseSectionItem[]
}

interface CourseSectionItem {
  id: string
  type: "lesson" | "assignment" | "final-test"
  name: string
  description: string
  content?: LessonContent | QuizContent
}

interface LessonContent {
  type: "article" | "video" | "pdf"
  articleContent?: string
  videoUrl?: string
  videoTranscriptPT?: string
  videoTranscriptEN?: string
  pdfUrl?: string
}

interface QuizContent {
  questions: QuizQuestion[]
}

interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctOption: number
}

export default function EditarCursoPage() {
  const params = useParams()
  const router = useRouter()
  const { user, isAdmin, isLoading } = useAuth()
  const courseId = params.courseId as string
  const isNewCourse = courseId === "novo"

  const [activeSection, setActiveSection] = useState("geral")
  const [formData, setFormData] = useState<CourseFormData>({
    title: "",
    shortDescription: "",
    bannerDescription: "",
    fullDescription: "",
    popupDescription: "",
    duration: 0,
    imageUrl: "",
    videoUrl: "",
    languages: [],
    selectedInstructorIds: [], // IDs dos instrutores selecionados
    price: 0,
    promotionalPrice: 0,
    sections: [],
    isPublished: false, // Status de publicação
  })
  const [itemToDelete, setItemToDelete] = useState<{ sectionId: string; itemId?: string } | null>(null)
  const [unsavedChanges, setUnsavedChanges] = useState(false)

  // Proteção: Aguarda carregar dados do localStorage antes de verificar
  useEffect(() => {
    if (isLoading) return
    
    if (!user || !isAdmin) {
      router.push("/")
    }
  }, [user, isAdmin, isLoading, router])

  useEffect(() => {
    if (!isNewCourse) {
      const course = courses.find((c) => c.id === courseId)
      if (course) {
        setFormData({
          title: course.name,
          shortDescription: course.shortDescription,
          bannerDescription: course.longDescription || "",
          fullDescription: course.longDescription || "",
          popupDescription: course.shortDescription,
          duration: Number.parseInt(course.duration?.replace(/\D/g, "") || "0"),
          imageUrl: course.imageUrl,
          videoUrl: "",
          languages: ["Português"],
          selectedInstructorIds: [], // Carregar IDs dos instrutores associados
          price: course.priceValue,
          promotionalPrice: course.originalPriceValue || 0,
          sections: [],
          isPublished: true, // Cursos existentes já estão publicados
        })
      }
    }
  }, [courseId, isNewCourse])

  const updateField = (field: keyof CourseFormData, value: unknown) => {
    setFormData({ ...formData, [field]: value })
    setUnsavedChanges(true)
  }

  // Toggle de idiomas
  const toggleLanguage = (lang: string) => {
    const newLanguages = formData.languages.includes(lang)
      ? formData.languages.filter((l) => l !== lang)
      : [...formData.languages, lang]
    updateField("languages", newLanguages)
  }

  // Toggle de instrutores selecionados (multi-select)
  const toggleInstructor = (instructorId: string) => {
    const newSelectedIds = formData.selectedInstructorIds.includes(instructorId)
      ? formData.selectedInstructorIds.filter((id) => id !== instructorId)
      : [...formData.selectedInstructorIds, instructorId]
    updateField("selectedInstructorIds", newSelectedIds)
  }

  // Toggle de status de publicação
  const togglePublishStatus = () => {
    updateField("isPublished", !formData.isPublished)
  }

  const addSection = () => {
    const newSection: CourseSection = {
      id: `section-${Date.now()}`,
      name: "",
      learningObjectives: "",
      items: [],
    }
    updateField("sections", [...formData.sections, newSection])
  }

  const updateSection = (sectionId: string, field: keyof CourseSection, value: unknown) => {
    const newSections = formData.sections.map((section) =>
      section.id === sectionId ? { ...section, [field]: value } : section,
    )
    updateField("sections", newSections)
  }

  const deleteSection = (sectionId: string) => {
    updateField(
      "sections",
      formData.sections.filter((s) => s.id !== sectionId),
    )
    setItemToDelete(null)
  }

  const moveSectionUp = (index: number) => {
    if (index > 0) {
      const newSections = [...formData.sections]
      ;[newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]]
      updateField("sections", newSections)
    }
  }

  const moveSectionDown = (index: number) => {
    if (index < formData.sections.length - 1) {
      const newSections = [...formData.sections]
      ;[newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]]
      updateField("sections", newSections)
    }
  }

  const addItem = (sectionId: string, type: "lesson" | "assignment" | "final-test") => {
    const newItem: CourseSectionItem = {
      id: `item-${Date.now()}`,
      type,
      name: "",
      description: "",
    }
    const newSections = formData.sections.map((section) =>
      section.id === sectionId ? { ...section, items: [...section.items, newItem] } : section,
    )
    updateField("sections", newSections)
  }

  const updateItem = (sectionId: string, itemId: string, field: keyof CourseSectionItem, value: unknown) => {
    const newSections = formData.sections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            items: section.items.map((item) => (item.id === itemId ? { ...item, [field]: value } : item)),
          }
        : section,
    )
    updateField("sections", newSections)
  }

  const deleteItem = (sectionId: string, itemId: string) => {
    const newSections = formData.sections.map((section) =>
      section.id === sectionId ? { ...section, items: section.items.filter((item) => item.id !== itemId) } : section,
    )
    updateField("sections", newSections)
    setItemToDelete(null)
  }

  const handleSave = () => {
    console.log("Salvando treinamento:", formData)
    setUnsavedChanges(false)
    alert("Treinamento salvo com sucesso!")
  }

  const handlePreview = () => {
    window.open("/curso-vitrine?id=preview", "_blank")
  }

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

  const menuItems = [
    { id: "geral", label: "Informações Gerais", icon: FileText },
    { id: "preco", label: "Preço e Promoção", icon: DollarSign },
    { id: "modulos", label: "Módulos e Aulas", icon: BookOpen },
    { id: "assinaturas", label: "Assinatura do Instrutor", icon: PenTool }, // Nova seção para assinaturas
    { id: "mensagens", label: "Mensagens do Treinamento", icon: MessageSquare },
    { id: "publicar", label: "Publicar Treinamento", icon: Upload },
  ]

  return (
    <div className="flex flex-col h-screen">
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => router.push("/admin/cursos")}>
            ← Voltar
          </Button>
          <div>
            <h1 className="text-xl font-bold">{isNewCourse ? "Criar Novo Treinamento" : "Editar Treinamento"}</h1>
            {unsavedChanges && <p className="text-xs text-amber-600">● Alterações não salvas</p>}
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={handlePreview} className="bg-transparent">
            <Eye className="h-4 w-4 mr-2" />
            Visualizar Treinamento
          </Button>
          <Button onClick={handleSave} className="bg-teal-600 hover:bg-teal-700">
            <Save className="h-4 w-4 mr-2" />
            Salvar Treinamento
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-white border-r overflow-y-auto">
          <nav className="p-4 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                    activeSection === item.id
                      ? "bg-teal-50 text-teal-700 font-medium"
                      : "text-neutral-700 hover:bg-slate-50",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </aside>

        <main className="flex-1 overflow-y-auto bg-slate-50 p-8">
          <div className="max-w-4xl mx-auto">
            {activeSection === "geral" && (
              <Card>
                <CardHeader>
                  <CardTitle>Informações Gerais</CardTitle>
                  <CardDescription>Configure os detalhes básicos do treinamento</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      Título do treinamento <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="title"
                      placeholder="Ex: Segurança Offshore Essencial"
                      value={formData.title}
                      onChange={(e) => updateField("title", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shortDescription">
                      Descrição reduzida <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="shortDescription"
                      placeholder="Uma breve descrição do treinamento (máx. 160 caracteres)"
                      rows={2}
                      maxLength={160}
                      value={formData.shortDescription}
                      onChange={(e) => updateField("shortDescription", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">{formData.shortDescription.length}/160 caracteres</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bannerDescription">
                      Descrição para o banner <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="bannerDescription"
                      placeholder="Descrição que aparecerá no banner do treinamento"
                      rows={3}
                      value={formData.bannerDescription}
                      onChange={(e) => updateField("bannerDescription", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fullDescription">Descrição completa (Editor Rico)</Label>
                    <Textarea
                      id="fullDescription"
                      placeholder="Descrição detalhada do treinamento..."
                      rows={6}
                      value={formData.fullDescription}
                      onChange={(e) => updateField("fullDescription", e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">💡 Em produção, este seria um editor de texto rico</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="popupDescription">
                      Descrição para popup <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="popupDescription"
                      placeholder="Texto que aparece em popups e notificações"
                      rows={2}
                      value={formData.popupDescription}
                      onChange={(e) => updateField("popupDescription", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">
                      Carga horária (em horas) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="duration"
                      type="number"
                      min="0"
                      placeholder="Ex: 40"
                      value={formData.duration}
                      onChange={(e) => updateField("duration", Number.parseInt(e.target.value) || 0)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="imageFile">
                      Imagem do treinamento <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="imageFile"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          updateField("imageUrl", URL.createObjectURL(file))
                        }
                      }}
                    />
                    {formData.imageUrl && (
                      <div className="mt-2 border rounded p-2">
                        <img
                          src={formData.imageUrl || "/placeholder.svg"}
                          alt="Preview"
                          className="w-32 h-20 object-cover rounded"
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="videoFile">Vídeo de apresentação (Opcional)</Label>
                    <Input
                      id="videoFile"
                      type="file"
                      accept="video/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          updateField("videoUrl", URL.createObjectURL(file))
                        }
                      }}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>
                      Linguagem <span className="text-red-500">*</span>
                    </Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="lang-pt"
                          checked={formData.languages.includes("Português")}
                          onCheckedChange={() => toggleLanguage("Português")}
                        />
                        <label htmlFor="lang-pt" className="text-sm cursor-pointer">
                          Português
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="lang-en"
                          checked={formData.languages.includes("Inglês")}
                          onCheckedChange={() => toggleLanguage("Inglês")}
                        />
                        <label htmlFor="lang-en" className="text-sm cursor-pointer">
                          Inglês
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Seção de Instrutores removida - agora centralizada na aba "Assinaturas" */}
                </CardContent>
              </Card>
            )}

            {activeSection === "preco" && (
              <Card>
                <CardHeader>
                  <CardTitle>Preço e Promoção</CardTitle>
                  <CardDescription>Defina os valores do treinamento</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="price">
                      Preço do treinamento (R$) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="Ex: 960.00"
                      value={formData.price}
                      onChange={(e) => updateField("price", Number.parseFloat(e.target.value) || 0)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="promotionalPrice">Preço promocional (R$) (Opcional)</Label>
                    <Input
                      id="promotionalPrice"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="Ex: 720.00"
                      value={formData.promotionalPrice}
                      onChange={(e) => updateField("promotionalPrice", Number.parseFloat(e.target.value) || 0)}
                    />
                    <p className="text-xs text-muted-foreground">Deixe em branco se não houver promoção ativa</p>
                  </div>

                  {formData.promotionalPrice > 0 && formData.promotionalPrice < formData.price && (
                    <div className="bg-teal-50 border border-teal-200 rounded p-4">
                      <p className="text-sm font-medium text-teal-900">Preview do desconto:</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-2xl font-bold text-teal-600">
                          R$ {formData.promotionalPrice.toFixed(2)}
                        </span>
                        <span className="text-sm text-muted-foreground line-through">
                          R$ {formData.price.toFixed(2)}
                        </span>
                        <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">
                          {Math.round(((formData.price - formData.promotionalPrice) / formData.price) * 100)}% OFF
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {activeSection === "modulos" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Módulos e Aulas</CardTitle>
                    <CardDescription>Construa a estrutura completa do curso</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={addSection} className="w-full bg-teal-600 hover:bg-teal-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Seção
                    </Button>
                  </CardContent>
                </Card>

                {formData.sections.map((section, sectionIndex) => (
                  <Card key={section.id} className="border-2">
                    <CardHeader className="bg-slate-50">
                      <div className="flex items-start gap-3">
                        <div className="flex flex-col gap-1 pt-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 cursor-grab bg-transparent">
                            <GripVertical className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="flex-1 space-y-3">
                          <Input
                            placeholder="Nome da Seção"
                            value={section.name}
                            onChange={(e) => updateSection(section.id, "name", e.target.value)}
                            className="font-semibold text-lg"
                          />
                          <Textarea
                            placeholder="O que os alunos poderão fazer ao final desta seção?"
                            value={section.learningObjectives}
                            onChange={(e) => updateSection(section.id, "learningObjectives", e.target.value)}
                            rows={2}
                          />
                        </div>

                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveSectionUp(sectionIndex)}
                            disabled={sectionIndex === 0}
                            className="bg-transparent"
                          >
                            <ChevronUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => moveSectionDown(sectionIndex)}
                            disabled={sectionIndex === formData.sections.length - 1}
                            className="bg-transparent"
                          >
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setItemToDelete({ sectionId: section.id })}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-4 space-y-3">
                      {section.items.map((item) => (
                        <div key={item.id} className="flex items-start gap-3 p-3 border rounded bg-white">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 cursor-grab flex-shrink-0 bg-transparent"
                          >
                            <GripVertical className="h-4 w-4" />
                          </Button>

                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-xs bg-slate-100 px-2 py-1 rounded">
                                {item.type === "lesson"
                                  ? "Aula"
                                  : item.type === "assignment"
                                    ? "Tarefa"
                                    : "Teste Final"}
                              </span>
                              <Input
                                placeholder="Nome do item"
                                value={item.name}
                                onChange={(e) => updateItem(section.id, item.id, "name", e.target.value)}
                                className="flex-1"
                              />
                            </div>
                            <Textarea
                              placeholder="Descrição"
                              value={item.description}
                              onChange={(e) => updateItem(section.id, item.id, "description", e.target.value)}
                              rows={2}
                            />

                            {item.type === "lesson" && (
                              <div className="border-t pt-3 mt-3">
                                <p className="text-sm font-medium mb-2">Conteúdo da Aula:</p>
                                <Tabs defaultValue="article">
                                  <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="article">
                                      <FileText className="h-4 w-4 mr-2" />
                                      Artigo
                                    </TabsTrigger>
                                    <TabsTrigger value="video">
                                      <Video className="h-4 w-4 mr-2" />
                                      Vídeo
                                    </TabsTrigger>
                                    <TabsTrigger value="pdf">
                                      <FileType className="h-4 w-4 mr-2" />
                                      PDF
                                    </TabsTrigger>
                                  </TabsList>

                                  {/* Artigo com suporte multilíngue */}
                                  <TabsContent value="article" className="space-y-3">
                                    <div className="bg-slate-50 p-3 rounded-lg">
                                      <Tabs defaultValue="pt" className="w-full">
                                        <div className="flex items-center justify-between mb-2">
                                          <Label className="text-xs text-muted-foreground">Idioma do conteúdo:</Label>
                                          <TabsList className="h-8">
                                            <TabsTrigger value="pt" className="text-xs h-7 px-3">
                                              Português
                                            </TabsTrigger>
                                            <TabsTrigger value="en" className="text-xs h-7 px-3">
                                              Inglês
                                            </TabsTrigger>
                                          </TabsList>
                                        </div>
                                        <TabsContent value="pt" className="mt-0">
                                          <Textarea placeholder="Conteúdo do artigo em Português..." rows={5} />
                                        </TabsContent>
                                        <TabsContent value="en" className="mt-0">
                                          <Textarea placeholder="Article content in English..." rows={5} />
                                        </TabsContent>
                                      </Tabs>
                                    </div>
                                  </TabsContent>

                                  {/* Vídeo com transcrições em ambos idiomas */}
                                  <TabsContent value="video" className="space-y-3">
                                    <Input type="file" accept="video/*" />
                                    <div className="bg-slate-50 p-3 rounded-lg">
                                      <Tabs defaultValue="pt" className="w-full">
                                        <div className="flex items-center justify-between mb-2">
                                          <Label className="text-xs text-muted-foreground">Transcrição:</Label>
                                          <TabsList className="h-8">
                                            <TabsTrigger value="pt" className="text-xs h-7 px-3">
                                              Português
                                            </TabsTrigger>
                                            <TabsTrigger value="en" className="text-xs h-7 px-3">
                                              Inglês
                                            </TabsTrigger>
                                          </TabsList>
                                        </div>
                                        <TabsContent value="pt" className="mt-0">
                                          <Textarea placeholder="Transcrição em Português..." rows={4} />
                                        </TabsContent>
                                        <TabsContent value="en" className="mt-0">
                                          <Textarea placeholder="Transcript in English..." rows={4} />
                                        </TabsContent>
                                      </Tabs>
                                    </div>
                                  </TabsContent>

                                  {/* PDF */}
                                  <TabsContent value="pdf">
                                    <div className="bg-slate-50 p-3 rounded-lg space-y-3">
                                      <div>
                                        <Label className="text-xs text-muted-foreground mb-2 block">PDF em Português:</Label>
                                        <Input type="file" accept="application/pdf" />
                                      </div>
                                      <div>
                                        <Label className="text-xs text-muted-foreground mb-2 block">PDF em Inglês (opcional):</Label>
                                        <Input type="file" accept="application/pdf" />
                                      </div>
                                    </div>
                                  </TabsContent>
                                </Tabs>
                              </div>
                            )}

                            {(item.type === "assignment" || item.type === "final-test") && (
                              <div className="border-t pt-3 mt-3">
                                <div className="flex items-center justify-between mb-2">
                                  <p className="text-sm font-medium">Questões:</p>
                                  <Button size="sm" variant="outline" className="bg-transparent">
                                    <Plus className="h-3 w-3 mr-1" />
                                    Adicionar Questão
                                  </Button>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  Clique para adicionar questões de múltipla escolha
                                </p>
                              </div>
                            )}
                          </div>

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setItemToDelete({ sectionId: section.id, itemId: item.id })}
                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 bg-transparent"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}

                      <div className="pt-2">
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addItem(section.id, "lesson")}
                            className="flex-1 bg-transparent"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Aula
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addItem(section.id, "assignment")}
                            className="flex-1 bg-transparent"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Tarefa
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addItem(section.id, "final-test")}
                            className="flex-1 bg-transparent"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Teste Final
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {formData.sections.length === 0 && (
                  <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                      <BookOpen className="h-12 w-12 text-muted-foreground mb-3 opacity-50" />
                      <p className="text-sm text-muted-foreground">Nenhuma seção adicionada ainda</p>
                      <p className="text-xs text-muted-foreground mt-1">Clique em "Adicionar Seção" para começar</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* SEÇÃO DE ASSINATURAS DO INSTRUTOR - Multi-select dos cadastrados */}
            {activeSection === "assinaturas" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PenTool className="h-5 w-5 text-teal-600" />
                    Vincular Instrutores
                  </CardTitle>
                  <CardDescription>
                    Selecione os instrutores/responsáveis que assinarão o certificado deste treinamento.
                    Os profissionais devem estar cadastrados em Painel {">"} Assinaturas.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Lista de instrutores disponíveis para seleção */}
                  {mockInstructorSignatures.filter(s => s.isActive).length === 0 ? (
                    <div className="text-center py-8 border rounded-lg border-dashed">
                      <PenTool className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
                      <p className="text-sm text-muted-foreground">Nenhum instrutor cadastrado</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Acesse Painel {">"} Assinaturas para cadastrar instrutores
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Label>Selecione os instrutores para este treinamento:</Label>
                      {mockInstructorSignatures.filter(s => s.isActive).map((instructor) => (
                        <div
                          key={instructor.id}
                          className={cn(
                            "border rounded-lg p-4 cursor-pointer transition-all",
                            formData.selectedInstructorIds.includes(instructor.id)
                              ? "border-teal-500 bg-teal-50"
                              : "border-gray-200 hover:border-gray-300 bg-white"
                          )}
                          onClick={() => toggleInstructor(instructor.id)}
                        >
                          <div className="flex items-start gap-4">
                            <Checkbox
                              checked={formData.selectedInstructorIds.includes(instructor.id)}
                              onCheckedChange={() => toggleInstructor(instructor.id)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-neutral-800">{instructor.fullName}</p>
                                <Badge
                                  variant="secondary"
                                  className={
                                    instructor.role === "responsavel"
                                      ? "bg-purple-100 text-purple-800"
                                      : "bg-blue-100 text-blue-800"
                                  }
                                >
                                  {instructor.role === "responsavel" ? "Responsável" : "Instrutor"}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{instructor.technicalFormation}</p>
                              {instructor.crea && (
                                <p className="text-xs text-muted-foreground">CREA: {instructor.crea}</p>
                              )}
                            </div>
                            {instructor.signatureImageUrl && (
                              <div className="hidden sm:block border rounded p-2 bg-white">
                                <img
                                  src={instructor.signatureImageUrl}
                                  alt={`Assinatura de ${instructor.fullName}`}
                                  className="h-10 object-contain"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Resumo de instrutores selecionados */}
                  {formData.selectedInstructorIds.length > 0 && (
                    <div className="bg-teal-50 border border-teal-200 rounded p-4">
                      <p className="text-sm font-medium text-teal-900 mb-2">
                        Instrutores selecionados: {formData.selectedInstructorIds.length}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {formData.selectedInstructorIds.map((id) => {
                          const instructor = mockInstructorSignatures.find(s => s.id === id)
                          return instructor ? (
                            <Badge key={id} variant="secondary" className="bg-teal-100 text-teal-800">
                              {instructor.fullName}
                            </Badge>
                          ) : null
                        })}
                      </div>
                    </div>
                  )}

                  {/* Informação sobre cadastro */}
                  <div className="bg-amber-50 border border-amber-200 rounded p-4">
                    <p className="text-sm text-amber-900">
                      <strong>Dica:</strong> Para cadastrar novos instrutores ou responsáveis técnicos,
                      acesse o menu <strong>Painel {">"} Assinaturas</strong>.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === "mensagens" && (
              <Card>
                <CardHeader>
                  <CardTitle>Mensagens do Treinamento</CardTitle>
                  <CardDescription>Configure mensagens automáticas e emails</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Esta funcionalidade será implementada em breve...</p>
                </CardContent>
              </Card>
            )}

            {activeSection === "publicar" && (
              <Card>
                <CardHeader>
                  <CardTitle>Status de Publicação</CardTitle>
                  <CardDescription>Gerencie a visibilidade do treinamento para os alunos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Status atual */}
                  <div className={cn(
                    "flex items-center justify-between p-4 rounded-lg border",
                    formData.isPublished 
                      ? "bg-green-50 border-green-200" 
                      : "bg-gray-50 border-gray-200"
                  )}>
                    <div>
                      <p className="font-medium text-neutral-800">Status Atual</p>
                      <p className="text-sm text-muted-foreground">
                        {formData.isPublished 
                          ? "Este treinamento está visível para os alunos"
                          : "Este treinamento está oculto (rascunho)"
                        }
                      </p>
                    </div>
                    <Badge
                      variant={formData.isPublished ? "default" : "secondary"}
                      className={
                        formData.isPublished 
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                      }
                    >
                      {formData.isPublished ? "Publicado" : "Rascunho"}
                    </Badge>
                  </div>

                  {/* Avisos */}
                  {!formData.isPublished && (
                    <div className="bg-amber-50 border border-amber-200 rounded p-4">
                      <p className="text-sm text-amber-900">
                        <strong>Atenção:</strong> Certifique-se de revisar todas as informações antes de publicar.
                        Verifique se os módulos, aulas e instrutores estão corretamente configurados.
                      </p>
                    </div>
                  )}

                  {formData.isPublished && (
                    <div className="bg-red-50 border border-red-200 rounded p-4">
                      <p className="text-sm text-red-900">
                        <strong>Cuidado:</strong> Ao despublicar, os alunos não poderão mais acessar este treinamento
                        na vitrine. Alunos já matriculados continuarão com acesso.
                      </p>
                    </div>
                  )}

                  {/* Botão de ação */}
                  {formData.isPublished ? (
                    <Button 
                      onClick={togglePublishStatus}
                      variant="outline"
                      className="w-full border-red-300 text-red-700 hover:bg-red-50 bg-transparent" 
                      size="lg"
                    >
                      <X className="h-5 w-5 mr-2" />
                      Despublicar Treinamento
                    </Button>
                  ) : (
                    <Button 
                      onClick={togglePublishStatus}
                      className="w-full bg-teal-600 hover:bg-teal-700" 
                      size="lg"
                    >
                      <Upload className="h-5 w-5 mr-2" />
                      Publicar Treinamento
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>

      {/* Modal de confirmação de exclusão de módulo/item */}
      <AlertDialog open={!!itemToDelete} onOpenChange={() => setItemToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tem certeza que deseja excluir?</AlertDialogTitle>
            <AlertDialogDescription>
              {itemToDelete?.itemId 
                ? "Este item será removido permanentemente do módulo."
                : "Este módulo e todos os seus itens serão removidos permanentemente."
              }
              {" "}Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (itemToDelete) {
                  if (itemToDelete.itemId) {
                    deleteItem(itemToDelete.sectionId, itemToDelete.itemId)
                  } else {
                    deleteSection(itemToDelete.sectionId)
                  }
                }
              }}
              className="bg-red-600 hover:bg-red-700"
            >
              Sim, excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

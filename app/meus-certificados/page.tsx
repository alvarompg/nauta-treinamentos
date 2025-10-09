"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { mockUserCertificates, type UserCertificate } from "@/lib/data"
import { Award, Download, Eye } from "lucide-react"

export default function MeusCertificadosPage() {
  // In a real app, fetch user's certificates
  const userCertificates: UserCertificate[] = mockUserCertificates

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-12 md:py-16 bg-slate-50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <Award className="h-8 w-8 text-teal-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-800">Meus Certificados</h1>
          </div>

          {userCertificates.length === 0 ? (
            <div className="text-center py-10">
              <Award className="h-24 w-24 text-slate-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-neutral-700 mb-2">Nenhum certificado encontrado</h2>
              <p className="text-neutral-500 mb-6">Conclua seus cursos para obter seus certificados aqui.</p>
              <Button asChild className="bg-teal-600 hover:bg-teal-700">
                <Link href="/meus-cursos">Ver Meus Cursos</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userCertificates.map((cert) => (
                <Card key={cert.id} className="shadow-lg rounded-xl">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Award className="h-7 w-7 text-amber-500" />
                      <CardTitle className="text-xl font-semibold text-neutral-800">{cert.courseName}</CardTitle>
                    </div>
                    <CardDescription>Emitido em: {cert.issueDate}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-neutral-600">
                      Este certificado comprova sua conclusão e proficiência no curso.
                    </p>
                  </CardContent>
                  <CardFooter className="gap-3">
                    <Button asChild variant="outline" className="flex-1">
                      <Link href={cert.downloadUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4" /> Download PDF
                      </Link>
                    </Button>
                    <Button asChild className="flex-1 bg-teal-600 hover:bg-teal-700">
                      <Link href="#">
                        {" "}
                        {/* Link to a viewer page or same as download */}
                        <Eye className="mr-2 h-4 w-4" /> Ver Certificado
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

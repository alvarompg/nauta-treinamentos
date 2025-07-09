"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Navbar from "@/components/layout/navbar"
import Footer from "@/components/layout/footer"
import { mockCartItems, type CartItem } from "@/lib/data"
import { Trash2, ShoppingCart, ChevronRight } from "lucide-react"

export default function CarrinhoPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems)

  const total = cartItems.reduce((sum, item) => sum + item.priceValue * item.quantity, 0)

  const handleRemoveItem = (itemId: string) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== itemId))
    // In a real app, also update backend/localStorage
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-12 md:py-16 bg-slate-50">
        <div className="container">
          <div className="flex items-center gap-3 mb-8">
            <ShoppingCart className="h-8 w-8 text-teal-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-800">Meu Carrinho</h1>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-10">
              <ShoppingCart className="h-24 w-24 text-slate-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-neutral-700 mb-2">Seu carrinho está vazio</h2>
              <p className="text-neutral-500 mb-6">Adicione cursos ao seu carrinho para vê-los aqui.</p>
              <Button asChild className="bg-teal-600 hover:bg-teal-700">
                <Link href="/cursos">Explorar Cursos</Link>
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2">
                <Card className="shadow-lg">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px] hidden md:table-cell">Imagem</TableHead>
                          <TableHead>Curso</TableHead>
                          <TableHead className="text-right">Preço</TableHead>
                          <TableHead className="text-center">Ação</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {cartItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="hidden md:table-cell">
                              <Image
                                src={item.imageUrl || "/placeholder.svg"}
                                alt={item.name}
                                width={80}
                                height={50}
                                className="rounded-md object-cover"
                              />
                            </TableCell>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell className="text-right">{item.price}</TableCell>
                            <TableCell className="text-center">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleRemoveItem(item.id)}
                                aria-label="Remover item"
                              >
                                <Trash2 className="h-5 w-5" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-1">
                <Card className="shadow-lg sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-xl">Resumo do Pedido</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal ({cartItems.length} itens)</span>
                      <span>R$ {total.toFixed(2).replace(".", ",")}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>R$ {total.toFixed(2).replace(".", ",")}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button size="lg" className="w-full bg-amber-500 hover:bg-amber-600 text-neutral-900">
                      Finalizar Compra <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

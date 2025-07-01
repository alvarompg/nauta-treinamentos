// Componente Footer: Representa o rodapé do site.
// Contém links de navegação, informações de contato, links para redes sociais
// e informações de direitos autorais.
import Link from "next/link"
import { AnchorIcon, Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contato" className="bg-slate-800 text-slate-300 py-12 md:py-16">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <AnchorIcon className="h-8 w-8 text-teal-500" />
              <span className="text-2xl font-bold text-white">
                Nauta<span className="text-slate-300">Treinamentos</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400">
              Capacitando profissionais para os desafios do setor offshore com excelência e segurança.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-teal-400 transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/cursos" className="hover:text-teal-400 transition-colors">
                  Cursos
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="hover:text-teal-400 transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link href="/#depoimentos" className="hover:text-teal-400 transition-colors">
                  Depoimentos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contato</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-teal-500" />
                <a href="mailto:contato@nautatreinamentos.com.br" className="hover:text-teal-400 transition-colors">
                  contato@nautatreinamentos.com.br
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-teal-500" />
                <a href="tel:+5521999998888" className="hover:text-teal-400 transition-colors">
                  +55 (21) 99999-8888
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-teal-500" />
                <span>Rio de Janeiro, RJ - Brasil</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Siga-nos</h3>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Facebook" className="text-slate-400 hover:text-teal-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label="Instagram" className="text-slate-400 hover:text-teal-400 transition-colors">
                <Instagram className="h-6 w-6" />
              </Link>
              <Link href="#" aria-label="LinkedIn" className="text-slate-400 hover:text-teal-400 transition-colors">
                <Linkedin className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8 text-center text-sm text-slate-400">
          <p>&copy; {currentYear} Nauta Treinamentos. Todos os direitos reservados.</p>
          <p className="mt-1">
            Desenvolvido com <span className="text-red-500">&hearts;</span> pela IA da Vercel
          </p>
        </div>
      </div>
    </footer>
  )
}

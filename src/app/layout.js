import { Lato } from 'next/font/google'

import '@/styles/globals.css'
import { AuthProvider } from '@/context/AuthProvider'
import { CarritoProvider } from '@/context/CarritoProvider'

const lato = Lato({
  subsets: ['latin'],
  weight: ["400", "700", '900'],
  display: "swap"
})

export const metadata = {
  title: 'Tecnoconsultores - Inicio',
  description: 'Tienda virtual de equipos de computo, servidores',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={lato.className}>
        <AuthProvider>
          <CarritoProvider>{children}</CarritoProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

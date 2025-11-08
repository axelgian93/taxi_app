import '@/src/styles/globals.css'
import React from 'react'
import dynamic from 'next/dynamic'

const ClientShell = dynamic(() => import('@/src/components/ClientShell'), { ssr: false })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  )
}


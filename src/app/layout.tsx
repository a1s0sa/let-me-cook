import type { Metadata } from 'next'
import { Toaster } from 'sonner'
import { Analytics } from "@vercel/analytics/react"
import { Quicksand, Pacifico } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import './globals.css'

const quicksand = Quicksand({ subsets: ['latin'] })
const pacifico = Pacifico({
    weight: '400',
    subsets: ['latin'],
    variable: '--pacifico',
})

export const metadata: Metadata = {
    title: 'Let me Cook',
    icons: 'https://let-me-coook.vercel.app/robo-chef.png',
    description:
        'An AI-powered recipe generator that cooks up with creative recipes, with available ingredients.',
    openGraph: {
        type: 'website',
        url: 'https://let-me-coook.vercel.app',
        siteName: 'Let me Cook',
        images: 'https://let-me-coook.vercel.app/robo-chef.png',
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body
                className={`${quicksand.className} ${pacifico.variable} antialiased max-w-[1024px] mx-auto`}
            >
                <Header />
                {children}
                <Toaster position="top-center" />
                <Footer />
                <Analytics />
            </body>
        </html>
    )
}

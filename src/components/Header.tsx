'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
    const pathName = usePathname()
    console.log(pathName)
    return (
        <header>
            <Link
                href="/"
                className="flex shadow-md justify-center gap-2 p-2 items-center"
            >
                <Image
                    src="/robo-chef.png"
                    alt="robo-chef"
                    width={50}
                    height={50}
                />
                <h1 className="font-bold text-xl">Let me cook</h1>
            </Link>
        </header>
    )
}

import Image from 'next/image'

export default function Header() {
    return (
        <header className="flex shadow-md justify-center gap-2 p-2 items-center">
            <Image
                src="/robo-chef.png"
                alt="robo-chef"
                width={50}
                height={50}
            />

            <h1 className="font-bold text-xl">Let me cook</h1>
        </header>
    )
}

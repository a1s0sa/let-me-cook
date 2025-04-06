import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="min-h-[80svh] gap-2 bg-[#f1e6d4] flex flex-col items-center justify-center outline">
            <Image
                src="/robo-chef.png"
                alt="Robot Chef"
                width={50}
                height={50}
                className="w-36 h-36"
            />
            <h1 className="text-6xl font-bold text-[#5e503f]">404</h1>
            <p className="text-2xl text-[#5e503f] font-medium">
                {"Uh-oh! The recipe you're looking for isn't in the cookbook."}
            </p>
            <p className="text-[#5e503f] max-w-md">
                {"Our robot chef looked everywhere but couldn't find this page."}
                Try heading back to the kitchen.
            </p>
            <Link href="/">
                <button className="bg-[#f4a261] hover:bg-[#e76f51] flex text-[#5e503f] font-semibold rounded-xl items-center px-6 py-3">
                    <ArrowLeft className="h-5 w-5" /> Go back home
                </button>
            </Link>
        </div>
    )
}

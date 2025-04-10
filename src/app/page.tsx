import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
    return (
        <>
            <section className="flex flex-col items-center justify-center gap-5 text-center py-10 px-4">
                <h1 className="cta text-5xl md:text-6xl font-bold">
                    Home-Cooked Magic
                </h1>
                <p className="text-lg md:text-xl max-w-xl text-[#5C4A3C]">
                    Discover and generate delicious recipes with the ingredients
                    you already have.
                </p>
                <Link href="/app">
                    <button className="font-bold flex items-center bg-[#A37C40] text-white hover:bg-[#8a6836] px-6 py-3 text-lg rounded-2xl shadow-lg">
                        Get Cooking <ArrowRight />
                    </button>
                </Link>
            </section>

            {/* Features */}
            <section className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
                <div className="bg-white p-6 rounded-2xl shadow-md text-left">
                    <h3 className="text-xl font-semibold mb-2 text-[#3E2C1C]">
                        Smart Ingredient Input
                    </h3>
                    <p className="text-[#5C4A3C]">
                        Tell us what you have — we’ll tell you what you can
                        make.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md text-left">
                    <h3 className="text-xl font-semibold mb-2 text-[#3E2C1C]">
                        Recipe Variations
                    </h3>
                    <p className="text-[#5C4A3C]">
                        Get multiple recipe options, from classic to creative,
                        all personalized.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-md text-left">
                    <h3 className="text-xl font-semibold mb-2 text-[#3E2C1C]">
                        Minimal Waste
                    </h3>
                    <p className="text-[#5C4A3C]">
                        Cook with what you have, reduce food waste, and still
                        eat well.
                    </p>
                </div>
            </section>
        </>
    )
}

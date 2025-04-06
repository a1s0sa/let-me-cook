import Recipes from '@/components/Recipe'
import Ingredients from '@/components/Ingredients'
export default function Home() {
    return (
        <main className="p-2 flex flex-col gap-4">
            <p className="text-md font-semibold">
                An AI-powered recipe generator that cooks up with creative
                recipes, with available ingredients.
            </p>
            <div className="chef flex flex-col md:flex-row gap-4">
                <div className="bg-[#fff1e6] rounded-2xl shadow-md p-6 flex md:w-[47.5%] flex-col gap-6 ingredients">
                    <h2 className={`text-2xl underline`}>Ingredients</h2>
                    <Ingredients />
                </div>
                <div className="bg-[#fff1e6] rounded-2xl shadow-md p-6 recipe md:w-[47.5%] flex flex-col gap-4">
                    <h2 className={`text-2xl underline`}>Recipes</h2>
                    <Recipes />
                </div>
            </div>
        </main>
    )
}

'use client'
import { Recipes } from '@/schema/Recipe'
import { v4 as uuid } from 'uuid'
import { useRecipeStore } from '@/store/recipeStore'
import { useState } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
export default function RecipesComponent() {
    const { ingredients } = useRecipeStore()
    const [loading, setLoading] = useState(false)
    const [recipes, setRecipes] = useState<Recipes>([])
    async function handleFetch() {
        setLoading(true)
        // const req = IngredientsSchema.safeParse(ingredients)
        const res = await fetch('/api/v1/get-recipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: {
                    ingredients,
                },
            }),
        })
        const {
            data,
        }: {
            data: Recipes
        } = await res.json()

        setRecipes(data)
        setLoading(false)
    }
    return (
        <div className="flex gap-4 flex-col">
            {recipes.length == 0 ? (
                <div className="rounded-xl opacity-50 flex h-[100px] justify-center items-center recipe-placeholder border-[#5e503f] border-[5px] [border-style:dashed]">
                    {loading ? 'Cooking...' : 'The ingredients, pronto!'}
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex flex-col gap-4"
                >
                    {recipes.map((recipe, i) => {
                        return (
                            <div
                                className="pb-4 border-opacity-50 border-[#5e503f] border-b-4 [border-style:dashed] font-medium"
                                key={i}
                            >
                                <h3 className="text-xl recipe--name">
                                    {recipe.name}
                                </h3>
                                <h4>
                                    <span className="font-bold">
                                        Desciption:{' '}
                                    </span>{' '}
                                    {recipe.description}
                                </h4>
                                <h4>
                                    <span className="font-bold">
                                        Servings:{' '}
                                    </span>{' '}
                                    {recipe.servings}
                                </h4>
                                <h4>
                                    <span className="font-bold">Time: </span>{' '}
                                    {recipe.time}
                                </h4>
                                <ul className="list-disc list-inside">
                                    <h4 className="font-bold text-lg">
                                        Ingredients
                                    </h4>
                                    {recipe.ingredients.map((ingredient, i) => {
                                        return (
                                            <li key={i}>
                                                {ingredient.quantity}{' '}
                                                {ingredient.name}
                                            </li>
                                        )
                                    })}
                                </ul>
                                <ol className="list-decimal list-inside">
                                    <h4 className="font-bold text-lg">
                                        Instructions
                                    </h4>
                                    {recipe.instructions.map(
                                        ({ instruction }) => {
                                            return (
                                                <li key={uuid()}>
                                                    {instruction}
                                                </li>
                                            )
                                        }
                                    )}
                                </ol>
                            </div>
                        )
                    })}
                </motion.div>
            )}
            <motion.button
                onClick={handleFetch}
                whileTap={{ scale: 1.1 }}
                className="flex justify-center items-center bg-[#f5b96b] text-[#3d2c2a] font-bold p-2 w-4/5 mx-auto rounded"
            >
                Let me cook!
                <Image
                    src="/Man Cook.svg"
                    alt="robo chef"
                    width={25}
                    height={25}
                />
            </motion.button>
        </div>
    )
}

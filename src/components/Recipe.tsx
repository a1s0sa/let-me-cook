'use client'
import { toast } from 'sonner'
import { Recipes } from '@/schema/Recipe'
import clsx from 'clsx'
import { v4 as uuid } from 'uuid'
import Loader from './Loader'
import Carousel from './Carousel'
import { useRecipeStore } from '@/store/recipeStore'
import { useState } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'

type ResType = {
    data: Recipes | string
}

export default function RecipesComponent() {
    const { ingredients } = useRecipeStore()
    const [loading, setLoading] = useState(false)
    const [recipes, setRecipes] = useState<Recipes>([])
    const [recommends, setReccomends] = useState<string[]>([])
    async function handleFetch() {
        setLoading(true)
        setRecipes([])
        await fetch('/api/v1/get-recipe', {
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
            .then(async (res) => {
                const data: ResType = await res.json()
                if (typeof data.data == 'string') {
                    throw new Error(`${data.data}`)
                }
                setRecipes(data.data)

                const temp: string[] = data.data.map((recipe) => {
                    return recipe.youtube_query
                })
                const { recommends } = await fetch('/api/v1/get-recommends', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        queries: temp,
                    }),
                }).then((res) => {
                    if (!res.ok) throw new Error('failed to find recommends')
                    return res.json()
                })

                setReccomends(recommends)
            })
            .catch((err) => {
                toast.error(`${err.message}`, {
                    style: {
                        background: '#f4a261',
                        color: '#5e503f',
                    },
                    duration: 5,
                })
            })

        setLoading(false)
    }
    return (
        <div className="flex gap-4 flex-col">
            {recipes.length == 0 ? (
                <div className="rounded-xl opacity-50 flex h-[100px] justify-center items-center recipe-placeholder border-[#5e503f] border-[5px] [border-style:dashed]">
                    {loading ? 'Cooking...' : 'The ingredients, pronto!'}
                </div>
            ) : (
                <div className="results flex flex-col gap-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className={clsx(
                            'flex flex-col gap-4',
                            loading && 'opacity-50'
                        )}
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
                                        <span className="font-bold">
                                            Time:{' '}
                                        </span>{' '}
                                        {recipe.time}
                                    </h4>
                                    <ul className="list-disc list-inside">
                                        <h4 className="font-bold text-lg">
                                            Ingredients
                                        </h4>
                                        {recipe.ingredients.map(
                                            (ingredient, i) => {
                                                return (
                                                    <li key={i}>
                                                        {ingredient.quantity}{' '}
                                                        {ingredient.name}
                                                    </li>
                                                )
                                            }
                                        )}
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

                    <div className="recommends flex flex-col gap-2">
                        <h3 className="text-xl underline">Video recommends</h3>
                        {recommends.length !== 0 ? (
                            <Carousel>
                                {recommends.map((recommend, i) => {
                                    return (
                                        <iframe
                                            key={i}
                                            className="w-full"
                                            height="315"
                                            src={`https://www.youtube.com/embed/${recommend}?si=jufzVqIbxd3AFa7R`}
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        />
                                    )
                                })}
                            </Carousel>
                        ) : (
                            <Loader />
                        )}
                    </div>
                </div>
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

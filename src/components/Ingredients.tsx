'use client'
import IngredientItem from './IngredientItem'
import clsx from "clsx"
import { toast } from 'sonner'
import { v4 as uuid } from 'uuid'
import { motion } from 'motion/react'
import { useRecipeStore } from '@/store/recipeStore'

export default function Ingredients() {
    const { ingredients, setIngredients } = useRecipeStore()
    function addIngredient() {
        const temp = [...ingredients]
        const newItem = {
            name: '',
            quantity: '',
            id: uuid(),
        }

        toast.success('Added new ingredient!', {
            style: {
                background: '#f4a261',
                color: '#5e503f',
            },
        })
        setIngredients([...temp, newItem])
    }
    return (
        <div className="flex flex-col gap-3">
            {ingredients.map((ingredient, i) => {
                return (
                    <IngredientItem key={i} index={i} ingredient={ingredient} />
                )
            })}
            <motion.button
                whileTap={{ scale: 1.1 }}
                onClick={addIngredient}
                className={clsx("bg-[#f5b96b] text-[#3d2c2a] font-bold p-2 w-4/5 mx-auto rounded")}
            >
                Add ingredient
            </motion.button>
        </div>
    )
}

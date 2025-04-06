'use client'
import { Ingredient } from '@/schema/Ingredients'
import { useRecipeStore } from '@/store/recipeStore'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { motion, AnimatePresence } from 'motion/react'
type Props = {
    ingredient: Ingredient
    index: number
}

export default function IngredientItem({
    ingredient: { name, quantity },
    index,
}: Props) {
    const { setIngredients, ingredients } = useRecipeStore()
    function handleChange(target: HTMLInputElement) {
        const { name, value } = target
        const temp = [...ingredients]
        temp[index] = {
            ...temp[index],
            [name]: value,
        }

        setIngredients(temp)
    }

    function deleteItem() {
        const temp = [...ingredients]
        const newState = temp.filter((ingre) => temp[index].id !== ingre.id)

        toast.success('Removed ingredient!', {
            style: {
                background: '#f4a261',
                color: '#5e503f',
            },
        })
        setIngredients(newState)
    }
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10, transition: { delay: 0.5 } }}
                transition={{ delay: 0.1 }}
                className="flex justify-between"
            >
                <input
                    type="number"
                    name="quantity"
                    onChange={({ target }) => handleChange(target)}
                    value={quantity}
                    className="text-bold p-2 w-[15%] rounded"
                    placeholder="Quantity"
                />
                <input
                    type="text"
                    value={name}
                    onChange={({ target }) => handleChange(target)}
                    name="name"
                    className="w-[70%] text-bold p-2 rounded"
                    placeholder="Ingredient name rounded"
                />
                <button
                    onClick={deleteItem}
                    className="w-[10%] text-bold roounded"
                >
                    <Trash2 color="#f5b96b" width={30} height={30} />
                </button>
            </motion.div>
        </AnimatePresence>
    )
}

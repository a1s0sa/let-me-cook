import { create } from 'zustand'
import { v4 as uuid } from 'uuid'
import { Ingredients } from '@/schema/Ingredients'

type RecipeStore = {
    ingredients: Ingredients
    setIngredients: (newState: Ingredients) => void
}

export const useRecipeStore = create<RecipeStore>((set) => ({
    ingredients: [
        { name: 'eggs', quantity: '2', id: uuid() },
        { name: '', quantity: '', id: uuid() },
    ],
    setIngredients: (newState) => set({ ingredients: newState }),
}))

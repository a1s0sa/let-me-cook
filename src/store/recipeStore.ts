import { create } from 'zustand'
import { Ingredients } from '@/schema/Ingredients'

type RecipeStore = {
    ingredients: Ingredients
    setIngredients: (newState: Ingredients) => void
}

export const useRecipeStore = create<RecipeStore>((set) => ({
    ingredients: [
        { name: 'eggs', quantity: '2', id: 1 },
        { name: '', quantity: '', id: 2 },
    ],
    setIngredients: (newState) => set({ ingredients: newState }),
}))

import { z } from 'zod'

export const IngredientSchema = z.object({
    name: z.string().min(2),
    quantity: z.string().min(1),
    id: z.string(),
})

export const IngredientsSchema = z
    .object({
        name: z.string().min(2),
        quantity: z.string().min(1),
        id: z.string(),
    })
    .array()

export type Ingredients = z.infer<typeof IngredientsSchema>
export type Ingredient = z.infer<typeof IngredientSchema>

import { z } from 'zod'

export const IngredientSchema = z.object({
    name: z.string(),
    quantity: z.string(),
    id: z.number(),
})

export const IngredientsSchema = z
    .object({
        name: z.string(),
        quantity: z.string(),
        id: z.number(),
    })
    .array()

export type Ingredients = z.infer<typeof IngredientsSchema>
export type Ingredient = z.infer<typeof IngredientSchema>

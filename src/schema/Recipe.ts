import { z } from 'zod'

export const RecipeSchema = z.object({
    name: z.string(),
    description: z.string(),
    servings: z.string(),
    time: z.string(),
    ingredients: z.array(
        z.object({
            name: z.string(),
            quantity: z.number(),
        })
    ),
    instructions: z.array(
        z.object({
            instruction: z.string(),
        })
    ),
})

export const RecipesSchema = z
    .object({
        name: z.string(),
        description: z.string(),
        servings: z.string(),
        time: z.string(),
        ingredients: z.array(
            z.object({
                name: z.string(),
                quantity: z.number(),
            })
        ),
        instructions: z.array(
            z.object({
                instruction: z.string(),
            })
        ),
    })
    .array()

export type Recipes = z.infer<typeof RecipesSchema>
export type Recipe = z.infer<typeof RecipeSchema>

import { type NextRequest, NextResponse } from 'next/server'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { generateObject } from 'ai'
import { RecipeSchema } from '@/schema/Recipe'
import { Ingredients, IngredientSchema } from '@/schema/Ingredients'

const google = createGoogleGenerativeAI({
    apiKey: process.env.KEY,
})

type PostData = {
    data: {
        ingredients: Ingredients
    }
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function POST(req: NextRequest) {
    const { data }: PostData = await req.json()

    const parsedIngredients = IngredientSchema.safeParse(data.ingredients[0])

    if (!parsedIngredients.success) {
        return NextResponse.json({ data: 'put some ingredients bruh' })
    }

    const { object } = await generateObject({
        model: google('gemini-2.0-flash-001'),
        schema: RecipeSchema,
        output: 'array',
        system: `
            You are a 5-star chef specializing in creating delicious, practical recipes. When given a list of ingredients, you will create 2 to 3 high-quality recipes. Use only the provided ingredients and optionally add up to 2 or 3 common pantry items per recipe if needed. At least one recipe should use only the given ingredients or as close to that as possible. Keep recipes realistic and clear. At the end of your response, include a concise YouTube search query in plain text, based on the ingredients and recipe type, to help find similar videos.
        `,
        prompt: `
             Make 2–3 recipes using only these ingredients: ${data.ingredients.map(
                 ({ name, quantity }) => {
                     return `${quantity} ${Number(quantity) > 1 ? name + 's' : name},`
                 }
             )}. You may add at most 2–3 extra common ingredients if needed, but at least one recipe should strictly stick to what's provided. I also want you to 
        `,
    })

    return NextResponse.json({
        data: object,
    })
}

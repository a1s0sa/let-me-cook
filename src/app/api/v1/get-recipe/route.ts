import { type NextRequest, NextResponse } from 'next/server'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { generateObject } from 'ai'
import { RecipeSchema } from '@/schema/Recipe'
import { Ingredients } from '@/schema/Ingredients'
import { z } from 'zod'

const google = createGoogleGenerativeAI({
    apiKey: process.env.KEY,
})

type PostData = {
    data: {
        ingredients: Ingredients
    }
}
export async function POST(req: NextRequest) {
    const {
        data: { ingredients },
    }: PostData = await req.json()

    const { object } = await generateObject({
        model: google('gemini-2.0-flash-001'),
        schema: RecipeSchema,
        output: 'array',
        system: `
            You are a 5-star chef specializing in creating delicious, practical recipes. When given a list of ingredients, you will create 2 to 3 high-quality recipes. Use only the provided ingredients and optionally add up to 2 or 3 common pantry items per recipe if needed. At least one recipe should use only the given ingredients or as close to that as possible. Keep recipes realistic and clear.
        `,
        prompt: `
             Make 2–3 recipes using only these ingredients: ${ingredients.map(
                 ({ name, quantity }) => {
                     return `${quantity} ${Number(quantity) > 1 ? name + 's' : name},`
                 }
             )}. You may add at most 2–3 extra common ingredients if needed, but at least one recipe should strictly stick to what's provided. 
        `,
    })

    return NextResponse.json({
        data: object,
    })
}

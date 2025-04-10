import { NextRequest, NextResponse } from 'next/server'
import { fetchYoutube } from '@/lib/fetchVideos'

type PostData = {
    queries: string[]
}

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function POST(req: NextRequest) {
    const { queries }: PostData = await req.json()

    try {
        const res = await fetchYoutube(queries)
            .then((res) => res)
            .catch((err) => {
                throw new Error(`${err}`)
            })

        return NextResponse.json({
            recommends: res,
        })
    } catch (error) {
        return NextResponse.json(
            { message: 'failed to fetch' },
            { status: 400 }
        )
    }
}

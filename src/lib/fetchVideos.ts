export async function fetchYoutube(queries: string[]): Promise<string[]> {
    const maxResults = 1
    try {
        const reqPromises = queries.map((query) =>
            fetch(
                `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&q=${encodeURIComponent(query)}&type=video&key=${process.env.YOUTUBE_V3_KEY!}`
            ).then(async (res) => {
                if (!res.ok)
                    throw new Error(`Failed to fetch yunno${res.status}`);
                return res.json().then((res) => res.items[0].id.videoId)
            })
        )

        const recommendss = await Promise.all(reqPromises)
        return recommendss
    } catch (err) {
        throw new Error(`${err}`)
    }
}

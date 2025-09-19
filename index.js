addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const path = url.searchParams.get('path') // e.g., movie/popular
  const language = url.searchParams.get('language') || 'en'
  const page = url.searchParams.get('page') || 1

  const tmdbApiKey = '410692947e4353d68c7faa660d7ed023'

  const tmdbUrl = `https://api.themoviedb.org/3/${path}?api_key=${tmdbApiKey}&language=${language}&page=${page}`

  try {
    const response = await fetch(tmdbUrl)
    const data = await response.json()
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      status: 500
    })
  }
}

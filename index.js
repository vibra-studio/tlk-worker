addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const path = url.searchParams.get('path') // e.g., movie/popula
  const language = url.searchParams.get('language') || 'en'
  const page = url.searchParams.get('page') || 1

  const tmdbUrl = `https://api.themoviedb.org/3/${path}?language=${language}&page=${page}`

  try {
    const response = await fetch(tmdbUrl, {
      headers: {
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MTA2OTI5NDdlNDM1M2Q2OGM3ZmFhNjYwZDdlZDAyMyIsIm5iZiI6MTcxMDU2MTQwMS4zNTAwMDAxLCJzdWIiOiI2NWY1MTg3OWUwMzlmMTAxN2QwMmZmM2QiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.u-zbWauZLgbDLY2v4hEufNYaczuFts4bFdGS38cvL5o",
        accept: "application/json"
      }
    })
    const data = await response.json()
    return new Response(JSON.stringify(data), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' 
      }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*' 
      },
      status: 500
    })
  }
}

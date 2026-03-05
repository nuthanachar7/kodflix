const RAPIDAPI_HOST = 'netflix54.p.rapidapi.com'

function getRapidApiKey() {
  const key = import.meta.env.VITE_RAPIDAPI_KEY
  return typeof key === 'string' ? key.trim() : key
}

/**
 * Fetch season episodes from Netflix54 RapidAPI.
 * @param {string} ids - Comma-separated episode IDs (e.g. '80077209,80117715')
 * @param {object} options - { offset: number, limit: number, lang: string }
 * @returns {Promise<object>} API response
 */
export async function getSeasonEpisodes(ids, options = {}) {
  const key = getRapidApiKey()
  if (!key) throw new Error('Missing VITE_RAPIDAPI_KEY in .env')

  const { offset = 0, limit = 25, lang = 'en' } = options
  const params = new URLSearchParams({
    ids: String(ids),
    offset: String(offset),
    limit: String(limit),
    lang,
  })
  const url = `https://${RAPIDAPI_HOST}/season/episodes/?${params}`

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': RAPIDAPI_HOST,
      'x-rapidapi-key': key,
    },
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Netflix54 API error: ${res.status} ${text}`)
  }
  return res.json()
}

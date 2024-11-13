import { BASE_URL, fetcher } from "./utils"

class CortexAPI {
  private BASE_URL: string

  constructor() {
    this.BASE_URL = BASE_URL
  }

  async getEvents(): Promise<any> {
    const response = await fetcher(`${this.BASE_URL}/api/farcaster/events`)
    if (!response.ok) throw new Error('Failed to fetch Farcaster events')
    const json = await response.json()
    return json
  }

  async getFarcasterUser(username: string): Promise<any> {
    const response = await fetcher(`${this.BASE_URL}/api/farcaster/user?username=${username}`)
    if (!response.ok) throw new Error('Failed to fetch Farcaster user data')
    const json = await response.json()
    return json.result
  }

  async getWeather(latitude: number, longitude: number): Promise<any> {
    const response = await fetcher(`${this.BASE_URL}/api/weather?latitude=${latitude}&longitude=${longitude}`)
    if (!response.ok) throw new Error('Failed to fetch weather forecast data')
    const json = await response.json()
    return json
  }

  async webSearch(
    query: string,
    maxResults: number = 10,
    searchDepth: 'basic' | 'advanced' = 'basic',
    includeDomains: string[] = [],
    excludeDomains: string[] = []
  ): Promise<any> {
    const response = await fetcher(
      `${this.BASE_URL}/api/search?query=${encodeURIComponent(query)}&maxResults=${maxResults}&searchDepth=${searchDepth}&includeDomains=${includeDomains.join(",")}&excludeDomains=${excludeDomains.join(",")}`
    )
    if (!response.ok) throw new Error('Failed to perform web search')
    const json = await response.json()
    return json
  }
}

export default CortexAPI
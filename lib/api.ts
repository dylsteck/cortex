import { BASE_URL, fetcher } from "./utils"

class CortexAPI {
  private BASE_URL: string

  constructor() {
    this.BASE_URL = BASE_URL
  }

  async getFarcasterUser(username: string): Promise<any> {
    const response = await fetcher(`${this.BASE_URL}/api/farcaster/user?username=${username}`)
    if (!response.ok) throw new Error('Failed to fetch Farcaster user data')
    const json = response.json();
    return json.result;
  }
}

export default CortexAPI
import { BASE_URL } from "./utils"

class CortexAPI {
  private BASE_URL: string

  constructor() {
    this.BASE_URL = BASE_URL
  }

  async castSearch(query: string): Promise<any> {
    const response = await fetch(`${this.BASE_URL}/api/farcaster/cast/search?q=${query}`)
    if (!response.ok) throw new Error('Failed to perform cast search')
    const json = await response.json()
    return json
  }

  async getClankerTrendingTokens(): Promise<any>{
    const response = await fetch(`${this.BASE_URL}/api/clanker/tokens/trending`)
    if (!response.ok) throw new Error('Failed to fetch Clanker trending tokens')
    const json = await response.json();
    return json
  }

  async getClankerTokens(page?: number): Promise<any>{
    const response = await fetch(`${this.BASE_URL}/api/clanker/tokens${page ? `?page=${page}` : ''}`)
    if (!response.ok) throw new Error('Failed to fetch Clanker tokens')
    const json = await response.json();
    return json
  }

  async getEvent(id?: string, name?: string): Promise<any> {
    if ((!id && !name) || (id && name)) throw new Error('Provide either id or name')
    if (id) {
      const response = await fetch(`${this.BASE_URL}/api/farcaster/event/${id}`)
      if (!response.ok) throw new Error('Failed to fetch Farcaster event')
      return response.json()
    }
    const eventsResponse = await fetch(`${this.BASE_URL}/api/farcaster/events`)
    if (!eventsResponse.ok) throw new Error('Failed to fetch Farcaster events')
    const events = await eventsResponse.json()
    const event = events.find((e: any) => e.title === name)
    if (!event) throw new Error('Event not found')
    return event;
  }

  async getEvents(): Promise<any> {
    const response = await fetch(`${this.BASE_URL}/api/farcaster/events`)
    if (!response.ok) throw new Error('Failed to fetch Farcaster events')
    const json = await response.json();
    return json
  }

  async getEventsByChannel(name: string): Promise<any> {
    if (!name || name.length === 0) {
      throw new Error("Channel name is required");
    }
    const response = await fetch(`${this.BASE_URL}/api/farcaster/events/channel/${name}`)
    if (!response.ok) throw new Error('Failed to fetch Farcaster events')
    const json = await response.json();
    return json
  }

  async getFarcasterUser(username: string): Promise<any> {
    const response = await fetch(`${this.BASE_URL}/api/farcaster/user?username=${username}`)
    if (!response.ok) throw new Error('Failed to fetch Farcaster user data')
    const json = await response.json()
    return json.result.user
  }

  async getFarcasterUsersByLocation(latitude: number, longitude: number, viewer_fid?: number, limit: number = 25): Promise<any> {
    const url = new URL(`${this.BASE_URL}/api/user/by_location`);
    url.searchParams.append("latitude", latitude.toString());
    url.searchParams.append("longitude", longitude.toString());
    url.searchParams.append("limit", limit.toString());
  
    if (viewer_fid !== undefined) {
      url.searchParams.append("viewer_fid", viewer_fid.toString());
    }
  
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        'accept': 'application/json'
      }
    });
  
    if (!response.ok) {
      throw new Error(`Failed to fetch data from API route: ${response.status}`);
    }
  
    return await response.json();
  }  

  async getFarcasterUserCasts(fid: number): Promise<any> {
    const response = await fetch(`${this.BASE_URL}/api/farcaster/feed/user/casts?fid=${fid}`)
    if (!response.ok) throw new Error('Failed to fetch Farcaster user casts')
    const json = await response.json()
    return json;
  }

  async getFarcasterToken(name: string): Promise<any>{
    if (!name || name.length === 0) {
      throw new Error("Token name is required");
    }
    const response = await fetch(`${this.BASE_URL}/api/farcaster/tokens/${name}`)
    if (!response.ok) throw new Error('Failed to fetch Farcaster token info')
    const json = await response.json();
    return json
  }

  async getFarcasterTokens(): Promise<any>{
    const response = await fetch(`${this.BASE_URL}/api/farcaster/tokens`)
    if (!response.ok) throw new Error('Failed to fetch Farcaster tokens')
    const json = await response.json();
    return json
  }

  async getIcebreakerCredentialProfiles(credentialName: string, limit: number = 100, offset: number = 3): Promise<any> {
    if (!credentialName || credentialName.length === 0) {
      throw new Error("Credential name is required");
    }
    const response = await fetch(`${this.BASE_URL}/api/icebreaker/credentials?credentialName=${credentialName}&limit=${limit}&offset=${offset}`)
    if (!response.ok) throw new Error('Failed to fetch Icebreaker credential profiles')
    const json = await response.json();
    return json
  }

  async getIcebreakerEnsProfile(ensName: string): Promise<any> {
    if (!ensName || ensName.length === 0) {
      throw new Error("ENS name is required");
    }
    const response = await fetch(`${this.BASE_URL}/api/icebreaker/ens?ensName=${ensName}}`)
    if (!response.ok) throw new Error('Failed to fetch Icebreaker ENS profile')
    const json = await response.json();
    return json
  }

  async getIcebreakerEthAddressProfile(walletAddress: string): Promise<any> {
    if (!walletAddress || walletAddress.length === 0) {
      throw new Error("Wallet address is required");
    }
    const response = await fetch(`${this.BASE_URL}/api/icebreaker/eth?walletAddress=${walletAddress}}`)
    if (!response.ok) throw new Error('Failed to fetch Icebreaker ETH address profile')
    const json = await response.json();
    return json
  }

  async getIcebreakerFidProfile(fid: number): Promise<any> {
    if (!fid || isNaN(fid)) {
      throw new Error("Fid is required and must be a number");
    }
    const response = await fetch(`${this.BASE_URL}/api/icebreaker/fid/${encodeURIComponent(fid)}`)
    if (!response.ok) throw new Error('Failed to fetch Icebreaker FID profile')
    const json = await response.json();
    return json
  }

  async getIcebreakerFnameProfile(fname: string): Promise<any> {
    if (!fname || fname.length === 0) {
      throw new Error("Fname is required");
    }
    const response = await fetch(`${this.BASE_URL}/api/icebreaker/fname/${encodeURIComponent(fname)}`)
    if (!response.ok) throw new Error('Failed to fetch Icebreaker fname profile')
    const json = await response.json();
    return json
  }

  async getIcebreakerProfile(fname?: string, fid?: string): Promise<any> {
    if (!fname && !fid) {
      throw new Error("Either fname or fid must be provided");
    }
    const endpoint = fname ? `/api/icebreaker/fname?fname=${fname}` : `/api/icebreaker/fid?fid=${fid}`;
    const response = await fetch(`${this.BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error('Failed to fetch Icebreaker profile');
    const data = await response.json();
    return data.profiles?.[0] ?? null;
  }

  async getNounsBuilderProposals(contractAddress: string, first?: number, skip?: number): Promise<any> {
    if (!contractAddress || contractAddress.length === 0) {
        throw new Error("Contract address is required");
    }
    const response = await fetch(`${this.BASE_URL}/api/nouns-builder/proposals?contractAddress=${contractAddress}${first ? `&first=${first}` : ''}${skip ? `&skip=${skip}` : ''}`);
    if (!response.ok) throw new Error('Failed to fetch Nouns Builder proposals');
    const json = await response.json();
    return json;
  }

  async getBounties(status: string = "all", eventsSince: string = new Date(new Date(Date.now()).setDate(new Date(Date.now()).getDate() - 10)).toISOString()): Promise<any> {
    const url = new URL(`${this.BASE_URL}/api/farcaster/bounties`);
    url.searchParams.append("status", status);
    url.searchParams.append("eventsSince", eventsSince);
    const response = await fetch(url.toString());
    if (!response.ok) throw new Error('Failed to fetch bounties');
    return response.json();
  }

  async getTrendingCasts(): Promise<any> {
    const response = await fetch(`${this.BASE_URL}/api/farcaster/feed/trending`)
    if (!response.ok) throw new Error('Failed to fetch trending casts')
    const json = await response.json()
    return json
  }

  async getWeather(latitude: number, longitude: number): Promise<any> {
    const response = await fetch(`${this.BASE_URL}/api/weather?latitude=${latitude}&longitude=${longitude}`)
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
    const response = await fetch(
      `${this.BASE_URL}/api/search?query=${encodeURIComponent(query)}&maxResults=${maxResults}&searchDepth=${searchDepth}&includeDomains=${includeDomains.join(",")}&excludeDomains=${excludeDomains.join(",")}`
    )
    if (!response.ok) throw new Error('Failed to perform web search')
    const json = await response.json()
    return json
  }
}

export default CortexAPI
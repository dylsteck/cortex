import { auth } from "@/app/(auth)/auth"
import { authMiddleware, redis } from "@/lib/utils"

export async function GET(request: Request) {
  const session = await auth()
  const authResponse = authMiddleware(session, request.url, request.headers);
  if (authResponse) {
    return authResponse;
  }

  const url = new URL(request.url)
  const latitude = url.searchParams.get("latitude")
  const longitude = url.searchParams.get("longitude")

  if (!latitude || !longitude) {
    return new Response("Latitude and Longitude are required parameters", { status: 400 })
  }

  const cacheKey = `weather:${latitude}:${longitude}`
  let data = await redis.get(cacheKey)

  if (!data) {
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&hourly=temperature_2m&daily=sunrise,sunset&timezone=auto`
    const response = await fetch(apiUrl)
    if (!response.ok) return new Response("Failed to fetch weather data!", { status: response.status })
    data = await response.json()
    await redis.set(cacheKey, JSON.stringify(data), { ex: 60 * 60 })
  } else if (typeof data === "string") {
    data = JSON.parse(data)
  }

  return new Response(JSON.stringify(data), { status: 200 })
}
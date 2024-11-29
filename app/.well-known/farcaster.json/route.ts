import { BASE_URL, ICON_IMG_URL } from "../../../lib/utils";

export async function GET() {
  const config = {
    "accountAssociation": {
      "header": "eyJmaWQiOjYxNiwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDVFNzlGNjkwY2NENDIwMDdENUEwYUQ2NzhDRDQ3NDc0MzM5NDAwRTMifQ",
      "payload": "eyJkb21haW4iOiJ3d3cud2l0aGNvcnRleC5jb20ifQ",
      "signature": "MHg2YjA1ZjMwZGI1NWE5MDU2MmNlNjYwNWFjY2M3OGI0ODAyZWNjZTYyNjc0YjFmZDZkM2E4MmU5YTY1NzllNTgwMjE2NDE0MTExYWIwOTU5ZjJiNjE0YzdlYWNiMWFkY2E1YzljNjBjMTMxNDI3NGU0NzRjOGFkNjQ1NDBmNTJiNzFj"
    },
    frame: {
      version: "0.0.0",
      name: "Cortex",
      iconUrl: ICON_IMG_URL,
      splashImageUrl: ICON_IMG_URL,
      splashBackgroundColor: "#000000",
      homeUrl: BASE_URL,
    },
  };

  return Response.json(config);
}
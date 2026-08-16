import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const cookies = request.cookies.getAll().map(c => ({ name: c.name, value: c.value?.slice(0, 20) }));
  return NextResponse.json({ 
    cookies,
    url: request.url,
    headers: Object.fromEntries(request.headers.entries())
  });
}
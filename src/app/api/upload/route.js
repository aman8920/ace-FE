import { NextRequest, NextResponse } from "next/server"

export async function POST(request) {
  console.log("incoming request")
  const apiBaseUrl = process.env.BACKEND_URL
  const apiUploadUrl = `${apiBaseUrl}/planogram/upload`;
  let body = await request.formData();
  const headers = {
    Authorization: request.headers.get('authorization'),
  }
  
	const response = await fetch(apiUploadUrl, {
    method: "POST",
    headers,
    body,
  });

	const data = await response.json()
	return NextResponse.json({data: data}, { status: response.status })
}

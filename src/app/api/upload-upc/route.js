import { NextRequest, NextResponse } from "next/server"

export async function POST(request) {
  console.log("incoming request")
  const apiBaseUrl = process.env.BACKEND_URL
  const apiUploadUrl = `${apiBaseUrl}/upload-upc`;
  let body = await request.formData();
  const headers = {
    Accept: "*/*",
  };
  
	const response = await fetch(apiUploadUrl, {
    method: "POST",
    headers,
    body,
  });

	const data = await response.json()
	return NextResponse.json({data: data})
}

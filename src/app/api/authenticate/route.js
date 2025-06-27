import { NextRequest, NextResponse } from 'next/server'

export async function GET(request) {
  const apiBaseUrl = process.env.BACKEND_URL
  const apiAuthenticateUrl = `${apiBaseUrl}/users/me`

  console.log(request.headers.get('authorization'))

  const headers = {
    Authorization: request.headers.get('authorization'),
  }
  console.log(headers)
  const response = await fetch(apiAuthenticateUrl, {
    method: 'GET',
    headers,
  })

  const data = await response.json()
  return NextResponse.json({ data: data }, { status: response.status })
}

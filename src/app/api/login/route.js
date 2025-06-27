import { ConstructionOutlined } from '@mui/icons-material'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request) {
  const apiBaseUrl = process.env.BACKEND_URL
  const apiLoginUrl = `${apiBaseUrl}/login`
  let body = await request.formData()
  const headers = {
    Accept: '*/*',
  }

  const response = await fetch(apiLoginUrl, {
    method: 'POST',
    headers,
    body,
  })

  const data = await response.json()
  return NextResponse.json({ data: data }, {status: response.status})
}

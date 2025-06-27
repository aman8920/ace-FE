import { NextRequest, NextResponse } from 'next/server'

export async function GET(request, { params }) {
  console.log("received get request")
  const apiBaseUrl = process.env.BACKEND_URL
  const getPlanogramUrl = `${apiBaseUrl}/planogram/${params.runId}`


  const headers = {
    Authorization: request.headers.get('authorization'),
  }
  console.log(headers)
  const response = await fetch(getPlanogramUrl, {
    method: 'GET',
    headers,
  })

  const data = await response.json()
  return NextResponse.json({ data: data }, { status: response.status })
}


export async function DELETE(request, { params }) {
  console.log("received delete request")
  const apiBaseUrl = process.env.BACKEND_URL
  const getPlanogramUrl = `${apiBaseUrl}/planogram/${params.runId}`


  const headers = {
    Authorization: request.headers.get('authorization'),
  }
  console.log(headers)
  const response = await fetch(getPlanogramUrl, {
    method: 'DELETE',
    headers,
  })

  const data = await response.json()
  return NextResponse.json({ data: data }, { status: response.status })
}

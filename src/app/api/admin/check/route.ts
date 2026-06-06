import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(req: NextRequest) {
  void req
  const cookieStore = await cookies()
  const token = cookieStore.get('tpe_admin')?.value
  const secret = process.env.ADMIN_SECRET

  if (!secret || !token || token !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json({ secret })
}

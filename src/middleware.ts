import { NextRequest, NextResponse, NextFetchEvent } from 'next/server'
import useAuthStore from '@/stores/auth';
import { larafetch } from '@/lib/larafetch'

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  let user = null
  const { setUser } = useAuthStore.getState();
  const origin = process.env.FRONTEND_URL

  try {
    user = await larafetch('/api/user', {
      adapter: "fetch",
      headers: {
        Cookie: request.headers.get('cookie') ?? '',
        referer: request.headers.get('referer') ?? ''
      }
    })
    setUser(user?.data)
  }
  catch (error) {

    if (error?.response?.data?.message === "Unauthenticated") {
      user = null
    }

    else if ([401, 419].includes(error?.response?.status)) {
      user = null
    }

  }

  console.log("user: ", user?.data)

  if (!user && (new URL(request.url).pathname === '/dashboard')) {
    return NextResponse.redirect(origin + '/login');
  }

  if (user && ((new URL(request.url).pathname === '/login' || (new URL(request.url).pathname === '/register')))) {
    return NextResponse.redirect(origin + '/dashboard');
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard',
    '/login',
    '/register',
  ],
}


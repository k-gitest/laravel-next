import { useAuth } from '@/hooks/auth'
import Link from 'next/link'

export default function Navbar()
{
  const { logout } = useAuth()
  
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><a>Link</a></li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/register">Register</Link></li>
                <li><Link href="/login">Login</Link></li>
                <li><button onClick={logout}>Logout</button></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  )
}
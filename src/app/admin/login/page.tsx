'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) {
        const data = await res.json() as { error?: string }
        setError(data.error ?? 'Invalid password')
        return
      }
      // Also store a readable cookie for client-side bearer token use
      document.cookie = `tpe_admin_key=${encodeURIComponent(password)};path=/;max-age=${60 * 60 * 24 * 7};samesite=lax`
      router.push('/admin/site')
    } catch {
      setError('Network error — please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        *,*::before,*::after{box-sizing:border-box}
        body{margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f0f4f8}
        .login-wrap{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:1rem}
        .login-card{background:#fff;border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,.1);padding:2.5rem 2rem;width:100%;max-width:380px}
        .login-logo{font-size:1.1rem;font-weight:700;color:#0d9488;margin-bottom:.25rem}
        .login-title{font-size:1.5rem;font-weight:700;color:#111;margin:0 0 .5rem}
        .login-sub{font-size:.875rem;color:#6b7280;margin:0 0 2rem}
        label{display:block;font-size:.8125rem;font-weight:600;color:#374151;margin-bottom:.375rem}
        input[type=password]{width:100%;padding:.625rem .75rem;border:1.5px solid #d1d5db;border-radius:8px;font-size:.9375rem;outline:none;transition:border .15s}
        input[type=password]:focus{border-color:#0d9488}
        .err{margin:.75rem 0 0;font-size:.8125rem;color:#dc2626;background:#fef2f2;padding:.5rem .75rem;border-radius:6px}
        .btn{margin-top:1.25rem;width:100%;padding:.75rem;background:#0d9488;color:#fff;border:none;border-radius:8px;font-size:.9375rem;font-weight:600;cursor:pointer;transition:background .15s}
        .btn:hover{background:#0f766e}
        .btn:disabled{opacity:.6;cursor:not-allowed}
      `}</style>
      <div className="login-wrap">
        <div className="login-card">
          <div className="login-logo">Taiwan Preschool Exchange</div>
          <h1 className="login-title">Admin Login</h1>
          <p className="login-sub">Enter your admin password to continue.</p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="pw">Password</label>
            <input
              id="pw"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="current-password"
              required
              autoFocus
            />
            {error && <div className="err">{error}</div>}
            <button className="btn" type="submit" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

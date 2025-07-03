'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaLock, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simple authentication (ganti dengan sistem auth yang lebih robust di production)
    if (formData.username === 'admin' && formData.password === 'Kikyrestu089!!!') {
      localStorage.setItem('isAdmin', 'true')
      router.push('/admin')
    } else {
      setError('Invalid username or password')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600/20 rounded-full mb-4">
            <FaLock className="text-purple-400 text-xl" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Admin Login</h1>
          <p className="text-slate-400">Enter your credentials to access the admin panel</p>
        </div>

        {/* Login Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-slate-800/50 p-8 rounded-lg border border-slate-700 space-y-6"
        >
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Username
            </label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg 
                         focus:ring-2 focus:ring-purple-500 focus:border-transparent
                         text-white placeholder-slate-400"
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-12 py-3 bg-slate-700 border border-slate-600 rounded-lg 
                         focus:ring-2 focus:ring-purple-500 focus:border-transparent
                         text-white placeholder-slate-400"
                placeholder="Enter password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 
                     text-white font-medium rounded-lg transition-colors duration-300
                     flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </motion.form>

        {/* Footer */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-slate-400 hover:text-purple-400 transition-colors text-sm"
          >
            ← Back to Portfolio
          </a>
        </div>
      </motion.div>
    </div>
  )
}

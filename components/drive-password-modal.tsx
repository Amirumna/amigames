"use client"

import React, { useState } from "react"
import { X, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface DrivePasswordModalProps {
  open: boolean
  onClose: () => void
  driveSlug: string
  driveName: string
  onSuccess: () => void
}

export default function DrivePasswordModal({ 
  open, 
  onClose, 
  driveSlug, 
  driveName, 
  onSuccess 
}: DrivePasswordModalProps) {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!password.trim()) return

    setLoading(true)
    setError("")

    try {
      const response = await fetch('/api/drive-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          driveSlug,
          password: password.trim()
        })
      })

      const data = await response.json() as { success?: boolean; error?: string; message?: string }

      if (response.ok && data.success) {
        console.log('✅ Authentication successful:', data)
        onSuccess()
        onClose()
        setPassword("")
      } else {
        console.log('❌ Authentication failed:', data)
        setError(data.error || 'Authentication failed')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setPassword("")
    setError("")
    setShowPassword(false)
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="bg-[#23242A] rounded-xl shadow-lg p-6 max-w-md w-full mx-4 relative">
        <button 
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors" 
          onClick={handleClose}
        >
          <X size={24} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-yellow-500/20 rounded-lg">
            <Lock size={24} className="text-yellow-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Enter Password</h2>
            <p className="text-sm text-gray-400">{driveName}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="password" className="text-sm font-medium text-gray-300">
              Password
            </Label>
            <div className="relative mt-1">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter drive password"
                className="pr-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-yellow-400"
                required
                disabled={loading}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <Alert className="border-red-500 bg-red-500/10">
              <AlertDescription className="text-red-300">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 border-gray-700 text-gray-300 hover:bg-gray-800"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black font-medium"
              disabled={loading || !password.trim()}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Authenticating...
                </div>
              ) : (
                'Access Drive'
              )}
            </Button>
          </div>
        </form>

        <div className="mt-4 text-xs text-gray-500 text-center">
          Password is required to access this protected drive
        </div>
      </div>
    </div>
  )
}

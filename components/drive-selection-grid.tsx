"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Folder, Lock, Unlock, Briefcase, User, Globe, Shield, CheckCircle, AlertCircle } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import DrivePasswordModal from "./drive-password-modal"
import { drives } from "@/lib/drives-config"

const iconMap = {
  '📁': Folder,
  '🔒': Lock,
  '💼': Briefcase,
  '👤': User,
  '🌐': Globe
}

export default function DriveSelectionGrid() {
  const router = useRouter()
  const [authenticatedDrives, setAuthenticatedDrives] = useState<string[]>([])
  const [passwordModal, setPasswordModal] = useState<{
    open: boolean
    driveSlug: string
    driveName: string
  }>({ open: false, driveSlug: '', driveName: '' })

  useEffect(() => {
    checkAuthenticationStatus()
  }, [])

  const checkAuthenticationStatus = async () => {
    try {
      const response = await fetch('/api/drive-auth')
      const data = await response.json() as { authenticated: boolean; driveSlug?: string }
      
      if (data.authenticated && data.driveSlug) {
        setAuthenticatedDrives([data.driveSlug])
      }
    } catch (error) {
      console.error('Failed to check authentication:', error)
    }
  }

  const handleDriveClick = (driveSlug: string, driveName: string, requiresPassword: boolean) => {
    if (!requiresPassword) {
      router.push(`/kertas/${driveSlug}`)
    } else {
      if (authenticatedDrives.includes(driveSlug)) {
        router.push(`/kertas/${driveSlug}`)
      } else {
        setPasswordModal({
          open: true,
          driveSlug,
          driveName
        })
      }
    }
  }

  const handlePasswordSuccess = () => {
    const { driveSlug } = passwordModal
    setAuthenticatedDrives(prev => [...prev, driveSlug])
    setPasswordModal({ open: false, driveSlug: '', driveName: '' })
    router.push(`/kertas/${driveSlug}`)
  }

  const getIconComponent = (icon: string) => {
    const IconComponent = iconMap[icon as keyof typeof iconMap] || Folder
    return IconComponent
  }

  const getAccessText = (requiresPassword: boolean, driveSlug: string) => {
    if (!requiresPassword) {
      return "Public Access"
    }
    if (authenticatedDrives.includes(driveSlug)) {
      return "Authenticated"
    }
    return "Password Required"
  }

  const getAccessColor = (requiresPassword: boolean, driveSlug: string) => {
    if (!requiresPassword) {
      return "bg-green-500/20 text-green-400 border-green-500/30"
    }
    if (authenticatedDrives.includes(driveSlug)) {
      return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    }
    return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto">
        {drives.filter(drive => drive.enabled).map((drive) => {
          const IconComponent = getIconComponent(drive.icon)
          const isAuthenticated = authenticatedDrives.includes(drive.slug)
          
          return (
            <Card
              key={drive.slug}
              className="bg-gradient-to-br from-[#23242A] to-[#1a1b20] border-gray-700 hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-400/10 transition-all duration-300 cursor-pointer group relative overflow-hidden"
              onClick={() => handleDriveClick(drive.slug, drive.name, drive.requiresPassword)}
            >
              {/* Subtle background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative p-4 sm:p-6">
                <div className="flex items-start justify-between mb-4 sm:mb-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2 sm:p-3 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl group-hover:from-yellow-500/20 group-hover:to-yellow-600/20 transition-all duration-300 shadow-lg">
                      <IconComponent 
                        size={24} 
                        className={`${drive.requiresPassword ? "text-yellow-400" : "text-blue-400"} sm:w-7 sm:h-7`} 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300 truncate">
                        {drive.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 mt-1 line-clamp-2">{drive.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {drive.requiresPassword ? (
                      isAuthenticated ? (
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                          <CheckCircle size={20} className="text-blue-400" />
                        </div>
                      ) : (
                        <div className="p-2 bg-yellow-500/20 rounded-lg">
                          <Lock size={20} className="text-yellow-400" />
                        </div>
                      )
                    ) : (
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <Globe size={20} className="text-green-400" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-medium text-gray-300">Access Level</span>
                    <Badge 
                      className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium ${getAccessColor(drive.requiresPassword, drive.slug)}`}
                    >
                      {getAccessText(drive.requiresPassword, drive.slug)}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-medium text-gray-300">Authentication</span>
                    <span className="text-xs sm:text-sm text-gray-400 text-right">
                      {drive.requiresPassword ? "Click to enter password" : "No authentication required"}
                    </span>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-medium text-gray-300">Status</span>
                    <div className="flex items-center gap-1 sm:gap-2">
                      {drive.requiresPassword ? (
                        isAuthenticated ? (
                          <div className="flex items-center gap-1 sm:gap-2 text-blue-400">
                            <CheckCircle size={14} className="sm:w-4 sm:h-4" />
                            <span className="text-xs sm:text-sm font-medium">Authenticated</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 sm:gap-2 text-yellow-400">
                            <Lock size={14} className="sm:w-4 sm:h-4" />
                            <span className="text-xs sm:text-sm font-medium">Locked</span>
                          </div>
                        )
                      ) : (
                        <div className="flex items-center gap-1 sm:gap-2 text-green-400">
                          <Globe size={14} className="sm:w-4 sm:h-4" />
                          <span className="text-xs sm:text-sm font-medium">Public</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hover effect indicator */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </div>
            </Card>
          )
        })}
      </div>

      <DrivePasswordModal
        open={passwordModal.open}
        onClose={() => setPasswordModal({ open: false, driveSlug: '', driveName: '' })}
        driveSlug={passwordModal.driveSlug}
        driveName={passwordModal.driveName}
        onSuccess={handlePasswordSuccess}
      />
    </>
  )
}

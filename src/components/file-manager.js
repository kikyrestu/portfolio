'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaUpload, FaTimes, FaImage, FaTrash, FaCheck, FaCopy } from 'react-icons/fa'
import Image from 'next/image'
import { toast } from 'react-hot-toast'

export default function FileManager({ isOpen, onClose, onSelectFile }) {
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedFile, setSelectedFile] = useState(null)

  useEffect(() => {
    if (isOpen) {
      loadFiles()
    }
  }, [isOpen])

  const loadFiles = async () => {
    try {
      const response = await fetch('/api/files')
      const data = await response.json()
      setFiles(data.files || [])
      setLoading(false)
    } catch (error) {
      console.error('Error loading files:', error)
      toast.error('Failed to load files')
      setLoading(false)
    }
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB')
      return
    }

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()
      if (result.success) {
        toast.success('File uploaded successfully!')
        loadFiles()
        // Auto select the uploaded file
        setSelectedFile(result.url)
      } else {
        toast.error(result.error || 'Upload failed')
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      toast.error('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleSelectFile = () => {
    if (selectedFile && onSelectFile) {
      onSelectFile(selectedFile)
      onClose()
      toast.success('Image selected!')
    }
  }

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url)
    toast.success('URL copied to clipboard!')
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-slate-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <h2 className="text-xl font-semibold text-white">File Manager</h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <FaTimes />
            </button>
          </div>

          {/* Upload Area */}
          <div className="p-6 border-b border-slate-700">
            <label className="block">
              <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-purple-400 transition-colors cursor-pointer">
                <FaUpload className="mx-auto text-3xl text-slate-400 mb-4" />
                <p className="text-slate-300 mb-2">
                  {uploading ? 'Uploading...' : 'Click to upload or drag and drop'}
                </p>
                <p className="text-slate-500 text-sm">PNG, JPG, GIF up to 5MB</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                />
              </div>
            </label>
          </div>

          {/* Files Grid */}
          <div className="flex-1 overflow-y-auto max-h-96">
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <div className="text-slate-400">Loading files...</div>
              </div>
            ) : files.length === 0 ? (
              <div className="flex flex-col items-center justify-center p-8 text-slate-400">
                <FaImage className="text-4xl mb-4" />
                <p>No images found</p>
                <p className="text-sm">Upload your first image above</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
                {files.map((file) => (
                  <motion.div
                    key={file.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`relative group border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                      selectedFile === file.url
                        ? 'border-purple-400 bg-purple-400/10'
                        : 'border-slate-600 hover:border-slate-500'
                    }`}
                    onClick={() => setSelectedFile(file.url)}
                  >
                    <div className="aspect-square relative">
                      <Image
                        src={file.url}
                        alt={file.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    </div>
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            copyToClipboard(file.url)
                          }}
                          className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                          title="Copy URL"
                        >
                          <FaCopy />
                        </button>
                      </div>
                    </div>

                    {/* Selected indicator */}
                    {selectedFile === file.url && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <FaCheck className="text-white text-xs" />
                      </div>
                    )}

                    {/* File info */}
                    <div className="p-2 bg-slate-700">
                      <p className="text-xs text-slate-300 truncate" title={file.name}>
                        {file.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-slate-700">
            <div className="text-sm text-slate-400">
              {selectedFile ? `Selected: ${selectedFile}` : 'No file selected'}
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSelectFile}
                disabled={!selectedFile}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                Select File
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

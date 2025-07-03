'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPlus, FaEdit, FaTrash, FaSave, FaTimes, FaEye, FaDownload, FaUpload, FaSignOutAlt, FaImage } from 'react-icons/fa'
import Image from 'next/image'
import { toast } from 'react-hot-toast'
import FileManager from './file-manager'

export default function AdminPanel() {
  const [projects, setProjects] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [showFileManager, setShowFileManager] = useState(false)
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    tech: '',
    liveUrl: '',
    githubUrl: '',
    featured: false,
    category: 'Web Application'
  })

  // Check authentication
  useEffect(() => {
    const checkAuth = () => {
      const isAdmin = localStorage.getItem('isAdmin')
      if (isAdmin === 'true') {
        setIsAuthenticated(true)
        loadProjects()
      } else {
        router.push('/login')
      }
      setLoading(false)
    }
    checkAuth()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('isAdmin')
    router.push('/login')
  }

  const handleFileSelect = (fileUrl) => {
    setFormData({ ...formData, image: fileUrl })
    setShowFileManager(false)
  }

  const loadProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error('Error loading projects:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const projectData = {
      ...formData,
      tech: formData.tech.split(',').map(t => t.trim()),
      id: editingProject?.id || formData.title.toLowerCase().replace(/\s+/g, '-'),
      createdAt: editingProject?.createdAt || new Date().toISOString().split('T')[0]
    }

    try {
      const method = editingProject ? 'PUT' : 'POST'
      const response = await fetch('/api/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      })

      if (response.ok) {
        loadProjects()
        resetForm()
        toast.success(editingProject ? 'Project updated successfully!' : 'Project added successfully!')
      } else {
        toast.error('Failed to save project. Please try again.')
      }
    } catch (error) {
      console.error('Error saving project:', error)
      toast.error('An error occurred while saving the project.')
    }
  }

  const handleEdit = (project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      tech: project.tech.join(', '),
      liveUrl: project.liveUrl || '',
      githubUrl: project.githubUrl || '',
      featured: project.featured,
      category: project.category
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await fetch(`/api/projects?id=${id}`, { method: 'DELETE' })
        if (response.ok) {
          loadProjects()
          toast.success('Project deleted successfully!')
        } else {
          toast.error('Failed to delete project.')
        }
      } catch (error) {
        console.error('Error deleting project:', error)
        toast.error('An error occurred while deleting the project.')
      }
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      tech: '',
      liveUrl: '',
      githubUrl: '',
      featured: false,
      category: 'Web Application'
    })
    setEditingProject(null)
    setShowForm(false)
  }

  const exportData = () => {
    const dataStr = JSON.stringify(projects, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'projects-backup.json'
    link.click()
  }

  const importData = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = async (e) => {
        try {
          const importedProjects = JSON.parse(e.target.result)
          const response = await fetch('/api/projects/import', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(importedProjects)
          })
          if (response.ok) {
            loadProjects()
            toast.success('Data imported successfully!')
          } else {
            toast.error('Failed to import data.')
          }
        } catch (error) {
          console.error('Error importing data:', error)
          toast.error('Error importing data. Please check the file format.')
        }
      }
      reader.readAsText(file)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-purple-400 text-xl">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-purple-400">Portfolio Admin</h1>
            <p className="text-slate-400">Manage your projects</p>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={() => setShowFileManager(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
            >
              <FaImage /> Files
            </button>
            
            <button
              onClick={exportData}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            >
              <FaDownload /> Export
            </button>
            
            <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer">
              <FaUpload /> Import
              <input type="file" accept=".json" onChange={importData} className="hidden" />
            </label>
            
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            >
              <FaPlus /> Add Project
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-sm text-slate-400 mb-2">Total Projects</h3>
            <p className="text-2xl font-bold text-purple-400">{projects.length}</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-sm text-slate-400 mb-2">Featured Projects</h3>
            <p className="text-2xl font-bold text-green-400">{projects.filter(p => p.featured).length}</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg border border-slate-700">
            <h3 className="text-sm text-slate-400 mb-2">Categories</h3>
            <p className="text-2xl font-bold text-blue-400">
              {new Set(projects.map(p => p.category)).size}
            </p>
          </div>
        </div>

        {/* Projects List */}
        <div className="bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-xl font-semibold">Projects</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700">
                <tr>
                  <th className="text-left p-4">Image</th>
                  <th className="text-left p-4">Title</th>
                  <th className="text-left p-4">Category</th>
                  <th className="text-left p-4">Tech Stack</th>
                  <th className="text-left p-4">Featured</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id} className="border-b border-slate-700 hover:bg-slate-700/50">
                    <td className="p-4">
                      <div className="w-16 h-12 relative rounded overflow-hidden">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <h3 className="font-medium">{project.title}</h3>
                        <p className="text-sm text-slate-400 truncate max-w-[200px]">
                          {project.description}
                        </p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded text-sm">
                        {project.category}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {project.tech.slice(0, 2).map((tech) => (
                          <span key={tech} className="px-2 py-1 bg-slate-600 text-xs rounded">
                            {tech}
                          </span>
                        ))}
                        {project.tech.length > 2 && (
                          <span className="px-2 py-1 bg-slate-600 text-xs rounded">
                            +{project.tech.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      {project.featured ? (
                        <span className="text-green-400">✓</span>
                      ) : (
                        <span className="text-slate-500">-</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(project)}
                          className="p-2 text-blue-400 hover:bg-blue-400/20 rounded"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(project.id)}
                          className="p-2 text-red-400 hover:bg-red-400/20 rounded"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Form Modal */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={(e) => e.target === e.currentTarget && resetForm()}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-slate-800 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">
                    {editingProject ? 'Edit Project' : 'Add New Project'}
                  </h2>
                  <button onClick={resetForm} className="text-slate-400 hover:text-white">
                    <FaTimes />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                      rows="3"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Image</label>
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                            placeholder="/projects/image.jpg"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowFileManager(true)}
                            className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2"
                          >
                            <FaImage /> Browse
                          </button>
                        </div>
                        {formData.image && (
                          <div className="relative w-full h-20 rounded overflow-hidden border border-slate-600">
                            <Image
                              src={formData.image}
                              alt="Preview"
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="Web Application">Web Application</option>
                        <option value="WordPress Plugin">WordPress Plugin</option>
                        <option value="Mobile App">Mobile App</option>
                        <option value="Desktop App">Desktop App</option>
                        <option value="API">API</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Tech Stack (comma separated)</label>
                    <input
                      type="text"
                      value={formData.tech}
                      onChange={(e) => setFormData({ ...formData, tech: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                      placeholder="React, Next.js, Tailwind CSS"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Live URL (optional)</label>
                      <input
                        type="url"
                        value={formData.liveUrl}
                        onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="https://example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">GitHub URL (optional)</label>
                      <input
                        type="url"
                        value={formData.githubUrl}
                        onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="https://github.com/username/repo"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="mr-2"
                    />
                    <label htmlFor="featured" className="text-sm">Featured Project</label>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                    >
                      <FaSave /> {editingProject ? 'Update' : 'Save'}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 bg-slate-600 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* File Manager Modal */}
        <FileManager
          isOpen={showFileManager}
          onClose={() => setShowFileManager(false)}
          onSelectFile={handleFileSelect}
        />
      </div>
    </div>
  )
}

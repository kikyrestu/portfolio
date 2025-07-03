'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import ProjectCard from '../../components/project-card'

export default function ProjectsPage() {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const response = await fetch('/api/projects')
        const data = await response.json()
        setProjects(data)
        setFilteredProjects(data)
        setLoading(false)
      } catch (error) {
        console.error('Error loading projects:', error)
        setLoading(false)
      }
    }
    loadProjects()
  }, [])

  const categories = ['All', ...new Set(projects.map(p => p.category))]

  const filterProjects = (category) => {
    setSelectedCategory(category)
    if (category === 'All') {
      setFilteredProjects(projects)
    } else {
      setFilteredProjects(projects.filter(p => p.category === category))
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
        <div className="text-purple-400 text-xl">Loading projects...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Link href="/" className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-6">
              ← Back to Home
            </Link>
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-200 mb-4">
              All Projects
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto">
              A comprehensive collection of my work, from web applications to plugins and more.
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => filterProjects(category)}
                className={`px-6 py-2 rounded-lg transition-colors duration-300 ${
                  selectedCategory === category
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-purple-600/20 hover:text-purple-300'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Projects Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 text-center">
              <h3 className="text-2xl font-bold text-purple-400">{projects.length}</h3>
              <p className="text-slate-400">Total Projects</p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 text-center">
              <h3 className="text-2xl font-bold text-green-400">{projects.filter(p => p.featured).length}</h3>
              <p className="text-slate-400">Featured Projects</p>
            </div>
            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 text-center">
              <h3 className="text-2xl font-bold text-blue-400">{categories.length - 1}</h3>
              <p className="text-slate-400">Categories</p>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <ProjectCard 
                  title={project.title}
                  description={project.description}
                  tech={project.tech}
                  image={project.image}
                  liveUrl={project.liveUrl}
                  githubUrl={project.githubUrl}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-slate-300 mb-2">
                No projects found
              </h3>
              <p className="text-slate-400">
                Try selecting a different category or check back later for new projects.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function ProjectCard({ title, description, image, tech, liveUrl, githubUrl }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700"
    >
      {/* Project Image */}
      <div className="relative h-48 lg:h-56 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-purple-400/10 mix-blend-multiply"></div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-semibold text-slate-200">{title}</h3>
        <p className="text-slate-400 text-sm">{description}</p>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {tech.map((item) => (
            <span
              key={item}
              className="px-2 py-1 text-xs text-slate-300 bg-slate-700/50 rounded"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 pt-2">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              Live Demo →
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-400 hover:text-slate-300 transition-colors"
            >
              View Code →
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
} 
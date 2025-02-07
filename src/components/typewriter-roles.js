'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export const TypewriterRoles = ({ roles }) => {
  const [text, setText] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    let timeoutId;
    const currentRole = roles[roleIndex];

    if (!isDeleting && charIndex < currentRole.length) {
      // Mengetik
      timeoutId = setTimeout(() => {
        setText(prev => prev + currentRole[charIndex])
        setCharIndex(prev => prev + 1)
      }, 100)
    } 
    else if (!isDeleting && charIndex === currentRole.length) {
      // Tunggu sebelum mulai hapus
      timeoutId = setTimeout(() => setIsDeleting(true), 2000)
    }
    else if (isDeleting && text.length > 0) {
      // Menghapus
      timeoutId = setTimeout(() => {
        setText(prev => prev.slice(0, -1))
        setCharIndex(prev => prev - 1)
      }, 50)
    }
    else if (isDeleting && text.length === 0) {
      // Ganti ke role berikutnya
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
      setCharIndex(0)
    }

    return () => clearTimeout(timeoutId)
  }, [roles, roleIndex, charIndex, isDeleting, text])

  return (
    <span className="inline-block min-w-[300px]">
      {text}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
        className="inline-block w-[3px] h-[24px] bg-purple-400 ml-1"
      />
    </span>
  )
} 
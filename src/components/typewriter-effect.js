'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}) => {
  const [text, setText] = useState('')
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const fullName = words.map(word => word.text).join(' ')

  useEffect(() => {
    let timeoutId;

    const type = () => {
      if (!isDeleting && charIndex < fullName.length) {
        setText(prev => prev + fullName[charIndex])
        setCharIndex(prev => prev + 1)
      }
    }

    const erase = () => {
      if (isDeleting && text.length > 0) {
        setText(prev => prev.slice(0, -1))
        setCharIndex(prev => prev - 1)
      }
    }

    if (!isDeleting && charIndex < fullName.length) {
      timeoutId = setTimeout(type, 100)
    } 
    else if (!isDeleting && charIndex === fullName.length) {
      timeoutId = setTimeout(() => setIsDeleting(true), 5000)
    }
    else if (isDeleting && text.length > 0) {
      timeoutId = setTimeout(erase, 50)
    }
    else if (isDeleting && text.length === 0) {
      setIsDeleting(false)
      setCharIndex(0)
    }

    return () => clearTimeout(timeoutId)
  }, [fullName, charIndex, isDeleting, text])

  return (
    <div className={className}>
      <div className="text-left relative">
        <span>
          {text.split(' ').map((word, idx) => (
            <motion.span key={idx} className={words[idx]?.className}>
              {word}
              {idx < text.split(' ').length - 1 ? ' ' : ''}
            </motion.span>
          ))}
        </span>
        
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
          className={`inline-block w-[4px] h-[60px] lg:h-[80px] bg-purple-400 ml-2 ${cursorClassName}`}
        />
      </div>
    </div>
  )
} 
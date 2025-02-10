'use client'

import Image from "next/image";
import { TypewriterEffect } from '../components/typewriter-effect'
import { TypewriterRoles } from '../components/typewriter-roles'
import { 
  FaReact, 
  FaPython, 
  FaWordpress, 
  FaGithub, 
  FaLinkedin, 
  FaTwitter, 
  FaDribbble,
  FaMicrosoft,
  FaDownload,
  FaInstagram,
  FaEnvelope,
  FaWhatsapp
} from 'react-icons/fa'
import { 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss, 
  SiDjango, 
  SiPostman,
  SiDocker, 
  SiAmazon,
  SiGooglecloud,
  SiGit,
  SiLinux,
  SiUbuntu,
  SiOpenvpn
} from 'react-icons/si'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { FaCode, FaServer, FaCloud, FaNetworkWired } from 'react-icons/fa'
import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser';

// Dynamic import for ProjectCard
const ProjectCard = dynamic(() => import('../components/project-card'), {
  ssr: false
})

// Tambahkan function untuk handle email
const handleEmailClick = () => {
  const templateParams = {
    to_name: 'Kiky',
    from_name: 'Portfolio Visitor',
    subject: 'New Contact from Portfolio Website',
    message: 'Someone wants to connect with you!',
    reply_to: 'kikyrestu@gmail.com'
  };

  emailjs.send(
    'service_dqkt3bo',    // Service ID
    'template_cgxkewe',   // Template ID
    templateParams,
    'YOUR_PUBLIC_KEY'     // Masih perlu Public Key
  )
  .then((response) => {
    console.log('Email sent!', response.status);
  })
  .catch((err) => {
    console.log('Failed to send email:', err);
  });
};

export default function Home() {
  const roles = [
    "UI/UX Designer",
    "WordPress Developer",
    "FullStack Web Developer"
  ];

  const frontendTech = [
    { name: "React", icon: <FaReact className="text-[#61DAFB]" /> },
    { name: "Next.js", icon: <SiNextdotjs /> },
    { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
    { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#38B2AC]" /> },
  ]

  const backendTech = [
    { name: "Django", icon: <SiDjango className="text-[#092E20]" /> },
    { name: "Python", icon: <FaPython className="text-[#3776AB]" /> },
    { name: "REST API", icon: <SiPostman className="text-[#FF6C37]" /> },
  ]

  const systemTech = [
    { 
      name: "Linux", 
      icon: <SiLinux className="text-[#FCC624]" /> 
    },
    { 
      name: "Server Setup", 
      icon: <SiUbuntu className="text-[#E95420]" />
    },
    { 
      name: "VPN Config", 
      icon: <SiOpenvpn className="text-[#EA7E20]" /> 
    }
  ]

  const cloudTech = [
    { 
      name: "AWS", 
      icon: <SiAmazon className="text-[#FF9900]" /> 
    },
    { 
      name: "Azure", 
      icon: <FaMicrosoft className="text-[#0078D4]" /> 
    },
    { 
      name: "Google Cloud", 
      icon: <SiGooglecloud className="text-[#4285F4]" /> 
    }
  ]

  const toolsTech = [
    { 
      name: "Docker", 
      icon: <SiDocker className="text-[#2496ED]" /> 
    },
    { 
      name: "Git", 
      icon: <SiGit className="text-[#F05032]" /> 
    }
  ]

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/kikyrestu',
      icon: <FaGithub className="w-6 h-6" />
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/kiky-restu-noviansyah/',
      icon: <FaLinkedin className="w-6 h-6" />
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/re_skye/',
      icon: <FaInstagram className="w-6 h-6" />
    }
  ]

  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true)
      } else {
        setShowBackToTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#0f172a] dark:bg-[#0f172a] overflow-hidden">
      {/* Social Icons Sidebar - Pindah ke kanan */}
      <div className="fixed right-6 bottom-0 z-10 hidden lg:flex flex-col items-center gap-6 
                    after:content-[''] after:w-[1px] after:h-24 after:bg-slate-400/50 
                    after:mx-auto after:my-6">
        {socialLinks.map(({ name, url, icon }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-2 transition-all hover:-translate-y-1 hover:text-purple-400"
            aria-label={name}
          >
            <div className="absolute inset-0 bg-purple-400/20 rounded-lg 
                          scale-0 group-hover:scale-100 transition-transform duration-300" />
            <div className="relative text-slate-400 group-hover:text-purple-400 
                          transition-colors duration-300">
              {icon}
            </div>
          </a>
        ))}
      </div>

      {/* Hero Section */}
      <main className="relative min-h-screen bg-[#0a192f]">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="container relative mx-auto px-6 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="w-full lg:w-7/12 space-y-6">
              {/* Intro text */}
              <div className="space-y-3">
                <p className="text-purple-400 font-mono">Hi, my name is</p>
                <h1 className="space-y-1">
                  <div className="flex flex-wrap gap-4">
                    <span className="text-5xl lg:text-6xl font-bold text-slate-200">Kiky</span>
                    <span className="text-5xl lg:text-6xl font-bold text-slate-200">Restu</span>
                  </div>
                  <span className="block text-4xl lg:text-5xl font-bold text-slate-400">Noviansyah</span>
                </h1>
                
                {/* Role */}
                <div className="flex items-center gap-3 text-xl text-slate-300">
                  <span className="h-px w-12 bg-purple-400"></span>
                  <TypewriterRoles roles={roles} />
                </div>
              </div>

              {/* Description */}
              <p className="text-base text-slate-400 max-w-2xl">
                I specialize in building exceptional digital experiences.
              </p>

              {/* Tech Stack */}
              <div className="space-y-3">
                <h3 className="text-slate-200 font-mono text-sm">Tech Stack</h3>
                <div className="space-y-2">
                  {/* Frontend */}
                  <div className="space-y-2">
                    <span className="text-xs text-slate-400 font-mono">Frontend</span>
                    <div className="flex flex-wrap gap-2">
                      {frontendTech.map(({ name, icon }) => (
                        <span
                          key={name}
                          className="px-4 py-1.5 bg-slate-800/50 text-slate-300 text-sm rounded 
                                   border border-slate-700 hover:border-purple-400 transition-colors
                                   flex items-center gap-2"
                        >
                          {icon}
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Backend */}
                  <div className="space-y-2">
                    <span className="text-xs text-slate-400 font-mono">Backend</span>
                    <div className="flex flex-wrap gap-2">
                      {backendTech.map(({ name, icon }) => (
                        <span
                          key={name}
                          className="px-4 py-1.5 bg-slate-800/50 text-slate-300 text-sm rounded 
                                   border border-slate-700 hover:border-purple-400 transition-colors
                                   flex items-center gap-2"
                        >
                          {icon}
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* System & Network */}
                  <div className="space-y-2">
                    <span className="text-xs text-slate-400 font-mono">System & Network</span>
                    <div className="flex flex-wrap gap-2">
                      {systemTech.map(({ name, icon }) => (
                        <span
                          key={name}
                          className="px-4 py-1.5 bg-slate-800/50 text-slate-300 text-sm rounded 
                                   border border-slate-700 hover:border-purple-400 transition-colors
                                   flex items-center gap-2"
                        >
                          {icon}
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Cloud Platforms */}
                  <div className="space-y-2">
                    <span className="text-xs text-slate-400 font-mono">Cloud Platforms</span>
                    <div className="flex flex-wrap gap-2">
                      {cloudTech.map(({ name, icon }) => (
                        <span
                          key={name}
                          className="px-4 py-1.5 bg-slate-800/50 text-slate-300 text-sm rounded 
                                   border border-slate-700 hover:border-purple-400 transition-colors
                                   flex items-center gap-2"
                        >
                          {icon}
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Development Tools */}
                  <div className="space-y-2">
                    <span className="text-xs text-slate-400 font-mono">Development Tools</span>
                    <div className="flex flex-wrap gap-2">
                      {toolsTech.map(({ name, icon }) => (
                        <span
                          key={name}
                          className="px-4 py-1.5 bg-slate-800/50 text-slate-300 text-sm rounded 
                                   border border-slate-700 hover:border-purple-400 transition-colors
                                   flex items-center gap-2"
                        >
                          {icon}
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex items-center gap-4 pt-2">
                <a
                  href="#contact"
                  className="px-8 py-3 bg-transparent text-purple-400 font-mono text-sm
                           border border-purple-400 rounded hover:bg-purple-400/10
                           transition-colors duration-300"
                >
                  Get In Touch
                </a>
                
                {/* Download CV Button */}
                <a
                  href="/mycv/CV - Kiky Restu Noviansyah (1).pdf"
                  download
                  className="px-8 py-3 bg-purple-500/10 text-purple-400 font-mono text-sm
                           rounded hover:bg-purple-500/20 transition-colors duration-300
                           flex items-center gap-2"
                >
                  <FaDownload className="w-4 h-4" />
                  Download CV
                </a>
                
                <a
                  href="#projects"
                  className="px-8 py-3 bg-transparent text-slate-300 font-mono text-sm
                           border border-slate-700 rounded hover:border-slate-500
                           transition-colors duration-300"
                >
                  View Work
                </a>
              </div>
            </div>

            {/* Right Content - Photo */}
            <div className="relative w-full lg:w-5/12">
              <div className="relative max-w-[380px] mx-auto">
                {/* Frame */}
                <div className="absolute -inset-5 border border-purple-400/20 rounded-lg"></div>
                <div className="absolute -inset-10 border border-purple-400/10 rounded-lg rotate-3"></div>
                
                {/* Image Container */}
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden">
                  <Image
                    src="/me.jpeg"
                    alt="Kiky Restu Noviansyah"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 380px, 400px"
                    priority
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-purple-400/5 mix-blend-multiply"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Projects Section */}
      <section id="projects" className="py-20 lg:py-32 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <div className="space-y-4 mb-12 lg:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-2"
            >
              <p className="text-purple-400 font-mono">What I've Built</p>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-200">Featured Projects</h2>
              <p className="text-slate-400 max-w-2xl">
                A collection of projects I've worked on, from web applications to design systems.
              </p>
            </motion.div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Forum Gamer Project */}
            <ProjectCard 
              title="Forum Gamer"
              description="A gaming community platform featuring game-specific zones (FPS, MOBA, RPG, Sports), 
                          trending discussions, live chat, and real-time thread updates. Built with modern tech stack 
                          for Indonesian gamers to connect and share gaming experiences."
              tech={["Next.js", "Firebase", "Tailwind CSS", "React"]}
              image="/projects/image.png"
              liveUrl="https://forum-gamer.vercel.app"
              githubUrl="https://github.com/kikyrestu/forum-gamer"
            />

            {/* Point of Sale Project */}
            <ProjectCard 
              title="Web Kasir - Point of Sale System"
              description="A comprehensive web-based POS system with features including product management, 
                          transaction handling, thermal receipt printing, sales reporting (daily/monthly/yearly), 
                          customer management, and barcode integration. Built with Django and PostgreSQL."
              tech={[
                "Django", 
                "PostgreSQL", 
                "Bootstrap", 
                "jQuery",
                "Docker"
              ]}
              image="/projects/image-2.jpg"
              githubUrl="https://github.com/kikyrestu/web-kasir"
            />

            {/* WordPress Plugin Project */}
            <ProjectCard 
              title="WordPress Custom Card Plugin"
              description="A custom WordPress plugin that adds card widgets to the Elementor page builder. 
                          Features include ACF integration, button customization options, flexible styling settings, 
                          and responsive design support. Built to enhance content presentation with modern UI components."
              tech={[
                "PHP",
                "WordPress",
                "Elementor",
                "ACF Pro",
                "CSS",
                "JavaScript"
              ]}
              image="/projects/image-3.jpg"
              githubUrl="https://github.com/kikyrestu/plugin-custom"
            />
          </div>

          {/* View More Button */}
          <div className="mt-12 text-center">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/50 text-slate-200 
                       rounded border border-slate-700 hover:border-purple-400 transition-colors"
            >
              View More Projects
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 lg:py-32 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        <div className="container mx-auto px-6">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-4 mb-12 lg:mb-20"
          >
            <p className="text-purple-400 font-mono">What I Offer</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-200">Services</h2>
            <p className="text-slate-400 max-w-2xl">
              Specialized services tailored to your digital needs, from web development to infrastructure setup.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Web Development */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="group p-8 bg-slate-800/50 rounded-lg border border-slate-700 
                       hover:border-purple-400/50 transition-colors duration-300"
            >
              <div className="text-purple-400 mb-4 text-2xl">
                <FaCode />
              </div>
              <h3 className="text-xl font-bold text-slate-200 mb-3">Web Development</h3>
              <p className="text-slate-400">
                Full stack web development using modern technologies like React, Next.js, and Django.
                Building responsive and performant web applications.
              </p>
            </motion.div>

            {/* Server & Infrastructure */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="group p-8 bg-slate-800/50 rounded-lg border border-slate-700 
                       hover:border-purple-400/50 transition-colors duration-300"
            >
              <div className="text-purple-400 mb-4 text-2xl">
                <FaServer />
              </div>
              <h3 className="text-xl font-bold text-slate-200 mb-3">Server Setup & Management</h3>
              <p className="text-slate-400">
                Server configuration, deployment, and maintenance. Linux system administration 
                and infrastructure optimization.
              </p>
            </motion.div>

            {/* Cloud Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="group p-8 bg-slate-800/50 rounded-lg border border-slate-700 
                       hover:border-purple-400/50 transition-colors duration-300"
            >
              <div className="text-purple-400 mb-4 text-2xl">
                <FaCloud />
              </div>
              <h3 className="text-xl font-bold text-slate-200 mb-3">Cloud Infrastructure</h3>
              <p className="text-slate-400">
                Setting up and managing cloud infrastructure on AWS, Azure, and Google Cloud. 
                Implementing scalable and secure solutions.
              </p>
            </motion.div>

            {/* Network Configuration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="group p-8 bg-slate-800/50 rounded-lg border border-slate-700 
                       hover:border-purple-400/50 transition-colors duration-300"
            >
              <div className="text-purple-400 mb-4 text-2xl">
                <FaNetworkWired />
              </div>
              <h3 className="text-xl font-bold text-slate-200 mb-3">Network Solutions</h3>
              <p className="text-slate-400">
                VPN configuration, SMTP server setup, and network security implementation.
                Ensuring secure and efficient communication.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-32 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <p className="text-purple-400 font-mono mb-3">Get in Touch</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-200 mb-4">
              Let's Work Together
            </h2>
            <p className="text-slate-400">
              I'm currently available for freelance work and open to new opportunities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Email Contact */}
            <motion.a
              onClick={handleEmailClick}
              href="mailto:kikyrestu@gmail.com"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="group flex flex-col items-center p-8 bg-slate-800/50 rounded-lg 
                         border border-slate-700 hover:border-purple-400/50 transition-colors"
            >
              <FaEnvelope className="w-8 h-8 text-purple-400 mb-4 
                            group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-200 mb-2">Email Me</h3>
              <p className="text-slate-400 text-center">kikyrestu@gmail.com</p>
            </motion.a>

            {/* WhatsApp Contact */}
            <motion.a
              href="https://wa.me/6281234567890" // Ganti dengan nomor WhatsApp kamu
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="group flex flex-col items-center p-8 bg-slate-800/50 rounded-lg border border-slate-700 hover:border-purple-400/50 transition-colors"
            >
              <FaWhatsapp className="w-8 h-8 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-slate-200 mb-2">WhatsApp</h3>
              <p className="text-slate-400 text-center">Let's chat on WhatsApp</p>
            </motion.a>
          </div>

          {/* Alternative Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mt-12"
          >
            <p className="text-slate-400">
              You can also find me on{' '}
              <a 
                href="https://www.linkedin.com/in/kiky-restu-noviansyah/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                LinkedIn
              </a>
              {' '}for professional inquiries
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 relative">
        <div className="container mx-auto px-6">
          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* About Column */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-200">Kiky Restu</h3>
              <p className="text-slate-400">
                A passionate developer focused on building modern web applications and robust infrastructure solutions.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-200">Quick Links</h3>
              <div className="flex flex-col space-y-2">
                <a href="#" className="text-slate-400 hover:text-purple-400 transition-colors">Home</a>
                <a href="#projects" className="text-slate-400 hover:text-purple-400 transition-colors">Projects</a>
                <a href="#services" className="text-slate-400 hover:text-purple-400 transition-colors">Services</a>
                <a href="#contact" className="text-slate-400 hover:text-purple-400 transition-colors">Contact</a>
              </div>
            </div>

            {/* Connect */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-200">Connect</h3>
              <div className="flex space-x-4">
                {socialLinks.map(({ name, url, icon }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-purple-400 transition-colors"
                    aria-label={name}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-800">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="text-slate-400 text-sm">
                © {new Date().getFullYear()} Kiky Restu. All rights reserved.
              </div>

              {/* Built with */}
              <div className="flex items-center space-x-2 text-sm text-slate-400">
                <span>Built with</span>
                <a 
                  href="https://nextjs.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-slate-300 hover:text-purple-400 transition-colors"
                >
                  <SiNextdotjs className="w-4 h-4" />
                  <span>Next.js</span>
                </a>
                <span>&</span>
                <a 
                  href="https://tailwindcss.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-slate-300 hover:text-purple-400 transition-colors"
                >
                  <SiTailwindcss className="w-4 h-4" />
                  <span>Tailwind</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed right-6 bottom-6 z-50 p-4 bg-purple-500/10 text-purple-400 
                   rounded-full hover:bg-purple-500/20 transition-all duration-300
                   ${showBackToTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
        aria-label="Back to top"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 10l7-7m0 0l7 7m-7-7v18" 
          />
        </svg>
      </button>
    </div>
  );
}

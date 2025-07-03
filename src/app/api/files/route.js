import { NextResponse } from 'next/server'
import { readdir, stat } from 'fs/promises'
import path from 'path'

export async function GET() {
  try {
    const projectsDir = path.join(process.cwd(), 'public/projects')
    
    try {
      const files = await readdir(projectsDir)
      const fileList = []

      for (const file of files) {
        if (file.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
          const filePath = path.join(projectsDir, file)
          const stats = await stat(filePath)
          
          fileList.push({
            name: file,
            url: `/projects/${file}`,
            size: stats.size,
            modified: stats.mtime
          })
        }
      }

      // Sort by modified date (newest first)
      fileList.sort((a, b) => new Date(b.modified) - new Date(a.modified))

      return NextResponse.json({ files: fileList })
    } catch (error) {
      // Directory doesn't exist, return empty array
      return NextResponse.json({ files: [] })
    }

  } catch (error) {
    console.error('Error listing files:', error)
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 })
  }
}

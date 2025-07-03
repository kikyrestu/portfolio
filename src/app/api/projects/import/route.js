import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const projectsPath = path.join(process.cwd(), 'src/data/projects.json')

// POST - Import projects data
export async function POST(request) {
  try {
    const importedProjects = await request.json()
    
    // Validate imported data
    if (!Array.isArray(importedProjects)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 })
    }
    
    // Write imported data to file
    fs.writeFileSync(projectsPath, JSON.stringify(importedProjects, null, 2))
    
    return NextResponse.json({ success: true, count: importedProjects.length })
  } catch (error) {
    console.error('Error importing projects:', error)
    return NextResponse.json({ error: 'Failed to import projects' }, { status: 500 })
  }
}

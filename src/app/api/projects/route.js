import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const projectsPath = path.join(process.cwd(), 'src/data/projects.json')

// GET - Read projects
export async function GET() {
  try {
    const fileContents = fs.readFileSync(projectsPath, 'utf8')
    const projects = JSON.parse(fileContents)
    return NextResponse.json(projects)
  } catch (error) {
    console.error('Error reading projects:', error)
    return NextResponse.json({ error: 'Failed to load projects' }, { status: 500 })
  }
}

// POST - Add new project
export async function POST(request) {
  try {
    const newProject = await request.json()
    
    // Read existing projects
    const fileContents = fs.readFileSync(projectsPath, 'utf8')
    const projects = JSON.parse(fileContents)
    
    // Add new project
    projects.push(newProject)
    
    // Write back to file
    fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2))
    
    return NextResponse.json({ success: true, project: newProject })
  } catch (error) {
    console.error('Error adding project:', error)
    return NextResponse.json({ error: 'Failed to add project' }, { status: 500 })
  }
}

// PUT - Update existing project
export async function PUT(request) {
  try {
    const updatedProject = await request.json()
    
    // Read existing projects
    const fileContents = fs.readFileSync(projectsPath, 'utf8')
    const projects = JSON.parse(fileContents)
    
    // Find and update project
    const projectIndex = projects.findIndex(p => p.id === updatedProject.id)
    if (projectIndex === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }
    
    projects[projectIndex] = { ...projects[projectIndex], ...updatedProject }
    
    // Write back to file
    fs.writeFileSync(projectsPath, JSON.stringify(projects, null, 2))
    
    return NextResponse.json({ success: true, project: projects[projectIndex] })
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 })
  }
}

// DELETE - Remove project
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const projectId = searchParams.get('id')
    
    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 })
    }
    
    // Read existing projects
    const fileContents = fs.readFileSync(projectsPath, 'utf8')
    const projects = JSON.parse(fileContents)
    
    // Filter out the project to delete
    const filteredProjects = projects.filter(p => p.id !== projectId)
    
    if (filteredProjects.length === projects.length) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }
    
    // Write back to file
    fs.writeFileSync(projectsPath, JSON.stringify(filteredProjects, null, 2))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
  }
}

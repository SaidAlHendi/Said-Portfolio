import React, { useEffect } from 'react'
import Background from '@/components/Background'
import ProjectCard from '@/components/ProjectCard'
import { Skeleton } from '@/components/ui/skeleton'
import { useProjects } from '@/hooks/usePorjects'
import SmallProjectCard from '@/components/SmallPorjectCard'

const Projects = () => {
  const { allProjects, isLoading, error } = useProjects()

  useEffect(() => {
    // Add animation classes after component mount
    const elements = document.querySelectorAll('.project-card')
    elements.forEach((element, index) => {
      setTimeout(() => {
        ;(element as HTMLElement).classList.add('animate-fade-in')
      }, index * 200)
    })

    // Add animation for small project cards
    const smallElements = document.querySelectorAll('.small-project-card')
    smallElements.forEach((element, index) => {
      setTimeout(() => {
        ;(element as HTMLElement).classList.add('animate-fade-in')
      }, index * 150)
    })
  }, [allProjects])

  // Separate main projects from small projects
  const mainProjects = allProjects.filter((project) => project.featured)
  const smallProjects = allProjects.filter((project) => !project.featured)

  const renderProjects = () => {
    if (isLoading) {
      return Array(4)
        .fill(0)
        .map((_, index) => (
          <div key={index} className='mb-20'>
            <Skeleton className='w-full h-72 mb-4' />
            <Skeleton className='w-3/4 h-8 mb-2' />
            <Skeleton className='w-full h-24' />
          </div>
        ))
    }

    if (error) {
      return <div className='text-red-500 text-center'>Error: {error}</div>
    }

    if (allProjects.length === 0) {
      return (
        <div className='text-center text-said-light-gray'>
          No projects found.
        </div>
      )
    }

    return mainProjects.map((project, index) => (
      <ProjectCard
        key={index}
        index={index}
        title={project.title || 'Untitled Project'}
        description={project.description}
        image={project.image.url}
        technologies={project.stack.map((tech) => ({ name: tech }))}
        links={{
          demo: project.url,
          github: project.github,
        }}
      />
    ))
  }

  const renderSmallProjects = () => {
    if (isLoading) {
      return Array(6)
        .fill(0)
        .map((_, index) => (
          <div key={index} className='mb-4'>
            <Skeleton className='w-full h-40 rounded-lg' />
          </div>
        ))
    }

    if (smallProjects.length === 0) {
      return (
        <div className='text-center text-said-light-gray'>
          No small projects found.
        </div>
      )
    }

    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {smallProjects.map((project, index) => (
          <SmallProjectCard
            key={index}
            index={index}
            title={project.title || 'Untitled Project'}
            description={project.description}
            image={project.image.url}
            technologies={project.stack}
            links={{
              demo: project.url,
              github: project.github,
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <>
      <Background />
      <div className='min-h-screen relative z-10'>
        <div className='container mx-auto px-4 py-16 mt-20'>
          <div className='mb-16'>
            <h1 className='heading text-3xl mb-6'>Featured Projects</h1>
            <p className='text-said-light-gray'>
              Here you'll find a selection of my recent featured projects. Each
              one showcases different skills and technologies I've worked with.
            </p>
          </div>

          <div>{renderProjects()}</div>

          {/* Small Projects Section */}
          <div className='mt-32 mb-16'>
            <h2 className='heading text-2xl mb-6'>Small Projects</h2>
            <p className='text-said-light-gray mb-10'>
              These are smaller projects and experiments I've worked on. Though
              smaller in scope, they demonstrate various concepts and
              techniques.
            </p>
            {renderSmallProjects()}
          </div>
        </div>
      </div>
    </>
  )
}

export default Projects

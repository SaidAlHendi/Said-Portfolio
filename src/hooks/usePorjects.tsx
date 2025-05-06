import { useState, useEffect } from 'react'

export interface Project {
  title: string
  description: string
  github?: string
  url?: string
  stack: string[]
  featured: boolean
  image: {
    url: string
    title: string
  }
}

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(
          import.meta.env.VITE_GRAPHQL_API_URL as string,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization:
                `Bearer ${import.meta.env.VITE_GRAPHQL_API_KEY}` || '',
            },
            body: JSON.stringify({
              query: `
                query {
                  projectsCollection {
                    items {
                      title
                      github
                      url
                      stack
                      description
                      featured
                      image {
                        url
                        title
                      }
                    }
                  }
                }
              `,
            }),
          }
        )

        const { data, errors } = await response.json()

        if (errors) {
          setError(errors[0].message)
          return
        }

        // Transform the projects to ensure stack is always an array
        const transformedProjects = data.projectsCollection.items.map(
          (project: any) => {
            // Handle the case where stack is an object with a stack property
            const stackArray =
              project.stack &&
              typeof project.stack === 'object' &&
              project.stack.stack
                ? project.stack.stack
                : Array.isArray(project.stack)
                ? project.stack
                : []

            return {
              ...project,
              stack: stackArray,
            }
          }
        )

        setProjects(transformedProjects)
        setError(null)
      } catch (err) {
        setError('Failed to fetch projects')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const featuredProjects = projects.filter((project) => project.featured)
  const allProjects = projects

  return { featuredProjects, allProjects, isLoading, error }
}

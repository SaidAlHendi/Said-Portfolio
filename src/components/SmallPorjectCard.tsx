import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Github, ExternalLink } from 'lucide-react'

interface SmallProjectCardProps {
  title: string
  description: string
  image: string
  index: number
  technologies: string[]
  links?: {
    demo?: string
    github?: string
  }
}

const SmallProjectCard: React.FC<SmallProjectCardProps> = ({
  title,
  description,
  image,
  index,
  technologies,
  links,
}) => {
  return (
    <Card className='small-project-card opacity-0 bg-black/60 backdrop-blur-sm border border-said-green/20 hover:border-said-green/40 transition-all duration-300 overflow-hidden h-full'>
      <div className='relative h-40 overflow-hidden'>
        <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10'></div>
        <img src={image} alt={title} className='w-full h-full object-cover' />
        <div className='absolute bottom-0 left-0 p-3 z-20'>
          <h3 className='text-lg font-semibold text-white'>{title}</h3>
        </div>
      </div>
      <CardContent className='p-4'>
        <p className='text-sm text-said-light-gray line-clamp-2 mb-3'>
          {description}
        </p>
        <div className='flex flex-wrap gap-1 mb-2'>
          {technologies.slice(0, 3).map((tech, i) => (
            <span
              key={i}
              className='text-xs px-2 py-1 rounded-full bg-said-green/10 text-said-green'
            >
              {tech}
            </span>
          ))}
          {technologies.length > 3 && (
            <span className='text-xs px-2 py-1 rounded-full bg-said-green/10 text-said-green'>
              +{technologies.length - 3}
            </span>
          )}
        </div>
      </CardContent>
      <CardFooter className='p-4 pt-0 flex justify-end gap-2'>
        {links?.github && (
          <Button variant='ghost' size='sm' className='group' asChild>
            <a href={links.github} target='_blank' rel='noopener noreferrer'>
              <Github className='w-4 h-4 group-hover:text-white' />
            </a>
          </Button>
        )}
        {links?.demo && (
          <Button variant='ghost' size='sm' className='group' asChild>
            <a href={links.demo} target='_blank' rel='noopener noreferrer'>
              <ExternalLink className='w-4 h-4 group-hover:bg-said-green' />
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default SmallProjectCard

import React from 'react'

interface Technology {
  name: string
  color?: string
}

interface ProjectCardProps {
  title: string
  description: string
  image: string
  index: number
  technologies: Technology[]
  links?: {
    demo?: string
    github?: string
  }
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  index,
  technologies,
  links,
}) => {
  const isOdd = index % 2 === 1

  return (
    <div
      className=' project project-card my-20 opacity-0 relative group  '
      style={{
        animationDelay: `${index * 0.2}s`,
        animationFillMode: 'forwards',
      }}
    >
      <div
        className={` flex flex-col ${
          isOdd ? 'md:flex-row-reverse' : 'md:flex-row'
        } items-center relative z-10`}
      >
        <div className='w-full md:w-1/2 p-6'>
          <div className='h-64 relative overflow-hidden rounded-md'>
            <div className='absolute inset-0 bg-gradient-to-r from-said-green/30 to-transparent mix-blend-overlay z-10'></div>
            <img
              src={image}
              alt={title}
              className='w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700  project-img '
            />
          </div>
        </div>

        <div className='w-full md:w-1/2 p-6'>
          <div
            className={`text-left ${isOdd ? 'md:text-left' : 'md:text-right'}`}
          >
            <h3 className='text-xl font-bold mb-2 text-said-green'>
              {index < 10 ? `#${index + 1}` : index + 1} {title}
            </h3>
            <p className='text-said-light-gray mb-4'>{description}</p>

            <div
              className={`flex flex-wrap gap-2 mb-4 ${
                isOdd ? 'justify-start' : 'md:justify-end'
              }`}
            >
              {technologies.map((tech, i) => (
                <span key={i} className='skill-tag'>
                  {tech.name}
                </span>
              ))}
            </div>

            {links && (
              <div className={`flex gap-4 ${isOdd ? '' : 'md:justify-end'}`}>
                {links.demo && (
                  <a
                    href={links.demo}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-said-green hover:underline flex items-center gap-1'
                  >
                    <span>Live Demo</span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'></path>
                      <polyline points='15 3 21 3 21 9'></polyline>
                      <line x1='10' y1='14' x2='21' y2='3'></line>
                    </svg>
                  </a>
                )}

                {links.github && (
                  <a
                    href={links.github}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-said-green hover:underline flex items-center gap-1'
                  >
                    <span>GitHub</span>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22'></path>
                    </svg>
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard

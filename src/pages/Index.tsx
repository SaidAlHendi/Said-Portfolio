import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Background from '@/components/Background'
import CodeTypingEffect from '@/components/CodeTypingEffect'
import TypewriterEffect from '@/components/TypewriterEffect'
import FloatingElements from '@/components/FloatingElements'
import { gsap } from 'gsap'
import { Button } from '@/components/ui/button'
import { useProjects } from '@/hooks/usePorjects'

const Index = () => {
  const { featuredProjects, isLoading, error } = useProjects()

  const [isCodeHovered, setIsCodeHovered] = useState(false)
  const [isCodeVisible, setIsCodeVisible] = useState(false)
  const [showCode, setShowCode] = useState(false)

  useEffect(() => {
    // Add animation classes after component mount
    const elements = document.querySelectorAll('.animate-on-mount')
    elements.forEach((element, index) => {
      setTimeout(() => {
        ;(element as HTMLElement).classList.add('animate-fade-in')
      }, index * 200)
    })

    // GSAP Animation für die Intro-Sektion
    gsap.fromTo(
      '.intro-section',
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        delay: 0.5,
        onComplete: () => setIsCodeVisible(true), // Trigger Typing Start
      }
    )
  }, [])
  useEffect(() => {
    if (isCodeVisible) {
      const timer = setTimeout(() => {
        setShowCode(true)
      }, 500) // 5 Sekunden Verzögerung

      return () => clearTimeout(timer) // Aufräumen
    }
  }, [isCodeVisible])
  const codeSnippet = `// Hello, I'm Said 👋
const skills = {
  languages: ["JavaScript", "TypeScript", "HTML", "CSS"],
  frameworks: ["React", "Next.js", "Node.js"],
  tools: ["Git", "Webpack", "Docker"],
  interests: ["Web Development", "UI/UX", "Open Source"]
};

function createAmazingSolutions() {
  return "Let's build something great together!";
}`

  return (
    <>
      <Background />
      <FloatingElements />
      <div className='min-h-screen flex flex-col relative z-10'>
        <div className='flex-1 flex items-center'>
          <div className='container mx-auto px-4 py-24 mt-8'>
            <div className='intro-section flex flex-col md:flex-row items-center gap-12 min-h-[80vh]'>
              <div
                className='w-full md:w-1/2 opacity-0 animate-on-mount'
                style={{ animationDelay: '0.2s' }}
              >
                <h1
                  className='text-5xl md:text-6xl lg:text-7xl font-bold mb-6 opacity-0 animate-on-mount'
                  style={{ animationDelay: '0.4s' }}
                >
                  <TypewriterEffect
                    sequences={[
                      "I'm Said",
                      1000,
                      "I'm a FullStack Developer",
                      1000,

                      "I'm Said",
                      1000,
                    ]}
                    className='text-said-green'
                  />
                </h1>
                <h2
                  className='text-2xl md:text-3xl mb-6 opacity-0 animate-on-mount'
                  style={{ animationDelay: '0.6s' }}
                >
                  Freelance <span className='text-said-green'>Full Stack</span>{' '}
                  Developer
                </h2>
                <p
                  className='text-said-light-gray text-lg mb-8 opacity-0 animate-on-mount max-w-lg'
                  style={{ animationDelay: '0.8s' }}
                >
                  Hi, I'm a Fullstack Developer specializing in building modern,
                  scalable web applications with React, Node.js, and TypeScript.
                  Let's create something amazing together.
                </p>
                <div
                  className='flex space-x-4 opacity-0 animate-on-mount'
                  style={{ animationDelay: '1s' }}
                >
                  <Link to='/contact' className='button text-lg px-8 py-3'>
                    Contact me
                  </Link>
                  <Link
                    to='/projects'
                    className='button outline text-lg px-8 py-3'
                  >
                    View Projects
                  </Link>
                </div>
              </div>

              <div
                className='w-full md:w-1/2 opacity-0 animate-on-mount'
                style={{ animationDelay: '1s' }}
              >
                <div
                  className={`bg-card rounded-lg p-1 shadow-lg border border-border h-auto transition-all duration-500 ${
                    isCodeHovered
                      ? 'transform-style-3d rotate-y-10 rotate-x-5 scale-105'
                      : ''
                  }`}
                  onMouseEnter={() => setIsCodeHovered(true)}
                  onMouseLeave={() => setIsCodeHovered(false)}
                >
                  <div className='bg-black/70 rounded-t-lg p-2 flex items-center gap-2'>
                    <div className='w-3 h-3 rounded-full bg-red-500'></div>
                    <div className='w-3 h-3 rounded-full bg-yellow-500'></div>
                    <div className='w-3 h-3 rounded-full bg-green-500'></div>
                    <span className='text-xs font-mono ml-2 text-said-light-gray'>
                      said.js
                    </span>
                  </div>

                  <div className='bg-black/70 p-6 overflow-auto'>
                    {showCode && <CodeTypingEffect code={codeSnippet} />}
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Projects Section */}
            <div className='mt-20 pb-20'>
              <h2 className='text-3xl md:text-4xl font-bold mb-10 text-center'>
                Featured Projects
              </h2>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mt-10'>
                {featuredProjects.map((project, index) => (
                  <div
                    key={index}
                    className='bg-card p-6 rounded-lg border border-border hover:border-said-green/50 transition-all duration-300 group'
                  >
                    <div className='h-48 relative overflow-hidden rounded-md mb-4'>
                      <div className='absolute inset-0 bg-gradient-to-r from-said-green/30 to-transparent mix-blend-overlay z-10'></div>
                      <img
                        src={project.image.url}
                        alt={project.title || 'Project image'}
                        className='w-full h-full object-cover object-center transform  transition-transform duration-700'
                      />
                    </div>

                    <h3 className='text-xl font-bold mb-2 text-said-green'>
                      {project.title || 'Untitled Project'}
                    </h3>
                    <p className='text-said-light-gray mb-4 line-clamp-2'>
                      {project.description}
                    </p>

                    <div className='flex flex-wrap gap-2 mb-4'>
                      {project.stack &&
                        Array.isArray(project.stack) &&
                        project.stack.slice(0, 3).map((tech, i) => (
                          <span key={i} className='skill-tag'>
                            {tech}
                          </span>
                        ))}
                      {project.stack &&
                        Array.isArray(project.stack) &&
                        project.stack.length > 3 && (
                          <span className='skill-tag'>
                            +{project.stack.length - 3}
                          </span>
                        )}
                    </div>
                  </div>
                ))}
              </div>

              <div className='flex justify-center mt-12'>
                <Link to='/projects'>
                  <Button
                    variant='outline'
                    size='lg'
                    className='button outline text-lg'
                  >
                    View All Projects
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='m9 18 6-6-6-6' />
                    </svg>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index

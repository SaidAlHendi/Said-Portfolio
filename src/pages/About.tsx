import React, { useEffect } from 'react'
import Background from '@/components/Background'

const About = () => {
  useEffect(() => {
    // Add animation classes after component mount
    const elements = document.querySelectorAll('.animate-on-mount')
    elements.forEach((element, index) => {
      setTimeout(() => {
        ;(element as HTMLElement).classList.add('animate-fade-in')
      }, index * 200)
    })
  }, [])

  const skills = [
    { name: 'TYPESCRIPT', category: 'language' },
    { name: 'NEXT.JS', category: 'framework' },
    { name: 'REACT.JS', category: 'library' },
    { name: 'NODE.JS', category: 'runtime' },
    { name: 'EXPRESS.JS', category: 'framework' },
    { name: 'MARIADB ', category: 'database' },
    { name: 'MONGODB', category: 'database' },
    { name: 'JWT', category: 'auth' },
    { name: 'MUI', category: 'ui' },
    { name: 'TAILWIND', category: 'css' },
    { name: 'SHADCN/UI', category: 'ui' },
    { name: 'FRAMER-MOTION', category: 'animation' },
    { name: 'FORM.IO', category: 'forms' },
    { name: 'SCSS', category: 'styling' },
    { name: 'GATSBYJS', category: 'framework' },
  ]

  return (
    <>
      <Background />
      <div className='min-h-screen relative z-10'>
        <div className='container mx-auto px-4 py-16 mt-20'>
          <div className='mb-16 opacity-0 animate-on-mount'>
            <h1 className='heading text-3xl mb-6'>About Me</h1>
            <p className='text-said-light-gray'>
              Here You Will Find More Information About Me, What I Do, And My
              Current Skills Mostly In Terms Of Programming And Technology.
            </p>
          </div>

          <div className='flex flex-col md:flex-row gap-12'>
            <div
              className='w-full md:w-1/2 opacity-0 animate-on-mount'
              style={{ animationDelay: '0.2s' }}
            >
              <h2 className='text-xl font-bold mb-4 text-said-green'>
                Get To Know Me!
              </h2>
              <div className='space-y-4 text-said-light-gray'>
                <p>
                  I am a full-stack developer with a passion for innovative and
                  creative solutions. For 5 years, I have been working on
                  developing digital products that inspire people and make their
                  lives easier.
                </p>
                <p>
                  What sets me apart from other developers is my ability to
                  combine technical solutions with design and user-friendliness.
                  I believe that a great product should not only be functional
                  but also provide a great user experience.
                </p>
                <p>
                  When I'm not sitting at the computer, I enjoy spending time in
                  nature and traveling the world to learn about different
                  cultures and languages.
                </p>
                <p>
                  I look forward to hearing from you and working on exciting
                  projects!
                </p>
              </div>
            </div>

            <div
              className='w-full md:w-1/2 opacity-0 animate-on-mount'
              style={{ animationDelay: '0.4s' }}
            >
              <h2 className='text-xl font-bold mb-4 text-said-green'>
                My Skills
              </h2>
              <div className='flex flex-wrap gap-3'>
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className='skill-tag opacity-0 animate-on-mount'
                    style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div
            className='mt-20 opacity-0 animate-on-mount'
            style={{ animationDelay: '0.8s' }}
          >
            <h2 className='text-xl font-bold mb-4 text-said-green'>
              Experience
            </h2>
            <div className='space-y-8'>
              <div className='border-l-2 border-said-green pl-6 relative'>
                <div className='absolute w-4 h-4 bg-said-green rounded-full -left-[9px] top-0'></div>
                <h3 className='font-bold mb-1'>Fullstack Developer</h3>
                <p className='text-said-green text-sm mb-2'>
                  IVOSTUD GMBH | JULY 2024 - PRESENT
                </p>
                <ul className='list-disc list-inside space-y-2 text-said-light-gray'>
                  <li>
                    Development of innovative software solutions for the
                    automotive sector, particularly for user interfaces and data
                    acquisition systems.
                  </li>
                  <li>
                    Backend development using Node.js and Express, alongside
                    frontend development with React.js and ShadcnUI.
                  </li>
                  <li>
                    Design and optimization of MariaDB (SQL) databases for
                    efficient data collection and management.
                  </li>
                  <li>
                    Independent project implementation and support within an
                    agile team.
                  </li>
                  <li>
                    Documentation of project features and participation in UI/UX
                    decisions to improve user experience.
                  </li>
                </ul>
              </div>

              <div className='border-l-2 border-said-green pl-6 relative'>
                <div className='absolute w-4 h-4 bg-said-green rounded-full -left-[9px] top-0'></div>
                <h3 className='font-bold mb-1'>
                  Forms Developer & Frontend Developer
                </h3>
                <p className='text-said-green text-sm mb-2'>
                  PUBLICPLAN GMBH | MARCH 2022 - JULY 2024
                </p>
                <ul className='list-disc list-inside space-y-2 text-said-light-gray'>
                  <li>
                    Development and digitization of municipal applications and
                    forms for public administration.
                  </li>
                  <li>
                    Implementation and customization of forms with Form.io and
                    Formsflow.ai for efficient administration.
                  </li>
                  <li>
                    Development and maintenance of the Forest platform for the
                    city of Düsseldorf, an open-source application for form
                    digitization without programming knowledge.
                  </li>
                  <li>
                    Design of user-friendly interfaces using React.js and
                    Bootstrap.
                  </li>
                  <li>
                    Active participation in agile Scrum teams for rapid
                    implementation of requirements and continuous product
                    improvement.
                  </li>
                  <li>
                    Documentation of projects and creation of user manuals to
                    improve application communication.
                  </li>
                </ul>
              </div>

              <div className='border-l-2 border-said-green pl-6 relative'>
                <div className='absolute w-4 h-4 bg-said-green rounded-full -left-[9px] top-0'></div>
                <h3 className='font-bold mb-1'>Junior Web Developer</h3>
                <p className='text-said-green text-sm mb-2'>
                  SQL SERVICE GMBH | OCTOBER 2020 - OCTOBER 2021
                </p>
                <ul className='list-disc list-inside space-y-2 text-said-light-gray'>
                  <li>
                    Design and creation of software solutions to improve
                    websites.
                  </li>
                  <li>
                    Programming and debugging of front-end and back-end
                    components.
                  </li>
                  <li>
                    Troubleshooting and optimizing the performance of web
                    applications.
                  </li>
                  <li>
                    Collaboration within the development team to understand and
                    implement requirements.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default About

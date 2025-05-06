import React from 'react'
import Background from '@/components/Background'
import ContactForm from '@/components/ContactForm'

const Contact = () => {
  return (
    <>
      <Background />
      <div className='min-h-screen relative z-10'>
        <div className='container mx-auto px-4 py-16 mt-20'>
          <div className='mb-16 opacity-0 animate-fade-in'>
            <h1 className='heading text-3xl mb-6'>Get In Touch</h1>
            <p className='text-said-light-gray'>
              Feel free to contact me by submitting the form below and I will
              get back to you as soon as possible.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
            <ContactForm />

            <div
              className='space-y-8 opacity-0 animate-fade-in'
              style={{ animationDelay: '0.3s' }}
            >
              <div>
                <h3 className='font-mono text-said-green mb-3'>// email</h3>
                <a
                  href='mailto:alhendisaid@gmail.com'
                  className='text-said-light-gray hover:text-said-green transition-colors'
                >
                  alhendisaid@gmail.com
                </a>
              </div>

              <div>
                <h3 className='font-mono text-said-green mb-3'>
                  // social_links
                </h3>
                <div className='flex space-x-6'>
                  <a
                    href='https://dev.to/said96dev'
                    target='_blank'
                    rel='noreferrer'
                    className='text-said-light-gray hover:text-said-green transition-colors'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                    >
                      <path d='M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.3zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68z' />
                    </svg>
                  </a>

                  <a
                    href='https://www.linkedin.com/in/said-al-hendi-410810208/'
                    target='_blank'
                    rel='noreferrer'
                    className='text-said-light-gray hover:text-said-green transition-colors'
                  >
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
                      <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z'></path>
                      <rect x='2' y='9' width='4' height='12'></rect>
                      <circle cx='4' cy='4' r='2'></circle>
                    </svg>
                  </a>

                  <a
                    href='https://github.com/SaidAlHendi'
                    target='_blank'
                    rel='noreferrer'
                    className='text-said-light-gray hover:text-said-green transition-colors'
                  >
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
                      <path d='M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22'></path>
                    </svg>
                  </a>
                </div>
              </div>

              <div>
                <h3 className='font-mono text-said-green mb-3'>// location</h3>
                <p className='text-said-light-gray'>Wuppertal, Germany</p>
              </div>

              <div className='pt-8 mt-8 border-t border-border'>
                <p className='text-said-light-gray italic'>
                  "I'm always open to discussing product design work or
                  partnership opportunities."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact

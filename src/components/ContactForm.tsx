import React, { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { useForm } from '@formspree/react'

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()
  const [state, handleSubmit] = useForm(import.meta.env.VITE_FORMSPOT_API_KEY)
  console.log(
    '🚀 ~ import.meta.env.VITE_FORMSPOT_API_KEY:',
    import.meta.env.VITE_FORMSPOT_API_KEY
  )

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitContactForm = (e: React.FormEvent) => {
    e.preventDefault()
    handleSubmit(formData)
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: 'Message sent!',
        description: "Thank you for your message. I'll get back to you soon.",
      })
      setFormData({ name: '', email: '', message: '' })
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <div className='bg-card rounded-lg p-6 border border-border shadow-lg relative z-10 animate-fade-in'>
      <div className='absolute -top-3 -left-3'>
        <div className='w-6 h-6 bg-said-green rounded-full'></div>
      </div>
      <div className='absolute -bottom-3 -right-3'>
        <div className='w-6 h-6 bg-said-green rounded-full'></div>
      </div>

      <div className='mb-6'>
        <h3 className='font-mono font-bold text-said-green'>// contact_form</h3>
      </div>

      <form onSubmit={handleSubmitContactForm} className='space-y-4'>
        <div>
          <label htmlFor='name' className='block mb-2 text-said-light-gray'>
            Your Name
          </label>
          <input
            id='name'
            name='name'
            type='text'
            value={formData.name}
            onChange={handleChange}
            required
            className='form-input'
            placeholder='Said Al-Hendi'
          />
        </div>

        <div>
          <label htmlFor='email' className='block mb-2 text-said-light-gray'>
            Email Address
          </label>
          <input
            id='email'
            name='email'
            type='email'
            value={formData.email}
            onChange={handleChange}
            required
            className='form-input'
            placeholder='alhendisaid@gmail.com'
          />
        </div>

        <div>
          <label htmlFor='message' className='block mb-2 text-said-light-gray'>
            Your Message
          </label>
          <textarea
            id='message'
            name='message'
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            className='form-input resize-none'
            placeholder="Hello, I'd like to talk about..."
          />
        </div>

        <button
          type='submit'
          disabled={isSubmitting}
          className='button w-full mt-4 group'
        >
          {isSubmitting ? (
            <span className='flex items-center justify-center'>
              <svg
                className='animate-spin -ml-1 mr-3 h-5 w-5 text-black'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
              Sending...
            </span>
          ) : (
            <span className='flex items-center justify-center'>
              Send Message
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='18'
                height='18'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='ml-2 transform group-hover:translate-x-1 transition-transform'
              >
                <line x1='5' y1='12' x2='19' y2='12'></line>
                <polyline points='12 5 19 12 12 19'></polyline>
              </svg>
            </span>
          )}
        </button>
      </form>
    </div>
  )
}

export default ContactForm

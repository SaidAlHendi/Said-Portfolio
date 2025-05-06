import React, { useEffect, useState } from 'react'
import { TextCursor } from 'lucide-react'

// ---------- Typing-Komponente ----------
interface CodeTypingEffectProps {
  code: string
  typingSpeed?: number
  cursorBlinkSpeed?: number
}

const CodeTypingEffect: React.FC<CodeTypingEffectProps> = ({
  code,
  typingSpeed = 30,
  cursorBlinkSpeed = 530,
}) => {
  const [displayedCode, setDisplayedCode] = useState<string>('')
  const [cursorVisible, setCursorVisible] = useState<boolean>(true)
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  useEffect(() => {
    if (currentIndex < code.length) {
      const timer = setTimeout(() => {
        setDisplayedCode((prev) => prev + code[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, typingSpeed)

      return () => clearTimeout(timer)
    }
  }, [currentIndex, code, typingSpeed])

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setCursorVisible((prev) => !prev)
    }, cursorBlinkSpeed)

    return () => clearInterval(cursorTimer)
  }, [cursorBlinkSpeed])

  const formatCode = (code: string) => {
    return code
      .replace(/(\/\/.*)/g, '<span class="comment">$1</span>')
      .replace(
        /(const|let|var|function|if|else|return|import|export|from)/g,
        '<span class="keyword">$1</span>'
      )
      .replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="string">$1</span>')
      .replace(/(\w+)(?=\s*\()/g, '<span class="function">$1</span>')
      .replace(/(\w+)(?=:)/g, '<span class="variable">$1</span>')
      .replace(/(\w+)(?=\.)/g, '<span class="object">$1</span>')
  }

  return (
    <div className='code-snippet'>
      <pre className='font-mono whitespace-pre-wrap break-words'>
        <span
          dangerouslySetInnerHTML={{ __html: formatCode(displayedCode) }}
        ></span>
        <span
          className={`inline-block w-[1ch] text-said-green ${
            cursorVisible ? 'opacity-100' : 'opacity-0'
          } transition-opacity`}
        >
          |
        </span>
      </pre>
    </div>
  )
}

interface Project {
  title: string
  github: string
  url: string
  stackCollection: {
    items: { stack: string }[]
  }
  image: {
    url: string
    title: string
  }
}

/* const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://graphql.contentful.com/content/v1/spaces/txj9waor5u3y',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization:
                'Bearer 02a97geeqYMdV58OgRo-e4IG1aad_o5A5sBmoVq-EiU',
            },
            body: JSON.stringify({
              query: `
                query {
                  projectsCollection {
                    items {
                      title
                      github
                      url
                      stack,
                      description,
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

        setProjects(data.projectsCollection.items)
      } catch (err) {
        setError('Fetch failed')
      }
    }

    fetchData()
  }, [])

  if (error) return <div>Fehler: {error}</div>

  return (
    <div>
      <h2>Projekte</h2>
      <ul>
        {projects.map((project, idx) => (
          <li key={idx}>
            <h3>{project.title}</h3>
            <a href={project.url}>Website</a> |{' '}
            <a href={project.github}>GitHub</a>
          </li>
        ))}
      </ul>
    </div>
  )
} */

export default CodeTypingEffect

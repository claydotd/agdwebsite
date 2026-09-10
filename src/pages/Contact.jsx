import { useEffect, useMemo, useRef, useState } from 'react'
import './Contact.css'

const CONTACT_EMAIL = 'hello@analoguegonedigital.co.uk'

// the form page hosted on netlify
const EMBED_URL = 'https://claydotd.netlify.app/embed/contact.html'

// used until the form reports its own height (see public/embed/form-height.js)
const FALLBACK_HEIGHT = 720
const MIN_HEIGHT = 240

function originOf(url) {
  try {
    return new URL(url).origin
  } catch {
    return null
  }
}

function heightFrom(data) {
  if (typeof data === 'number') return data

  if (typeof data === 'string') {
    if (!data.includes('height')) return null
    try {
      return heightFrom(JSON.parse(data))
    } catch {
      const match = data.match(/height["':\s]+(\d+(?:\.\d+)?)/i)
      return match ? Number(match[1]) : null
    }
  }

  if (data && typeof data === 'object') {
    const value = data.height ?? data.scrollHeight ?? data.payload?.height ?? data.data?.height
    return typeof value === 'number' ? value : Number.parseFloat(value) || null
  }

  return null
}

export default function Contact() {
  const frameRef = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [height, setHeight] = useState(null)

  const embedOrigin = useMemo(() => originOf(EMBED_URL), [])

  useEffect(() => {
    if (!embedOrigin) return

    const onMessage = (event) => {
      if (event.origin !== embedOrigin) return
      if (event.source !== frameRef.current?.contentWindow) return

      const next = heightFrom(event.data)
      if (Number.isFinite(next)) setHeight(Math.max(MIN_HEIGHT, Math.ceil(next)))
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [embedOrigin])

  return (
    <main className="contact-page">
      <header className="contact-hero">
        <h1 className="contact-title">contact</h1>
        <p className="contact-lead">
          tell me a bit about what you want to make and I&apos;ll get back to you. a couple of
          lines about the project, who it is for and roughly when you need it is plenty to start
          with.
        </p>
      </header>

      <section className="contact-embed" aria-label="enquiry form">
        {EMBED_URL ? (
          <>
            {!loaded && (
              <div className="contact-embed-loading" role="status">
                loading the form&hellip;
              </div>
            )}
            <iframe
              ref={frameRef}
              className={loaded ? 'contact-frame is-loaded' : 'contact-frame'}
              src={EMBED_URL}
              title="enquiry form"
              loading="lazy"
              style={{ height: `${height ?? FALLBACK_HEIGHT}px` }}
              onLoad={() => setLoaded(true)}
            />
          </>
        ) : (
          <p className="contact-embed-loading">
            the form is not connected at the minute. please email me in the meantime.
          </p>
        )}
      </section>

      <p className="contact-fallback">
        forms not playing nicely? just email{' '}
        <a className="contact-plain-link" href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
      </p>
    </main>
  )
}

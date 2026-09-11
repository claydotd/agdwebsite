import { Link } from 'react-router-dom'
import './WebDesignPage.css'

const modules = [
  {
    span: 'wide',
    label: '01',
    title: 'planning pages',
    text: 'design is always the first step. I\'ll work with you to create a plan for your website including colours, fonts, look & feel, and content structure.',
  },
  {
    span: 'tall',
    label: '02',
    title: 'ongoing management',
    text: 'I can manage updates, hosting coordination, and small improvements so your site stays current without you becoming a part-time web person.',
  },
  {
    span: 'standard',
    label: '03',
    title: 'performance & care',
    text: 'creating something that\'s nice to use across all devices and browsers is the goal. I\'ll make sure your site is accessible and easy to maintain.',
  },
  {
    span: 'standard',
    label: '04',
    title: 'content & structure',
    text: 'let your users or customers know what you\'re all about. the combination of look & feel, and the information on the site is key to getting the message across.',
  },
]

export default function WebDesignPage() {
  return (
    <main className="web-page">
      <div className="web-top">
        <Link className="web-back" to="/">
          ← home
        </Link>
        <p className="web-tag">beautifully simple.</p>
      </div>

      <header className="web-hero">
        <h1 className="web-title">
          web
          <br />
          design
        </h1>
        <div className="web-lead">
          <p>I'm on a mission to make the web a simpler place. </p>
          <p>that means <strong>no cookies</strong>, <strong>no tracking</strong>, and <strong>no ads</strong>.</p>
          <p>just personalised websites to show off <strong>who you are</strong> and <strong>what you do</strong>. no more sticking to templates and generic designs.</p>
          <p className="rates">
            pay what you can <span>+ domain name fee</span>
        </p>
          <Link className="web-cta" to="/portfolio#web">
            see the sites I&apos;ve built →
          </Link>
        </div>
      </header>

      <section className="web-grid reveal-stagger" aria-label="Services">
        {modules.map((mod) => (
          <article key={mod.label} className={`web-module web-module--${mod.span}`}>
            <span className="web-module-label">{mod.label}</span>
            <h2>{mod.title}</h2>
            <p>{mod.text}</p>
          </article>
        ))}
      </section>
      <aside className="web-aside">
        <p>
          I can build a website from scratch and coordinate hosting and updates, or I can build custom components for shopify websites.
          whatever you need, I'm here to help make it happen.
        </p>
        <Link className="web-cta" to="/contact">
          get in touch →
        </Link>
      </aside>
    </main>
  )
}

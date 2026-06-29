import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom'
import { PROJECTS } from './data/projectsData.js'
import ProjectsPage from './pages/ProjectsPage.jsx'
import ProjectDetailPage from './pages/ProjectDetailPage.jsx'
import {
  FiMail, FiPhone
} from 'react-icons/fi'
import {
  FaWhatsapp, FaInstagram
} from 'react-icons/fa'
import {
  HiArrowLeft, HiArrowRight
} from 'react-icons/hi'
import { FiChevronDown } from 'react-icons/fi'

// ─── Animation Variants ───────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}

const slideIn = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } }
}

// ─── Data ────────────────────────────────────────────────────────────

const SERVICES = [
  {
    num: '01',
    name: 'Branding & Identity',
    desc: 'We build visual identities that command attention and tell your story before you say a word.',
    tags: ['Logo Design', 'Brand Guidelines', 'Visual Identity']
  },
  {
    num: '02',
    name: 'Graphic Design',
    desc: 'Print, digital, illustration — visual communication that stops the scroll and holds the gaze.',
    tags: ['Print Design', 'Illustration', 'Visual Comms']
  },
  {
    num: '03',
    name: 'Web & UI/UX Design',
    desc: 'Websites and interfaces that look stunning, load fast, and convert visitors into clients.',
    tags: ['Wireframes', 'Prototypes', 'Design Systems']
  },
  {
    num: '04',
    name: 'Digital Marketing',
    desc: 'Data-driven campaigns that reach the right people at the right moment on the right platform.',
    tags: ['Social Media', 'Campaigns', 'Content Strategy']
  },
  {
    num: '05',
    name: 'Motion & Animation',
    desc: 'Movement that breathes life into your brand — from micro-interactions to full motion campaigns.',
    tags: ['After Effects', 'Lottie', 'Motion Graphics']
  },
  {
    num: '06',
    name: 'SEO & Analytics',
    desc: 'We make sure your audience can find you, and we give you the data to grow smarter.',
    tags: ['On-Page SEO', 'Technical SEO', 'Local SEO']
  }
]

// PROJECTS imported from data

const PROCESS_STEPS = [
  { num: '01', title: 'Discovery', desc: 'We learn your business, your audience, and what makes you different.' },
  { num: '02', title: 'Strategy', desc: 'We map out the right approach — positioning, platforms, and plan.' },
  { num: '03', title: 'Creation', desc: 'We design, build, and craft every detail to the highest standard.' },
  { num: '04', title: 'Launch & Grow', desc: 'We deliver, support the launch, and track performance together.' }
]

const TESTIMONIALS = [
  {
    text: 'Dezola completely transformed how our brand is perceived. We went from being invisible online to being the most talked-about brand in our category. Absolutely world-class work.',
    name: 'Adaeze Obi',
    company: 'CEO, Alara Lagos'
  },
  {
    text: 'The website they built for us is not just beautiful — it converts. Our enquiries tripled in the first month after launch. I recommend Dezola to everyone.',
    name: 'Emeka Nwosu',
    company: 'Founder, Nairawise'
  },
  {
    text: 'Their motion work for our campaign was on a global level. Clients kept asking who made it. That\'s the Dezola effect.',
    name: 'Bola Adesanya',
    company: 'Marketing Director, Lagos Fashion Week'
  }
]

const MARQUEE_ITEMS = [
  'Branding', 'Web Design', 'Motion & Animation', 'SEO & Analytics', 'Digital Marketing', 'Graphic Design'
]

const FILTER_CATS = ['All', 'Branding', 'Web', 'Motion', 'Marketing']

// ─── Custom Cursor ──────────────────────────────────────────────────
function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches
    if (isTouchDevice) return

    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px'
        dotRef.current.style.top = e.clientY + 'px'
      }
    }

    const animateRing = () => {
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + 'px'
        ringRef.current.style.top = ringPos.current.y + 'px'
      }
      rafRef.current = requestAnimationFrame(animateRing)
    }

    window.addEventListener('mousemove', onMove)
    rafRef.current = requestAnimationFrame(animateRing)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  )
}

// ─── Navigation ────────────────────────────────────────────────────
export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navigate = useNavigate()
  const location = useLocation()

  const scrollTo = (id) => {
    if (location.pathname !== '/') {
      navigate(`/#${id}`)
    } else {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  const mobileVariants = {
    hidden: { opacity: 0, clipPath: 'inset(0 0 100% 0)' },
    visible: { opacity: 1, clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
    exit: { opacity: 0, clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }
  }

  const linkVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <>
      <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <Link to="/" className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="/logo-text.png" alt="Dezola Studio" className="nav-logo-img" />
        </Link>

        <ul className="nav-links">
          {[['work', 'Work'], ['services', 'Services'], ['about', 'About'], ['contact', 'Contact']].map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollTo(id) }}>{label}</a>
            </li>
          ))}
        </ul>

        <motion.button
          className="btn-primary desktop-nav-btn"
          style={{ fontSize: 12 }}
          onClick={() => scrollTo('contact')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Start a project
        </motion.button>

        <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <span /><span /><span />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-overlay"
            variants={mobileVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <button className="mobile-overlay-close" onClick={() => setMenuOpen(false)}>×</button>
            <div className="mobile-overlay-logo">
              <img src="/logo-text.png" alt="Dezola Studio" className="mobile-overlay-logo-img" />
            </div>
            <motion.div
              variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
              initial="hidden"
              animate="visible"
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
            >
              {[['work', 'Work'], ['services', 'Services'], ['about', 'About'], ['contact', 'Contact']].map(([id, label]) => (
                <motion.a
                  key={id}
                  className="mobile-nav-link"
                  variants={linkVariants}
                  onClick={() => scrollTo(id)}
                  href={`#${id}`}
                >
                  {label}
                </motion.a>
              ))}
              
              <motion.button
                variants={linkVariants}
                className="btn-primary-inv mobile-nav-btn"
                onClick={() => scrollTo('contact')}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Start a project
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── Hero ──────────────────────────────────────────────────────────
function Hero() {
  const words = ['We', 'build', 'brands']
  const words2 = ['that', 'move', 'people.']

  return (
    <section className="hero dot-grid" id="hero">
      <div className="hero-content">
        <div className="hero-text">
          <motion.span
            className="hero-label"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            [ Oyo, Nigeria — Est. 2024 ]
          </motion.span>

          <motion.div
            className="gold-accent-line"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 40, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            style={{ marginBottom: 20 }}
          />

          <h1 className="hero-headline">
            <span style={{ display: 'block' }}>
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  style={{ display: 'inline-block', marginRight: word === 'build' ? '0.25em' : word !== 'brands' ? '0.25em' : '0' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + i * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
            <span style={{ display: 'block' }}>
              {words2.map((word, i) => (
                <motion.span
                  key={i}
                  className={word === 'move' ? 'italic-gold' : ''}
                  style={{ display: 'inline-block', marginRight: i < words2.length - 1 ? '0.25em' : '0' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + i * 0.1, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                >
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            className="hero-subtext"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            A full-service creative studio in Lagos — branding, web design, motion, and digital marketing for brands that refuse to blend in.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.6 }}
          >
            <a href="#work" className="btn-primary" onClick={(e) => { e.preventDefault(); document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' }) }}>
              See our work
            </a>
            <a href="#contact" className="btn-outline" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}>
              Get in touch
            </a>
          </motion.div>
        </div>

        <div className="hero-watermark" aria-hidden="true">
          DEZOLA
        </div>
      </div>

      {/* Marquee */}
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {[0, 1].map((rep) => (
            <div key={rep} className="marquee-content">
              {MARQUEE_ITEMS.map((item, i) => (
                <span key={i} className="marquee-item">
                  {item} <span className="marquee-dot">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Services ─────────────────────────────────────────────────────
function Services() {
  return (
    <section className="services-section" id="services">
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <span className="section-label">[ 01 ]</span>
      </div>

      <motion.div
        className="services-header"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div className="gold-accent-line" variants={fadeUp} />
        <motion.h2 className="services-heading" variants={fadeUp}>What we do</motion.h2>
        <motion.p className="services-subtext" variants={fadeUp}>
          Six disciplines. One studio. Endless possibilities.
        </motion.p>
      </motion.div>

      <motion.div
        className="services-grid"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {SERVICES.map((svc) => (
          <motion.div key={svc.num} className="service-card" variants={fadeUp}>
            <span className="service-number">{svc.num}</span>
            <h3 className="service-name">{svc.name}</h3>
            <p className="service-desc">{svc.desc}</p>
            <div className="service-tags">
              {svc.tags.map((tag) => (
                <span key={tag} className="service-tag">{tag}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

// ─── Work / Portfolio ─────────────────────────────────────────────
function ProjectCard({ project }) {
  const randomShot = useMemo(() => {
    if (!project.screenshots || project.screenshots.length === 0) return null
    const idx = Math.floor(Math.random() * project.screenshots.length)
    return project.screenshots[idx]
  }, [project.id])

  return (
    <Link to={`/projects/${project.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
      <div
        className="portfolio-card-bg"
        style={{
          background: project.gradient,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {randomShot?.type === 'image' && (
          <img
            src={randomShot.src}
            alt={project.title}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
            }}
            className="portfolio-card-screenshot"
            draggable={false}
          />
        )}
      </div>
      <div className="portfolio-overlay">
        <div className="portfolio-arrow">→</div>
        <h3 className="portfolio-title">{project.title}</h3>
        <span className="portfolio-category">{project.desc}</span>
      </div>
    </Link>
  )
}

function Work() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = PROJECTS.filter(p => activeFilter === 'All' || p.category === activeFilter)

  return (
    <section className="work-section dot-grid" id="work">
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <span className="section-label">[ 02 ]</span>
      </div>

      <motion.div
        className="work-header"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div className="gold-accent-line" variants={fadeUp} />
        <motion.h2 className="work-heading" variants={fadeUp}>Selected work</motion.h2>
        <motion.p className="work-subtext" variants={fadeUp}>Projects we&apos;re proud of.</motion.p>
      </motion.div>

      <div className="filter-tabs" style={{ maxWidth: 1280, margin: '0 auto 48px' }}>
        {FILTER_CATS.map(cat => (
          <button
            key={cat}
            className={`filter-tab ${activeFilter === cat ? 'active' : ''}`}
            onClick={() => setActiveFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <motion.div
        className="portfolio-grid"
        layout
        style={{ maxWidth: 1280, margin: '0 auto' }}
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              className="portfolio-card"
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <Link to="/projects" className="view-all-link">View all projects →</Link>
      </motion.div>
    </section>
  )
}


// ─── Process ──────────────────────────────────────────────────────
function Process() {
  return (
    <section className="process-section" id="process">
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <span className="section-label">[ 03 ]</span>
      </div>

      <motion.div
        className="process-header"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div className="gold-accent-line" variants={fadeUp} />
        <motion.h2 className="process-heading" variants={fadeUp}>How we work</motion.h2>
      </motion.div>

      <motion.div
        className="process-steps"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {PROCESS_STEPS.map((step) => (
          <motion.div key={step.num} className="process-step" variants={fadeUp}>
            <div className="process-step-num-bg">{step.num}</div>
            <span className="process-step-num">{step.num}</span>
            <h3 className="process-step-title">{step.title}</h3>
            <p className="process-step-desc">{step.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

// ─── About ───────────────────────────────────────────────────────
function About() {
  return (
    <section className="about-section" id="about">
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <span className="section-label">[ 04 ]</span>
      </div>

      <motion.div
        className="about-inner"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {/* Left — Quote Block */}
        <motion.div className="about-quote-block" variants={fadeUp}>
          <div className="gold-accent-line" />
          <p className="about-label">— 01 —</p>
          <blockquote className="about-big-quote">
            "Design is not decoration. It is the difference between being seen and being remembered."
          </blockquote>
        </motion.div>

        {/* Right — Text Block */}
        <motion.div className="about-text-block" variants={fadeUp}>
          <div className="gold-accent-line" />
          <h2 className="about-heading">About Dezola</h2>
          <div className="about-body">
            <p>
              Dezola Studio is a Lagos-based creative agency built for businesses that take their brand seriously.
            </p>
            <p>
              We combine strategy, design, and technology to build brands, websites, and digital experiences that compete at the highest level — locally and globally.
            </p>
            <p>
              We're not a one-size-fits-all shop. Every project we take on gets obsessive attention to detail, a bespoke strategy, and a team that genuinely cares about your results.
            </p>
          </div>

          <div className="about-stats">
            <div>
              <div className="about-stat-num">50+</div>
              <div className="about-stat-label">Projects completed</div>
            </div>
            <div>
              <div className="about-stat-num">3+</div>
              <div className="about-stat-label">Years of experience</div>
            </div>
          </div>

          <motion.a
            href="#contact"
            className="btn-primary-inv"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            whileHover={{ scale: 1.02 }}
          >
            Work with us
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── Testimonials ────────────────────────────────────────────────
function Testimonials() {
  const [index, setIndex] = useState(0)
  const total = TESTIMONIALS.length
  const visibleCount = 3
  const maxIndex = Math.max(0, total - visibleCount)

  const prev = () => setIndex(i => Math.max(0, i - 1))
  const next = () => setIndex(i => Math.min(maxIndex, i + 1))

  return (
    <section className="testimonials-section" id="testimonials">
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <span className="section-label">[ 05 ]</span>
      </div>

      <motion.div
        className="testimonials-header"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <motion.div className="gold-accent-line" variants={fadeUp} />
        <motion.h2 className="testimonials-heading" variants={fadeUp}>What clients say</motion.h2>
      </motion.div>

      <motion.div
        className="testimonials-carousel"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        variants={fadeUp}
      >
        <div className="testimonials-track-wrapper">
          <div
            className="testimonials-track"
            style={{ transform: `translateX(calc(-${index * (100 / visibleCount)}% - ${index * 8}px))` }}
          >
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div className="testimonial-quote-mark">"</div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-divider" />
                <p className="testimonial-name">— {t.name}</p>
                <p className="testimonial-company">{t.company}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="testimonials-nav">
          <button className="testimonial-nav-btn" onClick={prev} disabled={index === 0} aria-label="Previous">
            <HiArrowLeft />
          </button>
          <button className="testimonial-nav-btn" onClick={next} disabled={index >= maxIndex} aria-label="Next">
            <HiArrowRight />
          </button>
        </div>
      </motion.div>
    </section>
  )
}

// ─── Custom Select ────────────────────────────────────────────────
function CustomSelect({ options, value, onChange, placeholder, name }) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="custom-select" ref={containerRef}>
      <button
        type="button"
        className={`custom-select-button ${isOpen ? 'open' : ''} ${!value ? 'placeholder' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value || placeholder}</span>
        <FiChevronDown className="custom-select-icon" />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="custom-select-dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {options.map((opt) => (
              <div
                key={opt}
                className="custom-select-option"
                onClick={() => {
                  onChange({ target: { name, value: opt } })
                  setIsOpen(false)
                }}
              >
                {opt}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Contact ─────────────────────────────────────────────────────
// Web3Forms: get your free access key at https://web3forms.com
// Replace the value below with your own key (takes 60 seconds — just enter your email)
const WEB3FORMS_KEY = 'a8bbebf8-92f7-4a68-be42-d7a807fabe9b'

function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', service: '', budget: '', message: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const payload = {
        access_key: WEB3FORMS_KEY,
        subject: `New project enquiry from ${formData.name} — Dezola Studio`,
        from_name: 'Dezola Studio Website',
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'Not provided',
        company: formData.company || 'Not provided',
        service: formData.service || 'Not specified',
        budget: formData.budget || 'Not specified',
        message: formData.message,
        botcheck: ''
      }

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload)
      })

      const data = await res.json()

      if (data.success) {
        setSubmitted(true)
      } else {
        setError('Something went wrong. Please email us directly at bb2010ng@gmail.com')
      }
    } catch {
      setError('Network error. Please try again or email bb2010ng@gmail.com directly.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  return (
    <section className="contact-section dot-grid" id="contact">
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <span className="section-label">[ 06 ]</span>
      </div>

      <div className="contact-inner" style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Left */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div className="gold-accent-line" variants={fadeUp} />
          <motion.h2 className="contact-heading" variants={fadeUp}>
            Let&apos;s build something <em>great.</em>
          </motion.h2>
          <motion.p className="contact-subtext" variants={fadeUp}>
            Tell us about your project. We respond within 24 hours.
          </motion.p>

          <motion.div className="contact-details" variants={staggerContainer}>
            {[
              { icon: <FiMail className="contact-item-icon" />, text: 'bb2010ng@gmail.com', href: 'mailto:bb2010ng@gmail.com' },
              { icon: <FiPhone className="contact-item-icon" />, text: '+234 904 842 8304', href: 'tel:+2349048428304' },
              { icon: <FaWhatsapp className="contact-item-icon" />, text: '+234 904 842 8304', href: 'https://wa.me/2349048428304' },
              { icon: <FaInstagram className="contact-item-icon" />, text: '@realmarsgale', href: 'https://instagram.com/realmarsgale' }
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.href}
                className="contact-item"
                variants={slideIn}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {item.icon}
                <span>{item.text}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                className="contact-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="form-field">
                  <label htmlFor="name">Full name *</label>
                  <input id="name" name="name" type="text" required placeholder="Your full name" value={formData.name} onChange={handleChange} />
                </div>
                <div className="form-field">
                  <label htmlFor="email">Email address *</label>
                  <input id="email" name="email" type="email" required placeholder="your@email.com" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-field">
                  <label htmlFor="phone">Phone number</label>
                  <input id="phone" name="phone" type="tel" placeholder="Your phone number" value={formData.phone} onChange={handleChange} />
                </div>
                <div className="form-field">
                  <label htmlFor="company">Company / Business name</label>
                  <input id="company" name="company" type="text" placeholder="Your company" value={formData.company} onChange={handleChange} />
                </div>
                <div className="form-field">
                  <label>Service needed</label>
                  <CustomSelect
                    name="service"
                    placeholder="Select a service"
                    value={formData.service}
                    onChange={handleChange}
                    options={[
                      'Branding',
                      'Graphic Design',
                      'Web & UI/UX',
                      'Digital Marketing',
                      'Motion & Animation',
                      'SEO & Analytics',
                      'Full Package'
                    ]}
                  />
                </div>
                <div className="form-field">
                  <label>Project budget</label>
                  <CustomSelect
                    name="budget"
                    placeholder="Select budget range"
                    value={formData.budget}
                    onChange={handleChange}
                    options={[
                      'Under ₦500k',
                      '₦500k – ₦2M',
                      '₦2M – ₦5M',
                      '₦5M+',
                      'Let\'s discuss'
                    ]}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="message">Tell us about your project</label>
                  <textarea id="message" name="message" rows={4} placeholder="Describe your project, goals, and timeline..." value={formData.message} onChange={handleChange} />
                </div>
                {error && (
                  <p style={{ color: '#C8A97E', fontSize: '13px', fontFamily: 'var(--font-body)', lineHeight: 1.5 }}>
                    {error}
                  </p>
                )}
                <button type="submit" className="btn-submit" disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
                  {loading ? 'Sending…' : 'Send message →'}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                className="form-success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="form-success-icon">✓</span>
                <p className="form-success-text">
                  Message received.<br />
                  We&apos;ll be in touch within 24 hours.<br />
                  <span style={{ opacity: 0.6, fontSize: '16px' }}>— The Dezola team</span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────
export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <img src="/logo-text-dark.png" alt="Dezola Studio" className="footer-logo-img" />
        </div>
        <div className="footer-tagline">Oyo · Nigeria — Creative Studio</div>
        <div className="footer-socials">
          <a href="https://instagram.com/realmarsgale" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://wa.me/2349048428304" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="WhatsApp">
            <FaWhatsapp />
          </a>
        </div>
      </div>

      <div className="footer-divider" />

      <div className="footer-bottom">
        <p className="footer-copy">© {year} Dezola Studio. All rights reserved.</p>
        <p className="footer-credit">Designed &amp; built by Dezola Studio</p>
      </div>
    </footer>
  )
}

// ─── Home Component ────────────────────────────────────────────────
function Home() {
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '')
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      window.scrollTo(0, 0)
    }
  }, [location])

  return (
    <>
      <Helmet>
        <title>Dezola Studio — Creative Agency in Oyo, Nigeria</title>
        <meta name="description" content="Dezola Studio is a full-service creative agency in Oyo, Nigeria. We offer branding, web design, motion graphics, digital marketing, and SEO." />
        <meta name="keywords" content="creative agency Oyo, branding Nigeria, web design Oyo, UI UX design Nigeria, digital marketing Nigeria" />
        <meta property="og:title" content="Dezola Studio — Creative Agency Oyo, Nigeria" />
        <meta property="og:description" content="Premium branding, web design, and digital marketing for Nigerian businesses." />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/og-image.png" />
      </Helmet>
      <Hero />
      <Services />
      <Work />
      <Process />
      <About />
      <Testimonials />
    </>
  )
}

// ─── App Root ─────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="page-wrapper">
      <CustomCursor />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
      </Routes>
      <Contact />
      <Footer />
    </div>
  )
}

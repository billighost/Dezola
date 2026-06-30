import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'
import { generateLegalPDF } from '../utils/generateLegalPDF'
import './LegalPage.css'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
}

export default function LegalPage({ content }) {
  const [activeSection, setActiveSection] = useState(content.sections[0]?.id)
  const [downloading, setDownloading] = useState(false)
  const [mobileTocOpen, setMobileTocOpen] = useState(false)
  const sectionRefs = useRef({})

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [content.slug])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [content.slug])

  const scrollToSection = (id) => {
    const el = sectionRefs.current[id]
    if (el) {
      const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 64
      const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 24
      window.scrollTo({ top, behavior: 'smooth' })
    }
    setMobileTocOpen(false)
  }

  const handleDownload = async () => {
    setDownloading(true)
    try {
      await generateLegalPDF(content)
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="legal-page dot-grid" style={{ paddingTop: 'var(--nav-height)', minHeight: '100vh', background: 'var(--cream)' }}>
      <SEO
        title={content.label}
        canonicalPath={`/${content.slug}`}
        description={content.subtitle}
      />

      {/* Hero */}
      <div className="legal-hero">
        <div className="legal-hero-inner">
          <span className="section-label">{content.kicker}</span>
          <div className="gold-accent-line" />
          <h1 className="legal-title">
            {content.title} <em style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>{content.titleEm}</em>
          </h1>
          <p className="legal-subtitle">{content.subtitle}</p>

          <div className="legal-meta-row">
            <div className="legal-meta-text">
              <span className="legal-meta-label">Effective {content.effectiveDate}</span>
              <span className="legal-meta-sub">{content.meta}</span>
            </div>
            <motion.button
              className="btn-primary legal-download-btn"
              onClick={handleDownload}
              disabled={downloading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {downloading ? 'Preparing PDF…' : 'Download as PDF ↓'}
            </motion.button>
          </div>

          <div className="legal-hero-watermark">{content.slug === 'terms' ? 'T&C' : '§'}</div>
        </div>
      </div>

      <div className="legal-body">
        {/* Mobile TOC toggle */}
        <button
          className={`legal-mobile-toc-toggle ${mobileTocOpen ? 'open' : ''}`}
          onClick={() => setMobileTocOpen((v) => !v)}
        >
          <span>Jump to section</span>
          <span className="legal-mobile-toc-icon">▾</span>
        </button>

        <div className="legal-grid">
          {/* TOC */}
          <nav className={`legal-toc ${mobileTocOpen ? 'open' : ''}`}>
            <span className="legal-toc-label">Contents</span>
            <ul>
              {content.sections.map((s) => (
                <li key={s.id}>
                  <button
                    className={activeSection === s.id ? 'active' : ''}
                    onClick={() => scrollToSection(s.id)}
                  >
                    <span className="legal-toc-num">{s.num}</span>
                    <span>{s.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Content */}
          <div className="legal-content">
            {content.sections.map((s, i) => (
              <motion.section
                key={s.id}
                id={s.id}
                ref={(el) => (sectionRefs.current[s.id] = el)}
                className="legal-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={fadeUp}
              >
                <div className="legal-section-head">
                  <span className="legal-section-num">{s.num}</span>
                  <h2 className="legal-section-title">{s.title}</h2>
                </div>

                {s.paragraphs && s.paragraphs.map((p, pi) => (
                  <p className="legal-paragraph" key={pi}>{p}</p>
                ))}

                {s.subsections && s.subsections.map((sub, si) => (
                  <div className="legal-subsection" key={si}>
                    <h3 className="legal-subsection-heading">{sub.heading}</h3>
                    {sub.paragraphs.map((p, pi) => (
                      <p className="legal-paragraph" key={pi}>{p}</p>
                    ))}
                  </div>
                ))}

                {i < content.sections.length - 1 && <div className="legal-section-divider" />}
              </motion.section>
            ))}

            {content.footnote && (
              <div className="legal-footnote">
                <span className="legal-footnote-icon">*</span>
                <p>{content.footnote}</p>
              </div>
            )}

            <div className="legal-bottom-cta">
              <p className="legal-bottom-text">Have a question about this document?</p>
              <a href="/#contact" className="legal-bottom-link">Get in touch →</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

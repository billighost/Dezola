import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi'
import { SERVICES } from '../data/servicesData'
import { PROJECTS } from '../data/projectsData'
import './ServiceDetailPage.css'

export default function ServiceDetailPage() {
  const { slug } = useParams()
  const currentIndex = SERVICES.findIndex(s => s.slug === slug)
  const service = SERVICES[currentIndex]

  const prevService = currentIndex > 0 ? SERVICES[currentIndex - 1] : SERVICES[SERVICES.length - 1]
  const nextService = currentIndex >= 0 && currentIndex < SERVICES.length - 1 ? SERVICES[currentIndex + 1] : SERVICES[0]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!service) {
    return (
      <div style={{ paddingTop: '200px', textAlign: 'center', minHeight: '100vh', background: 'var(--ink)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '48px', color: 'var(--cream)' }}>Service not found</h2>
        <Link to="/#services" className="btn-primary-inv" style={{ marginTop: '32px', display: 'inline-block' }}>Back to all services</Link>
      </div>
    )
  }

  const relatedProjects = (() => {
    const matched = PROJECTS.filter(p => p.category === service.relatedCategory)
    const unique = []
    const seenIds = new Set()
    for (const p of matched) {
      if (!seenIds.has(p.id)) {
        seenIds.add(p.id)
        unique.push(p)
      }
      if (unique.length === 3) break
    }
    if (unique.length > 0) return unique
    // Fallback: first 3 unique projects if no category match
    const fallback = []
    const seen = new Set()
    for (const p of PROJECTS) {
      if (!seen.has(p.id)) {
        seen.add(p.id)
        fallback.push(p)
      }
      if (fallback.length === 3) break
    }
    return fallback
  })()

  return (
    <div className="service-detail-page">
      <Helmet>
        <title>{service.name} Services — Dezola Studio</title>
        <meta name="description" content={service.fullDesc} />
      </Helmet>

      {/* Back Navigation Bar */}
      <motion.div
        className="service-back-bar"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="service-back-bar-inner">
          <Link to="/#services" className="service-back-link">
            <HiArrowLeft /> All Services
          </Link>
          <div className="service-category-tag">{service.name}</div>
        </div>
      </motion.div>

      {/* Hero */}
      <div className="service-hero-section dot-grid">
        <div className="service-hero-inner">
          <span className="section-label">[ {service.num} ]</span>
          <motion.div
            className="gold-accent-line"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          />
          <motion.h1
            className="service-hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {service.name}
          </motion.h1>
          <motion.p
            className="service-hero-desc"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {service.fullDesc}
          </motion.p>

          {service.idealFor && (
            <motion.p
              className="service-ideal-for"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span>Ideal for —</span> {service.idealFor}
            </motion.p>
          )}

          <motion.div
            className="service-tags"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            {service.tags.map((tag) => (
              <span key={tag} className="service-tag">{tag}</span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            style={{ marginTop: '40px' }}
          >
            <Link to="/#contact" className="btn-primary-inv">
              Start your {service.name.toLowerCase()} project →
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Process */}
      <motion.div
        className="service-process-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="gold-accent-line" />
        <h2 className="service-section-heading">How we deliver it</h2>
        <div className="service-process-steps">
          {service.process.map((step, i) => (
            <motion.div
              key={step.title}
              className="service-process-step"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
            >
              <span className="service-process-num">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="service-process-title">{step.title}</h3>
              <p className="service-process-desc">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Deliverables — reuses the shared .deliverable-* classes from index.css */}
      {service.deliverables && service.deliverables.length > 0 && (
        <motion.div
          className="project-deliverables-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="gold-accent-line" />
          <h2 className="project-deliverables-heading">Deliverables</h2>
          <p className="project-deliverables-subtext">
            Here&apos;s exactly what you walk away with when you bring a {service.name.toLowerCase()} project to Dezola.
          </p>
          <ul className="deliverables-grid">
            {service.deliverables.map((item, i) => (
              <motion.li
                key={i}
                className="deliverable-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.4, 0, 0.2, 1] }}
              >
                <div className="deliverable-card-top">
                  <span className="deliverable-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="deliverable-check">✓</span>
                </div>
                <span className="deliverable-text">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Related Work */}
      {relatedProjects.length > 0 && (
        <motion.div
          className="service-related-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="gold-accent-line" />
          <h2 className="service-section-heading">Related work</h2>
          <div className="service-related-grid">
            {relatedProjects.map((project) => (
              <Link
                key={`${project.id}-${project.category}`}
                to={`/project/${project.id}/${project.category.toLowerCase()}`}
                className="service-related-card"
              >
                <div
                  className="service-related-card-bg"
                  style={{ background: project.gradient }}
                >
                  {project.screenshots?.[0]?.type === 'image' && (
                    <img
                      src={project.screenshots[0].src}
                      alt={project.title}
                      loading="lazy"
                      className="service-related-card-img"
                      draggable={false}
                    />
                  )}
                </div>
                <div className="service-related-card-info">
                  <h3>{project.title}</h3>
                  <span>{project.desc}</span>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* Next / Previous Service Navigation */}
      <motion.div
        className="service-next-prev"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <Link to={`/services/${prevService.slug}`} className="service-prev-link">
          <span className="service-nav-dir">← Previous</span>
          <span className="service-nav-title">{prevService.name}</span>
        </Link>
        <Link to={`/services/${nextService.slug}`} className="service-next-link">
          <span className="service-nav-dir">Next →</span>
          <span className="service-nav-title">{nextService.name}</span>
        </Link>
      </motion.div>
    </div>
  )
}

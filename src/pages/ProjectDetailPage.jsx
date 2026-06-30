import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PROJECTS } from '../data/projectsData'
import { Helmet } from 'react-helmet-async'
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi'
import { useInfiniteCarousel } from '../hooks/useInfiniteCarousel'
import './ProjectDetailPage.css'

export default function ProjectDetailPage() {
  const { id, category } = useParams()
  const currentIndex = PROJECTS.findIndex(p => p.id === id && p.category.toLowerCase() === category?.toLowerCase())
  const project = PROJECTS[currentIndex]
  
  const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : null
  const nextProject = currentIndex >= 0 && currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : null

  const [currentSlide, setCurrentSlide] = useState(1)
  const totalSlides = project?.screenshots?.length || 1

  const extendedScreenshots = project?.screenshots ? [...project.screenshots, ...project.screenshots, ...project.screenshots] : []

  const {
    trackRef: galleryRef,
    handleScroll: handleCarouselScroll,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
    scrollTo: scrollGallery,
    getMetrics
  } = useInfiniteCarousel({ itemCount: totalSlides, gapPx: 16, resetKey: id })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  const handleScroll = () => {
    handleCarouselScroll()
    const track = galleryRef.current
    if (!track) return
    const { cardWidth } = getMetrics()
    if (!cardWidth) return
    const newIndex = Math.round(track.scrollLeft / cardWidth) + 1
    let actualIndex = newIndex % totalSlides
    if (actualIndex === 0) actualIndex = totalSlides
    setCurrentSlide(actualIndex)
  }

  if (!project) {
    return (
      <div style={{ paddingTop: '200px', textAlign: 'center', minHeight: '100vh', background: 'var(--ink)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '48px', color: 'var(--cream)' }}>Project not found</h2>
        <Link to="/projects" className="btn-primary-inv" style={{ marginTop: '32px', display: 'inline-block' }}>Return to all projects</Link>
      </div>
    )
  }

  const clientName = project.title.includes(' — ') ? project.title.split(' — ')[0] : project.title

  return (
    <div className="project-detail-page">
      <Helmet>
        <title>{project.title} — Dezola Studio</title>
        <meta name="description" content={project.fullDesc} />
      </Helmet>

      {/* Section A — Back Navigation Bar */}
      <motion.div 
        className="project-back-bar"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="project-back-bar-inner">
          <Link to="/projects" className="project-back-link">
            <HiArrowLeft /> All Projects
          </Link>
          <div className="project-category-tag">
            {project.category}
          </div>
        </div>
      </motion.div>

      {/* Section B — Project Hero */}
      <div className="project-hero-section dot-grid">
        <div className="project-hero-inner">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.div 
              className="gold-accent-line" 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            />
            <motion.h1 
              className="project-hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              {project.title}
            </motion.h1>
            
            <motion.p 
              className="project-hero-desc"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              {project.fullDesc}
            </motion.p>
            
            {project.url && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                style={{ marginTop: '40px' }}
              >
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn-primary-inv">
                  Visit Live Site →
                </a>
              </motion.div>
            )}
          </motion.div>

          <motion.div 
            className="project-meta-block"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <div className="project-meta-row">
              <span className="project-meta-label">Category</span>
              <span className="project-meta-value">{project.category}</span>
            </div>
            {project.desc && (
              <div className="project-meta-row">
                <span className="project-meta-label">Type</span>
                <span className="project-meta-value">{project.desc}</span>
              </div>
            )}
            <div className="project-meta-row">
              <span className="project-meta-label">Client</span>
              <span className="project-meta-value">{clientName}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section B.5 — Deliverables */}
      {project.deliverables && project.deliverables.length > 0 && (
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
            For this engagement, our team focused on providing top-tier {project.category.toLowerCase()} services to ensure {clientName} achieved their business goals. Here's what we delivered.
          </p>
          <ul className="deliverables-grid">
            {project.deliverables.map((item, i) => (
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

      {/* Section C — Screenshot Gallery */}
      <motion.div 
        className="project-gallery-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="gold-accent-line" />
        <h2 className="project-gallery-heading">Project Gallery</h2>
        
        <div 
          className="project-gallery"
          ref={galleryRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onScroll={handleScroll}
        >
          {(!project.screenshots || project.screenshots.length === 0) ? (
            <div className="project-gallery-card" style={{ background: 'var(--charcoal)', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', color: 'rgba(245,240,232,0.5)', fontSize: '24px' }}>
                Gallery coming soon
              </span>
            </div>
          ) : extendedScreenshots.map((shot, idx) => (
            <div key={idx} className="project-gallery-card" style={{ background: shot.type === 'image' ? '#111' : shot.color }}>
              {shot.type === 'image' ? (
                <img
                  src={shot.src}
                  alt={`${project.title} screenshot ${shot.id || (idx % totalSlides) + 1}`}
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 'inherit' }}
                  draggable={false}
                />
              ) : (
                <>
                  <div className="project-gallery-card-overlay" />
                  <div className="project-gallery-card-label">0{shot.id || ((idx % totalSlides) + 1)}</div>
                </>
              )}
            </div>
          ))}


        </div>
        
        {project.screenshots && project.screenshots.length > 0 && (
          <div className="project-gallery-controls">
            <div className="project-gallery-counter">
              {String(currentSlide).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
            </div>
            <div className="project-gallery-nav">
              <button className="project-gallery-nav-btn" onClick={() => scrollGallery('prev')}>
                <HiArrowLeft />
              </button>
              <button className="project-gallery-nav-btn" onClick={() => scrollGallery('next')}>
                <HiArrowRight />
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Section D — Next / Previous Project Navigation */}
      <motion.div 
        className="project-next-prev"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <Link 
          to={prevProject ? `/project/${prevProject.id}/${prevProject.category.toLowerCase()}` : '#'} 
          className="project-prev-link"
          style={!prevProject ? { opacity: 0.2, pointerEvents: 'none' } : {}}
        >
          <span className="project-nav-dir">← Previous</span>
          <span className="project-nav-title">{prevProject?.title || 'None'}</span>
        </Link>
        
        <Link 
          to={nextProject ? `/project/${nextProject.id}/${nextProject.category.toLowerCase()}` : '#'} 
          className="project-next-link"
          style={!nextProject ? { opacity: 0.2, pointerEvents: 'none' } : {}}
        >
          <span className="project-nav-dir">Next →</span>
          <span className="project-nav-title">{nextProject?.title || 'None'}</span>
        </Link>
      </motion.div>
    </div>
  )
}


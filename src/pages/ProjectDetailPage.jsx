import { useEffect, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PROJECTS } from '../data/projectsData'
import { Helmet } from 'react-helmet-async'
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi'

export default function ProjectDetailPage() {
  const { id } = useParams()
  const currentIndex = PROJECTS.findIndex(p => p.id === id)
  const project = PROJECTS[currentIndex]
  
  const prevProject = currentIndex > 0 ? PROJECTS[currentIndex - 1] : null
  const nextProject = currentIndex >= 0 && currentIndex < PROJECTS.length - 1 ? PROJECTS[currentIndex + 1] : null

  const galleryRef = useRef(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const scrollTimeout = useRef(null)
  
  const [currentSlide, setCurrentSlide] = useState(1)
  const totalSlides = project?.screenshots?.length || 1

  const extendedScreenshots = project?.screenshots ? [...project.screenshots, ...project.screenshots, ...project.screenshots] : []

  useEffect(() => {
    window.scrollTo(0, 0)
    
    if (galleryRef.current && totalSlides > 0) {
      const cardWidth = galleryRef.current.children[0]?.offsetWidth || 0
      const gap = 16
      const oneSetWidth = totalSlides * (cardWidth + gap)
      galleryRef.current.style.scrollBehavior = 'auto'
      galleryRef.current.scrollLeft = oneSetWidth
      
      requestAnimationFrame(() => {
        if (galleryRef.current) galleryRef.current.style.scrollBehavior = 'smooth'
      })
    }
  }, [id, totalSlides])

  if (!project) {
    return (
      <div style={{ paddingTop: '200px', textAlign: 'center', minHeight: '100vh', background: 'var(--ink)' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '48px', color: 'var(--cream)' }}>Project not found</h2>
        <Link to="/projects" className="btn-primary-inv" style={{ marginTop: '32px', display: 'inline-block' }}>Return to all projects</Link>
      </div>
    )
  }

  const handleMouseDown = (e) => {
    isDragging.current = true
    startX.current = e.pageX - galleryRef.current.offsetLeft
    scrollLeft.current = galleryRef.current.scrollLeft
    if (galleryRef.current) {
      galleryRef.current.style.cursor = 'grabbing'
      galleryRef.current.style.scrollBehavior = 'auto'
      galleryRef.current.style.scrollSnapType = 'none'
    }
  }

  const handleMouseLeave = () => {
    isDragging.current = false
    if (galleryRef.current) {
      galleryRef.current.style.cursor = 'grab'
      galleryRef.current.style.scrollBehavior = 'smooth'
      galleryRef.current.style.scrollSnapType = 'x mandatory'
    }
  }

  const handleMouseUp = () => {
    isDragging.current = false
    if (galleryRef.current) {
      galleryRef.current.style.cursor = 'grab'
      galleryRef.current.style.scrollBehavior = 'smooth'
      galleryRef.current.style.scrollSnapType = 'x mandatory'
    }
  }

  const handleMouseMove = (e) => {
    if (!isDragging.current) return
    e.preventDefault()
    const x = e.pageX - galleryRef.current.offsetLeft
    const walk = (x - startX.current) * 1.5
    if (galleryRef.current) galleryRef.current.scrollLeft = scrollLeft.current - walk
  }
  
  const handleScroll = () => {
    if (!galleryRef.current) return
    const scrollPos = galleryRef.current.scrollLeft
    const cardWidth = galleryRef.current.children[0]?.offsetWidth || 1
    const newIndex = Math.round(scrollPos / cardWidth) + 1
    
    let actualIndex = newIndex % totalSlides
    if (actualIndex === 0) actualIndex = totalSlides
    setCurrentSlide(actualIndex)

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
    
    scrollTimeout.current = setTimeout(() => {
      if (!galleryRef.current) return
      
      const gap = 16
      const oneSetWidth = totalSlides * (cardWidth + gap)
      
      if (galleryRef.current.scrollLeft <= cardWidth) {
        galleryRef.current.style.scrollSnapType = 'none'
        galleryRef.current.style.scrollBehavior = 'auto'
        galleryRef.current.scrollLeft += oneSetWidth
        
        setTimeout(() => {
          if (galleryRef.current) {
            galleryRef.current.style.scrollBehavior = 'smooth'
            galleryRef.current.style.scrollSnapType = 'x mandatory'
          }
        }, 50)
      } else if (galleryRef.current.scrollLeft >= oneSetWidth * 2 - cardWidth) {
        galleryRef.current.style.scrollSnapType = 'none'
        galleryRef.current.style.scrollBehavior = 'auto'
        galleryRef.current.scrollLeft -= oneSetWidth
        
        setTimeout(() => {
          if (galleryRef.current) {
            galleryRef.current.style.scrollBehavior = 'smooth'
            galleryRef.current.style.scrollSnapType = 'x mandatory'
          }
        }, 50)
      }
    }, 150)
  }
  
  const scrollGallery = (direction) => {
    if (!galleryRef.current) return
    const cardWidth = galleryRef.current.children[0]?.offsetWidth || 0
    const scrollAmount = direction === 'next' ? (cardWidth + 16) : -(cardWidth + 16)
    galleryRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
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
          to={prevProject ? `/projects/${prevProject.id}` : '#'} 
          className="project-prev-link"
          style={!prevProject ? { opacity: 0.2, pointerEvents: 'none' } : {}}
        >
          <span className="project-nav-dir">← Previous</span>
          <span className="project-nav-title">{prevProject?.title || 'None'}</span>
        </Link>
        
        <Link 
          to={nextProject ? `/projects/${nextProject.id}` : '#'} 
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


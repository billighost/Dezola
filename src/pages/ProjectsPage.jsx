import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PROJECTS } from '../data/projectsData'
import SEO from '../components/SEO'
import './ProjectsPage.css'

const FILTER_CATS = ['All', 'Branding', 'Web', 'Motion', 'Marketing']

function ProjectCard({ project }) {
  const randomShot = useMemo(() => {
    if (!project.screenshots || project.screenshots.length === 0) return null
    const idx = Math.floor(Math.random() * project.screenshots.length)
    return project.screenshots[idx]
  }, [project.id])

  return (
    <Link to={`/project/${project.id}/${project.category.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
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
            loading="lazy"
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

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const filtered = PROJECTS.filter(p => activeFilter === 'All' || p.category === activeFilter)

  return (
    <div className="projects-page dot-grid" style={{ paddingTop: 'var(--nav-height)', paddingBottom: '120px', minHeight: '100vh', background: 'var(--cream)' }}>
      <SEO
        title="All Projects"
        canonicalPath="/projects"
        description="View all of our creative projects including branding, web design, and digital marketing."
      />

      {/* Hero Header Block */}
      <div className="projects-page-hero">
        <div className="projects-page-hero-inner">
          <span className="section-label">[ 02 ]</span>
          <div className="gold-accent-line" />
          <h1 className="projects-page-title">
            All <em style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic' }}>Projects</em>
          </h1>
          <p className="projects-page-subtitle">
            Every project is a commitment to excellence.
          </p>
          <div className="projects-page-hero-watermark">
            50+
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 5%' }}>
        {/* Filter Tabs */}
        <div className="filter-tabs" style={{ margin: '56px auto 40px', maxWidth: 1280 }}>
          {FILTER_CATS.map(cat => (
            <motion.button
              key={cat}
              className={`filter-tab ${activeFilter === cat ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat)}
              whileHover={{ y: -2 }}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Project Count Line */}
        <div className="projects-count-line">
          Showing {filtered.length} projects
        </div>

        {/* Portfolio Grid */}
        <motion.div className="portfolio-grid" layout>
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
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View all / Back to Home CTA */}
        <Link to="/#work" className="view-all-link">
          Back to Home
        </Link>
      </div>
    </div>
  )
}


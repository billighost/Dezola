import { useRef, useEffect, useCallback } from 'react'

/**
 * useInfiniteCarousel
 *
 * Drives a "triple the items, silently jump back to the middle set" infinite
 * carousel without the visible pop/jump glitch. Root causes that were fixed
 * compared to the old per-component implementations:
 *
 *  1. Card width is measured once (after layout has settled, via a double
 *     rAF) and cached — never re-read from the DOM inside a scroll handler.
 *  2. A ResizeObserver watches the track so cached dimensions are recomputed
 *     when the layout changes (e.g. a breakpoint switch), not just on mount.
 *  3. Boundary detection happens immediately inside onScroll (cheap number
 *     comparison against cached values) instead of waiting on a debounce.
 *  4. The actual "snap back to the middle set" correction is wrapped in
 *     requestAnimationFrame (scrollBehavior -> auto -> rAF -> corrected
 *     scrollLeft -> rAF -> scrollBehavior -> smooth) so it always lands
 *     between paints and is genuinely invisible.
 *  5. The boundary threshold is 1.5x the card width (not 1x), so a fast
 *     flick can't outrun detection.
 *
 * @param {Object} opts
 * @param {number} opts.itemCount - number of unique items (before tripling)
 * @param {number} [opts.gapPx] - gap between cards, in px, matching the CSS
 * @param {number} [opts.thresholdMultiplier] - how many card-widths from the
 *   edge to trigger the recenter (default 1.5, per spec — wide buffer for
 *   fast flicks)
 * @param {*} [opts.resetKey] - when this value changes, re-measure and
 *   re-center the track (e.g. pass the current project id so navigating to
 *   a new project recenters the gallery)
 */
export function useInfiniteCarousel({ itemCount, gapPx = 0, thresholdMultiplier = 1.5, resetKey }) {
  const trackRef = useRef(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeftStart = useRef(0)
  const dims = useRef({ cardWidth: 0, oneSetWidth: 0 })
  const correcting = useRef(false)

  const measure = useCallback(() => {
    const track = trackRef.current
    if (!track || !track.children.length || !itemCount) return
    const cardWidth = track.children[0].offsetWidth
    if (!cardWidth) return
    dims.current = {
      cardWidth,
      oneSetWidth: itemCount * (cardWidth + gapPx)
    }
  }, [itemCount, gapPx])

  // Measure once layout has genuinely settled, then center the scroll
  // position on the middle set. Re-runs when itemCount or resetKey changes
  // (e.g. switching to a project with a different screenshot count).
  useEffect(() => {
    let raf1
    let raf2
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        measure()
        const track = trackRef.current
        if (track && dims.current.oneSetWidth) {
          track.style.scrollBehavior = 'auto'
          track.scrollLeft = dims.current.oneSetWidth
          requestAnimationFrame(() => {
            if (track) track.style.scrollBehavior = 'smooth'
          })
        }
      })
    })
    return () => {
      cancelAnimationFrame(raf1)
      if (raf2) cancelAnimationFrame(raf2)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [measure, itemCount, resetKey])

  // Recompute cached dimensions if the track's layout changes (breakpoint
  // resize, font load reflow, etc.) — without re-measuring inside scroll.
  useEffect(() => {
    const track = trackRef.current
    if (!track || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(() => measure())
    ro.observe(track)
    return () => ro.disconnect()
  }, [measure])

  const recenter = useCallback((delta) => {
    const track = trackRef.current
    if (!track || correcting.current) return
    correcting.current = true
    track.style.scrollSnapType = 'none'
    track.style.scrollBehavior = 'auto'
    requestAnimationFrame(() => {
      if (track) track.scrollLeft += delta
      requestAnimationFrame(() => {
        if (track) {
          track.style.scrollBehavior = 'smooth'
          track.style.scrollSnapType = 'x mandatory'
        }
        correcting.current = false
      })
    })
  }, [])

  const handleScroll = useCallback(() => {
    const track = trackRef.current
    const { cardWidth, oneSetWidth } = dims.current
    if (!track || !cardWidth || !oneSetWidth || correcting.current) return
    const threshold = cardWidth * thresholdMultiplier
    const pos = track.scrollLeft
    if (pos <= threshold) {
      recenter(oneSetWidth)
    } else if (pos >= oneSetWidth * 2 - threshold) {
      recenter(-oneSetWidth)
    }
  }, [recenter, thresholdMultiplier])

  const handleMouseDown = useCallback((e) => {
    const track = trackRef.current
    if (!track) return
    isDragging.current = true
    startX.current = e.pageX - track.offsetLeft
    scrollLeftStart.current = track.scrollLeft
    track.style.cursor = 'grabbing'
    track.style.scrollBehavior = 'auto'
    track.style.scrollSnapType = 'none'
  }, [])

  const endDrag = useCallback(() => {
    isDragging.current = false
    const track = trackRef.current
    if (track) {
      track.style.cursor = 'grab'
      track.style.scrollBehavior = 'smooth'
      track.style.scrollSnapType = 'x mandatory'
    }
  }, [])

  const handleMouseMove = useCallback((e) => {
    const track = trackRef.current
    if (!isDragging.current || !track) return
    e.preventDefault()
    const x = e.pageX - track.offsetLeft
    const walk = (x - startX.current) * 1.5
    track.scrollLeft = scrollLeftStart.current - walk
  }, [])

  const scrollTo = useCallback((direction) => {
    const track = trackRef.current
    const { cardWidth } = dims.current
    if (!track || !cardWidth) return
    const amount = (cardWidth + gapPx) * (direction === 'next' ? 1 : -1)
    track.scrollBy({ left: amount, behavior: 'smooth' })
  }, [gapPx])

  const getMetrics = useCallback(() => dims.current, [])

  return {
    trackRef,
    handleScroll,
    handleMouseDown,
    handleMouseLeave: endDrag,
    handleMouseUp: endDrag,
    handleMouseMove,
    scrollTo,
    getMetrics
  }
}

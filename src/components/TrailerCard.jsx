import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'

function TrailerCard({ trailerKey, posterUrl, alt }) {
  const [open, setOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const overlayRef = useRef(null)

  useEffect(() => {
    if (!open || !overlayRef.current) return
    overlayRef.current.requestFullscreen?.().catch(() => {})
  }, [open])

  useEffect(() => {
    const handleFSChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFSChange)
    return () => document.removeEventListener('fullscreenchange', handleFSChange)
  }, [])

  const handlePlayClick = (e) => {
    e.stopPropagation()
    setOpen(true)
  }

  const handleClose = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {})
    setOpen(false)
    setIsFullscreen(false)
  }

  const handleMinimize = (e) => {
    e.stopPropagation()
    document.exitFullscreen().catch(() => {})
  }

  const handleMaximize = (e) => {
    e.stopPropagation()
    overlayRef.current?.requestFullscreen?.().catch(() => {})
  }

  return (
    <>
      <div className="media-wrapper">
        {trailerKey ? (
          <button
            className="trailer-thumb-btn"
            onClick={handlePlayClick}
            aria-label={`Voir la bande-annonce de ${alt}`}
          >
            <img
              src={`https://img.youtube.com/vi/${trailerKey}/hqdefault.jpg`}
              alt={`Miniature bande-annonce ${alt}`}
              className="trailer-thumb"
            />
            <span className="play-icon">▶</span>
          </button>
        ) : (
          <img className="media-poster-thumb" src={posterUrl} alt={alt} />
        )}
      </div>

      {open && createPortal(
        <div ref={overlayRef} className="trailer-modal-overlay" onClick={handleClose}>
          <div className="trailer-modal-content" onClick={e => e.stopPropagation()}>
            <div className="trailer-modal-actions">
              {isFullscreen ? (
                <button className="trailer-modal-btn" onClick={handleMinimize} aria-label="Réduire">⊡</button>
              ) : (
                <button className="trailer-modal-btn" onClick={handleMaximize} aria-label="Plein écran">⛶</button>
              )}
              <button className="trailer-modal-btn" onClick={handleClose} aria-label="Fermer">✕</button>
            </div>
            <iframe
              className="trailer-modal-iframe"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&hl=fr&cc_lang_pref=fr&cc_load_policy=1`}
              title={`Bande-annonce ${alt}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>
        </div>,
        document.body
      )}
    </>
  )
}

export default TrailerCard

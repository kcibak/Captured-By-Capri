import React, { useState, useRef, useEffect } from 'react';
import type { KeyboardEvent } from 'react';
import './gallery.css';

interface GalleryImage {
  thumb: string;
  full: string;
}

interface GalleryProps {
  title: string;
  images: GalleryImage[];
}

const Gallery: React.FC<GalleryProps> = ({ title, images }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{x: number, y: number} | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (modalOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [modalOpen]);

  const openModal = (idx: number) => {
    setCurrentIdx(idx);
    setModalOpen(true);
    setZoom(1);
  };
  const closeModal = () => {
    setModalOpen(false);
    setZoom(1);
  };
  const zoomIn = () => setZoom(z => Math.min(z + 0.25, 3));
  const zoomOut = () => setZoom(z => Math.max(z - 0.25, 1));
  const resetZoom = () => setZoom(1);
  const prevImg = (e?: React.MouseEvent | KeyboardEvent) => {
    e?.stopPropagation();
    setCurrentIdx((idx) => {
      const newIdx = idx === 0 ? images.length - 1 : idx - 1;
      setZoom(1);
      return newIdx;
    });
  };
  const nextImg = (e?: React.MouseEvent | KeyboardEvent) => {
    e?.stopPropagation();
    setCurrentIdx((idx) => {
      const newIdx = idx === images.length - 1 ? 0 : idx + 1;
      setZoom(1);
      return newIdx;
    });
  };
  const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!modalOpen) return;
    if (e.key === 'ArrowLeft') prevImg(e);
    if (e.key === 'ArrowRight') nextImg(e);
    if (e.key === 'Escape') closeModal();
  };

  // Drag handlers for panning
  const onMouseDown = (e: React.MouseEvent) => {
    if (zoom === 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current || !dragStart) return;
    scrollRef.current.scrollLeft -= (e.clientX - dragStart.x);
    scrollRef.current.scrollTop -= (e.clientY - dragStart.y);
    setDragStart({ x: e.clientX, y: e.clientY });
  };
  const onMouseUp = () => {
    setIsDragging(false);
    setDragStart(null);
  };
  const onMouseLeave = () => {
    setIsDragging(false);
    setDragStart(null);
  };
  // Touch events
  const onTouchStart = (e: React.TouchEvent) => {
    if (zoom === 1) return;
    const t = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: t.clientX, y: t.clientY });
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current || !dragStart) return;
    const t = e.touches[0];
    scrollRef.current.scrollLeft -= (t.clientX - dragStart.x);
    scrollRef.current.scrollTop -= (t.clientY - dragStart.y);
    setDragStart({ x: t.clientX, y: t.clientY });
  };
  const onTouchEnd = () => {
    setIsDragging(false);
    setDragStart(null);
  };

  return (
    <section>
      <h2 className="gallery-section-title">{title}</h2>
      <div className="gallery-grid">
        {images.map((img, idx) => (
          <div className="gallery-img-box" key={idx} onClick={() => openModal(idx)}>
            <img
              src={`/${img.thumb}`}
              alt={title + ' ' + (idx + 1)}
              loading="lazy"
              draggable="false"
              style={{ userSelect: 'none' }}
              onContextMenu={e => e.preventDefault()}
              className="no-user-drag"
            />
          </div>
        ))}
      </div>
      {modalOpen && (
        <>
          <div className="gallery-zoom-controls-fixed">
            <button onClick={zoomOut} aria-label="Zoom out">-</button>
            <button onClick={resetZoom} aria-label="Reset zoom">⟳</button>
            <button onClick={zoomIn} aria-label="Zoom in">+</button>
            <button className="gallery-modal-close-fixed" onClick={closeModal} aria-label="Close">×</button>
          </div>
          <button className="gallery-modal-arrow left" onClick={prevImg} aria-label="Previous">&#8592;</button>
          <div
            className="gallery-modal"
            tabIndex={0}
            ref={modalRef}
            onClick={closeModal}
            onKeyDown={handleKey}
          >
            <div
              className={zoom === 1 ? "gallery-modal-content" : "gallery-modal-content-scrollable"}
              ref={scrollRef}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseLeave}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              style={zoom === 1 ? undefined : { cursor: isDragging ? 'grabbing' : 'grab' }}
              onClick={e => e.stopPropagation()}
            >
              <img
                src={`/${images[currentIdx].full}`}
                alt={title + ' enlarged'}
                style={{ transform: `scale(${zoom})`, transition: 'transform 0.2s', userSelect: 'none' }}
                draggable="false"
                onContextMenu={e => e.preventDefault()}
                className="no-user-drag"
              />
            </div>
          </div>
          <button className="gallery-modal-arrow right" onClick={nextImg} aria-label="Next">&#8594;</button>
        </>
      )}
    </section>
  );
};

export default Gallery;

import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent } from 'react'
import { person } from '../data/content'
import './ResumeDownload.css'

const iconPath = `${import.meta.env.BASE_URL}icons/`

const insertDuration = 280
const pocketScale = .74
const dragLift = 18
type Point = { x: number; y: number }
type Pocket = {
  left: number; right: number; top: number; floor: number; landing: Point
  clearanceX: number; clearanceY: number; approachRange: number; guideHeight: number
}
type Placement = { offset: Point; over: boolean; approach: number; behindFlap: boolean }
const home: Placement = { offset: { x: 0, y: 0 }, over: false, approach: 0, behindFlap: false }
const pickup: Placement = { ...home, offset: { x: 0, y: -dragLift } }
type Drag = {
  pointerId: number
  start: Point
  previous: Point
  pocket: Pocket
  stoppedX: number | null
  started: boolean
}

// Measure the gap between the fitted sheet and the open flap, including its
// perspective overhang. Both reach their final pose before their edges meet.
function approachProgress(pocket: Pocket, point: Point) {
  const gapX = Math.max(pocket.left - point.x, point.x - pocket.right) - pocket.clearanceX
  const gapY = pocket.top - point.y - pocket.clearanceY
  const gap = Math.hypot(Math.max(0, gapX), Math.max(0, gapY)) / pocket.approachRange
  const below = Math.max(0, (point.y - pocket.floor) / pocket.guideHeight - 1)
  const t = Math.max(0, 1 - Math.hypot(gap, below))
  return t * t * (3 - 2 * t)
}

// Once the paper hits the floor, excess pointer travel stays outside the pocket.
function projectDrag(drag: Drag, point: Point): Placement {
  const { pocket, previous } = drag
  drag.previous = point

  if (point.y > pocket.floor) {
    if (drag.stoppedX === null && previous.y <= pocket.floor) {
      // Intersect the movement segment so a quick diagonal cannot skip the floor.
      const t = (pocket.floor - previous.y) / (point.y - previous.y)
      const x = previous.x + (point.x - previous.x) * t
      if (x >= pocket.left && x <= pocket.right) drag.stoppedX = x
    }
    if (drag.stoppedX === null && previous.y > pocket.floor && previous.y <= pocket.floor + pocket.guideHeight
        && previous.x >= pocket.left && previous.x <= pocket.right && point.y > previous.y) {
      drag.stoppedX = previous.x
    }
    if (drag.stoppedX !== null) {
      return { offset: { x: drag.stoppedX, y: pocket.floor }, over: true, approach: 1, behindFlap: true }
    }
  } else {
    drag.stoppedX = null
  }

  const approach = approachProgress(pocket, point)
  const excess = Math.max(0, point.y - pocket.floor)
  const behindFlap = approach > 0 && excess <= pocket.guideHeight
  const over = behindFlap && point.x >= pocket.left && point.x <= pocket.right && point.y >= pocket.top
  // Guide a low side approach just high enough for the sheet to fit through the opening.
  const offset = { x: point.x, y: point.y - excess * approach }
  return { offset, over, approach, behindFlap }
}

export function ResumeDownload() {
  const id = useId()
  const file = useRef<HTMLButtonElement>(null)
  const fileOrigin = useRef<HTMLSpanElement>(null)
  const folderArt = useRef<HTMLSpanElement>(null)
  const drag = useRef<Drag | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const restoreTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [phase, setPhase] = useState<'idle' | 'dragging' | 'received'>('idle')
  const [dropTarget, setDropTarget] = useState<Point | null>(null)
  const [keyboardDrag, setKeyboardDrag] = useState(false)
  const [{ offset, over, approach, behindFlap }, setPlacement] = useState(home)

  function resetDrag() {
    const current = drag.current
    drag.current = null
    setKeyboardDrag(false)
    if (current && file.current?.hasPointerCapture(current.pointerId)) file.current.releasePointerCapture(current.pointerId)
    setPlacement(home)
    setPhase((value) => value === 'dragging' ? 'idle' : value)
  }

  useEffect(() => {
    function key(event: KeyboardEvent) {
      if (event.key === 'Escape') resetDrag()
    }
    window.addEventListener('keydown', key)
    window.addEventListener('blur', resetDrag)
    window.addEventListener('resize', resetDrag)
    return () => {
      clearTimeout(timer.current)
      clearTimeout(restoreTimer.current)
      window.removeEventListener('keydown', key)
      window.removeEventListener('blur', resetDrag)
      window.removeEventListener('resize', resetDrag)
    }
  }, [])

  function measurePocket(): Pocket | null {
    if (!folderArt.current || !fileOrigin.current) return null
    const folder = folderArt.current.getBoundingClientRect()
    const paper = fileOrigin.current.getBoundingClientRect()
    const left = folder.left - (paper.left + paper.width / 2)
    const top = folder.top - (paper.top + paper.height / 2)
    const entryOverlap = folder.width * .08
    const leadingEdge = paper.width * pocketScale / 2 - entryOverlap
    // The hinge in the WhiteSur SVG is at 85.9% of the canvas height.
    return {
      left: left + folder.width * .0625 - leadingEdge,
      right: left + folder.width * .9375 + leadingEdge,
      top: top + folder.height * .14,
      floor: top + folder.height * .859 - paper.height * pocketScale / 2 - 1,
      landing: { x: left + folder.width / 2, y: top + folder.height * .64 },
      clearanceX: entryOverlap + folder.width * .12,
      clearanceY: paper.height * pocketScale / 2 + folder.height * .04,
      approachRange: folder.width * .58,
      guideHeight: folder.height * .14,
    }
  }

  function finishDrop(offset: Point, pocket: Pocket) {
    resetDrag()
    setPlacement({ offset, over: false, approach: 1, behindFlap: true })
    setDropTarget(pocket.landing)
    clearTimeout(restoreTimer.current)
    restoreTimer.current = setTimeout(() => {
      setPlacement(home)
      setDropTarget(null)
    }, insertDuration)
    const link = document.createElement('a')
    link.href = person.resumePath
    link.download = 'cv_larionov.pdf'
    link.click()
    clearTimeout(timer.current)
    setPhase('received')
    timer.current = setTimeout(() => setPhase('idle'), 2400)
  }

  function onPointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (event.button !== 0 || !event.isPrimary || event.pointerType === 'touch') return
    const pocket = measurePocket()
    if (!pocket) return
    resetDrag()
    clearTimeout(timer.current)
    clearTimeout(restoreTimer.current)
    setDropTarget(null)
    setPlacement(pickup)
    setPhase('dragging')
    drag.current = {
      pointerId: event.pointerId, start: { x: event.pageX, y: event.pageY },
      previous: { x: 0, y: -dragLift }, pocket, stoppedX: null, started: false,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function onPointerMove(event: PointerEvent<HTMLButtonElement>) {
    const current = drag.current
    if (!current || event.pointerId !== current.pointerId) return
    const x = event.pageX - current.start.x
    const y = event.pageY - current.start.y
    if (Math.hypot(x, y) >= 6) current.started = true
    const placement = projectDrag(current, { x, y: y - dragLift })
    setPlacement(placement)
  }

  function onPointerUp(event: PointerEvent<HTMLButtonElement>) {
    const current = drag.current
    if (!current || event.pointerId !== current.pointerId) return
    if (current.started) {
      const placement = projectDrag(current, {
        x: event.pageX - current.start.x, y: event.pageY - current.start.y - dragLift,
      })
      if (placement.over) return finishDrop(placement.offset, current.pocket)
    }
    resetDrag()
  }

  function onKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>) {
    if (drag.current) return
    const pocket = measurePocket()
    if (!pocket) return
    if (event.key === ' ') {
      event.preventDefault()
      if (event.repeat) return
      if (!keyboardDrag) {
        clearTimeout(timer.current)
        clearTimeout(restoreTimer.current)
        setDropTarget(null)
        setPlacement(pickup)
        setKeyboardDrag(true)
        setPhase('dragging')
      } else if (over) {
        finishDrop(offset, pocket)
      } else {
        resetDrag()
      }
    } else if (keyboardDrag && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
      event.preventDefault()
      const toFolder = event.key === 'ArrowRight'
      setPlacement(toFolder
        ? { offset: { x: pocket.landing.x, y: pocket.floor }, over: true, approach: 1, behindFlap: true }
        : pickup)
    }
  }

  // Near the source the image animates the lift. At the folder, placement owns it entirely.
  const paperY = phase === 'dragging' ? offset.y + dragLift * (1 - approach) : offset.y
  const dropStyle = {
    '--approach': approach,
    '--pocket-scale': pocketScale,
    '--drag-lift': `${dragLift}px`,
    '--insert-duration': `${insertDuration}ms`,
    '--pocket-x': dropTarget && `${dropTarget.x}px`,
    '--inside-y': dropTarget && `${dropTarget.y}px`,
  } as CSSProperties

  return <section className="resume-download" data-phase={phase} data-pointer-drag={phase === 'dragging' && !keyboardDrag} data-over={over} data-behind-flap={behindFlap} data-absorbing={!!dropTarget} style={dropStyle} aria-labelledby={`${id}-title`}>
    <h3 className="resume-download__heading" id={`${id}-title`}>Резюме</h3>
    <div className="resume-download__desk">
      <button ref={file} type="button" className="resume-download__file"
        aria-label="Переместить файл Резюме.pdf" aria-describedby={`${id}-hint ${id}-keys`}
        onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp}
        onPointerCancel={resetDrag} onLostPointerCapture={() => { if (drag.current) resetDrag() }}
        onKeyDown={onKeyDown} onBlur={() => { if (keyboardDrag) resetDrag() }}>
        <span ref={fileOrigin} className="resume-download__file-origin">
          <span className="resume-download__file-art" style={{ transform: `translate(${offset.x}px, ${paperY}px)` }}>
            <img src={`${iconPath}untitled-ui/pdf.svg`} alt="" draggable={false} />
          </span>
        </span>
        <span className="resume-download__name">Резюме.pdf</span>
      </button>
      <div className="resume-download__route" aria-hidden="true">
        <svg viewBox="0 0 180 36" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 18h134" strokeDasharray="6 10" />
          <path d="M150 18h21m-9-9 9 9-9 9" />
        </svg>
      </div>
      <div className="resume-download__folder">
        <span ref={folderArt} className="resume-download__folder-art">
          <img className="resume-folder-back" src={`${iconPath}whitesur/folder-back.svg`} alt="" draggable={false} />
          <img className="resume-folder-front" src={`${iconPath}whitesur/folder-front.svg`} alt="" draggable={false} />
        </span>
        <span className="resume-download__name">Загрузки</span>
      </div>
    </div>
    <div className="resume-download__caption">
      <p className="resume-download__instruction" id={`${id}-hint`}>
        Перетащите файл, чтобы скачать.
      </p>
      <span className="resume-download__keys" id={`${id}-keys`}>Пробел — взять файл, → — переместить в папку, пробел — отпустить</span>
      <p className="resume-download__status" role="status">{phase === 'received' ? 'Скачивание началось' : over ? 'Отпустите, чтобы скачать' : ''}</p>
    </div>
  </section>
}

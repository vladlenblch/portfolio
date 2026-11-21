import { useLayoutEffect, useRef } from 'react'

// Play each reveal once per page load.
const seenThisPage = new Set<string>()

function remember(element: HTMLElement) {
  const id = element.dataset.reveal
  if (id) seenThisPage.add(id)
}

export function attachScrollReveal(root: HTMLElement) {
  const elements = [...root.querySelectorAll<HTMLElement>('[data-reveal]')]
  const pending = new Set<HTMLElement>()
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  let observer: IntersectionObserver | undefined
  let disposed = false

  function finish(element: HTMLElement) {
    pending.delete(element)
    observer?.unobserve(element)
    element.dataset.revealState = 'visible'
    element.style.removeProperty('--apt-reveal-delay')
    remember(element)
  }

  function reveal(entries: IntersectionObserverEntry[]) {
    if (disposed) return
    const rows: { parent: HTMLElement | null; top: number; count: number }[] = []
    entries
      .filter((entry) => entry.isIntersecting && pending.has(entry.target as HTMLElement))
      .sort((a, b) => Math.abs(a.boundingClientRect.top - b.boundingClientRect.top) < 24
        ? a.boundingClientRect.left - b.boundingClientRect.left
        : a.boundingClientRect.top - b.boundingClientRect.top)
      .forEach((entry) => {
        const element = entry.target as HTMLElement
        let row = rows.find((item) => item.parent === element.parentElement && Math.abs(item.top - entry.boundingClientRect.top) < 24)
        if (!row) {
          row = { parent: element.parentElement, top: entry.boundingClientRect.top, count: 0 }
          rows.push(row)
        }
        const explicitDelay = Number(element.dataset.revealDelay)
        const delay = Number.isFinite(explicitDelay) ? explicitDelay : row.count * 150
        row.count += 1
        pending.delete(element)
        observer?.unobserve(element)
        remember(element)
        element.style.setProperty('--apt-reveal-delay', `${Math.max(0, Math.min(delay, 300))}ms`)
        element.dataset.revealState = 'revealing'
      })
  }

  function observePending() {
    observer?.disconnect()
    if (disposed || !pending.size) return
    observer = new IntersectionObserver(reveal, {
      rootMargin: `0px 0px -${Math.round(window.innerHeight * 0.12)}px 0px`,
      threshold: 0.08,
    })
    pending.forEach((element) => observer?.observe(element))
  }

  function onAnimationEnd(event: AnimationEvent) {
    if (event.animationName === 'apt-reveal-opacity' && event.target instanceof HTMLElement) {
      finish(event.target)
    }
  }

  function onFocus(event: FocusEvent) {
    if (!(event.target instanceof Element)) return
    const element = event.target.closest<HTMLElement>('[data-reveal]')
    if (element && root.contains(element)) finish(element)
  }

  function onMotionChange() {
    if (!reducedMotion.matches) return
    elements.forEach(finish)
    observer?.disconnect()
  }

  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    elements.forEach(finish)
  } else {
    elements.forEach((element) => {
      if (seenThisPage.has(element.dataset.reveal ?? '')) {
        element.dataset.revealState = 'visible'
      } else {
        element.dataset.revealState = 'pending'
        pending.add(element)
      }
    })
    observePending()
    root.addEventListener('animationend', onAnimationEnd)
    root.addEventListener('focusin', onFocus)
    window.addEventListener('resize', observePending)
    reducedMotion.addEventListener('change', onMotionChange)
  }

  return () => {
    disposed = true
    observer?.disconnect()
    root.removeEventListener('animationend', onAnimationEnd)
    root.removeEventListener('focusin', onFocus)
    window.removeEventListener('resize', observePending)
    reducedMotion.removeEventListener('change', onMotionChange)
    elements.forEach((element) => {
      delete element.dataset.revealState
      element.style.removeProperty('--apt-reveal-delay')
    })
  }
}

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (ref.current) return attachScrollReveal(ref.current)
  }, [])
  return ref
}

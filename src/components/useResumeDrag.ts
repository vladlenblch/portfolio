import { useSyncExternalStore } from 'react'

const desktopPointer = window.matchMedia('(min-width: 834px) and (hover: hover) and (pointer: fine)')

function subscribe(onChange: () => void) {
  desktopPointer.addEventListener('change', onChange)
  return () => desktopPointer.removeEventListener('change', onChange)
}

export function useResumeDrag() {
  return useSyncExternalStore(subscribe, () => desktopPointer.matches)
}

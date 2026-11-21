export const portfolioStyles = [
  { id: 'apple', label: 'Минимализм' },
  { id: 'brutalism', label: 'Брутализм' },
] as const

export type PortfolioStyle = (typeof portfolioStyles)[number]['id']

export const styleStorageKey = 'portfolio-style'

export function getInitialStyle(): PortfolioStyle {
  try {
    const saved = window.localStorage.getItem(styleStorageKey)
    return portfolioStyles.find((style) => style.id === saved)?.id ?? 'apple'
  } catch {
    return 'apple'
  }
}

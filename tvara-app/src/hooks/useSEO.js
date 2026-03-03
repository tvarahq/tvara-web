import { useEffect } from 'react'

/**
 * Lightweight SEO hook — sets <title> and updates <meta> tags imperatively.
 * Drop-in replacement for react-helmet-async, compatible with React 19.
 *
 * @param {Object} params
 * @param {string} params.title        - <title> text
 * @param {string} [params.description] - meta[name="description"] content
 * @param {string} [params.canonical]   - <link rel="canonical"> href
 */
export function useSEO({ title, description, canonical }) {
  useEffect(() => {
    const prev = document.title

    if (title) {
      document.title = title
    }

    const updatedNodes = []

    if (description) {
      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) {
        const prevContent = metaDesc.getAttribute('content')
        metaDesc.setAttribute('content', description)
        updatedNodes.push(() => metaDesc.setAttribute('content', prevContent))
      }

      const ogDesc = document.querySelector('meta[property="og:description"]')
      if (ogDesc) {
        const prevContent = ogDesc.getAttribute('content')
        ogDesc.setAttribute('content', description)
        updatedNodes.push(() => ogDesc.setAttribute('content', prevContent))
      }

      const twDesc = document.querySelector('meta[name="twitter:description"]')
      if (twDesc) {
        const prevContent = twDesc.getAttribute('content')
        twDesc.setAttribute('content', description)
        updatedNodes.push(() => twDesc.setAttribute('content', prevContent))
      }
    }

    if (canonical) {
      const link = document.querySelector('link[rel="canonical"]')
      if (link) {
        const prevHref = link.getAttribute('href')
        link.setAttribute('href', canonical)
        updatedNodes.push(() => link.setAttribute('href', prevHref))
      }
    }

    return () => {
      document.title = prev
      updatedNodes.forEach(fn => fn())
    }
  }, [title, description, canonical])
}

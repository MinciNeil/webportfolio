import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Tracks which section is currently in view using IntersectionObserver.
 * Returns a reactive `activeSection` ref (e.g. "projects", "about", "contact" or "").
 *
 * @param {string[]} sectionIds - IDs without "#" (e.g. ['projects', 'about', 'contact'])
 */
export function useActiveSection(sectionIds) {
  const activeSection = ref('')
  let observer = null
  // Track all currently-visible section IDs (entries only reports *changes*)
  const visibleIds = new Set()

  onMounted(() => {
    const handleScroll = () => {
      // If at or very near bottom of document, activate the last section
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60

      if (isAtBottom && sectionIds.length > 0) {
        activeSection.value = sectionIds[sectionIds.length - 1]
        return
      }

      // If near top of page, clear active section
      if (window.scrollY < window.innerHeight * 0.3) {
        activeSection.value = ''
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // rootMargin: trigger when section crosses the middle ~40% of viewport
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleIds.add(entry.target.id)
          } else {
            visibleIds.delete(entry.target.id)
          }
        }

        const isAtBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 60

        if (isAtBottom && sectionIds.length > 0) {
          activeSection.value = sectionIds[sectionIds.length - 1]
        } else if (visibleIds.size > 0) {
          // Pick the first visible section in DOM order
          activeSection.value =
            sectionIds.find((id) => visibleIds.has(id)) || ''
        } else if (window.scrollY < window.innerHeight * 0.3) {
          // Nothing intersecting and near the top → clear
          activeSection.value = ''
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
      observer?.disconnect()
    })
  })

  return { activeSection }
}

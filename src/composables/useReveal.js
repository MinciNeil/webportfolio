import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Lightweight scroll reveal composable using IntersectionObserver.
 * Triggers once when the observed element enters the viewport.
 * Automatically defaults to revealed if reduced motion is preferred or IntersectionObserver is unavailable.
 *
 * @param {Object} [options] - IntersectionObserver options
 * @param {number} [options.threshold=0.1]
 * @param {string} [options.rootMargin='0px 0px -10% 0px']
 * @returns {{ targetRef: import('vue').Ref<HTMLElement|null>, isRevealed: import('vue').Ref<boolean> }}
 */
export function useReveal(options = {}) {
  const targetRef = ref(null)
  const isRevealed = ref(false)
  let observer = null

  onMounted(() => {
    // If reduced motion is requested or IntersectionObserver is not supported, reveal immediately
    if (
      typeof window === 'undefined' ||
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      isRevealed.value = true
      return
    }

    const { threshold = 0.1, rootMargin = '0px 0px -10% 0px' } = options

    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        isRevealed.value = true
        observer?.disconnect()
      }
    }, { threshold, rootMargin })

    if (targetRef.value) {
      observer.observe(targetRef.value)
    }
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { targetRef, isRevealed }
}

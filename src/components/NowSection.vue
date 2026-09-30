<script setup>
import { nowUpdated, nowItems } from '../data/now.js'
import { useReveal } from '../composables/useReveal.js'

// Scroll reveal composable
const { targetRef, isRevealed } = useReveal()
</script>

<template>
  <section
    id="now"
    ref="targetRef"
    aria-labelledby="now-heading"
    class="scroll-mt-20 py-20 md:py-24 px-6"
  >
    <div class="max-w-5xl mx-auto">
      <!-- Section Header Row -->
      <div
        class="flex items-center justify-between gap-4 mb-4 transition-all duration-500 ease-out motion-reduce:!opacity-100 motion-reduce:!transform-none"
        :class="isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'"
      >
        <span
          class="font-mono text-xs uppercase tracking-widest text-gray-600 dark:text-gray-400"
        >
          Now
        </span>
        <span
          class="font-mono text-xs text-gray-600 dark:text-gray-400"
        >
          Updated {{ nowUpdated }}
        </span>
      </div>

      <!-- Serif Heading -->
      <h2
        id="now-heading"
        class="font-display text-3xl md:text-4xl font-bold text-ink dark:text-ink-dark mb-10 leading-tight transition-all duration-500 ease-out motion-reduce:!opacity-100 motion-reduce:!transform-none"
        :style="{ transitionDelay: '60ms' }"
        :class="isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'"
      >
        What I'm up to
      </h2>

      <!-- Description List with Dividers -->
      <dl
        class="border-y border-border dark:border-border-dark divide-y divide-border dark:divide-border-dark"
      >
        <div
          v-for="(item, index) in nowItems"
          :key="item.label"
          class="py-5 md:py-6 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-6 items-baseline transition-all duration-500 ease-out motion-reduce:!opacity-100 motion-reduce:!transform-none"
          :style="{ transitionDelay: `${120 + index * 60}ms` }"
          :class="isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'"
        >
          <!-- Label / Topic -->
          <dt
            class="font-mono text-xs uppercase tracking-widest text-gray-600 dark:text-gray-400 select-none"
          >
            {{ item.label }}
          </dt>

          <!-- Content / Value -->
          <dd class="text-base text-ink dark:text-ink-dark leading-relaxed flex items-center">
            <!-- Pulsing dot for "Open to" item -->
            <span
              v-if="item.label.toLowerCase() === 'open to'"
              aria-hidden="true"
              class="inline-block w-2 h-2 rounded-full bg-ink dark:bg-ink-dark mr-3 shrink-0 animate-pulse motion-reduce:animate-none"
            />

            <!-- Link with animated underline if href exists -->
            <a
              v-if="item.href"
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
              class="group relative inline-flex items-center gap-1.5 font-medium text-ink dark:text-ink-dark rounded-xs outline-none focus-visible:ring-2 focus-visible:ring-ink dark:focus-visible:ring-ink-dark focus-visible:ring-offset-2 focus-visible:ring-offset-surface dark:focus-visible:ring-offset-surface-dark transition-colors duration-200"
            >
              <span>{{ item.text }}</span>
              <span aria-hidden="true" class="text-sm">↗</span>
              <span
                aria-hidden="true"
                class="absolute left-0 -bottom-0.5 h-px w-full bg-current origin-left scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100 transition-transform duration-300 ease-out motion-reduce:transition-none"
              />
            </a>

            <!-- Static text -->
            <span v-else>{{ item.text }}</span>
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>

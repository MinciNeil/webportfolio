<script setup>
import { ref } from 'vue'
import ParticleBackground from './ParticleBackground.vue'
import { useReveal } from '../composables/useReveal.js'

const { targetRef, isRevealed } = useReveal()

const email = 'ampatineiljay0929@gmail.com'
const copied = ref(false)

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(email)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<template>
  <section
    id="contact"
    ref="targetRef"
    class="relative scroll-mt-20 py-28 md:py-36 px-6 border-t border-border dark:border-border-dark"
  >
    <ParticleBackground :connect="true" :interactive="true" />
    <div
      class="max-w-5xl mx-auto relative z-10 transition-all duration-700 ease-out motion-reduce:!opacity-100 motion-reduce:!transform-none"
      :class="isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    >
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <!-- Left Column: Context & Availability -->
        <div class="lg:col-span-6">
          <p
            class="font-mono text-xs uppercase tracking-widest text-ink-muted dark:text-ink-muted-dark mb-4"
          >
            Contact
          </p>

          <h2
            class="font-display text-3xl md:text-5xl font-bold text-ink dark:text-ink-dark mb-6 leading-tight"
          >
            Let's start a conversation.
          </h2>

          <p
            class="text-base md:text-lg text-ink-muted dark:text-ink-muted-dark leading-relaxed mb-8"
          >
            Whether you have a project collaboration, freelance web task, or just want to discuss web development and networking, feel free to reach out.
          </p>

          <div class="space-y-3 font-mono text-xs text-ink-muted dark:text-ink-muted-dark border-t border-border/60 dark:border-border-dark/60 pt-6">
            <div class="flex items-center gap-2">
              <span class="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span class="text-ink dark:text-ink-dark font-medium">Open for Project Collaborations &amp; Freelance Tasks</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-ink/60 dark:text-ink-dark/60">📍</span>
              <span>Cavite, Philippines &middot; UTC+8 (PST)</span>
            </div>
          </div>
        </div>

        <!-- Right Column: Interactive Contact Cards -->
        <div class="lg:col-span-6 space-y-4">
          <!-- Email Card with Copy and Mailto -->
          <div
            class="group p-5 sm:p-6 rounded-xl border border-border dark:border-border-dark bg-surface/50 dark:bg-surface-dark/50 backdrop-blur-sm transition-all duration-200 hover:border-ink/40 dark:hover:border-ink-dark/40"
          >
            <div class="flex items-start justify-between gap-4 mb-3">
              <div>
                <span class="font-mono text-xs text-ink-muted dark:text-ink-muted-dark uppercase tracking-wider block mb-1">
                  Email
                </span>
                <span class="font-mono text-sm sm:text-base font-medium text-ink dark:text-ink-dark break-all">
                  {{ email }}
                </span>
              </div>
              <span class="text-xs font-mono px-2 py-1 rounded bg-surface dark:bg-surface-dark border border-border dark:border-border-dark text-ink-muted dark:text-ink-muted-dark">
                Direct
              </span>
            </div>

            <div class="flex items-center gap-3 pt-3 border-t border-border/60 dark:border-border-dark/60">
              <button
                type="button"
                @click="copyEmail"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium rounded-md border border-border dark:border-border-dark text-ink dark:text-ink-dark hover:bg-ink hover:text-surface dark:hover:bg-ink-dark dark:hover:text-surface-dark transition-colors duration-150 cursor-pointer"
              >
                <svg
                  v-if="!copied"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-3.5 h-3.5 text-emerald-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span>{{ copied ? 'Copied to clipboard!' : 'Copy Email' }}</span>
              </button>

              <a
                :href="`mailto:${email}`"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-medium text-ink-muted dark:text-ink-muted-dark hover:text-ink dark:hover:text-ink-dark transition-colors duration-150"
              >
                <span>Open in Mail</span>
                <span class="text-xs">&nearr;</span>
              </a>
            </div>
          </div>

          <!-- GitHub Card -->
          <a
            href="https://github.com/MinciNeil"
            target="_blank"
            rel="noopener noreferrer"
            class="group block p-5 sm:p-6 rounded-xl border border-border dark:border-border-dark bg-surface/50 dark:bg-surface-dark/50 backdrop-blur-sm transition-all duration-200 hover:border-ink/40 dark:hover:border-ink-dark/40 hover:-translate-y-0.5"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <i class="devicon-github-original text-2xl text-ink dark:text-ink-dark"></i>
                <div>
                  <span class="font-mono text-xs text-ink-muted dark:text-ink-muted-dark uppercase tracking-wider block">
                    GitHub
                  </span>
                  <span class="font-display text-base font-semibold text-ink dark:text-ink-dark group-hover:underline">
                    @MinciNeil
                  </span>
                </div>
              </div>
              <span class="font-mono text-xs text-ink-muted dark:text-ink-muted-dark group-hover:text-ink dark:group-hover:text-ink-dark transition-colors">
                View Repositories &nearr;
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

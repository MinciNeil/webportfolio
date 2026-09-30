<script setup>
import NavLink from './NavLink.vue'
import { useActiveSection } from '../composables/useActiveSection.js'

const isDark = defineModel('isDark', { type: Boolean })

const navLinks = [
  { label: 'Projects', href: '#projects', id: 'projects' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

const { activeSection } = useActiveSection(navLinks.map((l) => l.id))

function toggleDark() {
  isDark.value = !isDark.value
}
</script>

<template>
  <nav
    aria-label="Primary"
    class="fixed top-0 w-full z-50 border-b border-border dark:border-border-dark bg-surface/80 dark:bg-surface-dark/80 backdrop-blur-md"
  >
    <div class="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
      <!-- Logo (not a nav link — no underline) -->
      <a
        href="#"
        class="font-display text-xl font-bold tracking-tight text-ink dark:text-ink-dark"
      >
        NJA.
      </a>

      <div class="flex items-center gap-8">
        <!-- Nav links with animated underline -->
        <NavLink
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          :active="activeSection === link.id"
        >
          {{ link.label }}
        </NavLink>

        <!-- Dark mode toggle -->
        <button
          @click="toggleDark"
          class="p-2 rounded-lg text-ink-muted dark:text-ink-muted-dark hover:text-ink dark:hover:text-ink-dark hover:bg-surface-alt dark:hover:bg-surface-alt-dark transition-colors duration-200"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <!-- Sun icon -->
          <svg
            v-if="isDark"
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <!-- Moon icon -->
          <svg
            v-else
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>

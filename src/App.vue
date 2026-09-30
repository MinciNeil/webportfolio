<script setup>
import { ref, onMounted, watch } from 'vue'
import { projects } from './data/projects.js'
import { useReveal } from './composables/useReveal.js'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import ProjectCard from './components/ProjectCard.vue'
import AboutSection from './components/AboutSection.vue'
import NowSection from './components/NowSection.vue'
import ContactSection from './components/ContactSection.vue'
import FooterSection from './components/FooterSection.vue'

const isDark = ref(false)
const { targetRef: projectsRef, isRevealed: projectsRevealed } = useReveal()

onMounted(() => {
  // Respect system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})

// Watch isDark and toggle class
watch(isDark, (val) => {
  document.documentElement.classList.toggle('dark', val)
})
</script>

<template>
  <div class="min-h-screen">
    <NavBar v-model:isDark="isDark" />

    <main>
      <HeroSection />

      <!-- Projects (Subtle Tinted Section Band) -->
      <section
        id="projects"
        ref="projectsRef"
        class="scroll-mt-20 py-28 md:py-36 px-6 bg-surface-alt/40 dark:bg-surface-alt-dark/40 border-y border-border/60 dark:border-border-dark/60"
      >
        <div
          class="max-w-5xl mx-auto transition-all duration-700 ease-out motion-reduce:!opacity-100 motion-reduce:!transform-none"
          :class="projectsRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
        >
          <p
            class="font-mono text-xs uppercase tracking-widest text-ink-muted dark:text-ink-muted-dark mb-6"
          >
            Selected Work
          </p>
          <h2
            class="font-display text-3xl md:text-4xl font-bold text-ink dark:text-ink-dark mb-14 leading-tight"
          >
            Projects
          </h2>

          <!-- Editorial alternating layout -->
          <div class="space-y-20 md:space-y-28">
            <ProjectCard
              v-for="(project, index) in projects"
              :key="project.title"
              :project="project"
              :index="index"
            />
          </div>
        </div>
      </section>

      <AboutSection />
      <NowSection />
      <ContactSection />
    </main>

    <FooterSection />
  </div>
</template>

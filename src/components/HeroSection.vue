<script setup>
import { ref, onMounted } from 'vue'
import ParticleBackground from './ParticleBackground.vue'

const visible = ref(false)
onMounted(() => { requestAnimationFrame(() => { visible.value = true }) })
</script>

<template>
  <section id="hero" class="relative min-h-screen flex items-center px-6 pt-24 overflow-hidden">
    <!-- Silhouette background image -->
    <div class="absolute inset-0 z-0">
      <img
        src="/pic2.jpg"
        alt=""
        aria-hidden="true"
        class="w-full h-full object-cover hero-bg-image"
      />
    </div>

    <!-- Particle canvas behind content -->
    <ParticleBackground :connect="true" :interactive="true" />

    <div class="max-w-5xl mx-auto w-full relative z-10">
      <p
        :class="['hero-reveal', { 'is-visible': visible }]"
        style="--delay: 0"
        class="font-mono text-xs uppercase tracking-widest text-ink-muted dark:text-ink-muted-dark mb-6"
      >
        IT Student &amp; Web Developer
      </p>
      <h1
        :class="['hero-reveal', { 'is-visible': visible }]"
        style="--delay: 1"
        class="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] text-ink dark:text-ink-dark mb-8"
      >
        From curiosity<br />
        to creation.
      </h1>
      <p
        :class="['hero-reveal', { 'is-visible': visible }]"
        style="--delay: 2"
        class="text-lg md:text-xl text-ink-muted dark:text-ink-muted-dark max-w-xl leading-relaxed mb-10"
      >
        I'm Neil, an IT student who builds things that work, from network setups
        to frontend interfaces. Hands-on by nature, clean code by practice.
      </p>
      <div
        :class="['hero-reveal', { 'is-visible': visible }]"
        style="--delay: 3"
        class="flex flex-wrap gap-4"
      >
        <a
          href="#projects"
          class="inline-flex items-center px-6 py-3 text-sm font-medium bg-ink dark:bg-ink-dark text-surface dark:text-surface-dark rounded-lg hover:opacity-80 transition-opacity duration-200"
        >
          View Projects
        </a>
        <a
          href="#contact"
          class="inline-flex items-center px-6 py-3 text-sm font-medium border border-border dark:border-border-dark rounded-lg text-ink dark:text-ink-dark hover:bg-surface-alt dark:hover:bg-surface-alt-dark transition-colors duration-200"
        >
          Get in Touch
        </a>
      </div>
    </div>
  </section>
</template>

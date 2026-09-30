<script setup>
import { useReveal } from '../composables/useReveal.js'

const { targetRef, isRevealed } = useReveal()

const tech = [
  { name: 'HTML', icon: 'devicon-html5-plain', color: '#E34F26' },
  { name: 'CSS', icon: 'devicon-css3-plain', color: '#1572B6' },
  { name: 'JavaScript', icon: 'devicon-javascript-plain', color: '#F7DF1E' },
  { name: 'Vue.js', icon: 'devicon-vuejs-plain', color: '#4FC08D' },
  { name: 'Tailwind CSS', icon: 'devicon-tailwindcss-original', color: '#06B6D4' },
  { name: 'PHP', icon: 'devicon-php-plain', color: '#777BB4' },
  { name: 'MySQL', icon: 'devicon-mysql-plain', color: '#4479A1' },
  { name: 'Git', icon: 'devicon-git-plain', color: '#F05032' },
  { name: 'Cisco', icon: null, svg: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><g fill="#1BA0D7"><rect x="2" y="46" width="6" height="36" rx="3"/><rect x="18" y="34" width="6" height="60" rx="3"/><rect x="34" y="22" width="6" height="84" rx="3"/><rect x="50" y="34" width="6" height="60" rx="3"/><rect x="61" y="22" width="6" height="84" rx="3"/><rect x="72" y="34" width="6" height="60" rx="3"/><rect x="88" y="22" width="6" height="84" rx="3"/><rect x="104" y="34" width="6" height="60" rx="3"/><rect x="120" y="46" width="6" height="36" rx="3"/></g></svg>')}`, color: '#1BA0D7' },
  { name: 'TCP/IP', icon: null, emoji: '🌐', color: '#6366F1' },
  { name: 'LAN/WAN', icon: null, emoji: '🔗', color: '#8B5CF6' },
  { name: 'Windows Server', icon: 'devicon-windows11-original', color: '#0078D4' },
  { name: 'Figma', icon: 'devicon-figma-plain', color: '#F24E1E' },
]
</script>

<template>
  <section
    id="about"
    ref="targetRef"
    class="scroll-mt-20 py-28 md:py-36 px-6"
  >
    <div
      class="max-w-5xl mx-auto transition-all duration-700 ease-out motion-reduce:!opacity-100 motion-reduce:!transform-none"
      :class="isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    >
      <p
        class="font-mono text-xs uppercase tracking-widest text-ink-muted dark:text-ink-muted-dark mb-6"
      >
        About
      </p>

      <div class="grid md:grid-cols-5 gap-16">
        <!-- Bio — takes 3 cols -->
        <div class="md:col-span-3">
          <h2
            class="font-display text-3xl md:text-4xl font-bold text-ink dark:text-ink-dark mb-6 leading-tight"
          >
            A bit about me
          </h2>
          <div class="space-y-4 text-ink-muted dark:text-ink-muted-dark leading-relaxed">
            <p>
              I'm Neil, an IT student with a thing for building, whether it's
              setting up networks, assembling hardware, or crafting web
              interfaces. I got into tech through hands-on curiosity, and that
              same itch to understand how things work still drives me today.
            </p>
            <p>
              I enjoy the full spectrum, from the physical infrastructure that
              keeps systems running to the frontend code that makes them look
              good. When I'm not studying or coding, you'll probably find me
              gaming, tinkering with something, or out on the road exploring.
            </p>
          </div>
        </div>

        <!-- Photo — takes 2 cols -->
        <div class="md:col-span-2 flex items-start justify-center">
          <div class="relative w-full max-w-xs">
            <img
              src="/pic1.jpg"
              alt="Neil Jay Ampati"
              loading="lazy"
              decoding="async"
              class="w-full aspect-[3/4] object-cover rounded-xl about-photo"
            />
            <!-- Decorative border offset -->
            <div
              class="absolute -bottom-3 -right-3 w-full h-full rounded-xl border-2 border-border dark:border-border-dark -z-10"
            ></div>
          </div>
        </div>
      </div>

      <!-- Tech list — full width below -->
      <div class="mt-16">
        <h3
          class="text-sm font-semibold uppercase tracking-wider text-ink dark:text-ink-dark mb-4"
        >
          Technologies
        </h3>
        <div class="flex flex-wrap gap-x-6 gap-y-3">
          <div
            v-for="t in tech"
            :key="t.name"
            class="tech-card group flex items-center gap-2 cursor-default"
            :style="{ '--brand-color': t.color }"
          >
            <i
              v-if="t.icon"
              :class="[t.icon, 'text-lg tech-icon transition-colors duration-300']"
            ></i>
            <img
              v-else-if="t.svg"
              :src="t.svg"
              :alt="t.name"
              class="w-5 h-5 tech-svg-icon transition-all duration-300"
            />
            <span
              v-else
              class="text-lg tech-emoji transition-all duration-300"
            >{{ t.emoji }}</span>
            <span class="font-mono text-sm text-ink-muted dark:text-ink-muted-dark">
              {{ t.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

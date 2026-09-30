<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  connect: { type: Boolean, default: true },
  interactive: { type: Boolean, default: true },
})

const canvas = ref(null)

onMounted(() => {
  const el = canvas.value
  const ctx = el.getContext('2d')
  const prefersStill = matchMedia('(prefers-reduced-motion: reduce)').matches
  const isTouch = matchMedia('(pointer: coarse)').matches
  let raf, particles, w, h, dpr
  let mouse = { x: -1000, y: -1000 } // offscreen default
  let paused = false

  // — Helpers —
  const rand = (min, max) => Math.random() * (max - min) + min
  const getColor = () =>
    document.documentElement.classList.contains('dark')
      ? 'rgba(250,250,250,0.35)'
      : 'rgba(17,17,17,0.7)' // ponytail: bold light-mode visibility

  // — Sizing —
  function resize() {
    if (!el.parentElement) return
    dpr = devicePixelRatio || 1
    const rect = el.parentElement.getBoundingClientRect()
    w = rect.width; h = rect.height
    el.width = w * dpr; el.height = h * dpr
    el.style.width = w + 'px'; el.style.height = h + 'px'
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    init()
  }

  // — Particle factory —
  function init() {
    const count = w >= 768 ? 60 : 25
    particles = Array.from({ length: count }, () => ({
      x: rand(0, w), y: rand(0, h),
      r: rand(1, 2),
      vx: rand(-0.3, 0.3) || 0.1,
      vy: rand(-0.3, 0.3) || 0.1,
    }))
  }

  // — Draw loop —
  function draw() {
    if (paused) return void (raf = requestAnimationFrame(draw))
    ctx.clearRect(0, 0, w, h)
    const color = getColor()
    ctx.fillStyle = color; ctx.strokeStyle = color

    for (const p of particles) {
      // Mouse repulsion (skip on touch)
      if (props.interactive && !isTouch) {
        const dx = p.x - mouse.x, dy = p.y - mouse.y
        const dist = Math.hypot(dx, dy)
        if (dist < 100) {
          const force = (100 - dist) / 100 * 0.8
          p.x += (dx / dist) * force
          p.y += (dy / dist) * force
        }
      }
      // Move & wrap
      p.x = (p.x + p.vx + w) % w
      p.y = (p.y + p.vy + h) % h
      // Draw dot
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fill()
    }

    // Connecting lines
    if (props.connect) {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.hypot(dx, dy)
          if (dist < 120) {
            const isDark = document.documentElement.classList.contains('dark')
            ctx.globalAlpha = (1 - dist / 120) * (isDark ? 0.5 : 0.7)
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }
    }
    raf = requestAnimationFrame(draw)
  }

  // — Mouse tracking —
  const parent = el.parentElement
  function onMove(e) { if (!parent) return; const r = parent.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top }
  function onLeave() { mouse.x = -1000; mouse.y = -1000 }
  if (props.interactive && !isTouch) {
    parent.addEventListener('mousemove', onMove)
    parent.addEventListener('mouseleave', onLeave)
  }

  // — Visibility: pause when off-screen or tab hidden —
  const io = new IntersectionObserver(([e]) => { paused = !e.isIntersecting }, { threshold: 0 })
  io.observe(el)
  function onVis() { paused = document.hidden }
  document.addEventListener('visibilitychange', onVis)

  // — Resize observer —
  const ro = new ResizeObserver(resize)
  ro.observe(parent)

  // — Start —
  resize()
  if (prefersStill) { paused = false; draw(); cancelAnimationFrame(raf) } // single frame
  else draw()

  // — Cleanup —
  onUnmounted(() => {
    cancelAnimationFrame(raf)
    ro.disconnect(); io.disconnect()
    document.removeEventListener('visibilitychange', onVis)
    if (props.interactive && !isTouch) {
      parent?.removeEventListener('mousemove', onMove)
      parent?.removeEventListener('mouseleave', onLeave)
    }
  })
})
</script>

<template>
  <canvas
    ref="canvas"
    aria-hidden="true"
    class="absolute inset-0 pointer-events-none"
  />
</template>

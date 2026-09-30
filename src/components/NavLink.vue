<script setup>
/**
 * NavLink — reusable nav anchor with animated underline.
 * Props: href (required), active (boolean, from useActiveSection).
 * Slot: link label text.
 */
defineProps({
  href: { type: String, required: true },
  active: { type: Boolean, default: false },
})
</script>

<template>
  <a
    :href="href"
    :aria-current="active ? 'location' : undefined"
    class="group relative hidden md:inline-block text-sm font-medium transition-colors duration-200 outline-none rounded-sm focus-visible:ring-2 focus-visible:ring-ink dark:focus-visible:ring-ink-dark focus-visible:ring-offset-2 focus-visible:ring-offset-surface dark:focus-visible:ring-offset-surface-dark"
    :class="[
      active
        ? 'text-ink dark:text-ink-dark'
        : 'text-ink-muted dark:text-ink-muted-dark hover:text-ink dark:hover:text-ink-dark focus-visible:text-ink dark:focus-visible:text-ink-dark',
    ]"
  >
    <!-- Label -->
    <slot />

    <!-- Animated underline: 1px, 4px below text, grows from left -->
    <span
      aria-hidden="true"
      class="absolute left-0 -bottom-1 h-px w-full bg-current origin-left transition-transform duration-300 ease-out motion-reduce:transition-none"
      :class="[
        active
          ? 'scale-x-100'
          : 'scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100',
      ]"
    />
  </a>
</template>

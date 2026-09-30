<template>
  <footer
    class="border-t border-border dark:border-border-dark py-10 px-6"
  >
    <div
      class="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4"
    >
      <p class="font-mono text-xs text-ink-muted dark:text-ink-muted-dark">
        &copy; {{ new Date().getFullYear() }} Neil Jay Ampati
      </p>
      <p class="font-mono text-xs text-ink-muted dark:text-ink-muted-dark">
        Built with Vue, Vite &amp; Tailwind CSS
      </p>
    </div>
  </footer>
</template>

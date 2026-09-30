<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    default: 0,
  },
})
</script>

<template>
  <article
    class="grid md:grid-cols-12 gap-8 md:gap-12 items-center group"
  >
    <!-- Image -->
    <div
      :class="[
        'md:col-span-7 overflow-hidden rounded-2xl border border-border dark:border-border-dark bg-surface-alt dark:bg-surface-alt-dark shadow-sm transition-all duration-500 group-hover:border-ink/20 dark:group-hover:border-ink-dark/20 group-hover:shadow-md',
        index % 2 === 1 ? 'md:order-2' : 'md:order-1',
      ]"
    >
      <div class="overflow-hidden aspect-[16/10]">
        <img
          :src="project.image"
          :alt="`Screenshot of ${project.title}`"
          loading="lazy"
          decoding="async"
          class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
    </div>

    <!-- Content -->
    <div
      :class="[
        'md:col-span-5 flex flex-col justify-center',
        index % 2 === 1 ? 'md:order-1' : 'md:order-2',
      ]"
    >
      <!-- Role tag -->
      <div class="flex items-center gap-3 mb-3">
        <span
          class="font-mono text-xs uppercase tracking-widest text-ink-muted dark:text-ink-muted-dark"
        >
          {{ project.role }}
        </span>
        <span class="w-1 h-1 rounded-full bg-border dark:bg-border-dark"></span>
        <span class="font-mono text-xs text-ink-muted/60 dark:text-ink-muted-dark/60">
          0{{ index + 1 }}
        </span>
      </div>

      <h3
        class="font-display text-2xl md:text-3xl font-bold text-ink dark:text-ink-dark mb-4 leading-tight group-hover:text-ink-muted dark:group-hover:text-ink-muted-dark transition-colors duration-300"
      >
        {{ project.title }}
      </h3>

      <p
        class="text-sm md:text-base text-ink-muted dark:text-ink-muted-dark leading-relaxed mb-6"
      >
        {{ project.description }}
      </p>

      <!-- Tech tags -->
      <div class="flex flex-wrap gap-2 mb-6">
        <span
          v-for="tag in project.tech"
          :key="tag"
          class="font-mono text-xs px-2.5 py-1 border border-border dark:border-border-dark rounded-md text-ink-muted dark:text-ink-muted-dark bg-surface-alt/50 dark:bg-surface-alt-dark/50"
        >
          {{ tag }}
        </span>
      </div>

      <!-- Links -->
      <div class="flex items-center gap-6">
        <a
          v-if="project.liveUrl"
          :href="project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm font-medium text-ink dark:text-ink-dark underline underline-offset-4 decoration-border dark:decoration-border-dark hover:decoration-ink dark:hover:decoration-ink-dark transition-colors duration-200"
        >
          Live Demo ↗
        </a>
        <a
          v-if="project.repoUrl"
          :href="project.repoUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-sm font-medium text-ink dark:text-ink-dark underline underline-offset-4 decoration-border dark:decoration-border-dark hover:decoration-ink dark:hover:decoration-ink-dark transition-colors duration-200"
        >
          Source Code ↗
        </a>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { DateTime } from "luxon";
import { ref, computed } from "vue";

import { Post, today, thisWeek, thisMonth } from '../posts';

const periods = ["Today", "This Week", "This Month"] as const;
type Period = typeof periods[number];

const selectedPreriod = ref<Period>("Today");

const selectPeriod = (period: Period) => {
  selectedPreriod.value = period;
}

const posts = computed(() => {
  return [today, thisWeek, thisMonth]
    .map((post) => ({
      ...post,
      created: DateTime.fromISO(post.created)
    }))
    .filter((post) => {
      if (selectedPreriod.value === "Today") {
        return post.created >= DateTime.now().minus({ day: 1 });
      }

      if (selectedPreriod.value === "This Week") {
        return post.created >= DateTime.now().minus({ week: 1 });
      }

      return true;
    });
});
</script>

<template>
  <pre>{{ periods }}</pre>
  {{ selectedPreriod }}
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a 
        v-for="period of periods"
        :key="period"
        :class="{ 'is-active': period === selectedPreriod }"
        @click="selectPeriod(period)"
      >
        {{ period }}
      </a>
    </span>

    <div
      v-for="post of posts"
      :key="post.id"
      class="panel-block"
    >
      <a href="#">{{ post.title }}</a>
      &nbsp;
      <span>
        {{ post.created.toFormat('y MMMM d, TT') }}
      </span>
    </div>
  </nav>
</template>

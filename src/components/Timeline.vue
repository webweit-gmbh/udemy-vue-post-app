<script setup lang="ts">
import { ref } from "vue";

const periods = ["Today", "This Week", "This Month"] as const;
type Period = typeof periods[number];

const selectedPreriod = ref<Period>("Today");

const selectPeriod = (period: Period) => {
  selectedPreriod.value = period;
}
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
  </nav>
</template>

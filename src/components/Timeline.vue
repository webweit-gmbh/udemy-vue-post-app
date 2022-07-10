<script setup lang="ts">
import { DateTime } from 'luxon';
import { ref, computed } from 'vue';

import { TimelinePost, today, thisWeek, thisMonth } from '../posts';
import TimelineItem from './TimelineItem.vue';

const periods = ['Today', 'This Week', 'This Month'] as const;
type Period = typeof periods[number];

const selectedPreriod = ref<Period>('Today');

const selectPeriod = (period: Period) => {
    selectedPreriod.value = period;
};

const posts = computed<TimelinePost[]>(() => {
    return [today, thisWeek, thisMonth]
        .map((post) => ({
            ...post,
            created: DateTime.fromISO(post.created),
        }))
        .filter((post) => {
            if (selectedPreriod.value === 'Today') {
                return post.created >= DateTime.now().minus({ day: 1 });
            }

            if (selectedPreriod.value === 'This Week') {
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

        <TimelineItem v-for="post of posts" :key="post.id" :post="post" />
    </nav>
</template>

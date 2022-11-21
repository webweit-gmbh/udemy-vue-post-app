<script setup lang="ts">
import TimelineItem from './TimelineItem.vue';

import { usePosts } from '../stores/posts';
import { periods } from '../constans';

const postsStore = usePosts();

await postsStore.fetchPosts();
</script>

<template>
    <div style="padding: 10px; background-color: yellow">
        <pre>{{ postsStore.$state }}</pre>
        <pre>{{ postsStore.foo }}</pre>

        <button @click="postsStore.updateFoo('dupa')">set dupaaaaaaa!!!!!!!!</button>
        <button @click="postsStore.foo = 'dupa via direct asignment'">set dupaaaaaaa DIRECT!!!!!!!!</button>
    </div>


    <nav class="is-primary panel">
        <span class="panel-tabs">
            <a
                v-for="period of periods"
                :key="period"
                :class="{ 'is-active': period === postsStore.selectedPeriod }"
                @click="postsStore.setSelectedPeriod(period)"
            >
                {{ period }}
            </a>
        </span>

        <TimelineItem
            v-for="post of postsStore.filteredPosts"
            :key="post.id"
            :post="post"
        />
    </nav>
</template>

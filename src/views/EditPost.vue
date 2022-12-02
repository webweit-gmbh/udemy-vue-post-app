<script setup lang="ts">
import { useRoute } from 'vue-router';

import PostWriter from '../components/PostWriter.vue';
import { usePosts } from '../stores/posts';

const route = useRoute()
const postsStore = usePosts();
const id = route.params.id as string;
const post = postsStore.all.get(id);

if (!post) {
    throw new Error(`Post with id ${id} was not found`)
}

</script>

<template>
    Edit Post

    <PostWriter :post="post" />
</template>

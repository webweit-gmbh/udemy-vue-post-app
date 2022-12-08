<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';

import PostWriter from '../components/PostWriter.vue';
import { usePosts } from '../stores/posts';
import { Post } from '../posts';

const route = useRoute()

const postsStore = usePosts();
const router = useRouter();

const id = route.params.id as string;
const post = postsStore.all.get(id);

if (!post) {
    throw new Error(`Post with id ${id} was not found`)
}

const handleSubmit = async (post: Post) => {
    await postsStore.updatePost(post);
    await router.push('/');
}

</script>

<template>
    Edit Post

    <PostWriter :post="post" @submit="handleSubmit" />
</template>

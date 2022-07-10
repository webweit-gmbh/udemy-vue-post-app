<script setup lang="ts">
import { TimelinePost } from '../posts';

defineProps<{
    post: TimelinePost;
}>();
</script>

<template>
    <div
        class="panel-block is-flex is-flex-direction-column is-align-items-flex-start"
    >
        <a href="#">{{ post.title }}</a>
        <span>
            {{ post.created.toFormat('y MMMM d, TT') }}
        </span>
    </div>
</template>

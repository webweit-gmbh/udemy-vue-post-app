<script setup lang="ts">
import { ref } from 'vue';

const counter = ref(1);
</script>

<template>
    <div>
        Hello World!
        <button @click='counter++'>{{ counter }}</button>
    </div>
</template>

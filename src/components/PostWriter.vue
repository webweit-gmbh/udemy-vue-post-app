<script setup lang="ts">
import { ref, onMounted, watch, watchEffect } from "vue";
import { marked } from 'marked';
import highlightjs from 'highlight.js';
import debounce from 'lodash/debounce';
import { useRouter } from 'vue-router';

import { Post, TimelinePost } from '../posts';
import { usePosts } from '../stores/posts';

const props = defineProps<{
    post: TimelinePost | Post // TODO types will be fixed later
}>();

const postsStore = usePosts();
const router = useRouter();
const title = ref(props.post.title);
const content = ref(props.post.markdown);
const html = ref('');
const contentEditable = ref<HTMLDivElement>();

const parseHtml = (markdown: string) => {
    marked.parse(
        markdown,
        {
            gfm: true,
            breaks: true,
            highlight: (code) => {
                return highlightjs.highlightAuto(code).value
            }
        },
        (err, parseResult) => {
            html.value = parseResult;
        }
    );
}

watch(
    content,
    debounce((newContent) => parseHtml(newContent), 250),
    { immediate: true }
);

/* Same effect as "watch" above but implementation below is a bit unintuitive
watchEffect(() => {
    marked.parse(content.value, (err, parseResult) => {
        html.value = parseResult;
    });
});
*/

onMounted(() => {
    if (!contentEditable.value) {
        throw new Error('ContentEditable DOM done was not found');
    }

    contentEditable.value.innerText = content.value;
});

const handleInput = () => {
    if (!contentEditable.value) {
        throw new Error('ContentEditable DOM done was not found');
    }

    content.value = contentEditable.value.innerText;
}

const handleClick = async () => {
    const newPost: TimelinePost = {
        ...props.post,
        title: title.value,
        markdown: content.value,
        html: html.value
    }

    await postsStore.createPost(newPost);
    router.push('/');
}

/*
                    v-model="title"
    is just
                    :value="title"
                    @input="event => title = event.target.value"
 */
</script>

<template>
    <div class="columns">
        <div class="column">
            <div class="field">
                <div class="label">Post title</div>
                <input type="text" class="input" v-model="title" />
            </div>
        </div>
    </div>

    <div class="columns">
        <div class="column">
            <div contenteditable ref="contentEditable" @input="handleInput" />
        </div>
        <div class="column">
            <div v-html="html"></div>
        </div>
    </div>

    <div class="columns">
        <div class="column">
            <button
                class="button is-primary is-pulled-right"
                @click="handleClick"
            >
                Save post
            </button>
        </div>
    </div>
</template>

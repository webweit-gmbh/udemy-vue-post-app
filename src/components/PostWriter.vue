<script setup lang="ts">
import { ref, onMounted, watch, watchEffect } from "vue";
import { marked } from 'marked';
import highlightjs from 'highlight.js';
import debounce from 'lodash/debounce';

import { Post, TimelinePost } from '../posts';
import { useUsers } from '../stores/users';

const props = defineProps<{
    post: TimelinePost | Post // TODO types will be fixed later
}>();

const emit = defineEmits<{
    (event: 'submit', post: Post): void
}>();

const usersStore = useUsers();

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
    if (!usersStore.currentUserId) {
        throw new Error('User was not found');
    }

    const newPost: Post = {
        ...props.post,
        created: typeof props.post.created === 'string' ? props.post.created : props.post.created.toISO(),
        title: title.value,
        userId: usersStore.currentUserId,
        markdown: content.value,
        html: html.value
    }
    emit('submit', newPost);
}

/*
                    v-model="title"
    is just
                    :value="title"
                    @input="event => title = event.target.value"
 */
</script>

<template>
    <div>
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
    </div>
</template>

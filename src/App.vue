<script setup lang="ts">
import { computed } from 'vue';

import Navbar from './components/Navbar.vue';
import { useModal } from './composables/modal';
import { useUsers } from './stores/users';

const modal = useModal();
const usersStore = useUsers();

const modalStyle = computed(() => {
    return {
        display: modal.show.value ? 'block' : 'none'
    }
});
</script>

<template>
    <div
        class="modal"
        style="display: block; color: white;"
        :style="modalStyle"
    >
        <div class="modal-background">
            <div class="modal-content">
                <div id="modal"></div>
            </div>
        </div>
        <button class="modal-close is-large" @click="modal.hideModal()"></button>
    </div>

    <div class="section">
        <div class="container">

            <h1>
                <RouterLink to="/">
                    ✍ POSTERMAN app
                </RouterLink>
            </h1>
            <h5>
                Vue JS 3, script setup, vite, Composition API, Pinia, JWT tokens, TypeScript
            </h5>

            <div class="pb-5">
                <Navbar />
                <RouterView />
            </div>

            <hr>
            <div>
                <p>
                    Source code:
                    <br/>
                    <a href="https://github.com/webweit-gmbh/udemy-vue-post-app" target="_blank">
                        https://github.com/webweit-gmbh/udemy-vue-post-app
                    </a>
                </p>
                <p>
                    Udemy videos about this app:
                    <br/>
                    <a href="https://www.udemy.com/course/vuejs-3-the-composition-api/" target="_blank">
                        https://www.udemy.com/course/vuejs-3-the-composition-api/
                    </a>
                </p>
            </div>
        </div>
    </div>
</template>

<style>
@import 'https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css';
@import "highlight.js/styles/atom-one-dark.css";

ul {
    list-style: revert !important;
    list-style-position: inside !important;
}

h1, h2, h3, h4, h5, h6 {
    font-size: revert !important;
    margin: 10px 0 !important;
}

pre {
    margin: 10px 0 !important;
}

p {
    margin: 10px 0 !important;
}
</style>

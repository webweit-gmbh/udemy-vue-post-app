<script setup lang="ts">
import { useModal } from '../composables/modal';
import { useUsers } from '../stores/users';
import { useRouter } from 'vue-router';

const modal = useModal();
const usersStore = useUsers();
const router = useRouter();

const logout = async () => {
    await usersStore.logout();
    await router.push({ path: '/' })
}
</script>

<template>
    <div class="navbar">
        <div class="navbar-end">

            <div v-if="usersStore.currentUserId" class="buttons">
                <RouterLink to="/posts/new" class="button">
                    New Post
                </RouterLink>
                <button class="button" @click="logout">
                    Logout
                </button>
            </div>

            <div v-else class="buttons">
                <button class="button" @click="modal.showModal('register')">
                    Register
                </button>
                <button class="button" @click="modal.showModal('login')">
                    Log in
                </button>
            </div>
        </div>
    </div>

    <Teleport to="#modal">
        <component :is="modal.component.value" />
    </Teleport>
</template>

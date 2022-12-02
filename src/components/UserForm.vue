<script setup lang="ts">
import { computed, ref } from 'vue';

import { NewUser } from '../users';
import FormInput from './FormInput.vue';
import { length, required, validate } from '../validation';

defineProps<{
    error?: string
}>();

const emit = defineEmits<{
    (event: 'submit', payload: NewUser): void
}>();

const username = ref('');
const usernameStatus = computed(() => {
    return validate(username.value, [required, length({ min: 5, max: 10 })])
});

const password = ref('');
const passwordStatus = computed(() => {
    return validate(password.value, [required, length({ min: 8, max: 12 })])
});

const isInvalid = computed(() => {
    return !usernameStatus.value.valid || !passwordStatus.value.valid;
});

const handleSubmit = async (event: Event) => {
    if (isInvalid.value) {
        return;
    }

    const newUser: NewUser = {
        username: username.value,
        password: password.value
    };

    try {
        emit('submit', newUser);
    } catch (e) {

    }
}

</script>

<template>
    <form class="form" @submit.prevent="handleSubmit">
        <FormInput type="text" name="Username" v-model="username" :status="usernameStatus" />
        <FormInput type="password" name="Password" v-model="password" :status="passwordStatus" />

        <div v-if="error" class="is-danger help">
            {{ error }}
        </div>

        <button type="submit" class="button" :disabled="isInvalid">Submit</button>
    </form>
</template>

<style scoped>
    .form {
        background-color: white;
        padding: 30px;
        margin-top: 50px;
    }
</style>

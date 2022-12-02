import { ref, shallowRef } from 'vue';

import RegisterForm from '../components/RegisterForm.vue';
import LoginForm from '../components/LoginForm.vue';

const show = ref(false);
const component = shallowRef(); // PERFORMANCE ALERT! We need shallowRef when making component reactive!

export const useModal = () => {
    return {
        show,
        component,
        showModal: (type: 'register' | 'login') => {
            show.value = true;

            switch (type) {
                case 'login':
                    return component.value = LoginForm;
                case 'register':
                    return component.value = RegisterForm;
            }
        },
        hideModal: () => (show.value = false)
    }
}
import { ref, shallowRef } from 'vue';

import SignUpForm from '../components/SignUpForm.vue';
import HelloWorld from '../components/HelloWorld.vue';

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
                    return component.value = HelloWorld;
                case 'register':
                    return component.value = SignUpForm;
            }
        },
        hideModal: () => (show.value = false)
    }
}
import { reactive, readonly } from 'vue';
import { defineStore } from 'pinia';

export interface PostsState {
    foo: string;
}

export const usePosts = defineStore("posts", {
    state: (): PostsState => ({
        foo: "foo in Pinia!!"
    }),

    actions: {
        updateFoo(foo: string) {
            this.foo = foo;
        }
    }
});

/*

export class PostsStore {
    #state: PostsState;

    constructor() {
        this.#state = reactive<PostsState>({
            foo: 'foo',
        });
    }

    getState() {
        return readonly(this.#state);
    }

    updateFoo(foo: string) {
        this.#state.foo = foo;
    }
}

const store = new PostsStore();

// inject/provide later in the course
export const usePosts = () => {
    return store;
};
*/
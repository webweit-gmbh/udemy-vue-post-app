
import { defineStore } from 'pinia';
import { DateTime } from 'luxon';

import { Post, today, thisWeek, thisMonth, TimelinePost } from '../posts';
import { Period } from '../constans';

export interface PostsState {
    foo: string;
    ids: string[];
    all: Map<string, Post>
    selectedPeriod: Period;
}

export const usePosts = defineStore("posts", {
    state: (): PostsState => ({
        foo: 'bar!',
        ids: [today.id, thisWeek.id, thisMonth.id],
        all: new Map([
            [today.id, today],
            [thisWeek.id, thisWeek],
            [thisMonth.id, thisMonth],
        ]),
        selectedPeriod: 'Today',
    }),

    actions: {
        updateFoo(foo: string) {
            this.foo = foo;  // LONGER WAY: this.$state.foo = foo;
        },
        setSelectedPeriod(period: Period) {
            this.selectedPeriod = period;
        }
    },

    getters: {
        filteredPosts: (state): TimelinePost[] => {
            return state.ids
                .map((id) => {
                    const post = state.all.get(id);

                    if (!post) {
                        throw new Error(`Post with id of ${id} was expected but not found.`)
                    }

                    return {
                        ...post,
                        created: DateTime.fromISO(post.created),
                    }
                })
                .filter((post) => {
                    if (state.selectedPeriod === 'Today') {
                        return post.created >= DateTime.now().minus({ day: 1 });
                    }

                    if (state.selectedPeriod === 'This Week') {
                        return post.created >= DateTime.now().minus({ week: 1 });
                    }

                    return true;
                });
        }
    }
});



/*
import { reactive, readonly } from 'vue';

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
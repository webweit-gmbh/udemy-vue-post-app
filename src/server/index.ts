import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { Post, thisMonth, thisWeek, today } from '../posts';
import { NewUser, User } from '../users';

function delay() {
    return new Promise<void>(res => setTimeout(res, 1500));
}

const app = express();

app.use(cors());
app.use(bodyParser.json());

const allPosts: Post[] = [today, thisWeek, thisMonth];
const allUsers: User[] = [];

app.get("/posts", async (req, res) => {
    await delay();
    res.json(allPosts);
});

app.post<{}, {}, Post>("/posts", async (req, res) => {
    const post = { ...req.body, id: (Math.random() * 100000).toFixed() }

    allPosts.push(post);
    res.json(post);
});

app.post<{}, {}, NewUser>("/users", async (req, res) => {
    const user = { ...req.body, id: (Math.random() * 100000).toFixed() };
    const { password, ...userWithoutPassword } = user;

    allUsers.push(user);
    res.json(userWithoutPassword);
});

app.listen(8000, () => {
    console.log('Listening on port 8000');
});

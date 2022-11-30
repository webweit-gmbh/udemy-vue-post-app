import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { Post, thisMonth, thisWeek, today } from '../posts';

function delay() {
    return new Promise<void>(res => setTimeout(res, 1500));
}

const app = express();

app.use(cors());
app.use(bodyParser.json());

const allPosts = [today, thisWeek, thisMonth];

app.get("/posts", async (req, res) => {
    await delay();
    res.json(allPosts);
});

app.post<{}, {}, Post>("/posts", async (req, res) => {
    const post = { ...req.body, id: (Math.random() * 100000).toFixed() }

    allPosts.push(post);
    res.json(post);
});

app.listen(8000, () => {
    console.log('Listening on port 8000');
});

import express from 'express';
import cors from 'cors';
import { thisMonth, thisWeek, today } from '../posts';

function delay() {
    return new Promise<void>(res => setTimeout(res, 1500));
}

const app = express();

app.use(cors());

app.get("/posts", async (req, res) => {
    await delay();
    res.json([today, thisWeek, thisMonth]);
});

app.listen(8000, () => {
    console.log('Listening on port 8000');
});

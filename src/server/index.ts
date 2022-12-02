import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import jsonwebtoken from 'jsonwebtoken';

import { Post, thisMonth, thisWeek, today } from '../posts';
import { NewUser, User } from '../users';

const delay = async (timeout = 500) => {
    return new Promise<void>(res => setTimeout(res, timeout));
}

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

const allPosts: Post[] = [today, thisWeek, thisMonth];
const allUsers: User[] = [];

const SECRET = 'my-secret';
const COOKIE = 'vuejs-jwt';

const authenticate = (id: string, req: Request, res: Response) => {
    const token = jsonwebtoken.sign(
        { id },
        SECRET,
        {
            issuer: 'vuejs-course',
            expiresIn: '30 days'
        }
    );

    res.cookie(COOKIE, token, { httpOnly: true });
}

app.get("/current-user", async (req, res) => {
    try {
        const token = req.cookies[COOKIE];
        const result = jsonwebtoken.verify(token, SECRET) as { id: string };

        // await delay(1500);

        res.json({ id: result.id });
    } catch (e) {
        res.status(404).end();
    }
});

app.post("/logout", async (req, res) => {
    res.cookie(COOKIE, '', { httpOnly: true });
    res.status(200).end();
});

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

    authenticate(user.id, req, res);

    allUsers.push(user);
    res.json(userWithoutPassword);
});

app.listen(8000, () => {
    console.log('Listening on port 8000');
});

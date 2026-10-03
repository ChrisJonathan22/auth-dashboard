import express from 'express';

import type { Request, Response } from 'express';

import fs from 'fs';

import path from 'path';
import cors from 'cors';


const app = express();
const port = 3000;

app.use(cors({origin: 'http://localhost:5173'}));

app.use(express.json());

app.use('/dashboard', (req: Request, res: Response, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({error: "Unauthorised"});
  }
  next();
});

app.get('/', (req: Request, res: Response) => {
    return res.redirect('/login');
  // return res.send('Hello World!');
});

// app.get('/login', (req: Request, res: Response) => {
//   return res.sendFile(path.join(__dirname, './login.html'));
// });

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port},`);
});


/*

To-do


Log in (/login)

Log out

Protected dashboard (/dashboard), (/profile)

Redirect if not authenticated

Persist authenticated session for the whole session

Prevent unauthenticated access to protected routes

*/
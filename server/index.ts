import express from 'express';

import type { Request, Response, ErrorRequestHandler } from 'express';

import fs from 'fs';

import { fileURLToPath } from 'url';

import path from 'path';
import cors from 'cors';

const userObj = {
  username: "John",
  password: "d9e6762dd1c8eaf6d61b3c6192fc408d4d6d5f1176d0c29169bc24e71c3f274ad27fcd5811b313d681f7e55ec02d73d499c95455b6b5bb503acf574fba8ffe85"
};

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);

  if (res.headersSent) {
    next(err);
    return;
  }

  res.status(500).json({
    message: "An unexpected error occurred"
  });
}

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

app.post('/auth/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({
      message: "Username and password are required"
    });

    return;
  }

  // return res.sendFile(path.join(__dirname, 'login.html'));
  console.log("Request:", req.body);
  return res.json({ auth: "Authenticated" });
});

app.use(errorHandler);

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


The frontend handles:
- Login form
- Routing
- Protected routes
- Auth state
- Dashboard

The backend handles:
- Validating credentials
  - Setup a demo user with a username and hashed password
- Creating the authenticated session/token (HttpOnly cookie)
- Returning the user
- Logout

*/
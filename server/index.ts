import express, {Request, Response} from 'express';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


/*

To-do



Log in (/login)

Log out

Protected dashboard (/dashboard), (/profile)

Redirect if not authenticated

Persist authenticated session

Prevent unauthenticated access to protected routes

*/
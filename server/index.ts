import express from 'express';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import type { Request, Response, ErrorRequestHandler } from 'express';
import cors from 'cors';

const userObj = {
  creadentials: {
      username: "John",
      password: "$2a$12$/Iqg8MFIkXslmeWk2T514.T.9T8XYjPYMrex6U7em4UaMhzpihxJi"
  },
  profileData: {
    displayName: "John Smith",
    profilePicture: "https://i.pravatar.cc/300?img=68",
  }
};

const app = express();
const port = 3000;

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  res.status(500).json({
    message: "An unexpected error occurred"
  });
}

app.use(cookieParser());

app.use(cors({origin: 'http://localhost:5173', credentials: true}));

// credentials: true, it allows cookies to cross from the backend port to the frontend port

app.use(express.json());

app.get('/dashboard', (req: Request, res: Response, next) => {
  const token = req.cookies.session_token;

  if (!token) {
    return res.status(401).json({error: "Unauthorised: No session token found."});
  } else {
      res.json({message: 'Welcome! Your token is verified internally.', userData: userObj.profileData});
  }
  next();
});

app.get('/auth/verify', (req: Request, res: Response, next) => {
  const token = req.cookies.session_token;

  if (!token) {
    return res.status(401).json({error: "Unauthorised: No session token found."});
  } else {
    return res.status(200).json({message: 'Welcome back! Your token is verified internally.'});
  }
})

app.post('/auth/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({
      message: "Username and password are required"
    });

    return;
  }

  if (username === userObj.creadentials.username && await bcrypt.compare(password, userObj.creadentials.password)) {
    res.cookie('session_token', 'xyz123abc456', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 3600000
    });

    res.cookie('is_logged_in', 'true', {
      httpOnly: false, // Allows the frontend JS to read this specific cookie
      secure: false,   
      sameSite: 'lax',
      maxAge: 3600000 
    });
  
    return res.status(200).json({ message: "Login successful" });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
});

app.post('/auth/logout', (req: Request, res: Response) => {
  // Clear secure HttpOnly cookie

  res.clearCookie('session_token', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  });

  // Clear the non-HttpOnly frontend cookie

  res.clearCookie('is_logged_in', {
    httpOnly: true,
    secure: false,
    sameSite: 'lax'
  });

  return res.status(200).json({ message: "Logged out successfully" });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port},`);
});
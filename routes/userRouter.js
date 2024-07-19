import express from 'express';

const jsonParser = express.json();

const userRouter = express.Router();

userRouter.post('/register', registerUser);

export default userRouter;

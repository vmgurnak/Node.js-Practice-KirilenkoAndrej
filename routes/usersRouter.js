import express from 'express';
import { loginUser, registerUser } from '../controllers/usersControllers.js';
import { logUserShema, regUserShema } from '../shemas/usersShemas.js';
import { validateBody } from '../middlewares/validateBody.js';

const usersRouter = express.Router();

usersRouter.post('/register', validateBody(regUserShema), registerUser);
usersRouter.post('/login', validateBody(logUserShema), loginUser);

export default usersRouter;

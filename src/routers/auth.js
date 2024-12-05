import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  loginUserController, logoutUserController, refreshSessionController,
  registerUserController,
} from '../controllers/auth.js';
import { createUserSchema, loginUserSchema } from '../validation/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(createUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post(
  '/logout',
  ctrlWrapper(logoutUserController),
);

router.post(
  '/refresh',
  ctrlWrapper(refreshSessionController),
);


export default router;

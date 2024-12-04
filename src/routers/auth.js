import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { registerUserController } from '../controllers/auth.js';
import { createUserSchema } from '../validation/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(createUserSchema),
  ctrlWrapper(registerUserController),
);

export default router;

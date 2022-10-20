import { googleOauthHandler } from "./../../middlewares/auth";
import { Router } from "express";
const router = Router();

router.get("/api/sessions/oauth/google", googleOauthHandler);

export default router;

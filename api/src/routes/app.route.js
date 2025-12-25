import express from "express";
import * as appController from "../controllers/app.controller";
const router = express.Router();

router.post("/app", appController.apiApp);
module.exports = router;

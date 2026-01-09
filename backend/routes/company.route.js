import express from "express";

import isAuthenticated from "../middlewares/isauthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import { singleUpload } from "../middlewares/mutler.js";

//  import upload from "../middlewares/mutler.js";
const router = express.Router();

// router.post("/register", upload.single("file"), register);
router.route("/register").post(isAuthenticated, registerCompany);

router.route("/get").get(isAuthenticated, getCompany);

router.route("/get/:id").get(isAuthenticated, getCompanyById);
router.route("/update/:id").put(isAuthenticated, singleUpload,updateCompany);

export default router;

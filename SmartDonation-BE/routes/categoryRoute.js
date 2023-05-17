import { Router } from "express";
const router = Router();
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  editCategory,
} from "../controllers/categoryController.js";
import protectNgo from "../middleware/ngoAuthMiddleWare.js";

router.route("/addCategory").post(protectNgo, addCategory);
router.route("/deleteCategory/:catId").delete(protectNgo, deleteCategory);
router.route("/getAllCat").get(getAllCategories);
router.route("/editCategory/:catId").put(protectNgo, editCategory);

export default router;

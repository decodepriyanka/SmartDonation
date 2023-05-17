import { Router } from "express";
const router = Router();
import {
  addNgos,
  editNgo,
  getAllNgos,
  getNgosByCategory,
  getNgosByUser,
  getNgosId,
} from "../controllers/ngoController.js";
import protectNgo from "../middleware/ngoAuthMiddleWare.js";

router.route("/addNgos").post(addNgos);
router.route("/getAllNgos").get(getAllNgos);
router.route("/getById/:ngosId").get(getNgosId);
router.route("/getByCategory/:catId").get(getNgosByCategory);
router.route("/getByUser/:userId").get(getNgosByUser);
router.route("/editNgo/:ngosId").put(protectNgo, editNgo);

export default router;

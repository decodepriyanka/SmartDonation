import { Router } from "express";
const router = Router();
import {
  addDonationItem,
  deleteDonationItem,
  editDonationItem,
  getAllDonationItems,
  getDonationItemById,
} from "../controllers/donationItemController.js";

router.route("/addItem").post(addDonationItem);
router.route("/deleteById/:itemId").delete(deleteDonationItem); //will  test later
router.route("/editById/:itemId").post(editDonationItem); //will test later
router.route("/getById/:itemId").get(getDonationItemById);
router.route("/getAllItems").get(getAllDonationItems);

export default router;

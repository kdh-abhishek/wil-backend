import express from "express";
import { addCampaign, getAllCampaigns, updateCampaign, getById, deleteCampaign } from "../controllers/campaign-controller.js"

const CampaignRouter = express.Router();

CampaignRouter.get("/", getAllCampaigns);
CampaignRouter.post("/add", addCampaign);
CampaignRouter.put("/update/:id", updateCampaign);
CampaignRouter.get("/:id", getById);
CampaignRouter.delete("/:id", deleteCampaign)

export default CampaignRouter;
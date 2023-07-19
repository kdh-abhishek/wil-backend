import mongoose from "mongoose";
import Campaign from "../model/Campaing.js";
import User from "../model/User.js";

export const getAllCampaigns = async( req, res, next ) => {
    let campaigns;

    try {
        campaigns = await Campaign.find();
    } catch (err) {
        return console.log(err);
    }
    if (!campaigns) {
        return res.status(400).json({ message: "No Campaigns Found"})
    }
    return res.status(200).json({ campaigns })
};

export const addCampaign = async ( req, res, next ) => {
    const { title, description, image, user } = req.body;
    
    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (error) {
        return console.log(err);
    }
    if(!existingUser) {
        return res.status(400).json({ message: "Unable to find the User by this Id!!"})
    }

    const campaign = new Campaign ({
        title, 
        description, 
        image, 
        user,
    });
    try {
       const session = await mongoose.startSession();
       session.startTransaction(); 
       await campaign.save();
       existingUser.campaigns.push(campaign);
       await existingUser.save({ session });
       await session.commitTransaction();

    }catch(err) {
        console.log(err);
        return res.status(500).json({ message: err})
    }
    return res.status(200).json({ campaign })

};

export const updateCampaign = async ( req, res, next ) => {
    const { title, description } = req.body;

    const campaignId = req.params.id;

    let campaign;
    try{
        campaign = await Campaign.findByIdAndUpdate( campaignId, {
            title,
            description
        })
    } catch (err) {
        return console.log(err);
    }
    if (!campaign) {
        return res.status(500).json({ message: "Unable to update the campaign"})
    }
    return res.status(200).json({ campaign });
};

export const getById = async ( req, res, next) =>{
    const id = req.params.id;
    let campaign;
    try{
        campaign = await Campaign.findById(id);
    }catch (err){
        return console.log(err);
    }
    if (!campaign) {
     return res.status(400).json({ message: " No Campaign foudnd"})   
    }
    return res.status(200).json({ campaign })
}

export const deleteCampaign = async ( req, res, next ) => {
    const id = req.params.id;

    let campaign;
    try {
        campaign = await Campaign.findByIdAndRemove(id).populate(" user ");
        if (!campaign) {
            return res.status(400).json({ message: "Unable to Delete!!" });
          }
          if (campaign.user) {
            await campaign.user.campaigns.pull(campaign);
          }
        }catch(err){
        return console.log(err)
    }
    if(!campaign) {
        return res.status(400).json({ message: "Unable to Delete!!"})
    }
    return res.status(200).json({ message: "Successfully deleted!!"})
}
const router = require("express").Router();
const { json } = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.put("/:id", async (req, res) => {
    if (req.body.userId == req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json({ error: "Error hashing password", details: err.message });
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });

            res.status(200).json({ message: "Account updated successfully", user });
        } catch (err) {
            return res.status(500).json({ error: "Error updating user", details: err.message });
        }
    } else {
        return res.status(403).json({ error: "You can update only your account" });
    }
});

router.delete("/:id", async (req, res) => {
    if (req.body.userId == req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);

            res.status(200).json({ message: "Account deleted successfully"});
        } catch (err) {
            return res.status(500).json({ error: "Error updating user", details: err.message });
        }
    } else {
        return res.status(403).json({ error: "You can delete only your account" });
    }
});

router.get("/:id",async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const{password,updatedAt, ...other} = user._doc
        res.status(200).json(other)
    }catch(err){
        res.status(500).json(err)
    }
})

//follow a user
router.put("/:id/follow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if (!user || !currentUser) {
                return res.status(404).json({ message: "User not found" });
            }

            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { following: req.params.id } });

                res.status(200).json({ message: "User has been followed" });
            } else {
                res.status(403).json({ message: "You already follow this user" });
            }
        } catch (err) {
            res.status(500).json({ message: "Internal server error", error: err.message });
        }
    } else {
        res.status(403).json({ message: "You can't follow yourself" });
    }
});

router.put("/:id/unfollow", async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if (!user || !currentUser) {
                return res.status(404).json({ message: "User not found" });
            }

            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { following: req.params.id } });

                res.status(200).json({ message: "User has been unfollowed" });
            } else {
                res.status(403).json({ message: "You dont follow this user" });
            }
        } catch (err) {
            res.status(500).json({ message: "Internal server error", error: err.message });
        }
    } else {
        res.status(403).json({ message: "You can't unfollow yourself" });
    }
});

module.exports = router
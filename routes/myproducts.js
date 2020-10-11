const router = require("express").Router();
const verify = require("./verifyToken");
const db = require('../database/mysql');

router.get("/", verify, (req, res) => {
    const getUserprofile= "select * from tbl_sellproducts"
    db.query(getUserprofile,(err,rows,field) => {
        if(err) {
            console.log("Failed to get userproducts")
            res.sendStatus(500)
            return
        }
        res.json({profile:rows})
    })

});

module.exports = router;

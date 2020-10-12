const router = require("express").Router();
const verify = require("./verifyToken");
const db = require('../database/mysql');

router.get("/", verify, (req, res) => {
    const getProvinces= "SELECT * FROM `provinces`"
    db.query(getProvinces,(err,rows,field) => {
        if(err) {
            console.log("Failed to get Provinces")
            res.sendStatus(500)
            return
        }
        res.json({provinces:rows})
    })

});

module.exports = router;

const router = require("express").Router();
const verify = require("./verifyToken");
const db = require('../database/mysql');

router.get("/", verify, (req, res) => {
    const getDistricts= "SELECT * FROM `districts`"
    db.query(getDistricts,(err,rows,field) => {
        if(err) {
            console.log("Failed to get Districts")
            res.sendStatus(500)
            return
        }
        res.json({districs:rows})
    })

});

router.get("/:id", verify, (req, res) => {
    const getDistrictsByid= 'SELECT * FROM `districts` WHERE `amphure_id`= '+req.params.id
    db.query(getDistrictsByid,(err,rows,field) => {
        if(err) {
            console.log("Failed to get districts By id")
            res.sendStatus(500)
            return
        }
        res.json({districts:rows})
    })

});

module.exports = router;
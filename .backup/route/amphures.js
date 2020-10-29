const router = require("express").Router();
const verify = require("./verifyToken");
const db = require('../database/mysql');

router.get("/", verify, (req, res) => {
    const getAmphures= "SELECT `amphoe` FROM `districts`"
    db.query(getAmphures,(err,rows,field) => {
        if(err) {
            console.log("Failed to get Amphures")
            res.sendStatus(500)
            return
        }
        res.json({amphures:rows})
    })

});

router.get("/:id", verify, (req, res) => {
    const getAmphuresByid= 'SELECT * FROM `districts` WHERE `id`= '+req.params.id
    db.query(getAmphuresByid,(err,rows,field) => {
        if(err) {
            console.log("Failed to get Amphures By id")
            console.log(getAmphuresByid)
            res.sendStatus(500)
            return
        }
        res.json({amphures:rows})
    })

});

module.exports = router;
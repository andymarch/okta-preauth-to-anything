const express = require('express')
const router = express.Router()
const axios = require('axios')

module.exports = function (){

router.get("/", async function(req,res) {
    try{
        var resp = await axios.get(process.env.TENANT+'api/v1/users/'+req.query.id+'/groups')
        for (let i = 0; i < resp.data.length; i++){
            if(resp.data[i].id == process.env.MIGRATION_GROUP_ID){
                res.status(200).json({migrate: "true"})
                return
            }
        }
        res.status(200).json({migrate: "false"})
    } catch(error){
        console.log(error)
        res.status(500).send("An error occurred")
    }
})

return router
}

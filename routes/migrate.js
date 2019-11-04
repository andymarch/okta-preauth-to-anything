const express = require('express');
const router = express.Router();
const axios = require('axios');

module.exports = function (_client){
  client = _client;


router.post("/", async function(req,res) {
    try{
        let user = req.body.id
        let pwd = req.body.pwd

        if(validateCredentials(user,pwd)){
            //set the password correctly in Okta
            try{
                await axios.post(process.env.TENANT+'api/v1/users/'+user,{
                    "credentials":{
                        "password" : {
                            "value": pwd
                        }
                    }
                });
                res.status(200).json({validation: 'passed', migration: 'passed'})
            } catch (error) {
                //This handles validation failure at Okta (i.e. password policy
                //stronger than legacy)
                console.log(error.response.data.errorSummary)
                res.status(500).json({validation: 'passed', migration: 'failed'})
            }
        }
        else {
            res.status(200).json({validation: 'failed'})
        }
    } catch(error){
        console.log(error)
        res.status(500).send("An error occurred")
    }
})

async function validateCredentials(userid, password){
    //call some custom logic here to validate these credentials against the
    //legacy service. This method should return true only if the credentials are
    //validated, false in all other cases. Consider a circuit breaker here for
    //timeouts.
}

return router;
}

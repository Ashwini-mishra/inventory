const User = require("../models/UserModel");

//////to search on the basis of role and status///////////

const search = async(req,res)=>
{
    try
    {
        const {role,status}=req.body;
        const record = await User.find({status}).select("-createdAt -updatedAt -__v -password").populate("role",{"role_name":1 }).exec(function(err,data)
        {
            newRecord=[]
            for(let i =0 ;i<data.length;i++)
            {
                if(data[i].role.role_name==role)
                {
                    newRecord.push(data[i])
                }
                else if(role=="All")
                {
                    newRecord=data;
                    break;
                }
               
            }
            
            res.send(newRecord);

        });
       
    }
    catch(err)
    {
        res.status(500).send({status:500,error:err});
    }
}
   
module.exports = {search}
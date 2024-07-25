const User = require("../models/user.model");
const Role = require("../models/role.model");

checkDuplicateUsernameOrEmail = async (req, res, next) => {
    //chech username
    await User.findOne({
        where:{
            username: req.body.username
        }
    }).then((user)=>{
        if(user){
            res.status(400).send({message:"Filed! Username is already in use!"});
            return;
        }
        //check email
        User.findOne({
            where:{
                email:req.body.email
            },
    }).then((user)=>{
            if(user){
                res.status(400).send({message:"Filed! Email is already in use!"});
                return;
            }
            next();
        });
    });
};

//check roles are valid
checkRolesExisted = async (req, res, next)=>{
    if(req.body.roles){
        Role.findAll({
                where:{
                    name:{ [Op.or]: req.body.roles },
                },
        }).then((roles)=>{
            if(roles.length !== req.body.roles.length) {
                res.status(400).send({message: "Failed! Role dose not exist."});
                return;
            }
            next();
        });
    }else{
        next();
    }
};

const verifySignUp = {
    checkRolesExisted,
    checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
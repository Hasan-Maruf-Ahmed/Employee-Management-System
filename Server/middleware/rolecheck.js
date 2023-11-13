const roleCheck = (roles) =>{
    return (req, res, next) => {
        roles.push("employee");
        if(req.user.role.includes(...roles)){
            next();
        }else {
            res.status(403).send({ error: true, message:"You are not authorized"});
        }
    }
}

module.exports = roleCheck;
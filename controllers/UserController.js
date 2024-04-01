export const getAllUsers = async (req, res, next)=>{
    let user;
    try {
        users = User.Users.find()
    } catch (err) {
        return next(err);
    }
    if(!users){
        return res.status(500).json({message:"unexpexted error"})
    }
    return res.status(200).json({users: user})
};
const validparameters = ( req, res, next) =>{
    const { user } = req.body;
    if(!user.email || !user.password){
        return res.status(400).json({error: "Faltan email o password"});
    }
    next();
}

export { validparameters };
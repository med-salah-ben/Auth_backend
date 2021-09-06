const {body, validationResult}=require("express-validator")

const registerRules = ()=>[
    body('name','name is required').notEmpty(),
    body('lastName','lastName is required').notEmpty(),
    body('email','name is required and should be email').notEmpty().isEmail(),
    body('password','password most contain 5 car').isLength(
        {
            min:5,
            max:20
        }
    )
];

const loginRules = ()=>[
    body('email','name is required and should be email').notEmpty().isEmail(),
    body('password','password most contain 5 car').isLength(
        {
            min:5,
            max:20
        }
    )
];

const validator = (req,res,next)=>{
    const errors = validationResult(req)
   if(!errors.isEmpty()) {
    res.status(400).send({errors:errors.array()})}
    next()
}

module.exports = {validator, registerRules , loginRules}
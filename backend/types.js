const z = require('zod')

const userSignUp = z.object({
   username:z.string().email().min(6),
   password:z.string().min(8),
   firstname:z.string().min(1),
   lastname:z.string().min(1)
})

const userSignIn = z.object({
    username:z.string().email().min(1),
    password:z.string().min(3)
})

const updateBody = z.object({
    firstname: z.string().min(1),
    lastname: z.string().min(1),
	password: z.string().min(8),
})

module.exports={
    userSignIn,
    userSignUp,
    updateBody
}
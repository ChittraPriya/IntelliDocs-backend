const authController = {
    register: async(req,res) => {
        try {
            res.status(201).json({message: 'User Registered Successfully'})
        } catch (error) {
            res.status(500).json({message:'Error registering user', error: error.message})
        }
    },
    login: async(req,res) => {
        try {
            res.status(201).json({message: 'Login Successfully'})
        } catch (error) {
             res.status(500).json({message:'Error Login user', error: error.message})
        }
    }
}

module.exports = authController
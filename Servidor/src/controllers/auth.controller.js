import User from '../models/Usuario.model.js'

export const register = async (req, res) => {
     const {nameCompleto, nameUser, email, password, recaptchaToken} = req.body

    try {
        const newUser = new User({
        nameCompleto,
        nameUser, 
        email,
        password,
        recaptchaToken,
     })

     await newUser.save();
     res.send('Registrando');
    } catch (error) {
        console.log(error)
    }

     
}

export const login = (req, res) => {};

import User from "../models/Usuario.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { nameCompleto, nameUser, email, password, recaptchaToken } = req.body;

  try {
    const usuarioExiste = await User.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({ msg: "EL correo ya está registrado" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
      nameCompleto,
      nameUser,
      email,
      password: passwordHash,
      recaptchaToken,
    });

    await newUser.save();

    jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) console.log(err);
        res.cookie("token", token);
        res.json({
          message: "Usuario registrado!",
        });
      }
    );

    res.json({
      id: newUser._id,
      nameCompleto: newUser.nameCompleto,
      nameUser: newUser.nameUser,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
    const {email, password } = req.body;

  try {
    const usuarioEncontrado = await User.findOne({ email });
    if (!usuarioEncontrado) 
      return res.status(400).json({ msg: "Usuario no encontrado" });
    
    //La función isMatch 
    //Compara una contraseña ingresada por el usuario con el hash almacenado en la base de datos.
    const isMatch = await bcrypt.compare(password, usuarioEncontrado.password);
    if(!isMatch) return res.status(400).json({message: "Contraseña incorrecta"});

    jwt.sign(
      { id: usuarioEncontrado._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
      (err, token) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: "Error al generar el token" });
        }

        res.cookie("token", token, {
          httpOnly: true, //Impide que el JavaScript del navegador acceda a la cookie 
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        res.json({
          message: "Login exitoso",
          token,
          user: {
            id: usuarioEncontrado._id,
            nameCompleto: usuarioEncontrado.nameCompleto,
            nameUser: usuarioEncontrado.nameUser,
            email: usuarioEncontrado.email,
            createdAt: usuarioEncontrado.createdAt,
            updatedAt: usuarioEncontrado.updatedAt,
          },
        });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Error en el servidor"});
  }
};

export const logout = (req, res) => {
    res.cookie("token", "",{ //"": le asigna un valor vacío, lo cual es parte del proceso para eliminarla.
        expires: new Date(0),// Elimina la cookie
    });
    return res.status(200).json({message: "Ha cerrado sesión"});
};
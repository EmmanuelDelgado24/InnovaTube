import User from "../models/Usuario.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { nameCompleto, nameUser, email, password, recaptchaToken } = req.body;

  try {
    // 1. Verificar si el correo ya está registrado 
    const usuarioExiste = await User.findOne({ email });
    if (usuarioExiste) {
      return res.status(409).json({ msg: "EL correo electrónico ya está registrado" });
    }

    const nameUserExiste = await User.findOne({nameUser});
    if (nameUserExiste) {
      return res.status(409).json({ message: "El nombre de usuario ya está en uso." });
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




/* Ruta para manejar el envío del formulario (el 'action' de tu formulario HTML)
app.post('/register', async (req, res) => {
    // 1. Obtener la respuesta de reCAPTCHA del cuerpo de la solicitud
    const recaptchaResponse = req.body['g-recaptcha-response'];

    // 2. Verificar si la respuesta de reCAPTCHA existe
    if (!recaptchaResponse) {
        return res.status(400).send('Por favor, marca la casilla "No soy un robot" para continuar..');
    }

    try {
        // 3. Enviar la respuesta de reCAPTCHA y tu clave secreta a la API de verificación de Google
        const googleVerifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
        const response = await axios.post(googleVerifyUrl, null, {
            params: {
                secret: RECAPTCHA_SECRET_KEY,
                response: recaptchaResponse,
                // remoteip: req.ip // Opcional: la IP del usuario, Express tiene req.ip
            }
        });

        const data = response.data;

        if (data.success) {
            // reCAPTCHA verificado con éxito
            // Aquí puedes procesar el resto de los datos del formulario:
            const { floating_full_name, floating_email, floating_password, floating_repeat_password, floating_username } = req.body;

            console.log('Datos del formulario:', {
                nombreCompleto: floating_full_name,
                email: floating_email,
                password: floating_password, // En producción, ¡hashea la contraseña!
                confirmPassword: floating_repeat_password,
                username: floating_username
            });

            // Lógica para guardar en base de datos, enviar emails, etc.
            // ...

            res.status(200).send('¡Formulario enviado con éxito! Eres un humano. Cuenta creada.');

        } else {
            // reCAPTCHA falló la verificación
            console.error('Error en la verificación de reCAPTCHA:', data['error-codes']);
            res.status(400).send('Error en la verificación de reCAPTCHA. Por favor, inténtalo de nuevo.');
        }

    } catch (error) {
        console.error('Error al comunicarse con la API de reCAPTCHA:', error);
        res.status(500).send('Ocurrió un error en el servidor al verificar reCAPTCHA.');
    }
});*/
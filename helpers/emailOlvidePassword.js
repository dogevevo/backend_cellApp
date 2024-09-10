import nodemailer from 'nodemailer'

const EmailOlvidePassword = async ( datos ) => {
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "6bda3dc7f1d385",
          pass: "dfc0d70c9be160"
        }
    });

    //tomando los datos de la instancia del usuario de controller
    //console.log(datos);

    //cuerpo de el correo
    const {email, nombre, token} = datos; 

    const info = await transporter.sendMail({
        from: "Administrador de pacientes de veterinaria",
        to: email, 
        subject: 'Reestablece tu password',
        text: 'Reestablece tu password',
        html: `<p> Hola: ${nombre}, has solicitado reestablecer tu password 
                <p> Sigue el siguiente enlace para reestablecer tu password: <a href="${process.env.FRONT_URL}/olvide-password/${token}"> Reestablecer Password </a></p>
                <p> Si tu no creaste esta cuenta, puedes ignorar este mensaje </p>`
    }); 

    console.log('Mensaje enviado ... %s', info.messageId);
}

export default EmailOlvidePassword
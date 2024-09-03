import nodemailer from 'nodemailer'; 

const emailRegistro = async( datos ) => {

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "6bda3dc7f1d385",
        pass: "dfc0d70c9be160"
      }
    });

    console.log(datos);

    const {nombre, email, token } = datos; 

    const info =  await transport.sendMail({
      from: 'cell Phone Cells', 
      to: email,
      subject: 'Verifica tu cuenta',
      text: 'Comprueba tu cuenta de Phone Cells',
      html: `
        <p> Hola ${nombre}, Comprueba tu cuenta </p>
                <p> Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace: <a href="${process.env.FRONT_URL}/confirmarCuenta/${token}"> Comprobar Cuenta </a></p>        <p> Si no creastes esta cuenta puedes ignorar el mensaje </p>
      
      `
    })
    
    console.log('mensaje enviado ... %s', info.messageId);
    
}

export default emailRegistro
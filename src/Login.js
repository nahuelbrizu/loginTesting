import React, { useState } from 'react';
import { Button } from 'react-bootstrap'; // Import Button from react-bootstrap
import Cookies from 'js-cookie';
import {getAuth , GoogleAuthProvider  , signInWithPopup} from "firebase/auth";
import GogleLogin from "./components/gogleLogin";

function Login({ onSuccess }) {

    const { email2, displayName, photoURL, uid, providerId } = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = getAuth();

    // You don't need to re-declare the 'provider' variable here
    const provider = new GoogleAuthProvider();

    const handleLogin = async () => {

        try {

            const loginData = {
                email: email2,
                name: displayName,
                avatar: photoURL,
                uid: uid,
                provider: providerId,
            };

            // Enviar credenciales al servidor para la autenticación
            const response = await fetch('http://127.0.0.1:3003/users/sign_in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Inicio de sesión exitoso:', data);

                // Almacena el token de autenticación en una cookie o en el almacenamiento local
                Cookies.set('userToken', data.accessToken, { expires: 7 });

                // Realiza cualquier otra acción que necesites después del inicio de sesión exitoso
            } else {
                console.error('Error en el inicio de sesión:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error en el inicio de sesión:', error);
        }
    }


    const handleGoogleLogin = async () => {
        try {
            // Sign in with Google
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            const userData = {
                email: user.email,
                displayName: user.displayName,
                photoURL: user.photoURL,
                uid: user.uid,
                providerId: user.providerId,
            };
            console.log(userData)
            // You may want to customize this part based on your specific use case
            console.log("promesa :",result);
            console.log("Ususario :",user);

            onSuccess(userData);

            // Sending the token to your server
            await sendUserDataToApi(userData, user.accessToken);

            // Saving the token in a cookie
            Cookies.set('userToken', user.accessToken, { expires: 7 });

        } catch (error) {
            console.error('Error de inicio de sesión de Google:', error);
        }
    }

    /*const sendTokenToApi = async (token) => {
        try {
            // Send the token to your server (adjust the URL accordingly)
            const response = await fetch('http://127.0.0.1:3003/users/sign_in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Attach the token as a bearer token
                },
            });

            if (response.ok) {
                const data = await response.json(); // Parse the JSON response
                console.log('Token enviado con éxito al servidor de Rails:', data);
            } else {
                console.error('Error al enviar el token al servidor de Rails:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error al enviar el token al servidor de Rails:', error);
        }
    }*/
    const sendUserDataToApi = async (user, token) => {
        try {
            // Imprime el token en la consola para verificar su contenido
            console.log('Token de acceso:', token);

            // Envía la solicitud al servidor
            const response = await fetch('http://127.0.0.1:3003/users/sign_in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Token enviado con éxito al servidor de Rails:', data);
            } else {
                console.error('Error al enviar el token al servidor de Rails:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error al enviar el token al servidor de Rails:', error);
        }
    };



    return (
        <div>
            <h2>Iniciar sesión con redes sociales</h2>
            <Button variant="primary" type="button" onClick={handleGoogleLogin}>
                Iniciar sesión con Google
            </Button>

            <GogleLogin />

            <h2>Iniciar sesión</h2>
            <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin}>Iniciar sesión</Button>
        </div>
    );
}

export default Login;

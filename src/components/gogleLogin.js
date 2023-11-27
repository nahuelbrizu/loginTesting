import React from 'react';
import axios from 'axios';
import {useAuth} from "../AuthContext";

const GoogleLogin = () => {
    const { login, setUser, user} = useAuth();


    const handleGoogleLogin = async () => {
        try {
            const response = await axios.get('https://ec2-54-167-106-27.compute-1.amazonaws.com:3000/users/auth/google_oauth2/callback');
            console.log('Respuesta de inicio de sesión con Google:', response.data);
            setUser(response.data)
            login(true);
        } catch (error) {
            console.error('Error al iniciar sesión con Google:', error);
        }

    };
    console.log("Handle GoogleLogin : ",user)
    return (
        <div>
            <h2>Iniciar sesión con Google</h2>
            <button onClick={handleGoogleLogin}>Iniciar sesión con Google</button>
        </div>
    );
};

export default GoogleLogin;

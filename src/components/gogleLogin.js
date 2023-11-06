import React, {useState} from 'react';
import axios from 'axios';

const GoogleLogin = () => {
    const [user, setUser] = useState('')


    const handleGoogleLogin = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:3003/users/auth/google_oauth2/callback');
            console.log('Respuesta de inicio de sesión con Google:', response.data);
            setUser(response.data)
        } catch (error) {
            console.error('Error al iniciar sesión con Google:', error);
        }

    };
    console.log(user)
    return (
        <div>
            <h2>Iniciar sesión con Google</h2>
            <button onClick={handleGoogleLogin}>Iniciar sesión con Google</button>
        </div>
    );
};

export default GoogleLogin;

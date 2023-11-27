// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext('');

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
// This is a simplified example
   /* async function authenticateUserWithToken(token) {
        try {
            // Send a request to your server with the token to authenticate the user
            const response = await fetch('http://127.0.0.1:3003/users/sign_in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Attach the token as a bearer token
                },
            });

            if (response.status === 200) {
                // Authentication was successful; parse the user data from the response
                const user = await response.json();
                setUser(user);
                return user;
            } else {
                // Authentication failed; handle the error
                throw new Error('Authentication failed');
            }
        } catch (error) {
            throw error;
        }
    }*/


/* const sendTokenToApi = async (token) => {
        try {
            // Send the token to your server (adjust the URL accordingly)
            const response = await fetch('http://127.0.0.1:3003/users/auth/google_oauth2/callback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Attach the token as a bearer token
                },
            });


            // Handle the response as needed
            console.log('Token enviado con éxito al servidor de Rails:', response);
        } catch (error) {
            console.error('Error al enviar el token al servidor de Rails:', error);
        }
    };*/

    useEffect(() => {
        const token = Cookies.get('authToken');
        if (token) {
          //  authenticateUserWithToken(token).catch(() => {
               Cookies.get('authToken');
                setUser(null);
                setIsAuthenticated(false);
        }
    }, [isAuthenticated]);

    const login = (userData) => {
        // Your login logic here
        //sendTokenToApi(userData.accessToken).then(r =>
        //    console.log("sendTokenApi: ", r)
        //)
        setUser(userData);
        setIsAuthenticated(true);
        Cookies.set('userToken', userData.token, { expires: 7 });

    };

    const logout = () => {
        // Your logout logic here

        setUser(null);
        setIsAuthenticated(false);
        Cookies.remove('userToken');
    };

    const contextValue = {
        user,
        setUser,
        isAuthenticated,
        login,
        logout,
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return useContext(AuthContext);
}


import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const About = () => {
    const [user, setUser] = ""
    const navigate = useNavigate(); // Initialize useNavigate

    const [accessDenied, setAccessDenied] = useState(false);



    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const jwtToken = localStorage.getItem('jwtToken');
                if (jwtToken) {
                    const response = await axios.get('https://ec2-54-167-106-27.compute-1.amazonaws.com:3000/auth/validate_token', {
                        headers: {
                            Authorization: `Bearer ${jwtToken}`,
                        },
                    });
                    const userData = response.data.user;
                    setUser(userData);
                    console.log("user info ", userData);
                } else {
                    setAccessDenied(true);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setAccessDenied(true);
            }
        };
        fetchUserData();
    }, [user, setUser]);

    const userId = user?.reloadUserInfo.localId || user?.user?.id || "N/A";
    const userName = user?.displayName || user?.user?.name || "N/A";
    const userEmail = user?.email || user?.user?.email || "N/A";
    const userToken = user?.accessToken || "N/A";



    return (
        <>
            {accessDenied ? (
                <div>
                    <h2>Access Denied</h2>
                    <p>You don't have permission to access this information.</p>
                    {navigate('/login')}
                </div>
            ) : (
                <div>
                    <h1>Hello {userName}</h1>
                    <h2>User Information</h2>

                    <div>
                        <p><strong>User ID:</strong> {userId}</p>
                    </div>
                    <div>
                        <p><strong>Email:</strong> {userEmail}</p>
                    </div>
                    <div>
                        <p><strong>Token:</strong> {userToken}</p>
                    </div>
                ¿
                </div>
            )}
        </>
    );
};

export default About;

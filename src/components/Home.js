// Home.js
import React from 'react';
import { useAuth } from '../AuthContext';
import Login from "../Login";

function Home() {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <div>
            <h2>Content for {isAuthenticated ? 'authenticated' : 'unauthenticated'} users</h2>
            {isAuthenticated && user ? (
                <>
                    <p>Welcome, {user.displayName}</p>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <button>blabal</button>
            )}
        </div>
    );
}

export default Home;
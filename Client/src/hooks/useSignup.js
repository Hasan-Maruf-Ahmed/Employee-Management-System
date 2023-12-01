import { useState } from "react";

export const useSignup = () => {
    const [error, setError] = useState(null);

    const signup = async (username, email, password) => {
        setError(null);

        const response = await fetch('http://localhost:8080/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, email, password})
        })
        const json = await response.json();
        
        if(!response.ok){
            setError(json.message);
        }
    }

    const signuprole = async (username, email, password, role) => {
        setError(null);

        const response = await fetch('http://localhost:8080/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, email, password, role})
        })
        const json = await response.json();
        
        if(!response.ok){
            setError(json.message);
        }
    }

    const clearError = () => {
        setError(null);
      };

    return { signup, signuprole, error, clearError };
}
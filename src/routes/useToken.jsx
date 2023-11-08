import {useState} from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        console.log("tokenString : " + tokenString);
        console.log("userToken : " + userToken);
        return userToken
    };

    const [token, setToken] = useState(getToken);

    const saveToken = userToken => {
        sessionStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
    };


    return {
        setToken: saveToken,
        token
    }
}
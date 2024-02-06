
import localstorage from "../tokenCheck/localstorage";
import { useEffect, useState } from "react";
import axios from "../config/axios";



function ProfilePage() {
    const [profile, setProfile] = useState();

    const loadUser = async () => {
        const res = await axios({method: 'get', url: 'http://localhost:8000/user/profile'})
        setProfile({...res.data});
    }
    
    const logout = () => {
        localstorage.removeToken();
        window.location.replace('http://localhost:3000/login')

    } 

    useEffect(() => {
        loadUser();
    },[]);

    return(
        <div style={{textAlign: 'center'}}>
            <h1>Profile page</h1>
            <p>User id: {profile?.id}</p>
            <p>User : {profile?.username}</p>
            <button style={{margin: '5px'}} onClick={logout}>logout</button>
            <button style={{margin: '5px'}} onClick={() => {window.location.replace('http://localhost:3000/list')}}>list</button>
        </div>
    )
}

export default ProfilePage;
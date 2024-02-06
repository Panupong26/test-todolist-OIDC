import {Link} from 'react-router-dom';
import {useState} from 'react'
import axios from '../config/axios';
import localstorage from '../tokenCheck/localstorage';




function LoginPage() {
    const [userData,setUserData] = useState({
      username : '',
      password : ''
    });

    const loginSubmit = async () => {
      await axios({method : 'post', url : 'http://localhost:8000/user/login', data : userData})
      .then(res => {
        localstorage.setToken(res.data);
        window.location.replace('http://localhost:3000/profile');
      })
      .catch(err => {alert(err.response.data.message)});;  
    }


    
    return(
        <div style={{textAlign: 'center'}}>
          <h1> Login page </h1>  
          <div>
            <input style={{margin: '5px'}} placeholder="username" value={userData.username} onChange={e => setUserData({...userData,username : e.target.value})}></input>
            <input style={{margin: '5px'}} placeholder="password" value={userData.password} onChange={e => setUserData({...userData,password : e.target.value})}></input>
            <button style={{margin: '5px'}} onClick={loginSubmit}>login</button>
            <button style={{margin: '5px'}} onClick={() => window.location.pathname = 'keycloaklogin'}>login by Keycloak</button>
            <Link to={'/register'}><button style={{margin: '5px'}} >Register</button></Link>
          </div>
        </div>
    )
} 

export default LoginPage;
import {Link} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';


function RegisterPage() {
    const [userData,setUserData] = useState({
        username : '',
        password : ''
      });

    const submitRegister = () => {
        axios({method:'post', url:'http://localhost:8000/user/register', data: userData})
        .then(res => {
          alert(res.data.message);
          window.location.replace('http://localhost:3000/login')
        })
        .catch(err => {alert(err.response.data.message)});
    }
    
    
    return(
        <div style={{textAlign: 'center'}}>
          <h1> Register page </h1>  
          <div>
            <input style={{margin: '5px'}} placeholder="username" value={userData.username} onChange={e => setUserData({...userData,username : e.target.value})}></input>
            <input style={{margin: '5px'}} placeholder="password" value={userData.password} onChange={e => setUserData({...userData,password : e.target.value})}></input>
            <button style={{margin: '5px'}} onClick={submitRegister}>Submit</button>
            <Link to={'/login'}><button style={{margin: '5px'}} >Login</button></Link>
          </div>
        </div>
    )
}

export default RegisterPage;
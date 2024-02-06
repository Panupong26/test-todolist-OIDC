import { useRef } from "react";
import Keycloak from "keycloak-js";
import localStorage from "../tokenCheck/localstorage"; 
import { useEffect } from "react";


const keycloakConfig = {
    url: 'https://oidc.cams.dev',
    realm: 'dot',
    clientId: 'dev.react',
  };
  
const keycloak = new Keycloak(keycloakConfig);

export default function KeycloakLoginPage() {
    const isRun = useRef;
    
    useEffect(() => {
        if(isRun.current) return;

        isRun.current = true;
        
        keycloak.init({ onLoad: 'login-required' }).then((authenticated) => {
            if(authenticated) {
                console.log(keycloak.idToken)
                localStorage.setToken(keycloak.idToken);   
                window.location.pathname = "profile";
            }
            //setShow(authenticated);
        });
    }, [])


    return <div></div>
}
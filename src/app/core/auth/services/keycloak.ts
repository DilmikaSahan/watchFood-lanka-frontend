import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import Keycloak, {KeycloakInstance} from "keycloak-js";

@Injectable({providedIn: 'root'})
export class KeycloakService{
    private keycloak : KeycloakInstance = new Keycloak({
        url:'http://localhost:8080',
        realm : 'watchfood_lanka',
        clientId : 'watchfood_lanka_frontend_app'
    });

    constructor(private http : HttpClient){}

    async init(): Promise<boolean>{
        try{
            const auth = await this.keycloak.init({
                onLoad : 'login-required',
                checkLoginIframe : false,
                pkceMethod : 'S256'
            });
            if(auth){
                console.log('token pardsed', this.keycloak.tokenParsed);

                this.http.post('http://localhost:8081/api/v1/user/syncUser',{})
                .subscribe({
                    next: res => console.log('User synced/created successfully',res),
                    error: err => console.error('Error Syncing user', err)
                });
            }
            return true;
        }catch(err){
            console.error('Keycloak initialization failed', err);
            return false;
        }
    }
    login(): void{
        this.keycloak.login();
    }

    logout(): void{
        this.keycloak.logout();
    }
    isLoggedIn(): boolean{
        return !!this.keycloak.token;
    }
    getToken(): string | undefined{
        return this.keycloak.token;
    }
    getProfile(): any{
        return this.keycloak.tokenParsed;
    }
    getRoles(): string[]{
        return this.keycloak.realmAccess?.roles ?? [];
    }
    getUserID(): string | undefined{
        return this.keycloak.tokenParsed?.sub;
    }

}

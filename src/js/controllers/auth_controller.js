import { Controller }  from "@hotwired/stimulus";

import { setSessionStorage} from "../services/storage_service.js";

import { clearSessionStorage } from "../services/storage_service.js";

class AuthController extends Controller{
    static targets = ['flash', 'email', 'password']

    async signIn(){
        try{
            const response = await fetch('http://localhost:3000/api/v1/auth', {
                method: 'POST',
                body: JSON.stringify({
                    email: this.emailTarget.value,
                    password: this.passwordTarget.value
                }),
                headers: { "Content-type": "application/json" }
            })
            const data = await response.json()

            if(data.error){
                this.flashTarget.innerHTML =`<div class="p-3 bg-danger text-white rounded my-3">
                                                ${data.error}
                                             </div>`
            }
            if(data.token){
                setSessionStorage({token: data.token})
                Turbo.visit('/frames/entries.html', {frame: 'app'})
            }
        } catch (error){
            console.log(error)
        }
    }
    async signOut(){
        await clearSessionStorage('token')
        Turbo.visit('/frames/signing.html', { frame: 'app'})
    }
}

export default AuthController
import { Controller }  from "@hotwired/stimulus";

import { setSessionStorage} from "../services/storage_service.js";

import { clearSessionStorage } from "../services/storage_service.js";

class AuthController extends Controller{
    static targets = ['flash', 'email', 'password']

    connect(){
        document.addEventListener('auth:signOut', this.signOut.bind(this))
    }

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

            if (!response.ok) {
                const data = await response.json().catch(() => ({ error: 'Unknown server error' }))
                this.flashTarget.innerHTML = `<div class="p-3 bg-danger text-white rounded my-3">
                                                ${data.error || 'Server error'}: ${response.statusText}
                                              </div>`
                return
            }

            const data = await response.json()

            if(data.error || data.errors){
                this.flashTarget.innerHTML =`<div class="p-3 bg-danger text-white rounded my-3">
                                                ${data.error || ''} ${data.errors ? data.errors.join(', ') : ''}
                                             </div>`
            }
            if(data.token){
                setSessionStorage({token: data.token})
                Turbo.visit('/frames/entries.html', {frame: 'app'})
            }
        } catch (error){
            console.log(error)
            this.flashTarget.innerHTML = `<div class="p-3 bg-danger text-white rounded my-3">
                                            Network error or server unreachable. Please try again.
                                          </div>`
        }
    }
    async signOut(){
        await clearSessionStorage('token')
        Turbo.visit('/frames/signing.html', { frame: 'app'})
    }
}

export default AuthController
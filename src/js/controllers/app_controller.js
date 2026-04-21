import { Controller } from "@hotwired/stimulus"

class AppController extends Controller {
    connect(){
        const token = true

        if(token){
            Turbo.visit('/frames/entries.html', { frame: 'app' })
        }
    }
}
export default AppController
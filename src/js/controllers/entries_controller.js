import { Controller } from "@hotwired/stimulus"
import { getSessionStorage} from "../services/storage_service.js";
import { fetchEntries } from "../services/fetch_entries_service.js"
import { sidebar, main } from "../templates/entries_templates.js"

class EntriesController extends Controller {
    static targets = ['sidebar', 'main']

    async connect(){
        const token = await getSessionStorage('token')
        if(!token){
            document.dispatchEvent(new CustomEvent('auth:signOut'))
            Turbo.visit('/frames/signing.html', { frame: 'app' })
        }

        const entries = await fetchEntries()


        try {
            this.sidebarTarget.innerHTML = sidebar(entries)
            this.mainTarget.innerHTML = main(entries[0])
        }
        catch (error) {
            return
        }
        const [activeTab] = await chrome.tabs.query({
            active: true,
            currentWindow: true
        })

        if(!activeTab){
            return
        }
        let parsedUrl;
        try {
            parsedUrl = new URL(activeTab.url)
        } catch (error) {
            console.log('Invalid URL in Active Tab', error)
        }

        const activeEntry = entries.find(entry => entry.url.includes(parsedUrl.hostname))

        if(activeEntry){
            this.mainTarget.innerHTML = main(activeEntry)
        }
    }
    updateMain({ params }) {
        this.mainTarget.innerHTML = main(params.entry)
    }

    navigateToLogin({ params }){
        chrome.tabs.create({ url: params.entry.url })
    }
    async fillInCredentials( { params }){
        const [activeTab] = await chrome.tabs.query({
            active: true,
            currentWindow: true
        })

        if(!activeTab){
            return
        }
        let parsedUrl;
        try {
            parsedUrl = new URL(activeTab.url)
        } catch (error) {
            console.log('Invalid URL in Active Tab', error)
        }

        const activeEntry = params.entry.url === parsedUrl.href

        console.log("active entry is", activeEntry)

        if(activeEntry){
            chrome.tabs.sendMessage(
                activeTab.id,
                {
                    username: params.entry.username,
                    password: params.entry.password,
                })
        }
    }
}
export default EntriesController
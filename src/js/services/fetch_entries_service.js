import { getSessionStorage } from "./storage_service.js";

const fetchEntries = async () => {
    const token = await getSessionStorage('token')
    try{
        const response = await fetch('http://localhost:3000/api/v1/entries',{
            headers: {
                "Authorization": token,
                "Content-type": "application/json"
            }
        })
        const entries = await response.json()

        if (!response.ok || !entries || entries.errors) {
            document.dispatchEvent(new CustomEvent('auth:signOut'))
            throw new Error('Network response was not ok')
        }else{
            return entries
        }
    } catch (error){
        console.log(error)
    }
}
export { fetchEntries }
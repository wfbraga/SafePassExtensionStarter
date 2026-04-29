import { getUsernameInput, getPasswordInput} from "./utils/inputs.js";

const autoFillSignIn = ({username, password}) => {
    const usernameInput = getUsernameInput()
    const passwordInput = getPasswordInput()

    if(usernameInput){
        usernameInput.value = username
    } else {
        console.log('Username input not found')
    }
    if(passwordInput){
        passwordInput.value = password
    } else {
        console.log('Password input not found')
    }
}
chrome.runtime.onMessage.addListener((message) => {
    autoFillSignIn(message)
})

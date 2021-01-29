/*  
Here is the exercise on working on the remaining bom method 

Location , Navigator , screen , Window 

Follow the Instruction on the comments 

1. Declare the UI Variables for selecting on the elements 
2. Use the innerHTML property to display the result on each element 
3. The Text  of the elements will lead you what bom information is required 

Adding Extra is Possible if you want to explore more ...

Good Luck !!! 
*/




// Define UI Variables  here 

const href = document.querySelector('#href')
const protocol = document.querySelector('#protocol')
const host = document.querySelector('#host')
const port = document.querySelector('#port')
const hostname = document.querySelector('#hostname')

const appName = document.querySelector("#appName")
const appVersion = document.querySelector("#appVersion")
const platform = document.querySelector("#platform")
const language = document.querySelector("#language")
const cookieEnabled = document.querySelector("#cookieEnabled")

const height = document.querySelector('#height')
const width = document.querySelector('#width')
const pixelDepth = document.querySelector('#pixelDepth')

const length = document.querySelector('#length')
const state = document.querySelector('#state')




// Display the BOM Information on the innerHTML of the elements
href.innerHTML = location.href
protocol.innerHTML = location.protocol
host.innerHTML = location.host
port.innerHTML = location.port
hostname.innerHTML = location.hostname

appName.innerHTML = navigator.appName
appVersion.innerHTML = navigator.appVersion
platform.innerHTML = navigator.platform
language.innerHTML = navigator.language
cookieEnabled.innerHTML = navigator.cookieEnabled 

height.innerHTML = screen.height
width.innerHTML = screen.width
pixelDepth.innerHTML = screen.pixelDepth

length.innerHTML = history.length
state.innerHTML = history.state
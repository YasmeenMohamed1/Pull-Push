var username = prompt("Enter your name")
var content = document.getElementById('content')
var userheader = document.getElementById("user")
var message = document.getElementById("message")
var sendmessage = document.getElementById("send-button")
userheader.innerHTML= `Hi ${username}`
let mywebsocket = new WebSocket("ws://localhost:8000")
console.log(mywebsocket)
mywebsocket.onopen=function (){
    data_to_send ={
        username : username,
        type: "login"
    }

    data = JSON.stringify(data_to_send)
    this.send(data)
}


mywebsocket.onerror=function (){
    console.log("Error")
}


mywebsocket.onmessage= function (event){
    console.log("Message Received")
    console.log(event.data, typeof data)
    msg= JSON.parse(event.data)
    msg_color = msg.color
    newmessag= `<span style="color: ${msg_color} "> ${msg['content']} </span> </br>`
    content.innerHTML +=newmessag
}



sendmessage.addEventListener("click", function (){
    mymessage = message.value
    message.value = ''
    console.log(mymessage)
    msgobj= {
        type: "chat",
        username: username,
        body: mymessage+"\n"

    }

    msgobj = JSON.stringify(msgobj)
    mywebsocket.send(msgobj)

})
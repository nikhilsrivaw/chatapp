import React, { useEffect, useRef, useState } from 'react'



const App = () => {
  const [messages, setMessages] = useState(["hiithere","hello"]);
  const wsRef = useRef<WebSocket | null>(null);


  useEffect(()=>{
    const ws = new WebSocket("ws://localhost:8080");
    console.log("connected")
    ws.onmessage = (event) =>{
      setMessages(m => [...m,event.data])
      wsRef.current = ws;

      ws.onopen = ()=>{
        ws.send(JSON.stringify({
          type:"join",
          payload:{
            roomId:'red'
          }
        }))
      }
    }
  },[]);
  return (
    <div className= 'h-screen bg-black flex flex-col'>
      
      <div className="h-[95vh]  bg-red-300">
        {messages.map(message =><div className = 'm-8'> <span className= "bg-white text-black rounded p-4 ">{message}</span></div>)}
      </div>
      <div className="w-full bg-white flex">
        <input id = "message" className="flex-1 p-4 " type="text" />
        <button onClick={()=>{
          const message = document.getElementById("message")?.ariaValueText;
          //@ts-ignore
          wsRef.current.send(JSON.stringify({
            type:'chat',
            payload:{
              message:message
            }
            
          }))
        }} className= "bg-purple-600 text-color-white p-4">Send essage</button>

        
      </div>

    </div>
  )
}

export default App


import React, { useState, useEffect } from "react";
import io from "socket.io-client";

interface Message {
  message: string;
  user: string;
}

const socket = io("https://chatroom-sg-backend.onrender.com");

const Chatroom: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.on("chat message", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("chat message");
    };
  }, []);

  const handleSend = () => {
    console.log(message);
    const obj: Message = {
      message: message,
      user: localStorage.getItem("name") || "",
    };
    socket.emit("chat message", obj);
    setMessage("");
  };

  return (
    <div>
      <div className="sticky top-0 z-50 border-b border-gray-300 bg-white py-5 px-8 text-left text-sm text-gray-800">
        <h4 className="inline-block py-1 text-left font-sans font-semibold normal-case">
          Lara Abegnale
        </h4>
      </div>
      <div className="flex-grow px-8 pt-8 text-left text-gray-700">
        <div className="relative mb-6 text-center">
          <span className="relative bg-white px-2 text-sm text-gray-600">
            {new Date().toDateString()}
          </span>
        </div>
        {messages.map((msg, index) =>
          msg.user === localStorage.getItem("name") ? (
            <div className="relative mb-6 text-left" key={index}>
              <div className="text-gray-700">
                <div className="relative float-right sm:inline-block rounded-md bg-blue-700 py-3 px-4 text-white">
                  <p className="text-sm text-yellow-600 font-bold">
                    {msg.user}
                  </p>
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
              <div className="clear-both flex text-gray-700"></div>
            </div>
          ) : (
            <div className="relative mb-6 text-left" key={index}>
              <div className="text-gray-700">
                <div className="relative float-left sm:inline-block rounded-md bg-gray-200 py-3 px-4">
                  <p className="text-sm text-indigo-600 font-bold">
                    {msg.user}
                  </p>
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
              <div className="clear-both flex text-gray-700"></div>
            </div>
          )
        )}

        <div className="fixed bottom-0 left-0 right-0 mt-4 flex items-start sm:p-8 py-4 text-left text-gray-700 gap-8">
          <input
            placeholder="Your Message"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          ></input>
          <button
            className="relative inline-flex h-10 w-auto flex-initial cursor-pointer items-center justify-center self-center rounded-md bg-blue-700 px-6 text-center align-middle text-sm font-medium text-white outline-none focus:ring-2"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatroom;

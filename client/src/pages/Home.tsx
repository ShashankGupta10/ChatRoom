import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";

const Home = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");

  const handleRoute = () => {
    navigate("/chatroom");
    localStorage.setItem("name", name);
  };

  return (
    <div className=" w-full h-full flex items-center justify-center p-4 fixed inset-0">
      <div
        className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-2xl mx-4 overflow-visible"
        data-v0-t="card"
      >
        <div className="space-y-1.5 p-6 flex flex-col gap-1">
          <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">
            Enter the Chatroom!
          </h3>
        </div>
        <div className="p-6 grid gap-4">
          <div>Enter your alias.</div>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Enter your name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="bg-black text-white inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
            onClick={handleRoute}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

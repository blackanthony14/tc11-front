import React, { useState, useEffect, useRef } from "react";
import socket from "./Socket";
import "../App.css";

const Chat = ({ nombre }) => {
  const [mensaje, setMensaje] = useState("");// creacion de mensaje individual
  const [mensajes, setMensajes] = useState([]); // almacenamiento de mensajes

  useEffect(() => {
    socket.emit("conectado", nombre);
  }, [nombre]);

  useEffect(() => {
    socket.on("mensajes", (mensaje) => {
      setMensajes([...mensajes, mensaje]); // deconstruccion y construccion del nuevo array de mensajes
    });

    return () => {
      socket.off();
    };
  }, [mensajes]);

  const divRef = useRef(null);
  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }); // esto es para el scroll del panel del chat

  const submit = (e) => {
    e.preventDefault();
    socket.emit("mensaje", nombre, mensaje);
    setMensaje(""); // seteacion de mensaje
  };

  return (
    <div className = "contenido">
      <div className="chat">
        {mensajes.map((e, i) => (
          <div key={i}>
            <div>{e.nombre}</div>
            <div>{e.mensaje}</div>
          </div>
        ))}
        <div ref={divRef}></div>
      </div>
      <form onSubmit={submit} className= "fromis">
        <label htmlFor=""></label>
        <textarea className= "fomis"
          name=""
          id=""
          cols="30"
          rows="10"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        ></textarea>
        <button>Enviar</button>
      </form>
    </div>
  );
};

export default Chat;
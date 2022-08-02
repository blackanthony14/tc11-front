import React, { useState } from 'react';
import Chat from './componentes/Chat';
import './App.css';

function App() {
  const [nombre, setNombre] = useState("")
  const [registrado, setRegistrado] = useState(false)

  const registrar = (e) => {
    e.preventDefault();
    if (nombre !==""){
      setRegistrado(true);
    }// metodo para hacer el registro de las personas, solicitud del nombre para utilizar el chat
  }
  return (
    <div className="App">
      {!registrado && ( // si ya el nombre esta registrado entonces no se puede entrar al chat
        <form onSubmit={registrar}>
          <label htmlFor="">Introduzca su nombre</label>
          <input value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <button>Ir al chat</button>
        </form>
      )}

      {registrado && <Chat nombre={nombre} />}
    </div>
  );
}

export default App;

import React, { useState } from "react";

const Contacto = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [comentario, setComentario] = useState('');
    const [enviado, setEnviado] = useState(false);

    const manejarEnvio = (e) => {
        e.preventDefault();
        setEnviado(true);
    };

    return (
        <div>
            <h2>¡Envíanos tu comentario!</h2>
            {!enviado ? (
                <form onSubmit={manejarEnvio} className="contacto-form">
                    <div>
                        <label htmlFor="name">Nombre:</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={nombre} 
                            onChange={(e) => setNombre(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Correo electrónico:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="comment">Comentarios:</label>
                        <textarea 
                            id="comment" 
                            name="comment" 
                            value={comentario} 
                            onChange={(e) => setComentario(e.target.value)} 
                            required 
                        ></textarea>
                    </div>
                    <button type="submit">Enviar</button>
                </form>
            ) : (
                <div>
                    <h3>Gracias por tu comentario!</h3>
                    <p><strong>Nombre:</strong> {nombre}</p>
                    <p><strong>Correo:</strong> {email}</p>
                    <p><strong>Comentario:</strong> {comentario}</p>
                </div>
            )}
        </div>
    );
}

export default Contacto;

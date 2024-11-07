import React, { useState } from 'react';
import '../../styles/contactForm.css';



const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactRequest = { name, email, message };

    try {
      const response = await fetch('/contact-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactRequest),
      });

      if (response.ok) {
        setStatus('Mensaje enviado con éxito');
        setName('');
        setEmail('');
        setMessage('');
      } else if (response.status === 400) {
        setStatus('Por favor, verifica los datos ingresados.');
      } else {
        setStatus('Error en el servidor. Inténtalo de nuevo más tarde.');
      }
    } catch (error) {
      setStatus('Error en la conexión. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <main>
      <div className="contact-form-wrapper">
        <div className="contact-form">
          <h2>Contáctanos</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Nombre:</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="form-label">Mensaje:</label>
              <textarea
                className="form-text-area"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <button className="submit-btn" type="submit">Enviar</button>
            </div>
          </form>
          {status && <p>{status}</p>}
        </div>
      </div>
    </main>
  );
};

export default ContactForm;

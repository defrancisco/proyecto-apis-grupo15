/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useState } from 'react';
import '../../styles/contactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'El email es requerido';
    if (!emailRegex.test(email)) return 'Email inválido';
    return '';
  };

  const validateForm = () => {
    const newErrors = {
      name: !formData.name.trim() ? 'El nombre es requerido' : '',
      email: validateEmail(formData.email.trim()),
      message: !formData.message.trim() ? 'El mensaje es requerido' : ''
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    // Clear error when user starts typing
    setErrors(prev => ({
      ...prev,
      [id]: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validateForm()) {
      setStatus('Por favor, corrige los errores en el formulario');
      return;
    }

    setIsSubmitting(true);
    setStatus('');

    try {
      const response = await fetch('/contact-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim()
        }),
      });

      if (response.ok) {
        setStatus('¡Mensaje enviado con éxito!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        const errorData = await response.json();
        setStatus(errorData.message || 'Error en el servidor');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      setStatus('Error en la conexión. Por favor, inténtalo más tarde.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-wrapper" data-testid="contact-form-wrapper">
      <div className="contact-form" data-testid="contact-form">
        <h2>Contáctanos</h2>
        <form onSubmit={handleSubmit} role="form" noValidate>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Nombre:</label>
            <input
              type="text"
              className={`form-control ${errors.name ? 'form-control-error' : ''}`}
              id="name"
              value={formData.name}
              onChange={handleChange}
              maxLength={100}
              required
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'form-control-error' : ''}`}
              id="email"
              value={formData.email}
              onChange={handleChange}
              maxLength={100}
              required
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="message" className="form-label">Mensaje:</label>
            <textarea
              className={`form-text-area ${errors.message ? 'form-text-area-error' : ''}`}
              id="message"
              value={formData.message}
              onChange={handleChange}
              maxLength={1000}
              required
            />
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>

          <div className="form-group">
            <button 
              className="submit-btn" 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>
          </div>
        </form>
        {status && (
          <p className={`status-message ${status.includes('éxito') ? 'status-success' : 'status-error'}`} role="alert">
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default ContactForm;
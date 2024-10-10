import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
  const [selectedType, setSelectedType] = useState(''); // Persona o Empresa
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    telefono: '',
    direccion: '',
    ruc: '',
  });
  const [errors, setErrors] = useState({}); // Estado para los mensajes de error
  const [showSuccess, setShowSuccess] = useState(false); // Estado para mostrar la animación de éxito
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setFormData({
      nombre: '',
      apellido: '',
      dni: '',
      telefono: '',
      direccion: '',
      ruc: '',
    });
    setErrors({}); // Limpiar los errores cuando se cambie el tipo de registro
  };

  const validateForm = () => {
    let formErrors = {};

    if (selectedType === 'persona' && (formData.dni.length !== 8 || !/^\d+$/.test(formData.dni))) {
      formErrors.dni = 'El DNI debe tener exactamente 8 dígitos.';
    }

    if (selectedType === 'empresa' && (formData.ruc.length !== 11 || !/^\d+$/.test(formData.ruc))) {
      formErrors.ruc = 'El RUC debe tener exactamente 11 dígitos.';
    }

    if (formData.telefono.length !== 9 || !/^\d+$/.test(formData.telefono)) {
      formErrors.telefono = 'El teléfono debe tener exactamente 9 dígitos.';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar antes de enviar el formulario
    if (!validateForm()) {
      return;
    }

    const url =
      selectedType === 'persona'
        ? 'http://localhost:3000/api/clientes/personas'
        : 'http://localhost:3000/api/clientes/empresas';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Limpiar el formulario y mostrar éxito
        setFormData({
          nombre: '',
          apellido: '',
          dni: '',
          telefono: '',
          direccion: '',
          ruc: '',
        });

        // Mostrar la animación de éxito
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000); // Ocultar la animación después de 3 segundos
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        alert(`Hubo un problema con el registro: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      alert('Error de conexión. Asegúrate de que el backend esté corriendo.');
    }
  };

  return (
    <div className="container mt-5">
      {/* Logo de la empresa */}
      <div className="text-center mb-4">
        <img
          src={"https://smc-peru.com/appsmc/logo-smc.png"}
          alt="Logo de la Empresa"
          className="logo mb-3"
        />
      </div>

      {/* Animación de éxito */}
      {showSuccess && (
        <div className="text-center mb-4">
          <div className="success-animation">
            <div className="check-mark">✔</div>
            <p>¡Registro exitoso!</p>
          </div>
        </div>
      )}

      {/* Título dinámico */}
      <h1 className="text-center">
        Registrar{' '}
        {selectedType
          ? selectedType.charAt(0).toUpperCase() + selectedType.slice(1)
          : 'Persona o Empresa'}
      </h1>

      {/* Selección de tipo de registro */}
      <div className="text-center my-4">
        <label htmlFor="tipoSelect" className="form-label">
          Selecciona el tipo de registro:
        </label>
        <select
          id="tipoSelect"
          className="form-select w-50 mx-auto"
          value={selectedType}
          onChange={handleTypeChange}
        >
          <option value="" disabled>
            Selecciona
          </option>
          <option value="persona">Persona</option>
          <option value="empresa">Empresa</option>
        </select>
      </div>

      {/* Formulario dinámico basado en la selección */}
      {selectedType && (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              name="nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              required
            />
          </div>

          {selectedType === 'persona' && (
            <>
              <div className="mb-3">
                <label className="form-label">Apellido</label>
                <input
                  type="text"
                  className="form-control"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">DNI/Carne (ID)</label>
                <input
                  type="text"
                  className="form-control"
                  name="dni"
                  value={formData.dni}
                  onChange={handleInputChange}
                  required
                />
                {errors.dni && <p className="text-danger">{errors.dni}</p>}
              </div>
            </>
          )}

          {selectedType === 'empresa' && (
            <>
              <div className="mb-3">
                <label className="form-label">RUC (ID obligatorio)</label>
                <input
                  type="text"
                  className="form-control"
                  name="ruc"
                  value={formData.ruc}
                  onChange={handleInputChange}
                  required
                />
                {errors.ruc && <p className="text-danger">{errors.ruc}</p>}
              </div>
            </>
          )}

          <div className="mb-3">
            <label className="form-label">Teléfono</label>
            <input
              type="text"
              className="form-control"
              name="telefono"
              value={formData.telefono}
              onChange={handleInputChange}
              required
            />
            {errors.telefono && <p className="text-danger">{errors.telefono}</p>}
          </div>

          <div className="mb-3">
            <label className="form-label">Dirección</label>
            <input
              type="text"
              className="form-control"
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="text-center mt-4">
            <button type="submit" className="btn btn-primary">
              Registrar
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-3"
              onClick={() => navigate(-1)}
            >
              Regresar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default RegisterForm;

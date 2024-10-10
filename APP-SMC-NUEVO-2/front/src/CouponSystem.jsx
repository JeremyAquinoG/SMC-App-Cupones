import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './config.jsx'; // Asegúrate de que este archivo exista y esté bien configurado.

function CouponSystem() {
  const [selectedCompany, setSelectedCompany] = useState(''); // Estado para la entidad seleccionada
  const [couponCount, setCouponCount] = useState(0); // Estado para el número de cupones
  const [entities, setEntities] = useState([]); // Estado para las empresas/personas
  const [filteredEntities, setFilteredEntities] = useState([]); // Estado para las entidades filtradas
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const navigate = useNavigate();

  // Función para obtener las empresas y personas desde el backend
  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/clientes/getallDecisison'); // Cambiar a la ruta correcta de tu backend
        if (!response.ok) {
          throw new Error('Error fetching data');
        }
        const data = await response.json();
        setEntities(data); // Cargar empresas y personas
        setFilteredEntities(data); // Inicializar las entidades filtradas con todas las entidades
      } catch (error) {
        console.error('Error fetching entities:', error);
      }
    };

    fetchEntities();
  }, []);

  // Filtrar las entidades según el término de búsqueda
  useEffect(() => {
    const results = entities.filter(entity =>
      entity.tipo_cliente === 'empresa'
        ? entity.nombre_cliente.toLowerCase().includes(searchTerm.toLowerCase())
        : `${entity.nombre_cliente} ${entity.apellido_cliente}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEntities(results);
  }, [searchTerm, entities]);

  const handleCompanyChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedCompany(selectedValue);

    // Aquí puedes hacer una solicitud al backend para obtener los cupones asociados con la empresa/persona seleccionada
    fetchCouponsForEntity(selectedValue);
  };

  const fetchCouponsForEntity = async (selectedEntity) => {
    try {
      const response = await fetch(`http://localhost:3000/api/cupones/${selectedEntity}`); // Cambiar a la ruta de tu API
      if (!response.ok) {
        throw new Error('Error fetching coupons');
      }
      const data = await response.json();
      setCouponCount(data.totalCupones || 0); // Actualizar cupones con los datos obtenidos
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };

  const handleAddCoupon = () => {
    if (couponCount < 5) {
      setCouponCount(couponCount + 1);
    }
  };

  const handleClaimReward = () => {
    alert(`¡Felicidades! Has obtenido un regalo de la entidad: ${selectedCompany}.`);
    setCouponCount(0);
  };

  const handleRegister = () => {
    navigate('/register-cliente');
  };

  const handleSaveCoupon = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/cupones/guardar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          entityId: selectedCompany,
          totalCupones: couponCount,
        }),
      });

      if (response.ok) {
        alert(`Cupón guardado para la entidad: ${selectedCompany}.`);
        setCouponCount(0);
      } else {
        console.error('Error saving coupon');
      }
    } catch (error) {
      console.error('Error saving coupon:', error);
    }
  };

  // Renderizar solo si hay entidades disponibles
  if (!entities.length) {
    return <div className="text-center">Cargando datos...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <img src={"https://smc-peru.com/appsmc/logo-smc.png"} alt="Logo de la Empresa" className="logo mb-3" />
      </div>
      <h1 className="text-center">Sistema de Cupones</h1>

      {/* Campo de búsqueda */}
      <div className="text-center my-4">
        <label htmlFor="searchInput" className="form-label">Buscar empresa o persona:</label>
        <input
          type="text"
          id="searchInput"
          className="form-control w-50 mx-auto"
          placeholder="Escribe para buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Actualizar el término de búsqueda
        />
      </div>

      {/* Select para seleccionar la empresa o persona */}
      <div className="text-center my-4">
        <label htmlFor="empresaSelect" className="form-label">Selecciona una empresa o persona:</label>
        <select
          id="empresaSelect"
          className="form-select w-50 mx-auto"
          value={selectedCompany}
          onChange={handleCompanyChange}
        >
          <option value="" disabled>Elige una empresa o persona</option>
          {/* Renderizar las opciones filtradas */}
          {filteredEntities.map((entity) => (
            <option
              key={entity.id_cliente} // Clave única para cada entidad
              value={entity.id_cliente} // Valor único para cada entidad
            >
              {entity.tipo_cliente === 'empresa'
                ? entity.nombre_cliente
                : `${entity.nombre_cliente} ${entity.apellido_cliente}`}
            </option>
          ))}
        </select>
      </div>

      <div className="text-center my-4">
        <button
          className="btn btn-primary"
          onClick={handleAddCoupon}
          disabled={!selectedCompany || couponCount >= 5} // Limitar a 5 cupones
        >
          Agregar Cupón
        </button>
      </div>

      <div className="coupon-container d-flex flex-wrap justify-content-center">
        {[...Array(5)].map((_, i) => ( // Mostrar hasta 5 cupones
          <div
            key={i}
            className={`coupon ${i < couponCount ? 'active' : 'inactive'} d-flex align-items-center justify-content-center`}
          >
            {i < couponCount ? i + 1 : ''}
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <button
          className={`btn btn-success ${couponCount < 5 ? 'disabled' : ''}`} // Deshabilitar si no tiene 5 cupones
          onClick={handleClaimReward}
          disabled={couponCount < 5} // Deshabilitar si no tiene suficientes cupones
        >
          Obtener Regalo
        </button>
      </div>

      <div className="text-center mt-4">
        <button
          className="btn btn-info"
          onClick={handleSaveCoupon}
          disabled={!selectedCompany || couponCount === 0} // Deshabilitar si no hay cupones que guardar
        >
          Guardar Cupón
        </button>
      </div>

      <div className="text-center mt-4">
        <button
          className="btn btn-warning"
          onClick={handleRegister}
        >
          Registrar Cliente
        </button>
      </div>
    </div>
  );
}

export default CouponSystem;

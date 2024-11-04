import React, { useState } from "react";
import { filtrarLibros, guardarLibro, mostrarFormularioAlta, habilitarME } from './api';
const Home = () => {
  const [filters, setFilters] = useState({
    nombre: '',
    anio: '',
    mas18: false,
    categoria: '',
    autor: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="App">
      <div className="filtros">
        <input
          type="text"
          id="barraBusqueda"
          name="nombre"
          placeholder="Buscar por nombre..."
          value={filters.nombre}
          onChange={handleChange}
        />
        <input
          type="number"
          id="filtroAnio"
          name="anio"
          placeholder="Filtrar por año..."
          value={filters.anio}
          onChange={handleChange}
        />
        <label htmlFor="filtroMas18">+18</label>
        <input
          type="checkbox"
          id="filtroMas18"
          name="mas18"
          checked={filters.mas18}
          onChange={handleChange}
        />
        <select
          id="filtroCategoria"
          name="categoria"
          value={filters.categoria}
          onChange={handleChange}
        >
          <option value="">Todas las categorías</option>
          <option value="Infantil">Infantil</option>
          <option value="Aventura">Aventura</option>
          <option value="Distopía">Distopía</option>
          <option value="Fantasía">Fantasía</option>
          <option value="Novela">Novela</option>
          <option value="Terror">Terror</option>
        </select>
        <select
          id="filtroAutor"
          name="autor"
          value={filters.autor}
          onChange={handleChange}
        >
          <option value="">Todos los autores</option>
          <option value="Nik">Nik</option>
          <option value="Rick Riordan">Rick Riordan</option>
          <option value="George Orwell">George Orwell</option>
          <option value="J.K. Rowling">J.K. Rowling</option>
          <option value="Antoine de Saint-Exupéry">Antoine de Saint-Exupéry</option>
          <option value="Stephen King">Stephen King</option>
          <option value="Gabriel García Márquez">Gabriel García Márquez</option>
          <option value="Roald Dahl">Roald Dahl</option>
        </select>
        <button onClick={filtrarLibros}>Buscar</button>
      </div>
      <button onClick={mostrarFormularioAlta}>Agregar Libro</button>
      <div className="abm" id="formAltaLibro" style={{ display: 'none' }}>
    <h3>Agregar/Modificar Libro</h3>
    <input type="text" id="codigoLibro" placeholder="Código del libro" hidden />
    <input type="text" id="nombreLibro" placeholder="Nombre del libro" />
    <input type="text" id="autorLibro" placeholder="Autor del libro" />
    <input type="number" id="anioLibro" placeholder="Año de publicación" />
    <select id="categoriaLibro">
        <option value="Infantil">Infantil</option>
        <option value="Aventura">Aventura</option>
        <option value="Distopía">Distopía</option>
        <option value="Fantasía">Fantasía</option>
        <option value="Novela">Novela</option>
        <option value="Terror">Terror</option>
    </select>
    <label htmlFor="mas18Libro">+18</label>
    <input type="checkbox" id="mas18Libro" />
    <input type="file" id="imagenLibro" accept="image/*" />
    <button onClick={guardarLibro}>Guardar</button>
</div>
      <button onClick={habilitarME}>ME</button>
      <div id="librosMostrar" className="libros-mostrar"></div>
    </div>
  );
};

export default Home;

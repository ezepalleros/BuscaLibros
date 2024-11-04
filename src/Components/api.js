var libros = JSON.parse(localStorage.getItem('libros')) || [
    {codigo: '001', nombre: 'Gaturro 1: El Misterio de las 5 Agathas', autor: 'Nik', anio: 2011, categoria: 'Infantil', mas18: 'no'},
    {codigo: '002', nombre: 'Percy Jackson: El ladrón del rayo', autor: 'Rick Riordan', anio: 2005, categoria: 'Aventura', mas18: 'no'},
    {codigo: '003', nombre: '1984', autor: 'George Orwell', anio: 1949, categoria: 'Distopía', mas18: 'si'},
    {codigo: '004', nombre: 'Harry Potter y la piedra filosofal', autor: 'J.K. Rowling', anio: 1997, categoria: 'Fantasía', mas18: 'no'},
    {codigo: '005', nombre: 'El Principito', autor: 'Antoine de Saint-Exupéry', anio: 1943, categoria: 'Infantil', mas18: 'no'},
    {codigo: '006', nombre: 'It', autor: 'Stephen King', anio: 1986, categoria: 'Terror', mas18: 'si'},
    {codigo: '007', nombre: 'Cien años de soledad', autor: 'Gabriel García Márquez', anio: 1967, categoria: 'Novela', mas18: 'si'},
    {codigo: '008', nombre: 'El Resplandor', autor: 'Stephen King', anio: 1977, categoria: 'Terror', mas18: 'si'},
    {codigo: '009', nombre: 'Matilda', autor: 'Roald Dahl', anio: 1988, categoria: 'Infantil', mas18: 'no'}
];

export const mostrarLibros = (librosFiltrados) => {
    document.getElementById('librosMostrar').innerHTML = '';
    librosFiltrados.forEach(function(libro, index) {
        var imagenSrc = libro.imagen || (libro.codigo >= '01000' ? '/img/nophoto.jpg' : `/img/p${libro.codigo}.jpg`);
        var contenidoLibro = `
            <div class="libro">
                <img src="${imagenSrc}" alt="Portada de ${libro.nombre}">
                <p>${libro.nombre}</p>
                <button class="btn-modificar" style="display:none;" onclick="editarLibro(${index})">Modificar</button>
                <button class="btn-eliminar" style="display:none;" onclick="eliminarLibro(${index})">Eliminar</button>
            </div>
        `;
        document.getElementById('librosMostrar').innerHTML += contenidoLibro;
    });
};


export const filtrarLibros = () => {
    var busqueda = document.getElementById('barraBusqueda').value.toLowerCase();
    var filtroAnio = document.getElementById('filtroAnio').value;
    var filtroMas18 = document.getElementById('filtroMas18').checked;
    var filtroCategoria = document.getElementById('filtroCategoria').value;
    var filtroAutor = document.getElementById('filtroAutor').value;

    var librosFiltrados = libros.filter(function(libro) {
        var coincideNombre = libro.nombre.toLowerCase().includes(busqueda);
        var coincideAnio = !filtroAnio || libro.anio >= filtroAnio;
        var coincideMas18 = !filtroMas18 || libro.mas18 === 'si';
        var coincideCategoria = !filtroCategoria || libro.categoria === filtroCategoria;
        var coincideAutor = !filtroAutor || libro.autor === filtroAutor;
        return coincideNombre && coincideAnio && coincideMas18 && coincideCategoria && coincideAutor;
    });

    mostrarLibros(librosFiltrados);
};

export const guardarLibro = () => {
    var codigo = document.getElementById('codigoLibro').value;
    var nombre = document.getElementById('nombreLibro').value;
    var autor = document.getElementById('autorLibro').value;
    var anio = document.getElementById('anioLibro').value;
    var categoria = document.getElementById('categoriaLibro').value;
    var mas18 = document.getElementById('mas18Libro').checked ? 'si' : 'no';
    var imagen = document.getElementById('imagenLibro').files[0];

    if (codigo) {
        var libro = libros.find(libro => libro.codigo === codigo);
        libro.nombre = nombre;
        libro.autor = autor;
        libro.anio = anio;
        libro.categoria = categoria;
        libro.mas18 = mas18;
        if (imagen) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imagenSrc = `data:image/jpeg;base64,${reader.result.split(',')[1]}`;
                libro.imagen = imagenSrc;
            };
            reader.readAsDataURL(imagen);
        }
    } else {
        var nuevoLibro = {
            codigo: String(libros.length + 1).padStart(3, '0'),
            nombre: nombre,
            autor: autor,
            anio: anio,
            categoria: categoria,
            mas18: mas18,
        };
        if (imagen) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imagenSrc = `data:image/jpeg;base64,${reader.result.split(',')[1]}`;
                nuevoLibro.imagen = imagenSrc;
            };
            reader.readAsDataURL(imagen);
        }
        libros.push(nuevoLibro);
    }

    localStorage.setItem('libros', JSON.stringify(libros));

    mostrarLibros(libros);
    limpiarFormulario();
    ocultarFormulario();
};


export const editarLibro = (index) => {
    var libro = libros[index];
    document.getElementById('codigoLibro').value = libro.codigo;
    document.getElementById('nombreLibro').value = libro.nombre;
    document.getElementById('autorLibro').value = libro.autor;
    document.getElementById('anioLibro').value = libro.anio;
    document.getElementById('categoriaLibro').value = libro.categoria;
    document.getElementById('mas18Libro').checked = libro.mas18 === 'si';
    mostrarFormularioAlta();
};

export const eliminarLibro = (index) => {
    libros.splice(index, 1);
    localStorage.setItem('libros', JSON.stringify(libros));
    mostrarLibros(libros);
};

export const limpiarFormulario = () => {
    document.getElementById('codigoLibro').value = '';
    document.getElementById('nombreLibro').value = '';
    document.getElementById('autorLibro').value = '';
    document.getElementById('anioLibro').value = '';
    document.getElementById('categoriaLibro').value = '';
    document.getElementById('mas18Libro').checked = false;
};

export const mostrarFormularioAlta = () => {
    var formAlta = document.getElementById('formAltaLibro');
    formAlta.style.display = 'block';
};

export const ocultarFormulario = () => {
    var formAlta = document.getElementById('formAltaLibro');
    formAlta.style.display = 'none';
};

export const habilitarME = () => {
    var botonesModificar = document.querySelectorAll('.btn-modificar');
    var botonesEliminar = document.querySelectorAll('.btn-eliminar');
    var estanOcultos = botonesModificar[0].style.display === 'none';

    botonesModificar.forEach(function(boton) {
        boton.style.display = estanOcultos ? 'block' : 'none';
    });
    botonesEliminar.forEach(function(boton) {
        boton.style.display = estanOcultos ? 'block' : 'none';
    });
};

window.editarLibro = editarLibro;
window.eliminarLibro = eliminarLibro;

window.onload = function() {
    mostrarLibros(libros);
};
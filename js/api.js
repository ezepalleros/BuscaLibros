var libros = [
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

// Función para mostrar los libros
function mostrarLibros(librosFiltrados) {
    document.getElementById('librosMostrar').innerHTML = ''; // Elimina resultados anteriores

    librosFiltrados.forEach(function(libro, index) { // Por cada libro filtrado
        var imagenSrc = libro.codigo >= '010' ? 'img/nophoto.jpg' : `img/p${libro.codigo}.jpg`;
        var contenidoLibro = `
            <div class="libro">
                <img src="${imagenSrc}" alt="Portada de ${libro.nombre}">
                <p>${libro.nombre}</p>
                <button class="btn-modificar" style="display:none;" onclick="editarLibro(${index})">Modificar</button>
                <button class="btn-eliminar" style="display:none;" onclick="eliminarLibro(${index})">Eliminar</button>
            </div>
        `;
        document.getElementById('librosMostrar').innerHTML += contenidoLibro; // Agregar al contenedor
    });
}

// Función para filtrar los libros
function filtrarLibros() {
    var busqueda = document.getElementById('barraBusqueda').value.toLowerCase();
    var filtroAnio = document.getElementById('filtroAnio').value;
    var filtroMas18 = document.getElementById('filtroMas18').checked;
    var filtroCategoria = document.getElementById('filtroCategoria').value;
    var filtroAutor = document.getElementById('filtroAutor').value;
    
    var librosFiltrados = libros.filter(function(libro) { // Aplica los filtros a la lista de libros usando el método filter
        var coincideNombre = libro.nombre.toLowerCase().includes(busqueda); // Verifica si el nombre coincide con la búsqueda
        var coincideAnio = !filtroAnio || libro.anio >= filtroAnio; // Verifica si el año es mayor o igual al año filtrado
        var coincideMas18 = !filtroMas18 || libro.mas18 === 'si'; // Verifica si el libro es para mayores de 18 años (si el checkbox no está marcado, coincide siempre)
        var coincideCategoria = !filtroCategoria || libro.categoria === filtroCategoria; // Verifica si la categoría coincide con la seleccionada (si no se selecciona categoría, coincide siempre)
        var coincideAutor = !filtroAutor || libro.autor === filtroAutor; // Verifica si el autor coincide con el seleccionado (si no se selecciona autor, coincide siempre)
        return coincideNombre && coincideAnio && coincideMas18 && coincideCategoria && coincideAutor; // Devuelve true si el libro cumple con todos los filtros
    });

    mostrarLibros(librosFiltrados);
}

function guardarLibro() {
    var codigo = document.getElementById('codigoLibro').value;
    var nombre = document.getElementById('nombreLibro').value;
    var autor = document.getElementById('autorLibro').value;
    var anio = document.getElementById('anioLibro').value;
    var categoria = document.getElementById('categoriaLibro').value;
    var mas18 = document.getElementById('mas18Libro').checked ? 'si' : 'no';

    if (codigo) {
        var libro = libros.find(libro => libro.codigo === codigo);
        libro.nombre = nombre;
        libro.autor = autor;
        libro.anio = anio;
        libro.categoria = categoria;
        libro.mas18 = mas18;
    } else {
        var nuevoLibro = {
            //en este caso para las imagenes usamos el codigo de libro como refencia, para ello utilizamos el .padStart lo que hace esto es indicarnos la longitud
            //de la cadena y el otro numero sera con lo que se llenara la cadena si no se ingresan la totalidad de los numeros 
            codigo: String(libros.length + 1).padStart(3, '0'),
            nombre: nombre,
            autor: autor,
            anio: anio,
            categoria: categoria,
            mas18: mas18,
        };
        //aca el push lo utilizamos para agregar elementos al final del array
        libros.push(nuevoLibro);
    }

    mostrarLibros(libros);
    limpiarFormulario();
    ocultarFormulario();
}

function editarLibro(index) {
    var libro = libros[index];
    document.getElementById('codigoLibro').value = libro.codigo;
    document.getElementById('nombreLibro').value = libro.nombre;
    document.getElementById('autorLibro').value = libro.autor;
    document.getElementById('anioLibro').value = libro.anio;
    document.getElementById('categoriaLibro').value = libro.categoria;
    document.getElementById('mas18Libro').checked = libro.mas18 === 'si';

    mostrarFormularioAlta();
}

function eliminarLibro(index) {
    //aca utilizamos el Splice para eliminar el libro deseado, el index indica el libro a eliminar y el 1 la cantidad de libros a eliminar
    libros.splice(index, 1);
    mostrarLibros(libros);
    ocultarFormulario();
}

function limpiarFormulario() {
    document.getElementById('codigoLibro').value = '';
    document.getElementById('nombreLibro').value = '';
    document.getElementById('autorLibro').value = '';
    document.getElementById('anioLibro').value = '';
    document.getElementById('categoriaLibro').value = '';
    document.getElementById('mas18Libro').checked = false;
}

function mostrarFormularioAlta() {
    var formAlta = document.getElementById('formAltaLibro');
    formAlta.style.display = 'block'; // Siempre mostrar el formulario

    if (!document.getElementById('codigoLibro').value) {
        limpiarFormulario();
    }
}

function ocultarFormulario() {
    var formAlta = document.getElementById('formAltaLibro');
    formAlta.style.display = 'none'; 
}

function habilitarME() {
    var botonesModificar = document.querySelectorAll('.btn-modificar');
    var botonesEliminar = document.querySelectorAll('.btn-eliminar');
    var estanOcultos = botonesModificar[0].style.display == 'none';

    //con el forEach nos aseguramos de modificar todos los botones, 
    //para evitar usar IF lo simplificamos para que opte por 2 opciones, para establecer el estado del boton
    botonesModificar.forEach(function(boton) {
        boton.style.display = estanOcultos ? 'block' : 'none';
    });

    botonesEliminar.forEach(function(boton) {
        boton.style.display = estanOcultos ? 'block' : 'none'; 
    });
}

window.onload = function() {
    mostrarLibros(libros);
};

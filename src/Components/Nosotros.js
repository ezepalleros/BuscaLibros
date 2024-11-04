import React from "react";

const Nosotros = () => {
    return (
        <div className="nosotros">
            <h2>Sobre BuscaLibros</h2>
            <p>
                En un mundo donde el conocimiento se expande constantemente, la gestión eficiente de los libros se ha convertido en una necesidad esencial para los bibliotecarios. BuscaLibros es una innovadora herramienta diseñada para facilitar esta tarea, permitiendo realizar búsquedas rápidas y precisas mediante el uso de filtros adaptados a las necesidades de cada usuario. Con opciones que van desde el nombre del libro hasta el año de publicación y la categoría, esta herramienta transforma la búsqueda en una experiencia ágil y satisfactoria.
            </p>
            <br></br>
            <img src={`${process.env.PUBLIC_URL}/img/nosotros1.jpg`} alt="BuscaLibros en acción" />
            <br></br>
            <p>
                La realidad que enfrentan los bibliotecarios hoy en día es desafiante. Con volúmenes de libros en constante crecimiento, gestionar esta vasta colección puede ser abrumador. Sin una herramienta adecuada, la búsqueda de un libro puede convertirse en un proceso frustrante y ineficaz, marcado por la falta de organización y búsquedas manuales tediosas. BuscaLibros no solo aborda estos problemas, sino que también proporciona una personalización que permite a los bibliotecarios adaptarse a las preferencias de sus usuarios, mejorando así la experiencia general en la biblioteca.
            </p>
            <br></br>
            <img src={`${process.env.PUBLIC_URL}/img/nosotros2.png`} alt="Bibliotecario utilizando BuscaLibros" />
        </div>
    );
}

export default Nosotros;

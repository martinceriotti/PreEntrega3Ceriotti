class Receta {
    constructor(id, nombre, titulo, ingredientes, preparacion, precio) {
        this.id = id;
        this.nombre = nombre;
        this.titulo = titulo;
        this.preparacion = preparacion;
        this.ingredientes = ingredientes;
        this.anulado = 0;
        this.precio = precio
    }
    anularReceta() {
        this.anulado = 1;
    }
}

function editarOEliminarReceta(e) {
    if (e.target.dataset.action === 'edit') {
        console.log(`li-${e.target.dataset.id}`)
    } else if (e.target.dataset.action === 'delete') {
        var arregloLocal = recuperarRecetaLS();
        try {
            recetaBorrar = document.getElementById(`li-${e.target.dataset.id}`);
            recetaBorrar.remove();
            arregloLocal = arregloLocal.filter(function (receta) { return receta.id != e.target.dataset.id });
            actualizarRecetaLS(arregloLocal);
        } catch (error) {
            
        }
        listarRecetas()
    }
}

function listarRecetas() {

    let arregloLocal = recuperarRecetaLS()
    document.getElementById("id").value = arregloLocal.length;
    let contenedorListaRecetas = document.getElementById("contenedorListaRecetas");
    let listaRecetas = document.getElementById("listaRecetas");
    listaRecetas.addEventListener('click', (e) => editarOEliminarReceta(e));
    listaRecetas.innerHTML = '';
    let acumulador = 0;
    let contador = arregloLocal.length;
    for (const recetas of arregloLocal) {
        let recetax = document.createElement("li");
        recetax.id = "li-" + recetas.id;
        recetax.className = 'list-group-item d-flex justify-content-between lh-sm';
        recetax.innerHTML = `
                <div>
                    <h6 class="my-0">${recetas.titulo}</h6>
                    <small class="text-muted">${recetas.preparacion}</small>
                </div>
                <span class="float-end">
                <button data-id="${recetas.id}" id="edit-${recetas.id}" data-action="edit">Edit</button>
                <button data-id="${recetas.id}" id="delete-${recetas.id}" data-action="delete">Delete</button>
            </span>
                <span class="text-muted">$${recetas.precio}</span>`;
        acumulador += recetas.precio;
        listaRecetas.append(recetax);
    }
    let total = document.createElement('li');
    total.className = 'list-group-item d-flex justify-content-between';
    total.innerHTML = `<span>Total $</span>
                        <strong>$ ${acumulador}</strong>`
    listaRecetas.append(total);

    let pillTotal = document.getElementById("pillTotal");
    pillTotal.innerHTML = `${contador}`;
}

function guardarRecetaFormulario(e) {

    e.preventDefault();
    
    let arregloLocal = recuperarRecetaLS();

    let id = document.getElementById("id").value;
    let nombre = document.getElementById("nombre").value;
    let titulo = document.getElementById("titulo").value;
    let preparación = document.getElementById("preparación").value;
    let ingredientes = document.getElementById("ingredientes");
    let precio = Number(document.getElementById("precio").value);
    let arrayIngredientes = [];
    for (let index = 0; index < ingredientes.options.length; index++) {
        if (ingredientes.options[index].selected) {
            arrayIngredientes.push(ingredientes.options[index].text);
        }
    }
    try {
        const recetaxy = new Receta(id, nombre, titulo, arrayIngredientes, preparación, precio);
        arregloLocal.push(recetaxy);
    } catch (error) {
        console.log(error);
    }
    actualizarRecetaLS(arregloLocal);
    listarRecetas();
}

function recuperarRecetaLS() {
    let arregloString = localStorage.getItem("arregloRecetas");
    try {
        var arreglo = JSON.parse(arregloString);
        return arreglo
    } catch (error) {

    }

}

function actualizarRecetaLS(arregloRecetas) {
    let arregloString = JSON.stringify(arregloRecetas);
    localStorage.setItem("arregloRecetas", arregloString);
}


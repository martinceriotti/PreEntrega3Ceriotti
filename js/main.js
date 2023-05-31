
//Creación de objetos 
let arregloRecetas = [];
const receta1 = new Receta(arregloRecetas.length, "Masitas", "Masita Decorada", ["huevo", "azucar"], 'batir lo que sea', 100)
arregloRecetas.push(receta1);
const receta2 = new Receta(arregloRecetas.length, "Pepas", "Pepas DL", ["dulce", "huevo", "azucar"], 'batir lo que sea', 200)
arregloRecetas.push(receta2);
const receta3 = new Receta(arregloRecetas.length, "Alfajores", "Alfajores Maicena", ["dulce", "huevo", "azucar"], 'batir lo que sea', 300)
receta3.anularReceta();
arregloRecetas.push(receta3);
const receta4 = new Receta(arregloRecetas.length, "Torta Piñata", "Torta Piñata", ["dulce", "huevo", "azucar"], 'batir lo que sea', 400)
arregloRecetas.push(receta4);
const receta5 = new Receta(arregloRecetas.length, "Cake Pops", "Cake Pops", ["dulce", "huevo", "azucar"], 'batir lo que sea', 500)
arregloRecetas.push(receta5);

let arregloRecetasJson = JSON.stringify(arregloRecetas);
localStorage.setItem("arregloRecetas", arregloRecetasJson);

listarRecetas();

let formPrincipal = document.getElementById("formPrincipal");
formPrincipal.addEventListener("submit", guardarRecetaFormulario);

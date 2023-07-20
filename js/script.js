// Single Page Application

// Funcion ajax para no repetir la linea 7 8 9 todo el tiempo
function ajax(url, metodo) {
    // Si no recibe el parametro metodo entonces es "GET"
    let http_metodo = metodo || "GET";
    let xhr = new XMLHttpRequest;
    xhr.open(http_metodo, url);
    xhr.send();
    //Retorno el objeto XHR ya que no se puede retornar la respuesta
    return xhr
}

// Tomar elementos HTML
let links = document.querySelectorAll('a');
let main = document.querySelector('main')

links.forEach((link) => {
    link.addEventListener('click', (e)=>{
        e.preventDefault();
        let id = link.id;
        let archivo = `${id}.html`
        //location.hash = id; // Manipulas el historial pero no te cambia el contenido si vas para atras o adelante
        //Usando pushstate
        let xhr = ajax(archivo);
        xhr.addEventListener('load', ()=>{
            if (xhr.status == 200) {
                main.innerHTML = xhr.response;
                history.pushState({
                    template: xhr.response
                },"",id)
            }
        });
    });
});

let pagina_inicial = ajax("home.html");
pagina_inicial.addEventListener('load', ()=>{
    if (pagina_inicial.status == 200) {
        main.innerHTML = pagina_inicial.response;
    }
});

// Resolver el problema para que el contenido cambie cuando vas para atras o adelante
// Hay que hacer un evento llamado hashchange

/* 
window.addEventListener('hashchange', ()=>{
    console.log("Cambio URL");
    //location.hash = "#perfi", vamos usar el metodo split para separar el string en base a su #
    //location.hash.split('#')[1] // esto te devuelve un array con 2 elementos, todo lo que este antes del # y despues ["", "perfil"], de este array necesitas el indice 1 osea perfil
    let archivo = `${location.hash.split('#')[1]}.html`;
    let xhr = ajax(archivo);
    xhr.addEventListener('load', ()=>{
        if (xhr.status == 200) {
            main.innerHTML = xhr.response;
        }
    });
}); 
*/

// Podes hacerlo con el metodo popstate, sin usar hash

window.addEventListener('popstate', (e)=>{
    if (e.state.template) {
        main.innerHTML = e.state.template
    } else {
        let archivo = `${location.pathname.split('/')[3]}.html`;    
        let xhr = ajax(archivo);
        xhr.addEventListener('load', ()=>{
            if (xhr.status == 200) {
                main.innerHTML = xhr.response;
            }
        });
    }
});
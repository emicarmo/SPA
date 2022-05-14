// Menu Drawer

const menu = document.querySelector('.material-icons')
const nav = document.querySelector('#drawer');

menu.addEventListener("click",function(e){
	if (nav.style.left) {
		nav.style.left = '';
	}else{
		nav.style.left = '0px';
	}
});

let cerrarLinks = document.querySelectorAll("a");
cerrarLinks.forEach(function(link){
    link.addEventListener("click",function(e){
        e.preventDefault();
        nav.style.left = ''
    });
});

// Llamada ajax a la pagina de inicio

llamadaAjax('get', 'inicio.html', (data)=>{
    render('main',data);
});

// Manejar historial de navegacion con los links

const links = document.querySelectorAll('a');

links.forEach(link => {
    link.addEventListener('click', (e) =>{
        e.preventDefault();
        drawer.style.left = '';
        llamadaAjax('get', e.target.innerText+'.html', data =>{
            render('main', data)
        },true)
    })
})

window.addEventListener('popstate', e =>{
    console.log(e.state);
    if (e.state.template) {
        render('main', e.state.template)
    } else {
        llamadaAjax('get', e.target.innerText+'.html', data =>{
            render('main', data)
        },true)
    }
})

// Evento click al portfolio

document.addEventListener('click', e =>{
    let elemento;
    if (e.target.tagName.toLowerCase()== "button") {
        elemento = e.target
    } else {
        if (e.target.tagName.toLowerCase()== "article") {
            elemento = e.target
        }
        if (e.target.tagName.toLowerCase() == "footer" || e.target.tagName.toLowerCase() == 'img') {
            if (e.target.parentNode.parentNode.tagName.toLowerCase() == "article") {
                elemento = e.target.parentNode.parentNode
            }
        }
    }
    if (elemento) {
        switch (elemento.id) {
            case 'listado':
                llamadaAjax('get', 'listado.html', data =>{
                    render('main',data);
                    usuarios();
                    posteos();
                    comentarios();
                },true);
                break;
            case 'download-image':
                llamadaAjax('get', 'descargas.html', data =>{
                    render('main',data);
                    crearLink();
                },true);
                break;
            case 'dropzone-rompecabeza':
                llamadaAjax('get', 'puzzle.html', data =>{
                    render('main',data);
                    rompecabeza();
                },true);
                break;
            case 'semaforo':
                llamadaAjax('get', 'semaforo.html', data =>{
                    render('main', data);
                    semaforo();
                },true);
                break;
            case 'consola':
                llamadaAjax('get', 'productos.html', data =>{
                    render('main', data);
                    producto();
                },true)
                break;
            default:
                break;
        }
    }
})
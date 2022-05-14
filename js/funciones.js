// Funcion Ajax

function llamadaAjax(metodo,url,callback,historial,progresoCB,tipo) {
    let xhr = new XMLHttpRequest();
    xhr.open(metodo,url);
    xhr.addEventListener('load', ()=>{
        if (xhr.status == 200) {
            callback(xhr.response)
        }
        if (historial) {
            window.history.pushState({
                url: url.split('/')[1],
                template: xhr.response
            },"",url.split('/')[1])
        }
    })
    if (progresoCB) {
        xhr.addEventListener('progress', (e) =>{
            if (e.lengthComputable) {
                let porcentaje = e.loaded * 100 / e.total;
                progresoCB(porcentaje)
            }
        })
    }
    if (tipo) {
        xhr.responseType = tipo
    }
    xhr.send();
}

// Funcion Render

function render(selector, informacion) {
    document.querySelector(selector).innerHTML = informacion;
}

// Funcion Promesa

function promesa(url) {
    return new Promise((res,rej)=>{
        let xhr = new XMLHttpRequest();
        xhr.open('get', url);
        xhr.addEventListener('load', ()=>{
            if (xhr.status == 200) {
                res(JSON.parse(xhr.response));
            }
        })
        xhr.send();
    })
}

// Funcion Perfil

let certificados = ['html5', 'maquetado', 'js-inicial', 'python-inicial', 'sql', 'paradigma-objetos', 'git','js-avanzado'];

let imgCertificados = ['html-fundamentos', 'maquetado-css', 'js-0', 'python-0','sql-base-datos', 'paradigma-objetos', 'git-desarrollo', 'js-front-end'];


// Funciones de listado de usuarios,posteos,comentarios

function usuarios() {
    const btn1 = $('#btn1');
    let contenido_user = $('#contenido-user');
    let oculto = true;
    $(btn1).on('click', function () {
        let prom = promesa('https://jsonplaceholder.typicode.com/users')
        prom
        .then(usuarios =>{
            let encabezado1 = '<tr><th>Id</th><th>Name</th><th>UserName</th><th>Email</th></tr>';
            usuarios.forEach(usuario =>{
                encabezado1 += '<tr><td>' + usuario.id + '</td><td>' + usuario.name + '</td><td>' + usuario.username + '</td><td>' + usuario.email + '</td></tr>';
            })
            $(contenido_user).html(encabezado1);

            oculto = !oculto

            if (oculto == true) {
                $(contenido_user).fadeOut();
            } else {
                $(contenido_user).fadeIn();
            }

            if (oculto == true) {
                $(btn1).text('Mostrar Tabla Usuarios');
            } else {
                $(btn1).text("Ocultar Tabla Usuarios");
            }
        })
    });
    
}

function posteos() {
    const btn2 = $('#btn2');
    let contenido_post = $('#contenido-post');
    let oculto = true;
    $(btn2).on('click', function () {
        let prom2 = promesa('https://jsonplaceholder.typicode.com/posts')
        prom2
        .then(posteos =>{
            let encabezado2 = '<tr><th>UserId</th><th>Id</th><th>Title</th><th>Body</th></tr>';
            posteos.forEach(posteo =>{
                encabezado2 += '<tr><td>' + posteo.userId + '</td><td>' + posteo.id + '</td><td>' + posteo.title + '</td><td>' + posteo.body + '</td></tr>';
            })
            $(contenido_post).html(encabezado2);

            oculto = !oculto

            if (oculto == true) {
                $(contenido_post).fadeOut();
            } else {
                $(contenido_post).fadeIn();
            }

            if (oculto == true) {
                $(btn2).text('Mostrar Tabla Posteos');
            } else {
                $(btn2).text("Ocultar Tabla Posteos");
            }
        })
    });
}

function comentarios() {
    const btn3 = $('#btn3');
    let contenido_comentarios = $('#contenido-comentarios');
    let oculto = true;
    $(btn3).on('click', function () {
        let prom3 = promesa('https://jsonplaceholder.typicode.com/comments');
        prom3
        .then(comentarios =>{
            let encabezado3 = '<tr><th>PostId</th><th>Id</th><th>Name</th><th>Email</th><th>Body</th></tr>';
            comentarios.forEach(comentario=>{
                encabezado3 += '<tr><td>' + comentario.postId + '</td><td>' + comentario.id + '</td><td>' + comentario.name + '</td><td>' + comentario.email + '</td><td>' + comentario.body + '</td></tr>'
            })
            $(contenido_comentarios).html(encabezado3);

            oculto = !oculto

            if (oculto == true) {
                $(contenido_comentarios).fadeOut();
            } else {
                $(contenido_comentarios).fadeIn();
            }

            if (oculto == true) {
                $(btn3).text('Mostrar Tabla Comentarios');
            } else {
                $(btn3).text("Ocultar Tabla Comentarios");
            }
        })
    });
}

// Funcion crearlink para descarga de imagenes

let imagenes = [
    'Logo-Css', 'Logo-Html', 'Logo-Javascript',
    'Logo-Node', 'Logo-Python'
];

function crearLink() {
    let fragmento = document.createDocumentFragment('');
    imagenes.forEach(imagen =>{
        let link = document.createElement('a');
        link.href = `images/${imagen}.png`;
        link.style.display = 'block';
        link.innerText = imagen;
        link.style.fontSize = '30px';
        link.style.textDecoration = 'none';
        link.style.margin = '5px';
        link.style.color = 'black';
        link.className = 'logo';
        link.style.transition = 'all 0.3s ease';
        link.addEventListener('click', (e)=>{
            e.preventDefault();
            let progreso = document.createElement('progress');
            progreso.max = 100
            document.querySelector('main').appendChild(progreso);
            llamadaAjax('get', `images/${imagen}.png`, data =>{
                let url = URL.createObjectURL(data);
                let img = document.createElement('img');
                img.src = url;
                img.style.width = '300px';
                img.style.width = '300px';
                let btn = document.createElement('button');
                btn.innerText = 'Descargar imagen';
                btn.addEventListener('click', e =>{
                    console.log('Se acepto la descargar');
                    let a = document.createElement('a');
                    a.download = `${imagen}.png`;
                    a.href = url;
                    a.click();
                    document.querySelector('main').appendChild(a);
                })
                progreso.parentElement.removeChild(progreso)
                document.querySelector('main').appendChild(img);
                document.querySelector('main').appendChild(btn);
            },false,progres=>{
                progreso.value = progres;
            },'blob')
        })
        fragmento.appendChild(link);
    });
    let ul = document.querySelector('#archivos-descarga');
    ul.appendChild(fragmento);
}

// Funcion Rompecabeza

const img = [
    'imagen-0', 'imagen-1', 'imagen-2',
    'imagen-3', 'imagen-4', 'imagen-5',
    'imagen-6', 'imagen-7', 'imagen-8',
];

function rompecabeza() {
    const puzzle = document.getElementById('puzzle');
    const piezas = document.getElementById('piezas');

    let terminado = img.length;

    while (img.length) {
        const indice = Math.floor(Math.random() * img.length);
        const div = document.createElement('div');
        div.className = 'pieza';
        div.id = img[indice];
        div.style.backgroundImage = `url('images/${img[indice]}.jpg')`;
        div.draggable = true;
        piezas.appendChild(div)
        img.splice(indice,1);
    }

    for (let i = 0; i < terminado; i++) {
        const contenedor = document.createElement('div');
        contenedor.className = 'placeholder';
        contenedor.dataset.id = i;
        puzzle.appendChild(contenedor);
    }

    piezas.addEventListener('dragstart', e =>{
        console.log('Evento: DragStar');
        e.dataTransfer.setData('id',e.target.id)
    })

    puzzle.addEventListener('dragover', e =>{
        e.preventDefault();
        console.log('Evento: DragOver');
        e.target.classList.add('hover');
    })

    puzzle.addEventListener('dragleave', e =>{
        console.log('Evento: DragLeave');
        e.target.classList.remove('hover');
    })

    puzzle.addEventListener('drop', e =>{
        console.log('Evento: Drop');
        e.target.classList.remove('hover');
        const id = e.dataTransfer.getData('id');
        const numero = id.split('-')[1];
        console.log('Pieza: ', numero);
        console.log('Caja: ', e.target.dataset.id);

        if (e.target.dataset.id === numero) {
            e.target.appendChild(document.getElementById(id))
            terminado--;
            if (terminado === 0) {
                document.body.classList.add('ganaste');
            }
        }
    })
}

// Funcion app semaforo

function semaforo() {
    const btn = document.querySelector('#boton');
    let estadoSemaforo = 0;
    btn.addEventListener('click', ()=>{
        switch (estadoSemaforo) {
            case 0:
                prenderLuz('red', true);
                prenderLuz('yellow',false);
                prenderLuz('green', false);
                break;
            case 1:
                prenderLuz('red', true);
                prenderLuz('yellow', true);
                prenderLuz('green', false);
                break;
            case 2:
                prenderLuz('red', false);
                prenderLuz('yellow', false);
                prenderLuz('green', true);
                break;
            default:
                break;
        }
        estadoSemaforo++;
        if ((estadoSemaforo >= 3) && (estadoSemaforo = 0)) {
            
        }
    })
    function prenderLuz(id, prendida) {
        let luz = document.querySelector(`#${id}`);

        if (prendida == true) {
            luz.style.backgroundColor = id;
        } else {
            luz.style.backgroundColor = '#333';
        }
    }
}

// Funcion productos

const productos = [
    {
        id: 1,
        nombre: 'Playstation 5',
        descripcion: 'Potencia, capacidad y diseño son algunos de los conceptos que trae la Sony PlayStation 5. Con ella, vas a poder jugar toda una nueva generación de juegos más dinámicos y exigentes. No esperes más, comprá tu PS5 y comenzá a vivir una experiencia gamer única.',
        precio: '$180,000',
        img: 'images/Ps5.webp'
    },
    {
        id: 2,
        nombre: 'Nintendo Switch',
        descripcion: 'Diviertete libremente. Donde quieras. Como quieras. La consola Nintendo Switch esta disenada para acompanarte dondequiera que vayas, transformandose de consola para el hogar a consola portatil en un instante. Asi tendras mas ocasiones para disfrutar de tus juegos favoritos como mas te guste.',
        precio: '$99,000',
        img: 'images/Switch.webp'
    },
    {
        id: 3,
        nombre: 'Xbox Series',
        descripcion: 'La consola Xbox Series X es la consola más rápida y potente de la historia. Experimentá la velocidad y el rendimiento de la próxima generación de juegos con Xbox Velocity Architecture, impulsada por un disco SSD personalizado y software integrado.',
        precio: '$170,000',
        img: 'images/Xbox.webp'
    }
];

function producto() {
    const productosContenedor = document.querySelector('#productos');
    
    productos.forEach(producto =>{
        const articulo = document.createElement('article');
        articulo.dataset.producto = producto.id;
        articulo.className = 'producto';

        const img = document.createElement('img');
        const nombre = document.createElement('h2');
        const descripcion = document.createElement('p');
        const precio = document.createElement('h3');
        const btnComprar = document.createElement('button');

        productosContenedor.appendChild(articulo);

        articulo.appendChild(img);
        articulo.appendChild(nombre);
        articulo.appendChild(descripcion);
        articulo.appendChild(precio);
        articulo.appendChild(btnComprar);

        const txtNombre = document.createTextNode(producto.nombre);
        const txtDescripcion = document.createTextNode(producto.descripcion);
        const txtPrecio = document.createTextNode(producto.precio)
        const txtBtnComprar = document.createTextNode('Comprar')
        nombre.appendChild(txtNombre);
        nombre.className = 'nombre';
        descripcion.appendChild(txtDescripcion);
        descripcion.className = 'descripcion';
        precio.appendChild(txtPrecio);
        img.src = producto.img;
        img.alt = producto.nombre;
        img.className = 'imagen';
        btnComprar.appendChild(txtBtnComprar);
        btnComprar.className = 'comprar';

        btnComprar.addEventListener('click', e =>{
            alert(`Gracias por comprar ${producto.nombre}`);
            e.target.parentNode.classList.add('vendido');
            e.target.disabled = true;
        })
    })
}
// Consumo de recursos externos

/* 
let xhr = new XMLHttpRequest;
xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
xhr.addEventListener('load', ()=>{
    if (xhr.status == 200) {
        console.log(typeof xhr.response); // Esto devuelve un string si haces un typeof
        // Vamos a transformar ese string a json
        let respuesta = JSON.parse(xhr.response)
        console.log(respuesta);
    } else {
        console.log("No se puedo obtener el recurso");
    }
});
xhr.send(); 
*/

// 

let xhr = new XMLHttpRequest;
xhr.open("GET", "https://es.glosbe.com/es/en/api/translate?from=es&dest=en&phrase=hola&format=json");
xhr.addEventListener('load', ()=>{
    if (xhr.status == 200) {
        let respuesta = JSON.parse(xhr.response)
        console.log(respuesta);
    } else {
        console.log("No se puedo obtener el recurso");
    }
});
xhr.send();
let arreglosTareas = new Array();
let elementosGuardados = 0;

let done = new Audio('done.mp3');
let undone = new Audio('undone.mp3');

function init(){
    if('serviceWoekwer' in navigator){
        navigator.serviceWorker.register('sw.js').then(function(registration){
            // Si es exitoso
            console.log('SW registrado correctamente');
        }, function(err){
            // Si falla
            console.log('SW fallo', err);
        });
    }else{
        console.log("ERROR")
    }
    let fecha = new Date();
    let mesNúmero = fecha.getMonth();
    let mes = "";

    // Si ya existen tareas guardadas en el LS, los vamos a obtener en la interfaz
    if(localStorage.getItem('tareas')){
        tareas = JSON.parse(localStorage.getItem('tareas'));
        for(i = 0; i < tareas.length; i++){
            arreglosTareas.push(tareas[i]);
        }
        // Mandar llamar función que cargue las tareas en la interfaz
        loadTareas()
    }else{
        // Si no hay tareas, crear el espacio de memoria en LS
        jsonTarea = {};
        localStorage.setItem('tareas',JSON.stringify(jsonTarea))
    }

    switch(mesNúmero){
        case 0:
            mes = "Enero";
        break;
        case 1:
            mes = "Febrero";
        break;
        case 2:
            mes = "Marzo";
        break;
        case 3:
            mes = "Abril";
        break;
        case 4:
            mes = "Mayo";
        break;
        case 5:
            mes = "Junio";
        break;
        case 6:
            mes = "Julio";
        break;
        case 7:
            mes = "Agosto";
        break;
        case 8:
            mes = "Septiembre";
        break;
        case 9:
            mes = "Octubre";
        break;
        case 10:
            mes = "Noviembre";
        break;
        case 11:
            mes = "Diciembre";
        break;
    }
    document.getElementById('fecha').innerHTML = fecha.getDate() + " de " + mes;
}


function loadTareas(){
    // Antes de cargar las tareas limpiamos la interfaz
    document.querySelector('.tareas-pendientes').innerHTML="";
    document.querySelector('.tareas-terminadas').innerHTML="";
    // Cargar las tareas de LS
    for(i = 0; i < tareas.length; i++){
        // Crear los elementos en el HTML
        elemento = "<div class='In'>"+
        "<input type='checkbox' class='checkbox-style' name='myCheckbox' id = '"+i+"' onclick = 'cambiarEstado(this.id)'>"+
        "<label for='myCheckbox' class='labelcheck'>"+tareas[i].valor+"</label>"+"<br>"+
        "</div>";

        // Dividir las tareas por su estado para poderlas plasmar en el espacio html correspondiente
        if (tareas[i].estatus == "pendiente"){
            document.querySelector('.tareas-pendientes').innerHTML += elemento;
        }else if(tareas[i].estatus == "terminado"){
            document.querySelector('.tareas-terminadas').innerHTML += elemento; 
        }
    }
    elementosGuardados = tareas.length;
}



function agregar(){
    // Capturar el elemento de la entrada de texto
    tareasTexto = document.getElementById('nuevaTarea');

    // Nuevo objeto JS
    jsonTarea ={
        'valor': tareasTexto.value,
        'estatus': 'pendiente'
    };

    // Agregar al arreglo de JSON la nueva tarea
    arreglosTareas.push(jsonTarea);

    // Crear nuevo elemento en la interfaz de usuario
    elemento = "<div class='In' id = '" + elementosGuardados + "' onclick = 'cambiarEstado(this.id)'>" +
        "<input type='checkbox' class='checkbox-style' name='myCheckbox'>" +
        "<label for='myCheckbox' class='labelcheck'>" + jsonTarea.valor + "</label>" + "<br>" +
        "</div>";

    // Lo agrego a la interfaz
    document.querySelector('.Hacer').innerHTML += elemento;

    // Agregar al LS el arreglo de JSON en formato texto
    localStorage.setItem('tareas', JSON.stringify(arreglosTareas));

    // Limpiar cuadro de texto(input)
    tareasTexto.value = '';

    // Incrementamos los elementos guardados
    elementosGuardados++;
}

function actualizarLocalStorage() {
    localStorage.setItem('tareas', JSON.stringify(arreglosTareas));
}


function eliminarTarea(index) {
    arreglosTareas.splice(index, 1);
    actualizarLocalStorage();
    loadTareas();
}

function cambiarEstado(id){
    tareas = JSON.parse(localStorage.getItem('tareas'))
    if(tareas[id].estatus == 'terminado'){
        tareas[id].estatus = 'pendiente';
        // Ejecutar sonido
        undone.play();
    }else{
        // Ejecutar sonido
        tareas[id].estatus = 'terminado';
        done.play();
    }
    // Guardarlo nuevamente en LS
    localStorage.setItem('tareas', JSON.stringify(tareas));
    // Recargar
    loadTareas();
}






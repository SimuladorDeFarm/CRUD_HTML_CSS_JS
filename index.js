//lista de elementos
let listaEmpleados = [];

//objeto empleado
const objetoEmpleado = {
    id: '',
    nombre: '',
    puesto: ''
}

//detecta cuando tiene que agregar y cuando tiene que actualizar
let editando = false;

//constantes para formulario, imputs y boton
//obtiene los id de las etiquetas
const formulario = document.querySelector('#formulario'); 
const nombreImput = document.querySelector('#nombre'); 
const puestoImput = document.querySelector('#puesto'); 
const btnAgregar = document.querySelector('#btnAgregar'); 

formulario.addEventListener('submit', validar_formulario);

function validar_formulario(e) {
    e.preventDefault(); //no se ejecute de forma automatica

    //verificar que los imputs no esten vacios
    if(nombreImput.value == '' || puestoImput == '') {
        alert('Todos los campos deben ser rellenados');
        return;
    }

    if(editando) {
        editarEmpleado();
        editando = false;
    }else{
        //obtiene el tiempo en milisegundos
        objetoEmpleado.id = Date.now();
        objetoEmpleado.nombre = nombreImput.value;
        objetoEmpleado.puesto = puestoImput.value;

        agregarEmpleado();

    }
}

function agregarEmpleado() {
    listaEmpleados.push({...objetoEmpleado});

    mostrarEmpleados();  
    
    //limpia el formulario
    formulario.reset();

    limpiarObjeto();
}

function limpiarObjeto(){

     objetoEmpleado.id = '';
     objetoEmpleado.nombre = '';
     objetoEmpleado.puesto = '';
}

function mostrarEmpleados(){

    limpiarHTML();
    //en que parte agregar elementos html
    const divEmpleados = document.querySelector('.div-empleados');

listaEmpleados.forEach (empleado => {
    const {id, nombre, puesto} = empleado;

    const parrafo = document.createElement('p');
    parrafo.textContent = `${id} - ${nombre} - ${puesto} - `;
    parrafo.dataset.id = id;

    //mostar nombre en el formulario para editar
    const editarBoton = document.createElement('button');
    editarBoton.onclick = () => cargarEmpleado(empleado);
    editarBoton.textContent = 'Editar';
    editarBoton.classList.add('btn', 'btn-editar');
    parrafo.append(editarBoton);

    const eliminarBoton = document.createElement('button');
    eliminarBoton.onclick = () => eliminarEmpleado(id);
    eliminarBoton.textContent = 'ELiminar';
    eliminarBoton.classList.add('btn', 'btn-eliminar');
    parrafo.append(eliminarBoton);

    const hr = document.createElement('hr');

    divEmpleados.appendChild(parrafo);
    divEmpleados.appendChild(hr);

});
   
} 

function cargarEmpleado(empleado){

    const {id, nombre, puesto} = empleado;
    
    nombreImput.value = nombre;
    puestoImput.value = puesto;
    
    objetoEmpleado.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';

    editando = true;

}

function editarEmpleado() {

    objetoEmpleado.nombre = nombreImput.value;
    objetoEmpleado.puesto = puestoImput.value;

    listaEmpleados.map( empleado => {
        
        if(empleado.id === objetoEmpleado.id){
            empleado.id = objetoEmpleado.id;
            empleado.nombre = objetoEmpleado.nombre;
            empleado.puesto = objetoEmpleado.puesto;
        }
    });
    
    limpiarHTML();
    mostrarEmpleados();

    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';

    editando = false;
}

function eliminarEmpleado(id){
    
    listaEmpleados = listaEmpleados.filter(empleado => empleado.id != id);
    
    limpiarHTML();
    mostrarEmpleados();

}

function limpiarHTML(){
    const divEmpleados = document.querySelector('.div-empleados');
    
    //mientras el div empleados tenga hijos los eliminara de a uno
    while(divEmpleados.firstChild) {
        divEmpleados.removeChild(divEmpleados.firstChild);
    }

}
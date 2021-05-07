//VARIABLES
const btnEnviar = document.querySelector('#enviar');
const btnReset = document.querySelector('#resetBtn')
const formulario = document.querySelector('#enviar-mail');

//Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


    evenListeners();
    function evenListeners(){
        //cuando la app arranca
        document.addEventListener('DOMContentLoaded', iniciarApp);


        //campos del formulario
        email.addEventListener('blur', validarFormulario);
        asunto.addEventListener('blur', validarFormulario);
        mensaje.addEventListener('blur', validarFormulario);


        //reinicia formulario
        btnReset.addEventListener('click' , resetearFormulario);

        //enviar email
        formulario.addEventListener('submit' , enviarEmail);
    }





//FUNCIONES
function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}


//valida el formulario
function validarFormulario(e){

    if(e.target.value.length > 0 ){

        //elimina los errores
        const error = document.querySelector('p.error');
        if(error){
        error.remove();
        }    

        e.target.classList.remove('border' , 'border-red-500');
        e.target.classList.add('border' , 'border-green-500');
        
    }else{
        e.target.classList.remove('border' , 'border-green-500');
        e.target.classList.add('border' , 'border-red-500');
        mostrarError('Todos los campos son obligatorios');
    }

    if(e.target.type === 'email'){
        
        if(er.test(e.target.value)){
           
        const error = document.querySelector('p.error');
      

        
        e.target.classList.remove('border' , 'border-red-500');
        e.target.classList.add('border' , 'border-green-500');

        }else{
            e.target.classList.remove('border' , 'border-green-500');
            e.target.classList.add('border' , 'border-red-500');
            mostrarError('Email no valido');
        }
    }


    if(er.test(email.value) && asunto.value !==''  && mensaje.value !==''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
    }
}


function mostrarError(mensaje){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border' , 'border-red-500' , 'background-red-100' , 'text-red-500'
    , 'p-3', 'mt-5' , 'text-center' , 'error');

//deje de ejecutar el error de los campos    
    const errores = document.querySelectorAll('.error');
    if(errores.length === 0){
        formulario.appendChild(mensajeError);
    }

    


}

//envia el email
function enviarEmail(e){
    e.preventDefault();

    //mostrar spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';


    //despues de 3 segundo ocultar spiner y mostrar mensaje

    setTimeout( () => {
        spinner.style.display = 'none';


        //alerta que se envio correctamente
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envio correctamente';
        parrafo.classList.add('text-center' , 'my-10' , 'p-2' , 'bg-green-500' ,
        'text-white' , 'font-bold' , 'uppercase');

        //inserta el p antes del spinner
        formulario.insertBefore(parrafo , spinner);

        setTimeout( () =>{
            parrafo.remove(); ////resetear parrafo

            resetearFormulario();
        } , 5000);
    } , 3000);
}


//funcion que resetea formulario
function resetearFormulario(){
    formulario.reset();

    iniciarApp();
}
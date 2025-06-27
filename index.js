// https://raw.githubusercontent.com/CesarMCuellarCha/apis/refs/heads/main/candidatos.json

localStorage.setItem("votosCandidatoUno", 0)
localStorage.setItem("votosCandidatoDos", 0)
localStorage.setItem("votosCandidatoTres", 0)
localStorage.setItem("votosCandidatoCuatro", 0)
localStorage.setItem("contador", 0)


function mostrarMensajeAgregado() {
    const mensaje = document.getElementById('mensaje-agregado');
    if (mensaje) {
        mensaje.classList.add('mostrar');
        setTimeout(() => mensaje.classList.remove('mostrar'), 2000);
    }
}

function agregarCandidato() {
    if (sessionStorage.contador === undefined) {
        sessionStorage.contador = 1;
    } else {
        sessionStorage.contador = Number(sessionStorage.getItem("contador")) + 1;
    }
    const contadorElement = document.getElementById('contador');
    if (contadorElement) {
        contadorElement.textContent = `${sessionStorage.getItem("contador")}`;
        mostrarMensajeAgregado();
    }
}

const contenedorCandidatos = document.getElementById("contenedor-candidatos");
const imagenRespaldo = "https://via.placeholder.com/300x200?text=Imagen+No+Disponible";

function esImagenValida(url) {
    if (!url || typeof url !== 'string' || url.trim() === '') return false;
    const regex = /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i;
    return regex.test(url);
}

function mostrarCandidatos(candidatos) {
    console.log(candidatos)
    if (!contenedorCandidatos) return;
    contenedorCandidatos.innerHTML = '';
    let id = 1;
    candidatos.forEach(candidato => {
        const imagen = esImagenValida(candidato.foto) ? candidato.foto : imagenRespaldo;
        const card = `
            <div class="col-md-3">
                <div class="card tarjeta-candidato">
                    <img src="${imagen}" class="card-img-top imagen-producto" alt="${candidato.nombre}">
                    <div class="card-body" id="body">
                        <h5 class="card-title">${candidato.nombre} ${candidato.apellido}</h5>
                        <p class="card-text">Curso: ${candidato.curso}</p>
                        <button class="btn boton-agregar agregar-candidato-${id}">Votar</button>
                        <p class="card-text" id="candidato-${id}">Votos: ${0}</p>
                    </div>
                </div>
            </div>
        `;
        contenedorCandidatos.innerHTML += card;
        id++
    });
    contenedorCandidatos.addEventListener('click', (event) => {
        if (event.target.classList.contains('agregar-candidato-1')) {
            //agregarVotosIndividual(candidatos)
            agregarCandidato();
            if (sessionStorage.votosCandidatoUno === undefined) {
                sessionStorage.votosCandidatoUno = 1;
            } else {
                sessionStorage.votosCandidatoUno = Number(sessionStorage.getItem("votosCandidatoUno")) + 1;
            }
            const candidatoIndividual = document.getElementById("candidato-1")
            console.log(sessionStorage.getItem("votosCandidatoUno"))
            candidatoIndividual.innerHTML = `Votos: ${sessionStorage.getItem("votosCandidatoUno")}`
        } else if (event.target.classList.contains('agregar-candidato-2')) {
            if (sessionStorage.votosCandidatoDos === undefined) {
                sessionStorage.votosCandidatoDos = 1;
            } else {
                sessionStorage.votosCandidatoDos = Number(sessionStorage.getItem("votosCandidatoDos")) + 1;
            }
            const candidatoIndividual = document.getElementById("candidato-2")
            candidatoIndividual.innerHTML = `Votos: ${sessionStorage.getItem("votosCandidatoDos")}`
            agregarCandidato();
        } else if (event.target.classList.contains('agregar-candidato-3')) {
            if (sessionStorage.votosCandidatoTres === undefined) {
                sessionStorage.votosCandidatoTres = 1;
            } else {
                sessionStorage.votosCandidatoTres = Number(sessionStorage.getItem("votosCandidatoTres")) + 1;
            }
            const candidatoIndividual = document.getElementById("candidato-3")
            candidatoIndividual.innerHTML = `Votos: ${sessionStorage.getItem("votosCandidatoTres")}`
            agregarCandidato();
        } else if (event.target.classList.contains('agregar-candidato-4')) {
            if (sessionStorage.votosCandidatoCuatro === undefined) {
                sessionStorage.votosCandidatoCuatro = 1;
            } else {
                sessionStorage.votosCandidatoCuatro = Number(sessionStorage.getItem("votosCandidatoCuatro")) + 1;
            }
            const candidatoIndividual = document.getElementById("candidato-4")
            candidatoIndividual.innerHTML = `Votos: ${sessionStorage.getItem("votosCandidatoCuatro")}`
            agregarCandidato();
        } else {
            console.log("fuera")
        }
    });
}

function agregarVotosIndividual(candidatos) {
    let idIndividual = 1
    candidatos.forEach(candidato => {
        console.log(candidato)
        const candidatoIndividual = document.getElementById(`candidato-${idIndividual}`);
        console.log(candidatoIndividual)
        idIndividual++
    })
}

async function obtenerProductos() {
    try {
        const respuesta = await fetch('https://raw.githubusercontent.com/CesarMCuellarCha/apis/refs/heads/main/candidatos.json');
        if (!respuesta.ok) throw new Error();
        const candidatos = await respuesta.json();
        mostrarCandidatos(candidatos);
        //console.log(candidatos);
    } catch (error) {
        if (contenedorCandidatos) {
            contenedorCandidatos.innerHTML = '<p class="text-center mensaje-error">No se pudieron cargar los candidatos.</p>';
        }
    }
}

document.addEventListener('DOMContentLoaded', obtenerProductos);



const ingresar = document.getElementById('ingresar');
const contenedorInicio = document.getElementById('contenedor-inicio');
const divVotaciones = document.getElementById('contenedor-oculto');
const inputUsuario = document.getElementById('inputUsuario');
const inputPassword = document.getElementById('inputPassword');
// usuarioAdministrador = "admin"
// contraseñaAdministrador = "adso2993013"

ingresar.addEventListener('click', () => {
    traerAdministrador().then(administrador => {
        console.log(administrador)
        if (inputUsuario.value == administrador.username && inputPassword.value == administrador.password) {
            contenedorInicio.id = "div-ocultar"
            divVotaciones.id = "div-mostrar"
        } else {
            console.log("Usuario o contraseña incorrectos")
        }
    })
})

// https://raw.githubusercontent.com/CesarMCuellarCha/apis/refs/heads/main/administrador.json

async function traerAdministrador() {
    try {
        const respuesta = await fetch('https://raw.githubusercontent.com/CesarMCuellarCha/apis/refs/heads/main/administrador.json');
        if (!respuesta.ok) throw new Error();
        const administrador = await respuesta.json();
        return administrador
    } catch (error) {
        if (contenedorInicio) {
            contenedorInicio.innerHTML = '<p class="text-center mensaje-error">No se pudieron cargar los administradores.</p>';
        }
    }
}


document.getElementById("confirmarCerrar").addEventListener("click", () => {
    const password = document.getElementById("passwordCierre").value;
    traerAdministrador().then(administrador => {
        if (password == administrador.password) {
            divVotaciones.id = "div-ocultar"
            contenedorInicio.id = "div-mostrar"
            const modal = bootstrap.Modal.getInstance(document.getElementById('modalCierre'));
            modal.hide();
            const candidatoUno = document.getElementById("candidato-1")
            candidatoUno.innerHTML = `Votos: ${0}`
            const candidatoDos = document.getElementById("candidato-2")
            candidatoDos.innerHTML = `Votos: ${0}`
            const candidatoTres = document.getElementById("candidato-3")
            candidatoTres.innerHTML = `Votos: ${0}`
            const candidatoCuatro = document.getElementById("candidato-4")
            candidatoCuatro.innerHTML = `Votos: ${0}`
            const contadorElement = document.getElementById('contador');
            contadorElement.innerHTML = 0;
            sessionStorage.clear();
        } else {
            console.log("Contraseña incorrecta")
        }
    })
});
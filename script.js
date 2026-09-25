// ---------- DATOS DEL SISTEMA ----------

let clientes =
    JSON.parse(localStorage.getItem("powerfitClientes")) || [];

// Elimina registros incompletos o inválidos.
clientes = clientes.filter(function(cliente) {

    return (
        cliente &&
        cliente.ID &&
        cliente.Nombre &&
        cliente.Edad &&
        cliente.Membresia &&
        cliente.Objetivo
    );

});

// Guarda nuevamente la lista limpia.
localStorage.setItem(
    "powerfitClientes",
    JSON.stringify(clientes)
);

// Precios de las membresías.
const precios = {

    "Mensual": 500,

    "Trimestral": 1300,

    "Anual": 4500

};


// Rutinas organizadas por objetivo y día.
const rutinas = {

    "Ganar masa muscular": {

        "Día 1": [
            ["Sentadilla", "4x10"],
            ["Press de banca", "4x10"],
            ["Curl de bíceps", "3x12"]
        ],

        "Día 2": [
            ["Peso muerto", "4x8"],
            ["Remo con barra", "4x10"],
            ["Press militar", "3x10"]
        ],

        "Día 3": [
            ["Prensa de piernas", "4x10"],
            ["Press inclinado", "3x10"],
            ["Extensión de tríceps", "3x12"]
        ]

    },


    "Pérdida de grasa": {

        "Día 1": [
            ["Caminadora", "20 min"],
            ["Sentadilla", "3x15"],
            ["Abdominales", "3x15"]
        ],

        "Día 2": [
            ["Bicicleta", "20 min"],
            ["Burpees", "3x10"],
            ["Plancha", "3x30s"]
        ],

        "Día 3": [
            ["Caminadora", "25 min"],
            ["Flexiones", "3x10"],
            ["Abdominales", "3x20"]
        ]

    },


    "Mejorar condición física": {

        "Día 1": [
            ["Caminadora", "15 min"],
            ["Sentadillas", "3x15"],
            ["Flexiones", "3x10"]
        ],

        "Día 2": [
            ["Bicicleta", "20 min"],
            ["Burpees", "3x10"],
            ["Plancha", "3x30s"]
        ],

        "Día 3": [
            ["Caminadora", "15 min"],
            ["Bicicleta", "15 min"],
            ["Abdominales", "3x15"]
        ]

    }

};


// ---------- DOCUMENTOS ----------

// Cuatro documentos iniciales para la demostración.
const documentosIniciales = {

    "clientes.txt":
        "REGISTRO DE CLIENTES POWERFIT\n\nNo hay clientes registrados.",

    "membresias.txt":
        "Mensual: $500\nTrimestral: $1,300\nAnual: $4,500",

    "pagos.txt":
        "REGISTRO DE PAGOS POWERFIT\n\nNo hay pagos registrados.",

    "rutinas.txt":
        "Rutinas organizadas por objetivos."

};


// Recupera documentos guardados.
let documentos =
    JSON.parse(localStorage.getItem("powerfitDocumentos")) ||
    documentosIniciales;


// Guarda los documentos.
function guardarDocumentos() {

    localStorage.setItem(
        "powerfitDocumentos",
        JSON.stringify(documentos)
    );

}


// ---------- USUARIO ----------

// Solicita el nombre o nickname.
function iniciarSistema() {

    const usuario =
        document.getElementById("usuario").value.trim();

    const mensaje =
        document.getElementById("mensajeBienvenida");

    if (!usuario) {

        mensaje.innerHTML = `
            <div class="error">
                Ingresa un nombre o nickname para comenzar.
            </div>
        `;

        return;

    }


    // Operadores de cadenas para generar el saludo.
    const nombre =
        usuario.charAt(0).toUpperCase() +
        usuario.slice(1);

    const saludo =
        "¡Bienvenido " + nombre + "! " +
        "El sistema PowerFit está listo.";

    mensaje.innerHTML = `
        <div class="success">
            ${saludo}
        </div>
    `;


    cargarSistema();

}


// ---------- CARGA DEL SISTEMA ----------

// Muestra una carga breve.
function cargarSistema() {

    const texto =
        document.getElementById("textoCarga");

    texto.textContent =
        "Cargando sistema...";

    setTimeout(function() {

        texto.textContent =
            "PowerFit está listo para utilizarse.";

    }, 1500);

}


// ---------- GUARDAR CLIENTES ----------

function guardarDatos() {

    localStorage.setItem(
        "powerfitClientes",
        JSON.stringify(clientes)
    );

}


// ---------- REGISTRAR CLIENTE ----------

document
    .getElementById("clienteForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const id =
            document.getElementById("clienteId")
                .value.trim();


        const nombre =
            document.getElementById("clienteNombre")
                .value.trim();


        const edad =
            Number(
                document.getElementById("clienteEdad").value
            );


        const membresia =
            document.getElementById("clienteMembresia").value;


        const objetivo =
            document.getElementById("clienteObjetivo").value;


        const fecha =
            document.getElementById("fechaRegistro").value;


        const mensaje =
            document.getElementById("mensajeCliente");


        if (
            !id ||
            !nombre ||
            !edad ||
            !membresia ||
            !objetivo ||
            !fecha
        ) {

            mensaje.innerHTML = `
                <div class="error">
                    Completa todos los campos.
                </div>
            `;

            return;

        }


        if (edad <= 0 || edad > 100) {

            mensaje.innerHTML = `
                <div class="error">
                    Ingresa una edad válida.
                </div>
            `;

            return;

        }


        const existe =
            clientes.some(
                cliente => cliente.ID === id
            );


        if (existe) {

            mensaje.innerHTML = `
                <div class="error">
                    El ID ${id} ya está registrado.
                </div>
            `;

            return;

        }


        // Convierte la fecha en día, mes y año.
        const fechaObjeto =
            new Date(fecha + "T00:00:00");


        const fechaTupla = {

            dia: fechaObjeto.getDate(),

            mes: fechaObjeto.getMonth() + 1,

            anio: fechaObjeto.getFullYear()

        };


        const nuevoCliente = {

            ID: id,

            Nombre: nombre,

            Edad: edad,

            Membresia: membresia,

            Objetivo: objetivo,

            Pago: "Pendiente",

            Fecha: fechaTupla

        };


        clientes.push(nuevoCliente);


        guardarDatos();


        document
            .getElementById("clienteForm")
            .reset();


        mensaje.innerHTML = `
            <div class="success">
                Cliente registrado correctamente.
            </div>
        `;


        actualizarInterfaz();

        actualizarDocumentoClientes();

    });


// ---------- BUSCAR CLIENTE ----------

function buscarCliente() {

    const id =
        document
            .getElementById("buscarId")
            .value.trim();


    const resultado =
        document.getElementById("resultadoBusqueda");


    const cliente =
        clientes.find(
            cliente => cliente.ID === id
        );


    if (!id) {

        resultado.innerHTML = `
            <div class="error">
                Ingresa un ID.
            </div>
        `;

        return;

    }


    if (!cliente) {

        resultado.innerHTML = `
            <div class="error">
                No se encontró un cliente con el ID ${id}.
            </div>
        `;

        return;

    }


    resultado.innerHTML =
        crearTarjetaCliente(cliente);

}


// ---------- MOSTRAR CLIENTES ----------

function mostrarClientes() {

    const lista =
        document.getElementById("listaClientes");


    const total =
        document.getElementById("totalClientes");


    total.textContent =
        `${clientes.length} cliente${clientes.length !== 1 ? "s" : ""}`;


    if (clientes.length === 0) {

        lista.innerHTML = `
            <div class="empty">
                No hay clientes registrados.
            </div>
        `;

        return;

    }


    lista.innerHTML =
        clientes
            .map(cliente => crearTarjetaCliente(cliente))
            .join("");

}


// ---------- TARJETA DE CLIENTE ----------

function crearTarjetaCliente(cliente) {

    const estadoPago =
        cliente.Pago === "Pagado"
            ? `<span class="paid">Pagado</span>`
            : `<span class="pending">Pendiente</span>`;


    let fechaTexto = "No registrada";


    if (cliente.Fecha) {

        fechaTexto =
            `${cliente.Fecha.dia}/` +
            `${cliente.Fecha.mes}/` +
            `${cliente.Fecha.anio}`;

    }


    return `

        <div class="client-card">

            <h4>
                ${cliente.Nombre}
            </h4>

            <p>
                <strong>ID:</strong>
                ${cliente.ID}
            </p>

            <p>
                <strong>Edad:</strong>
                ${cliente.Edad}
            </p>

            <p>
                <strong>Membresía:</strong>
                ${cliente.Membresia}
            </p>

            <p>
                <strong>Objetivo:</strong>
                ${cliente.Objetivo}
            </p>

            <p>
                <strong>Fecha:</strong>
                ${fechaTexto}
            </p>

            <p>
                <strong>Pago:</strong>
                ${estadoPago}
            </p>

        </div>

    `;

}


// ---------- INFORMACIÓN COMPLETA ----------

function mostrarInformacion() {

    const id =
        document
            .getElementById("infoId")
            .value.trim();


    const resultado =
        document
            .getElementById("informacionCliente");


    const cliente =
        clientes.find(
            cliente => cliente.ID === id
        );


    if (!id) {

        resultado.innerHTML = `
            <div class="error">
                Ingresa un ID.
            </div>
        `;

        return;

    }


    if (!cliente) {

        resultado.innerHTML = `
            <div class="error">
                No se encontró el cliente.
            </div>
        `;

        return;

    }


    let fechaTexto = "No registrada";


    if (cliente.Fecha) {

        fechaTexto =
            `${cliente.Fecha.dia}/` +
            `${cliente.Fecha.mes}/` +
            `${cliente.Fecha.anio}`;

    }


    resultado.innerHTML = `

        <div class="information-card">

            <h3>
                Información de ${cliente.Nombre}
            </h3>

            <p>
                <strong>ID:</strong>
                ${cliente.ID}
            </p>

            <p>
                <strong>Nombre:</strong>
                ${cliente.Nombre}
            </p>

            <p>
                <strong>Edad:</strong>
                ${cliente.Edad}
            </p>

            <p>
                <strong>Membresía:</strong>
                ${cliente.Membresia}
            </p>

            <p>
                <strong>Precio:</strong>
                $${precios[cliente.Membresia]
                    .toLocaleString("es-MX")}
            </p>

            <p>
                <strong>Objetivo:</strong>
                ${cliente.Objetivo}
            </p>

            <p>
                <strong>Fecha:</strong>
                ${fechaTexto}
            </p>

            <p>
                <strong>Pago:</strong>
                ${cliente.Pago}
            </p>

        </div>

    `;

}


// ---------- REGISTRAR PAGO ----------

function registrarPago() {

    const id =
        document
            .getElementById("pagoId")
            .value.trim();


    const resultado =
        document
            .getElementById("resultadoPago");


    const cliente =
        clientes.find(
            cliente => cliente.ID === id
        );


    if (!id) {

        resultado.innerHTML = `
            <div class="error">
                Ingresa un ID.
            </div>
        `;

        return;

    }


    if (!cliente) {

        resultado.innerHTML = `
            <div class="error">
                No se encontró el cliente.
            </div>
        `;

        return;

    }


    if (cliente.Pago === "Pagado") {

        resultado.innerHTML = `
            <div class="success">
                El pago de ${cliente.Nombre}
                ya está registrado.
            </div>
        `;

        return;

    }


    const confirmar =
        confirm(
            `¿Deseas registrar el pago de ` +
            `${cliente.Nombre} por $` +
            `${precios[cliente.Membresia]
                .toLocaleString("es-MX")}?`
        );


    if (!confirmar) {

        resultado.innerHTML = `
            <div class="error">
                El pago no fue registrado.
            </div>
        `;

        return;

    }


    cliente.Pago = "Pagado";


    guardarDatos();


    resultado.innerHTML = `
        <div class="success">
            Pago registrado correctamente para
            ${cliente.Nombre}.
        </div>
    `;


    actualizarInterfaz();

    actualizarDocumentoPagos();

}


// ---------- EDITAR CLIENTE ----------

document
    .getElementById("editarForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const id =
            document
                .getElementById("editarId")
                .value.trim();


        const nuevoNombre =
            document
                .getElementById("nuevoNombre")
                .value.trim();


        const nuevaEdad =
            Number(
                document
                    .getElementById("nuevaEdad")
                    .value
            );


        const mensaje =
            document.getElementById("mensajeEditar");


        const cliente =
            clientes.find(
                cliente => cliente.ID === id
            );


        if (!cliente) {

            mensaje.innerHTML = `
                <div class="error">
                    No se encontró el cliente.
                </div>
            `;

            return;

        }


        if (
            !nuevoNombre ||
            nuevaEdad <= 0 ||
            nuevaEdad > 100
        ) {

            mensaje.innerHTML = `
                <div class="error">
                    Ingresa correctamente el nombre y la edad.
                </div>
            `;

            return;

        }


        cliente.Nombre = nuevoNombre;

        cliente.Edad = nuevaEdad;


        guardarDatos();


        mensaje.innerHTML = `
            <div class="success">
                Información actualizada correctamente.
            </div>
        `;


        document
            .getElementById("editarForm")
            .reset();


        actualizarInterfaz();

        actualizarDocumentoClientes();

    });


// ---------- ELIMINAR CLIENTE ----------

function eliminarCliente() {

    const id =
        document
            .getElementById("eliminarId")
            .value.trim();


    const mensaje =
        document.getElementById("mensajeEliminar");


    const indice =
        clientes.findIndex(
            cliente => cliente.ID === id
        );


    if (indice === -1) {

        mensaje.innerHTML = `
            <div class="error">
                No se encontró el cliente.
            </div>
        `;

        return;

    }


    const cliente =
        clientes[indice];


    const confirmar =
        confirm(
            `¿Seguro que deseas eliminar a ` +
            `${cliente.Nombre}?`
        );


    if (!confirmar) {

        mensaje.innerHTML = `
            <div class="error">
                Eliminación cancelada.
            </div>
        `;

        return;

    }


    clientes.splice(indice, 1);


    guardarDatos();


    mensaje.innerHTML = `
        <div class="success">
            Cliente eliminado correctamente.
        </div>
    `;


    document
        .getElementById("eliminarId")
        .value = "";


    actualizarInterfaz();

    actualizarDocumentoClientes();

}


// ---------- GENERAR RUTINA ----------

function generarRutina() {

    const id =
        document
            .getElementById("rutinaId")
            .value.trim();


    const dia =
        document.getElementById("diaRutina").value;


    const resultado =
        document.getElementById("resultadoRutina");


    const cliente =
        clientes.find(
            cliente => cliente.ID === id
        );


    if (!id) {

        resultado.innerHTML = `
            <div class="error">
                Ingresa el ID del cliente.
            </div>
        `;

        return;

    }


    if (!cliente) {

        resultado.innerHTML = `
            <div class="error">
                No se encontró el cliente.
            </div>
        `;

        return;

    }


    const rutinaCliente =
        rutinas[cliente.Objetivo];


    if (
        !rutinaCliente ||
        !rutinaCliente[dia]
    ) {

        resultado.innerHTML = `
            <div class="error">
                No existe una rutina disponible.
            </div>
        `;

        return;

    }


    const ejercicios =
        rutinaCliente[dia];


    const listaEjercicios =
        ejercicios
            .map(
                ejercicio => `
                    <li>
                        <strong>
                            ${ejercicio[0]}
                        </strong>
                        - ${ejercicio[1]}
                    </li>
                `
            )
            .join("");


    resultado.innerHTML = `

        <div class="routine-card">

            <h3>
                ${dia} - ${cliente.Nombre}
            </h3>

            <p>
                <strong>Objetivo:</strong>
                ${cliente.Objetivo}
            </p>

            <ul>
                ${listaEjercicios}
            </ul>

        </div>

    `;

}


// ---------- ESTADÍSTICAS ----------

function actualizarEstadisticas() {

    const total =
        clientes.length;


    const pagados =
        clientes.filter(
            cliente => cliente.Pago === "Pagado"
        ).length;


    const pendientes =
        total - pagados;


    const mensual =
        clientes.filter(
            cliente => cliente.Membresia === "Mensual"
        ).length;


    const trimestral =
        clientes.filter(
            cliente => cliente.Membresia === "Trimestral"
        ).length;


    const anual =
        clientes.filter(
            cliente => cliente.Membresia === "Anual"
        ).length;


    const masa =
        clientes.filter(
            cliente =>
                cliente.Objetivo === "Ganar masa muscular"
        ).length;


    const grasa =
        clientes.filter(
            cliente =>
                cliente.Objetivo === "Pérdida de grasa"
        ).length;


    const condicion =
        clientes.filter(
            cliente =>
                cliente.Objetivo === "Mejorar condición física"
        ).length;


    document.getElementById("statTotal").textContent =
        total;


    document.getElementById("statPagados").textContent =
        pagados;


    document.getElementById("statPendientes").textContent =
        pendientes;


    document.getElementById("statMensual").textContent =
        mensual;


    document.getElementById("statTrimestral").textContent =
        trimestral;


    document.getElementById("statAnual").textContent =
        anual;


    document.getElementById("statMasa").textContent =
        masa;


    document.getElementById("statGrasa").textContent =
        grasa;


    document.getElementById("statCondicion").textContent =
        condicion;


    const porcentajeMensual =
        total > 0
            ? ((mensual / total) * 100).toFixed(1)
            : 0;


    const porcentajeTrimestral =
        total > 0
            ? ((trimestral / total) * 100).toFixed(1)
            : 0;


    const porcentajeAnual =
        total > 0
            ? ((anual / total) * 100).toFixed(1)
            : 0;


    document.getElementById(
        "porcentajeMensual"
    ).textContent =
        `${porcentajeMensual}%`;


    document.getElementById(
        "porcentajeTrimestral"
    ).textContent =
        `${porcentajeTrimestral}%`;


    document.getElementById(
        "porcentajeAnual"
    ).textContent =
        `${porcentajeAnual}%`;

}


// ---------- DOCUMENTOS ----------

// Obtiene la fecha actual como día, mes y año.
function obtenerFecha() {

    const fecha = new Date();


    return {

        dia: fecha.getDate(),

        mes: fecha.getMonth() + 1,

        anio: fecha.getFullYear()

    };

}


// Muestra la fecha actual en pantalla.
function mostrarFechaSistema() {

    const fecha =
        obtenerFecha();


    document
        .getElementById("fechaSistema")
        .innerHTML = `

            <div class="information-card">

                <p>
                    <strong>Día:</strong>
                    ${fecha.dia}
                </p>

                <p>
                    <strong>Mes:</strong>
                    ${fecha.mes}
                </p>

                <p>
                    <strong>Año:</strong>
                    ${fecha.anio}
                </p>

                <p>
                    <strong>Tupla:</strong>
                    (${fecha.dia},
                    ${fecha.mes},
                    ${fecha.anio})
                </p>

            </div>

        `;

}


// Lee un documento seleccionado.
function leerDocumento() {

    const nombre =
        document
            .getElementById("documentoSeleccionado")
            .value;


    const resultado =
        document
            .getElementById("contenidoDocumento");


    try {

        if (!documentos[nombre]) {

            throw new Error(
                "El documento no existe."
            );

        }


        resultado.innerHTML = `

            <div class="document-view">

                <h4>
                    ${nombre}
                </h4>

                <pre>
${documentos[nombre]}
                </pre>

            </div>

        `;

    } catch (error) {

        resultado.innerHTML = `

            <div class="error">
                Error: ${error.message}
            </div>

        `;

    }

}


// Crea un nuevo documento.
function crearDocumento() {

    const nombre =
        document
            .getElementById("nuevoDocumento")
            .value.trim();


    const contenido =
        document
            .getElementById("contenidoNuevoDocumento")
            .value;


    const mensaje =
        document
            .getElementById("mensajeDocumento");


    if (!nombre) {

        mensaje.innerHTML = `
            <div class="error">
                Ingresa el nombre del documento.
            </div>
        `;

        return;

    }


    if (!nombre.includes(".")) {

        mensaje.innerHTML = `
            <div class="error">
                El nombre debe incluir una extensión.
                Ejemplo: registro.txt
            </div>
        `;

        return;

    }


    if (documentos[nombre]) {

        mensaje.innerHTML = `
            <div class="error">
                El documento ya existe.
            </div>
        `;

        return;

    }


    const fecha =
        obtenerFecha();


    documentos[nombre] =
        `Fecha de creación: ` +
        `${fecha.dia}/${fecha.mes}/${fecha.anio}\n\n` +
        contenido;


    guardarDocumentos();


    mensaje.innerHTML = `
        <div class="success">
            Documento creado correctamente.
        </div>
    `;


    document
        .getElementById("nuevoDocumento")
        .value = "";

    document
        .getElementById("contenidoNuevoDocumento")
        .value = "";


    actualizarListaDocumentos();

}


// Modifica el documento seleccionado.
function modificarDocumento() {

    const nombre =
        document
            .getElementById("documentoSeleccionado")
            .value;


    const contenido =
        document
            .getElementById("contenidoModificarDocumento")
            .value;


    const mensaje =
        document.getElementById(
            "mensajeModificarDocumento"
        );


    try {

        if (!documentos[nombre]) {

            throw new Error(
                "No se encontró el documento."
            );

        }


        const fecha =
            obtenerFecha();


        documentos[nombre] =
            `Última modificación: ` +
            `${fecha.dia}/${fecha.mes}/${fecha.anio}\n\n` +
            contenido;


        guardarDocumentos();


        mensaje.innerHTML = `
            <div class="success">
                Documento modificado correctamente.
            </div>
        `;

    } catch (error) {

        mensaje.innerHTML = `
            <div class="error">
                Error: ${error.message}
            </div>
        `;

    }

}


// ---------- ACTUALIZAR DOCUMENTO DE CLIENTES ----------

function actualizarDocumentoClientes() {

    // Si no existen clientes, no se agrega
    // información de un cliente vacío.
    if (clientes.length === 0) {

        documentos["clientes.txt"] =
            "REGISTRO DE CLIENTES POWERFIT\n\n" +
            "No hay clientes registrados.";

        guardarDocumentos();

        return;

    }


    let contenido =
        "REGISTRO DE CLIENTES POWERFIT\n\n";


    clientes.forEach(function(cliente) {

        // Solo agrega clientes que tengan información válida.
        if (
            !cliente ||
            !cliente.ID ||
            !cliente.Nombre
        ) {

            return;

        }


        contenido +=
            `ID: ${cliente.ID}\n` +
            `Nombre: ${cliente.Nombre}\n` +
            `Edad: ${cliente.Edad}\n` +
            `Membresía: ${cliente.Membresia}\n` +
            `Objetivo: ${cliente.Objetivo}\n` +
            `Pago: ${cliente.Pago}\n\n`;

    });


    documentos["clientes.txt"] =
        contenido;


    guardarDocumentos();

}


// ---------- ACTUALIZAR DOCUMENTO DE PAGOS ----------

function actualizarDocumentoPagos() {

    if (clientes.length === 0) {

        documentos["pagos.txt"] =
            "REGISTRO DE PAGOS POWERFIT\n\n" +
            "No hay pagos registrados.";

        guardarDocumentos();

        return;

    }


    let contenido =
        "REGISTRO DE PAGOS POWERFIT\n\n";


    clientes.forEach(function(cliente) {

        if (
            !cliente ||
            !cliente.ID ||
            !cliente.Nombre
        ) {

            return;

        }


        contenido +=
            `${cliente.ID} - ` +
            `${cliente.Nombre} - ` +
            `${cliente.Pago}\n`;

    });


    documentos["pagos.txt"] =
        contenido;


    guardarDocumentos();

}


// ---------- ACTUALIZAR LISTA DE DOCUMENTOS ----------

function actualizarListaDocumentos() {

    const select =
        document.getElementById(
            "documentoSeleccionado"
        );


    if (!select) {

        return;

    }


    const seleccion =
        select.value;


    select.innerHTML = "";


    Object.keys(documentos)
        .forEach(function(nombre) {

            const opcion =
                document.createElement("option");


            opcion.value = nombre;

            opcion.textContent = nombre;


            select.appendChild(opcion);

        });


    if (documentos[seleccion]) {

        select.value = seleccion;

    }

}


// ---------- ACTUALIZAR INTERFAZ ----------

function actualizarInterfaz() {

    mostrarClientes();

    actualizarEstadisticas();

    mostrarFechaSistema();

    actualizarListaDocumentos();

}


// ---------- INICIAR SISTEMA ----------

document.addEventListener(
    "DOMContentLoaded",
    function() {

        actualizarInterfaz();

    }
);
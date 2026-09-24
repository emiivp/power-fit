// ---------- DATOS DEL SISTEMA ----------

let clientes = JSON.parse(localStorage.getItem("powerfitClientes")) || [];

const precios = {
    "Mensual": 500,
    "Trimestral": 1300,
    "Anual": 4500
};

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


// ---------- GUARDAR DATOS ----------

function guardarDatos() {
    localStorage.setItem(
        "powerfitClientes",
        JSON.stringify(clientes)
    );
}


// ---------- REGISTRAR CLIENTE ----------

document.getElementById("clienteForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const id = document.getElementById("clienteId").value.trim();
    const nombre = document.getElementById("clienteNombre").value.trim();
    const edad = Number(document.getElementById("clienteEdad").value);
    const membresia = document.getElementById("clienteMembresia").value;
    const objetivo = document.getElementById("clienteObjetivo").value;

    const mensaje = document.getElementById("mensajeCliente");


    if (!id || !nombre || !edad || !membresia || !objetivo) {

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


    const existe = clientes.some(cliente => cliente.ID === id);

    if (existe) {

        mensaje.innerHTML = `
            <div class="error">
                El ID ${id} ya está registrado.
            </div>
        `;

        return;
    }


    const nuevoCliente = {

        ID: id,
        Nombre: nombre,
        Edad: edad,
        Membresia: membresia,
        Objetivo: objetivo,
        Pago: "Pendiente"

    };


    clientes.push(nuevoCliente);

    guardarDatos();

    document.getElementById("clienteForm").reset();


    mensaje.innerHTML = `
        <div class="success">
            Cliente registrado correctamente.
        </div>
    `;


    actualizarInterfaz();

});


// ---------- BUSCAR CLIENTE ----------

function buscarCliente() {

    const id = document.getElementById("buscarId").value.trim();

    const resultado = document.getElementById("resultadoBusqueda");

    const cliente = clientes.find(
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


    resultado.innerHTML = crearTarjetaCliente(cliente);

}


// ---------- MOSTRAR CLIENTES ----------

function mostrarClientes() {

    const lista = document.getElementById("listaClientes");

    const total = document.getElementById("totalClientes");


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


    lista.innerHTML = clientes.map(
        cliente => crearTarjetaCliente(cliente)
    ).join("");

}


// ---------- TARJETA DE CLIENTE ----------

function crearTarjetaCliente(cliente) {

    const estadoPago =
        cliente.Pago === "Pagado"
            ? `<span class="paid">Pagado</span>`
            : `<span class="pending">Pendiente</span>`;


    return `
        <div class="client-card">

            <h4>${cliente.Nombre}</h4>

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
                <strong>Pago:</strong>
                ${estadoPago}
            </p>

        </div>
    `;

}


// ---------- INFORMACIÓN COMPLETA ----------

function mostrarInformacion() {

    const id = document.getElementById("infoId").value.trim();

    const resultado =
        document.getElementById("informacionCliente");


    const cliente = clientes.find(
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
                $${precios[cliente.Membresia].toLocaleString("es-MX")}
            </p>

            <p>
                <strong>Objetivo:</strong>
                ${cliente.Objetivo}
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

    const id = document.getElementById("pagoId").value.trim();

    const resultado =
        document.getElementById("resultadoPago");


    const cliente = clientes.find(
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
                El pago de ${cliente.Nombre} ya está registrado.
            </div>
        `;

        return;
    }


    const confirmar = confirm(
        `¿Deseas registrar el pago de ${cliente.Nombre} por $${precios[cliente.Membresia].toLocaleString("es-MX")}?`
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
            Pago registrado correctamente para ${cliente.Nombre}.
        </div>
    `;


    actualizarInterfaz();

}


// ---------- EDITAR CLIENTE ----------

document.getElementById("editarForm").addEventListener("submit", function(event) {

    event.preventDefault();


    const id =
        document.getElementById("editarId").value.trim();

    const nuevoNombre =
        document.getElementById("nuevoNombre").value.trim();

    const nuevaEdad =
        Number(document.getElementById("nuevaEdad").value);

    const mensaje =
        document.getElementById("mensajeEditar");


    const cliente = clientes.find(
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


    if (!nuevoNombre || nuevaEdad <= 0 || nuevaEdad > 100) {

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


    document.getElementById("editarForm").reset();

    actualizarInterfaz();

});


// ---------- ELIMINAR CLIENTE ----------

function eliminarCliente() {

    const id =
        document.getElementById("eliminarId").value.trim();

    const mensaje =
        document.getElementById("mensajeEliminar");


    const indice = clientes.findIndex(
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


    const cliente = clientes[indice];


    const confirmar = confirm(
        `¿Seguro que deseas eliminar a ${cliente.Nombre}?`
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


    document.getElementById("eliminarId").value = "";

    actualizarInterfaz();

}


// ---------- GENERAR RUTINA ----------

function generarRutina() {

    const id =
        document.getElementById("rutinaId").value.trim();

    const dia =
        document.getElementById("diaRutina").value;

    const resultado =
        document.getElementById("resultadoRutina");


    const cliente = clientes.find(
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


    if (!rutinaCliente || !rutinaCliente[dia]) {

        resultado.innerHTML = `
            <div class="error">
                No existe una rutina disponible.
            </div>
        `;

        return;
    }


    const ejercicios = rutinaCliente[dia];


    const listaEjercicios = ejercicios.map(
        ejercicio => `
            <li>
                <strong>${ejercicio[0]}</strong>
                - ${ejercicio[1]}
            </li>
        `
    ).join("");


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

    const total = clientes.length;


    const pagados =
        clientes.filter(
            cliente => cliente.Pago === "Pagado"
        ).length;


    const pendientes = total - pagados;


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
            cliente => cliente.Objetivo === "Ganar masa muscular"
        ).length;


    const grasa =
        clientes.filter(
            cliente => cliente.Objetivo === "Pérdida de grasa"
        ).length;


    const condicion =
        clientes.filter(
            cliente => cliente.Objetivo === "Mejorar condición física"
        ).length;


    document.getElementById("statTotal").textContent = total;

    document.getElementById("statPagados").textContent = pagados;

    document.getElementById("statPendientes").textContent = pendientes;


    document.getElementById("statMensual").textContent = mensual;

    document.getElementById("statTrimestral").textContent = trimestral;

    document.getElementById("statAnual").textContent = anual;


    document.getElementById("statMasa").textContent = masa;

    document.getElementById("statGrasa").textContent = grasa;

    document.getElementById("statCondicion").textContent = condicion;


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


    document.getElementById("porcentajeMensual").textContent =
        `${porcentajeMensual}%`;


    document.getElementById("porcentajeTrimestral").textContent =
        `${porcentajeTrimestral}%`;


    document.getElementById("porcentajeAnual").textContent =
        `${porcentajeAnual}%`;

}


// ---------- ACTUALIZAR INTERFAZ ----------

function actualizarInterfaz() {

    mostrarClientes();

    actualizarEstadisticas();

}


// ---------- CARGAR SISTEMA ----------

document.addEventListener("DOMContentLoaded", function() {

    actualizarInterfaz();

});
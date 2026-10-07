let entradas = [
    {
        id: 1,
        titulo: "Minecraft",
        categoria: "Sandbox",
        valoracion: 9,
        completado: true,
        fecha: "2023-01-01"
    },
    {
        id: 2,
        titulo: "Clash of Clans",
        categoria: "Estrategia",
        valoracion: 8,
        completado: false,
        fecha: "2023-02-15"
    },
    {
        id: 3,
        titulo: "League of Legends",
        categoria: "Estrategia",
        valoracion: 7,
        completado: true,
        fecha: "2023-03-01"
    }
];


// function mostrarEntradas(lista) {
//     console.log("=== MI COLECCIÓN ===");

//     if (lista.length === 0) {
//         console.log("No hay entradas.");
//         return;
//     }

//     lista.forEach((entrada) => {
//         console.log(
//             `${entrada.id}. ${entrada.titulo} | ` +
//             `${entrada.categoria} | ` +
//             `${entrada.valoracion}/10 | ` +
//             `${entrada.completado ? "Completado" : "Pendiente"} | ` +
//             `${entrada.fecha}`
//         );
//     });
// }

function mostrarEntradas(lista) {
    if (lista.length === 0) {
        alert("No hay entradas.");
        return;
    }

    alert(lista.map((entrada) =>
        `${entrada.id}. ${entrada.titulo} | ${entrada.categoria} | ` +
        `${entrada.valoracion}/10 | ${entrada.completado ? "Completado" : "Pendiente"} | ${entrada.fecha}`
    ).join("\n"));
}


function crearEntrada(titulo, categoria, valoracion, completado) {
    const nuevaEntrada = {
        id: entradas.length + 1,
        titulo: titulo,
        categoria: categoria,
        valoracion: valoracion,
        completado: completado,
        fecha: new Date().toISOString().split("T")[0] // Fecha actual en formato YYYY-MM-DD
    };

    entradas.push(nuevaEntrada);

    // console.log(`"${titulo}" se ha añadido correctamente.`);
}


function buscarPorId(id) {
    return entradas.find((entrada) => {
        return entrada.id === id;
    });
}


function buscarEntradas(texto) {
    const textoBusqueda = texto.toLowerCase();

    return entradas.filter((entrada) => {
        return entrada.titulo.toLowerCase().includes(textoBusqueda);
    });
}


function filtrarPorCategoria(categoria) {
    return entradas.filter((entrada) => {
        return entrada.categoria === categoria;
    });
}


function filtrarPorEstado(completado) {
    return entradas.filter((entrada) => {
        return entrada.completado === completado;
    });
}


function modificarEntrada(id, titulo, categoria, valoracion, completado) {
    const entrada = buscarPorId(id);

    if (!entrada) {
        // console.log(`No existe una entrada con id ${id}.`);
        return;
    }

    entrada.titulo = titulo;
    entrada.categoria = categoria;
    entrada.valoracion = valoracion;
    entrada.completado = completado;
    entrada.fecha = new Date().toISOString().split("T")[0]; // Actualiza la fecha a la actual

    // console.log(`Entrada ${id} modificada correctamente.`);
}


function eliminarEntrada(id) {
    if (!buscarPorId(id)) {
        console.log(`No existe una entrada con id ${id}.`);
        return;
    }

    entradas = entradas.filter((entrada) => entrada.id !== id);

    // console.log(`Entrada ${id} eliminada correctamente.`);
}


function ordenarPorValoracion(ascendente = false) {
    entradas.sort((a, b) => {
        return ascendente
            ? a.valoracion - b.valoracion
            : b.valoracion - a.valoracion;
    });

    return entradas;
}


function ordenarPorFecha(ascendente = false) {
    entradas.sort((a, b) => {
        const diferencia = new Date(a.fecha) - new Date(b.fecha);
        return ascendente ? diferencia : -diferencia;
    });

    return entradas;
}

function ordenarPorId(ascendente = true) {
    entradas.sort((a, b) => {
        return ascendente ? a.id - b.id : b.id - a.id;
    });

    return entradas;
}

// mostrarEntradas(entradas);

// console.log("\n--- AÑADIR ---");
// crearEntrada("Dead Cells", "Roguelike", 8, false);
// mostrarEntradas(entradas);

// console.log("\n--- BUSCAR 'cel' ---");
// mostrarEntradas(buscarEntradas("cel"));

// console.log("\n--- FILTRAR ROGUELIKE ---");
// mostrarEntradas(filtrarPorCategoria("Roguelike"));

// console.log("\n--- PENDIENTES ---");
// mostrarEntradas(filtrarPorEstado(false));

// console.log("\n--- ORDENAR POR VALORACIÓN ---");
// mostrarEntradas(ordenarPorValoracion());

// console.log("\n--- MODIFICAR ---");
// modificarEntrada(2, "Hades", "Roguelite", 9, true);
// mostrarEntradas(entradas);

// console.log("\n--- ELIMINAR ---");
// eliminarEntrada(1);
// mostrarEntradas(entradas);

function iniciarMenu() {
    while (true) {
        const opcion = prompt(
            "=== MI COLECCIÓN ===\n" +
            "1. Mostrar entradas\n" +
            "2. Añadir entrada\n" +
            "3. Buscar por título\n" +
            "4. Filtrar por categoría\n" +
            "5. Filtrar por estado\n" +
            "6. Modificar entrada\n" +
            "7. Eliminar entrada\n" +
            "8. Ordenar por valoración\n" +
            "9. Ordenar por fecha\n" +
            "10. Ordenar por ID\n" +
            "0. Salir"
        );

        if (opcion === null || opcion === "0") return;

        switch (opcion) {
            case "1":
                mostrarEntradas(entradas);
                break;
            case "2": {
                const titulo = prompt("Título:");
                if (titulo === null) break;
                const categoria = prompt("Categoría:");
                if (categoria === null) break;
                const valoracion = Number(prompt("Valoración (0-10):"));
                if (isNaN(valoracion) || valoracion < 0 || valoracion > 10) {
                    alert("La valoración debe ser un número entre 0 y 10.");
                    break;
                }
                crearEntrada(titulo, categoria, valoracion, confirm("¿Está completado?"));
                break;
            }
            case "3": {
                const texto = prompt("Título que desea buscar:");
                if (texto !== null) mostrarEntradas(buscarEntradas(texto));
                break;
            }
            case "4": {
                const categoria = prompt("Categoría:");
                if (categoria !== null) mostrarEntradas(filtrarPorCategoria(categoria));
                break;
            }
            case "5":
                mostrarEntradas(filtrarPorEstado(confirm("¿Mostrar entradas completadas?")));
                break;
            case "6": {
                const id = Number(prompt("ID de la entrada que desea modificar:"));
                const entrada = buscarPorId(id);
                if (!entrada) {
                    alert(`No existe una entrada con id ${id}.`);
                    break;
                }
                const titulo = prompt("Título:", entrada.titulo);
                if (titulo === null) break;
                const categoria = prompt("Categoría:", entrada.categoria);
                if (categoria === null) break;
                const valoracion = Number(prompt("Valoración (0-10):", entrada.valoracion));
                if (isNaN(valoracion) || valoracion < 0 || valoracion > 10) {
                    alert("La valoración debe ser un número entre 0 y 10.");
                    break;
                }
                modificarEntrada(id, titulo, categoria, valoracion, confirm("¿Está completado?"));
                break;
            }
            case "7": {
                const id = Number(prompt("ID de la entrada que desea eliminar:"));
                if (!buscarPorId(id)) {
                    alert(`No existe una entrada con id ${id}.`);
                } else if (confirm(`¿Eliminar la entrada ${id}?`)) {
                    eliminarEntrada(id);
                }
                break;
            }
            case "8":
                mostrarEntradas(ordenarPorValoracion(confirm("¿Orden ascendente?")));
                break;
            case "9":
                mostrarEntradas(ordenarPorFecha(confirm("¿Orden ascendente?")));
                break;
            case "10":
                mostrarEntradas(ordenarPorId(confirm("¿Orden ascendente?")));
                break;
            default:
                alert("Opción no válida.");
        }
    }
}

iniciarMenu();



var valor_ticket = 200; //valor del ticket

function get_Categoria(){  
    let categoria;
    categoria = document.getElementById("idCategoria").value;
    console.log ("La categoría seleccionada es:" + categoria);
    return categoria;
}

function get_cantidadTickets(){
    cant_Tickets = document.getElementById("cantTickets").value;
    if (cant_Tickets.toString().trim() == ""){
        cant_Tickets = 0;
        alert("Debe ingresar la cantidad de tickets que desea comprar");
    }else{
        cant_Tickets = parseInt(cant_Tickets);
        if(cant_Tickets == NaN || cant_Tickets <= 0 || cant_Tickets.toString() =="NaN"){
            cant_Tickets = 0;
            alert ("La cantidad ingresada es incorrecta");
        }
    }

    if(cant_Tickets == 0){
        mostrarEnPantalla("");
    }

    console.log ("Cantidad de tickets:" + cant_Tickets);
    return cant_Tickets;
}

var btnResumen = document.getElementById("btnResumen")
btnResumen.addEventListener('click', function(event){
    event.preventDefault();

        let categ = get_Categoria();
        let name = get_Nombre();
        let apel = get_Apellido();
        let email = get_Correo();

        if (name == ""){
            alert("Por favor, ingrese su nombre");
            return;
        }  

        if (apel == ""){
            alert("Por favor, ingrese su apellido");
            return;
        }

        if(email == ""){
            alert("Por favor, ingrese su email");
            return;
        }else{
            if (email == "incorrecto"){
                alert("El email parece ser incorrecto. \nPor favor ingréselo nuevamente." );
                return;
            }
        }

        let cantidadTickets;
        cantidadTickets = get_cantidadTickets()
        if (cantidadTickets == 0 ){
            return;
        }else{

            let descuento;
            descuento = porcentaje_descuento(categ);
            console.log("El porcentaje de descuento es: " + descuento + "%");

            let valor_pagar = 0;
            valor_pagar = calcular_Total(valor_ticket, descuento, cantidadTickets);
            console.log("El valor a pagar, sin descuento es: $" + valor_pagar); 

            mostrarEnPantalla(valor_pagar);
            alert("Se han enviado los tickets a la dirección de correo indicada.\nMuchas gracias por su compra.");
        }
    }
)

function get_Nombre(){
    let nombre = "";
    nombre = document.getElementById("idNombre").value;
    nombre = nombre.toString().trim();
    console.log(nombre);
    return nombre;
}

function get_Apellido(){
    let apellido = "";
    apellido = document.getElementById("idApellido").value;
    apellido = apellido.toString().trim();
    return apellido;
}

function get_Correo(){
    let correo = "";
    correo = document.getElementById("idCorreo").value;
    correo = correo.toString().trim();
    
    if(correo.length == 0){
        correo = "";
        return correo;
    }

    /* validacion basica */
    //buscar @

    let pos1, pos2;
    pos1 = correo.indexOf("@");
    pos2 = correo.lastIndexOf("@");

    if (pos1 == -1 || pos1 != pos2 || pos1 == correo.length - 1 || pos2 == correo.length - 1 || pos1 == 0) {
        correo = "incorrecto";
    }

    return correo;
}

function porcentaje_descuento(ctg){
    /* ctg = categoria */
    switch (ctg){
        case "Estudiante":
            return 80;
            break
        case "Trainee":
            return 50;
            break
        case "Junior":
            return 15;
            break
    }
}


function calcular_Total(precioTk, porc_desc, cantTk) {
    /* precioTK = precio del ticket ($200)
        porc_desc = porcentaje de descuento (80,50,15)
        cantTk = cantidad de tickets a comprar */

    let total = 0;
    total = precioTk * cantTk;
    total = total - (total * porc_desc / 100);
    console.log("Valor total con descuento: $" + total);
    return total;
}

function mostrarEnPantalla(costo){
    var lbl = document.getElementById("idTotalPagar");
    lbl.textContent = "Total a pagar: $" + costo;
}
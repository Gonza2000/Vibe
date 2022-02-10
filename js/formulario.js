const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    password: /^.{4,20}$/, // 4 a 12 digitos.
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}
const validarFormulario = (e) => {
    switch (e.target.name) {
        case "Nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "correo":
            validarCampo(expresiones.correo, e.target, 'correo');
            break;
        case "Cedula":
            validarCedula(e.target.value);
            break;
        case "celular":
            validarCampo(expresiones.telefono, e.target, 'celular');
            break;
        case "contraseña":
            validarCampo(expresiones.password, e.target, 'contraseña');
            break;
    }
}
const validarCedula = (cedula) => {
    if (cedula.length == 10) {
        document.querySelector(`#grupo__cedula .formulario__input-error-cantidad`).classList.remove('formulario__input-error-activo');
        //Obtenemos el digito de la region que sonlos dos primeros digitos
        var digito_region = cedula.substring(0, 2);

        //Pregunto si la region existe ecuador se divide en 24 regiones
        if (digito_region >= 1 && digito_region <= 24) {
            document.querySelector(`#grupo__cedula .formulario__input-error-region`).classList.remove('formulario__input-error-activo');
            // Extraigo el ultimo digito
            var ultimo_digito = cedula.substring(9, 10);

            //Agrupo todos los pares y los sumo
            var pares = parseInt(cedula.substring(1, 2)) + parseInt(cedula.substring(3, 4)) + parseInt(cedula.substring(5, 6)) + parseInt(cedula.substring(7, 8));

            //Agrupo los impares, los multiplico por un factor de 2, si la resultante es > que 9 le restamos el 9 a la resultante
            var numero1 = cedula.substring(0, 1);
            var numero1 = (numero1 * 2);
            if (numero1 > 9) { var numero1 = (numero1 - 9); }

            var numero3 = cedula.substring(2, 3);
            var numero3 = (numero3 * 2);
            if (numero3 > 9) { var numero3 = (numero3 - 9); }

            var numero5 = cedula.substring(4, 5);
            var numero5 = (numero5 * 2);
            if (numero5 > 9) { var numero5 = (numero5 - 9); }

            var numero7 = cedula.substring(6, 7);
            var numero7 = (numero7 * 2);
            if (numero7 > 9) { var numero7 = (numero7 - 9); }

            var numero9 = cedula.substring(8, 9);
            var numero9 = (numero9 * 2);
            if (numero9 > 9) { var numero9 = (numero9 - 9); }

            var impares = numero1 + numero3 + numero5 + numero7 + numero9;

            //Suma total
            var suma_total = (pares + impares);

            //extraemos el primero digito
            var primer_digito_suma = String(suma_total).substring(0, 1);

            //Obtenemos la decena inmediata
            var decena = (parseInt(primer_digito_suma) + 1) * 10;

            //Obtenemos la resta de la decena inmediata - la suma_total esto nos da el digito validador
            var digito_validador = decena - suma_total;

            //Si el digito validador es = a 10 toma el valor de 0
            if (digito_validador == 10)
                var digito_validador = 0;

            //Validamos que el digito validador sea igual al de la cedula
            if (digito_validador == ultimo_digito) {
                document.getElementById(`grupo__cedula`).classList.remove('formulario__grupo-incorrecto');
                document.getElementById(`grupo__cedula`).classList.add('formulario__grupo-correcto');
                document.querySelector(`#grupo__cedula i`).classList.add('fa-check-circle');
                document.querySelector(`#grupo__cedula i`).classList.remove('fa-times-circle');
                document.querySelector(`#grupo__cedula .formulario__input-error`).classList.remove('formulario__input-error-activo');
            } else {
                document.getElementById(`grupo__cedula`).classList.add('formulario__grupo-incorrecto');
                document.getElementById(`grupo__cedula`).classList.remove('formulario__grupo-correcto');
                document.querySelector(`#grupo__cedula i`).classList.add('fa-times-circle');
                document.querySelector(`#grupo__cedula i`).classList.remove('fa-check-circle');
                document.querySelector(`#grupo__cedula .formulario__input-error`).classList.add('formulario__input-error-activo');
            }

        } else {
            // imprimimos en consola si la region no pertenece
            document.getElementById(`grupo__cedula`).classList.add('formulario__grupo-incorrecto');
            document.getElementById(`grupo__cedula`).classList.remove('formulario__grupo-correcto');
            document.querySelector(`#grupo__cedula i`).classList.add('fa-times-circle');
            document.querySelector(`#grupo__cedula i`).classList.remove('fa-check-circle');
            document.querySelector(`#grupo__cedula .formulario__input-error-region`).classList.add('formulario__input-error-activo');
        }
    } else {
        //imprimimos en consola si la cedula tiene mas o menos de 10 digitos
        document.getElementById(`grupo__cedula`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__cedula`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__cedula i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__cedula i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__cedula .formulario__input-error-cantidad`).classList.add('formulario__input-error-activo');

    }
}
const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
})

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
})

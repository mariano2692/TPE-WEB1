document.addEventListener("DOMContentLoaded",()=>{

    const main = document.getElementById("main");
   

    /* 
    RECORREMOS EL ARRAY QUE NOS DEVOLVIO LA PROMESA, POR CADA OBJETO, AGREGAMOS UNA FILA AL TBODY DE LA TABLA, ESCRIBIENDO COMO CONTENIDO
    LAS PROPIEDADES TIPOCUCHILLO, MEDIDAS MATERIALCABO Y LA PROPIEDAD ID LA ASIGNAMOS COMO ID DE LA FILA <tr>
    */

    function fullfill_table(data){
        let tbody = document.getElementById("tbody");
        tbody.innerHTML = " ";
        for(let i = 0 ; i < data.length ; i++){
            tbody.innerHTML += `<tr id = ${data[i].id}>
                                    <td data-title="tipo de cuchillo">${data[i].tipoCuchillo}</td>
                                    <td data-title="medidas de la hoja">${data[i].medidas}</td>
                                    <td data-title="tipo de acero">${data[i].tipoAcero}</td>
                                    <td data-title="material del cabo">${data[i].materialCabo}</td>
                                    <td data-title="editar"><button id='btn-td-update' class='btn-update'><img src="img/edit_20dp_FILL0_wght400_GRAD0_opsz20.png"></button></td>
                                    <td data-title="borrar"><button id='btn-td-delete' class='btn-delete'><img src="img/close_20dp_FILL0_wght400_GRAD0_opsz20.png"></button></td>
                                </tr>`;
        }

        //COMPORTAMIENTO BOTON BORRAR FILA DE LA TABLA

        /*e ES EL EVENTO e.target ES EL ELEMENTO HTML BUTTON EN ESTE CASO, CON e.targetelement VAMOS SELECCIONANDO Y SUBIENDO NIVELES POR LOS
         PADRES DE LOS ELEMENTOS HASTA LLEGAR A LA FILA <tr> DONDE PODEMOS OBTENER EL ID */

        document.querySelectorAll("#btn-td-delete").forEach( b => b.addEventListener("click",(e)=>{
            const id = e.target.parentElement.parentElement.parentElement.id;
            console.log(e.target.parentElement.parentElement.parentElement.children)
            fetch(`https://6664efb9d122c2868e3f74d7.mockapi.io/table/${id}`,{
                method:'DELETE',
            })
            .then(table_manage)
                
        }));

            //COMPORTAMIENTO EDITAR FILA DE LA TABLA, EN ESTE PASO AL SELECCIONAR EL BOTON EDITAR EN ALGUNA FILA LLENAMOS LOS CAMPOS
            //DEL FORMULARIO CON LOS DATOS DE LA FILA QUE QUEREMOS EDITAR

            /* SELECCIONAMOS LAS FILAS CON E.TARGET.PARENTELEMENT Y LUEGO CON .CHILDREN SELECCIONAMOS EL ARRAY DE CELDAS DE ESA FILA
            EL CONTENIDO DE CADA CELDA LO AISGNAMOS A LOS CAMPOS DEL FORMULARIO PARA LUEGO EDITARLO */

            document.querySelectorAll("#btn-td-update").forEach( b => b.addEventListener("click",(e)=> {
                e.preventDefault();
                const id = e.target.parentElement.parentElement.parentElement.id;
                document.getElementById("cuchillo").value = e.target.parentElement.parentElement.parentElement.children[0].innerText;
                document.getElementById("medidas").value = e.target.parentElement.parentElement.parentElement.children[1].innerText;
                document.getElementById("acero").value = e.target.parentElement.parentElement.parentElement.children[2].innerText;
                document.getElementById("cabo").value = e.target.parentElement.parentElement.parentElement.children[3].innerText;
                document.getElementById("id").value = id;
            }));

    };




    /* 
    MANEJO DE LA TABLA, LLAMADA AL SERVIDOR, RESPONDE PROMESA, UN ARRAY DE OBJETOS JSON, LLAMADOS A LA FUNCION FULLFILL_TABLE Y SE
    LO PASAMOS COMO PARAMETRO, FULLFILL_TABLE RECORRE EL ARRAY Y ESCRIBE UNA FILA POR CADA OBJETO
    */

    function table_manage(){
        fetch(`https://6664efb9d122c2868e3f74d7.mockapi.io/table`)
            .then( resp =>{
                if(resp.ok){
                    return resp.json()
                }
                else{
                    main.innerHTML = `<h1>error</h1>`
                }
            })
            .then(fullfill_table)
            .catch(error => console.log(error))
    }

    function process(html){
        main.innerHTML = html;
        const article = main.querySelector("article");
        if(article.hasAttribute("data-table")){
            table_manage();

            //AGREGAR UNA FILA NUEVA A LA TABLA
            const form = document.getElementById("form-table");
            form.addEventListener("submit",(e)=>{
            e.preventDefault();

        
            let fd = new FormData(form);

            let item = {
                medidas: fd.get("medidas"),
                tipoAcero: fd.get("tipoAcero"),
                materialCabo: fd.get("materialCabo"),
                tipoCuchillo: fd.get("tipoCuchillo")

            };

            fetch(`https://6664efb9d122c2868e3f74d7.mockapi.io/table`,{
                method:'POST',
                body:JSON.stringify(item),
                headers:{
                    "Content-Type": "application/json",
                }
            })
            .then(table_manage)
            .catch(e => console.log(e))

        });


            //EDITAR UNA FILA COMPORTAMIENTO, YA TENEMOS LLENOS LOS CAMPOS DEL FORMULARIO CON LOS DATOS DE LA FILA A EDITAR, UNA VEZ EDITADOS
            //CLIKEAMOS EN EL BOTON MODIFICAR Y SE GUARDAN, OBTENEMOS EL ID POR QUE LO GUARDAMOS EN UN INPUT QUE OCULTAMOS Y NO OCUPA ESPACIO
            //CON DISPLAY BLOCK
            document.getElementById("modificar").addEventListener("click",()=>{
                const id = document.getElementById("id").value;

                let item = {
                    tipoCuchillo:document.getElementById("cuchillo").value,
                    medidas:document.getElementById("medidas").value,
                    tipoAcero:document.getElementById("acero").value,
                    materialCabo:document.getElementById("cabo").value,
                    
                };

                fetch(`https://6664efb9d122c2868e3f74d7.mockapi.io/table/${id}`,{
                    method:'PUT',
                    body:JSON.stringify(item),
                    headers:{
                        "Content-Type": "application/json",
                    }
                })
                .then(table_manage)
                .catch(e => console.log("errror" + e))

            })
        }


        if(article.hasAttribute("data-catalogue")){
            console.log("catalogue")
        }
        if(article.hasAttribute("data-contact")){
            console.log("contact")
                //COMPORTAMIENTO DEL CAPTCHA
            /*
            SE GENERA UN NUMERO ALEATORIO ENTRE 100 Y 999, LO MOSTRAMOS EN UN PARRAFO (PRECAPTCHA),
            SI EL USUARIO INGRESAR EL NUMERO EN EL INPUT Y APRETA ENTER PARAE ENVIAR,SE DESBLOQUEA EL BOTON Y SE MUESTRA UN MENSAJE,
            SI LO INGRESA INCORRECTAMENTE TAMBIEN SE MUESTRA UN MENSAJE, EL BOTON DE SUBMIT SIGUE BLOQUEADO
            */
            const pre_captcha = document.getElementById("pre-captcha");
            const captcha = document.getElementById("captcha");
            const numero_aleatorio = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
            const btn = document.getElementById("btn");
            const label_captcha = document.getElementById("label-captcha");
            
            pre_captcha.textContent = numero_aleatorio;

            captcha.addEventListener("keypress", (e)=> {
            
                if(e.key == "Enter"){
                    e.preventDefault();
                    label_captcha.textContent = " ";
                    if(captcha.value == numero_aleatorio){
                        pre_captcha.textContent = "correcto!"
                        captcha.value = " ";
                        captcha.classList.add("green");
                        captcha.classList.remove("red");
                        captcha.disabled = true;
                        btn.disabled = false;
                    }else {
                        pre_captcha.textContent = " incorrecto, intente de nuevo: " + numero_aleatorio;
                        captcha.value = " ";
                        captcha.classList.add("red");
                        captcha.classList.remove("green");
                    }
                }
            });
        }

        
    };


    function load_content(id){

        main.innerHTML = `<div class="spinner"></div>`;

        fetch(`${id}.html`)
            .then(res =>{
                if(res.ok){
                    return res.text();
                }
                else{
                    main.innerHTML = `Error - failed URL!`
                }
            })
            .then(process)
            .catch(error => main.innerHTML = `<h1> error - connection failed ${error}`)
    }


    
    function push(e){
        const id = e.target.id;
        document.title = id;
        load_content(id);

        window.history.pushState({id}, `${id}`,`/${id}`)
    }


    window.onload = (event) => {
        window["catalogue"].addEventListener("click", e => push(e));
        window["contact"].addEventListener("click", e => push(e));
        window["table"].addEventListener("click", e => push(e));
        window["home"].addEventListener("click", e => push(e));

        load_content("home");
    }

    window.addEventListener("popstate",(event)=>{
        let id = event.state.id;
        load_content(id);
    })

});

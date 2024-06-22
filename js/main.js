document.addEventListener('DOMContentLoaded',()=>{

    //COMPORTAMIENTO DEL NAV-BAR

    /*
    AL CLIQUEAR EN ABRIRNAV O CERRAR NAV, LE AGREGAMOS UNA CLASE DE VISIBLE AL NAV,
    LO QUE CAMBIA EL VALOR DEL ATRIBUTO VISIBILITY DE HIDDEN A VISIBLE Y VICEVERSA
    */
    const nav = document.getElementById('nav');
    const openNav = document.getElementById('open-nav');
    const closeNav = document.getElementById('close-nav');


    openNav.addEventListener('click',()=>{
        nav.classList.add('visible');
    })

    closeNav.addEventListener('click',()=>{
        nav.classList.remove('visible');
    })

    




    // COMPORTAMIENTO DEL FORMULARIO

    const form = document.getElementById("form");
    formulario.addEventListener("submit",(e)=>{
        e.preventDefault();
        let info_form = new FormData(form);
        console.log(info_form)
        formulario.reset();
    })

    
});








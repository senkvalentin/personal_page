document.querySelectorAll('.navbar-collapse ul li a:not(.dropdown-toggle)').forEach((itm) =>{
    itm.addEventListener('click',() => {document.querySelector('.navbar-toggler').click();});
});
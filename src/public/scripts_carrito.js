const cards = document.getElementById("cards");
const ruta = document.getElementById("ruta");
const header_h3 = document.getElementById("header_h3");
const comprar_boton = document.querySelectorAll(".comprar_boton");
const header = document.getElementById("header");
const productos_carrito = document.getElementById("productos_carrito");
const containerCarrito = document.getElementById("containerCarrito");
const carrito = document.getElementById("carrito");
const fragment = document.createDocumentFragment();
const agregar_boton = document.querySelectorAll(".agregar_boton");




let carritoVisible = false;

//muestra header

const mostrarInfoHeader = () =>{
    let cantidadproductos = 0;
    axios
    .get("/consulta_carrito")
    .then((res) => res.data.carrito)
    .then((data) => {
        data.forEach((productoCarrito) => {
            cantidadproductos += productoCarrito.cantidad;
        });
        header_h3.textContent = "("+cantidadproductos+")";
    });
    
}

mostrarInfoHeader();



// Boton Agregar

for (const boton of agregar_boton) {
    const indice_boton = [...agregar_boton].indexOf(boton)
    boton.addEventListener('click', ()=>{
        
        //peticion
        axios.get(`/agregar_carrito/${boton.classList[1]}`)
        .then(res => res.data)
        .then(data => {
            if(data){
                //cambiar visualizacion de productos en el carrito en el header
                mostrarInfoHeader();
            }else{
                //MENSAJE DE ERROR 
            }
        }) 
    })
    
}
    
    
const consulta_bd =  () =>{
          
    if (!carritoVisible){
        carritoVisible=true;
        axios.get('/consulta_carrito')
        .then(res => res.data.carrito)
        .then(data =>{
            cards.classList.add('invisible')
            containerCarrito.classList.remove('invisible')
            
            //h2 del header    
            newH2ruta = document.createElement('h2')
            newH2ruta.textContent = "> mi carrito"
            newH2ruta.setAttribute('class', 'micarrito_header')
            ruta.append(newH2ruta)
            
            
            mostrarResumen(data);
            
            mostrarCarrito(data)
            
        })
       
      }
  }   
    

        



const mostrarCarrito = async (data) =>{
    
    for (const product of data) {
        // productos del carrito
        newDiv_producto = document.createElement('DIV');
        newDiv_producto.setAttribute('class', `carrito_producto`);
        newDiv_producto.setAttribute('id', `${product._id}`);
        newImg = document.createElement('IMG');
        newImg.setAttribute('src', `images/${product.imgsrc}`);
        newImg.setAttribute('class', 'carrito_image');
        newH2_nombre = document.createElement('H2');
        newH2_nombre.textContent = product.nombre;
        newH2_cantidad = document.createElement('H2');
        newH2_cantidad.textContent = 'x'+product.cantidad;
        newH2_cantidad.setAttribute('class', 'carrito_cantidad');
        newH2_cantidad.setAttribute('class', 'carrito_cantidad');
        newH2_total = document.createElement('H2')
        newH2_total.setAttribute('class', 'carrito_total');
        newH2_total.textContent = '$'+product.total;
        new_button_quitar = document.createElement('BUTTON');
        new_button_quitar.textContent= "Quitar"
        new_button_quitar.setAttribute('class', `quitar_boton ${product._id} ${product.cantidad}`);
        
        newDiv_producto.append(newImg, newH2_nombre, newH2_cantidad, newH2_total, new_button_quitar)
        fragment.append(newDiv_producto)
        
    }
    productos_carrito.append(fragment);
    const carritoCantidad = document.querySelectorAll('.carrito_cantidad')
    const quitar_boton = document.querySelectorAll(".quitar_boton")
    
    for (const boton of quitar_boton) {
        
        boton.addEventListener('click', ()=>{
         axios.get(`/quitar/${boton.classList[1]}`)
         .then(res => {

            if (boton.classList[2]==1)
            {
                 boton.parentNode.classList.add("invisible")
            }else {
                boton.classList.replace(`${boton.classList[2]}`, `${--boton.classList[2]}` )
                carritoCantidad[[...quitar_boton].indexOf(boton)].textContent = `x ${boton.classList[2]}`
            }
            mostrarInfoHeader();
         })
         })
    }
    }

const mostrarResumen = (data) =>{
    //resumen carrito
newDiv_resumen = document.createElement('DIV');
newDiv_resumen.setAttribute('class', 'resumenCarrito');

newH2= document.createElement('H2')
newH2.setAttribute('class', 'resumen_h2');
newH2.textContent= "Resumen";

newH3= document.createElement('H3')
newH3.setAttribute('class', 'resumen_total');

newButton= document.createElement('BUTTON')
newButton.setAttribute('class', 'comprar_btn');
newButton.setAttribute('id', 'comprar_btn_resumen');
newButton.textContent="Comprar";

let total = 0;
data.forEach(producto =>{
    total += producto.total;
})
newH3.textContent= "Total: $" + total ;

newDiv_resumen.append(newH2, newH3, newButton)    
containerCarrito.append(newDiv_resumen)
const comprar_btn_resumen = document.getElementById("comprar_btn_resumen");

comprar_btn_resumen.addEventListener('click', ()=>{
    axios.get('/checkout')
    .then(res => window.open(res.data, '_blank'))
    
});

}





carrito.addEventListener('click', ()=>{
    consulta_bd();
})


for (const boton of comprar_boton) {
    
    boton.addEventListener('click', ()=>{
        if(boton.classList[2]>0){
            axios.get(`/checkoutindividual/${boton.classList[1]}`)
            .then(res => window.open(res.data, '_blank'))
        }
    })
}
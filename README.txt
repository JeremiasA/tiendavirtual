<--! Tienda virtual 1.0 -->

Tienda para compras directas o a través de carrito enlazada a mercadopago con usuarios de prueba. 
Funciona con peticiones AJAX(axios) para evitar recargar la página cuando se cargan productos al carrito o cuando
desde el carrito se quitan productos.   


*** TECNOLOGIAS Y METODOLOGÍAS UTILIZADAS***

- NodeJs
    dependencies:
    	- express
    	- mongoose
	- ejs (view engine)
	- mercadopago
	- express-session
	- connect-mongo(store)

- MongoDB

- HTML5, CSS3, Javascript(ES6)



*** SOBRE EL PROYECTO *** 

Este pequeño proyecto es parte de mi primer experiencia práctica en la construcción de una tienda virtual.

El servidor está desarrollado en NodeJs. 

Mediante un motor de plantillas (EJS) se carga la página principal de forma rápida favoreciendeo el SEO y velocidad de carga.
Luego se realizan las peticiones a través de forma asíncrona a través de 'axios' para dar una mejor experiencia de usuario.

Cuenta con sesiones de usuarios que mantienen los carritos con los productos durante 7 dias, aa través de express-session y 
connect-mongo como store para almacenar las sesiones. 

Los productos de los carritos de diversas sesiones se guardan en una única colección. Al consultar su carrito un usuario recibe
solo la visualización de los productos que contienen su sessionID.



*********************************************************************

HEROKU: https://tiendavirtualjea.herokuapp.com/

@Desarrollado por Jeremias Amestoy : jeremiasamestoy@gmail.com
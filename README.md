# Entregable Final Coder House (Node Helpers)

Una breve introduccion de lo que se hizo

se crearon todas las rutas  de productos  y carrito ,  se crearon las clases productos y archivos
para luego ser utilizados los metodos de las mismas   se creo un archivo utils donde estan funciones comunes
luego se creo los archivos donde estan almacenados los productos y carritos ingresados

## Como se utiliza el proyecto?

1. Instalar dependencias:

```
npm i 
```

2. Ejecutar :

```
app.js  que es el archivo principal o el script creado npm start
```

3. rutas :
```
Probar todas las rutas de la api
```

## ACLARACIONES


1.  endpoint Usuarios Login:

```
en el login  se creo el jwt y el boton de salir session se encargara el front que eliminara ese jwt desde el front y lo redireccionara al login
```

2. endpoint  Usuarios comprar:

```
como no decia que parametros se le enviaban desde el endpoint se tomo que se le envia la lista de productos el nombre el telefono y el email o username
```
3.  endpoint Usuarios Carritos:
```
se actualizo el modelo para que este relacionada a un usuario
```

## Bugs solucionados

1. Se elimino el bug de que cuando se elimina un carrito y se crea uno nuevo y se quiere insertar en este ultimo carrito un nuevo producto se inserte

2. Se elimino el bug  de que se actualize el cual no se le pasa nada y sea  producto vacio

3. Se elimino el bug aca de insertar elementos en el final del carrito x eliminando carrito x-1  y querer eliminar el ultimo del carrito x



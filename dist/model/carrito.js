"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Carrito {
    constructor() {
        this.productos = []; //es el array de obj que va a escribirse en el archivo
        this.idProductos = 0;
        this.timestamp = Date.now();
    }
    crearCarrito() {
        Carrito.id++;
        return {
            id: Carrito.id,
            timestamp: this.timestamp,
            productos: this.productos,
        };
    }
    insertarProducto(producto) {
        this.idProductos++;
        producto.id = this.idProductos | 0;
        this.productos.push(producto);
        return this.idProductos;
    }
    eliminarProducto(id) {
        const productosFiltrados = this.productos.filter((producto) => producto.id !== id);
        this.productos = productosFiltrados;
    }
}
Carrito.id = 0;
exports.default = Carrito;

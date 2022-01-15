class Carrito {
  constructor() {
    this.productos = []; //es el array de obj que va a escribirse en el archivo
    this.timestamp = Date.now();
  }

  crearCarrito(obj) {
    this.productos=obj.productos;
    this.timestamp=obj.timestamp;

  }
  insertarProducto(producto) {
    this.idProductos++;
    producto.id = this.idProductos | 0;
    this.productos.push(producto);
    return this.idProductos;
  }
  eliminarProducto(id) {
    const productosFiltrados = this.productos.filter(
      (producto) => producto.id !== id
    );
    this.productos = productosFiltrados;
  }
}
module.exports = Carrito;

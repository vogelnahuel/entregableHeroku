"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
class Archivo {
    constructor() {
        this.crearArchivoYsobreEscribir = (ruta, contenido) => __awaiter(this, void 0, void 0, function* () {
            const insertar = JSON.stringify(contenido, null, '\t');
            try {
                yield fs.promises.writeFile(ruta, insertar);
            }
            catch (error) {
                console.log(error);
            }
        });
        this.leerArchivo = (ruta, codificacion) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield fs.promises.readFile(ruta, codificacion);
                return (JSON.parse(data));
            }
            catch (error) {
                console.log(error);
            }
        });
        this.eliminarArchivo = (ruta) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs.promises.unlink(ruta);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = Archivo;

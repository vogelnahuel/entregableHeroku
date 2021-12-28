import Servidor from "./model/server";
import dotenv from "dotenv";
dotenv.config();

const server:Servidor = new Servidor();

server.listen();

import { Component, AfterViewInit, Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';

import { Service } from '../../../core/service/service.service';
import {map, catchError} from "rxjs/operators";

@Injectable()
export class CategoriaComprobanteService extends Service {



        constructor(private http: Http, public router: Router) {
                super(router);
        }

        getAll() {

                /*************OPTENER CABECERAS Y TOKEN PARA PETICION**************/
                let options = this.getOptionsToken();

                //this.print("peticion:"+this.rutas.API_USUARIO_REST+"/permiso/"+idUsuario+"/");

                return this.http.get(this.rutasMantenedores.API_CATEGORIA_COMPROBANTE_REST, options)
                        .pipe(map(
                        data => {
                                this.print("response:");
                                this.print(data.json());
                                if (!this.tokenInvalido(data.json())) {
                                        let res = data.json();
                                        if (res.rpta) {
                                                return res.categoriasComprobante;
                                        } else {
                                                return null;
                                        }
                                }
                        }

                        ),catchError(this.handleError));
                //.catch(this.handleError);

        }

        getAllVenta() {

                /*************OPTENER CABECERAS Y TOKEN PARA PETICION**************/
                let options = this.getOptionsToken();

                //this.print("peticion:"+this.rutas.API_USUARIO_REST+"/permiso/"+idUsuario+"/");

                return this.http.get(this.rutasMantenedores.API_CATEGORIA_COMPROBANTE_REST+"/venta/", options)
                        .pipe(map(
                        data => {
                                this.print("response:");
                                this.print(data.json());
                                if (!this.tokenInvalido(data.json())) {
                                        let res = data.json();
                                        if (res.rpta) {
                                                return res.categoriasComprobante;
                                        } else {
                                                return null;
                                        }
                                }
                        }

                        ),catchError(this.handleError));
                //.catch(this.handleError);

        }

        getAllCompra() {
                
                                /*************OPTENER CABECERAS Y TOKEN PARA PETICION**************/
                                let options = this.getOptionsToken();
                
                                //this.print("peticion:"+this.rutas.API_USUARIO_REST+"/permiso/"+idUsuario+"/");
                
                                return this.http.get(this.rutasMantenedores.API_CATEGORIA_COMPROBANTE_REST+"/compra/", options)
                                        .pipe(map(
                                        data => {
                                                this.print("response:");
                                                this.print(data.json());
                                                if (!this.tokenInvalido(data.json())) {
                                                        let res = data.json();
                                                        if (res.rpta) {
                                                                return res.categoriasComprobante;
                                                        } else {
                                                                return null;
                                                        }
                                                }
                                        }
                
                                        ),catchError(this.handleError));
                                //.catch(this.handleError);
                
        }


        registrar(parametros: any) {

                let options = this.getOptionsToken();

                return this.http.post(this.rutasMantenedores.API_CATEGORIA_COMPROBANTE_REST, parametros, options)
                        .pipe(map(
                        data => {

                                let res = data.json();
                                this.print("data:");
                                this.print(res);
                                return res;
                        }

                        )
                        ,catchError(this.handleError));

        }


        editar(parametros: any, id:any) {

                let options = this.getOptionsToken();
                return this.http.put(this.rutasMantenedores.API_CATEGORIA_COMPROBANTE_REST+ "/id_tipo_producto/" + id + "/", parametros, options)
                        .pipe(map(
                        data => {

                                let res = data.json();
                                this.print("data EDITAR PROVEEDOR:");
                                this.print(res);
                                return res;
                        }

                        )
                        ,catchError(this.handleError));

        }


        eliminarLogico(id: string) {

                let options = this.getOptionsToken();

                return this.http.delete(this.rutasMantenedores.API_CATEGORIA_COMPROBANTE_REST + "/id_tipo_producto/" + id + "/", options)
                        .pipe(map(
                        data => {
                                if (!this.tokenInvalido(data.json())) {
                                        let res = data.json();
                                        if (res != null) {
                                                return res.rpta;
                                        } else {
                                                return null;
                                        }
                                }
                        }

                        )
                        ,catchError(this.handleError));
        }


        buscarPaginacion( inicio: any, fin: any, tamPagina: any,parametros: any) {


                let options = this.getOptions();
                this.print("ruta: "+this.rutasMantenedores.API_CATEGORIA_COMPROBANTE_REST + "/inicio/" + inicio + "/fin/" + fin + "/tamPagina/" + tamPagina + "/");

                this.print("parametros : " +parametros);
               
                return this.http.post(this.rutasMantenedores.API_CATEGORIA_COMPROBANTE_REST + "/inicio/" + inicio + "/fin/" + fin + "/tamPagina/" + tamPagina + "/",parametros, options)
                        .pipe(map(
                                data => {
                                        this.print("response:");
                                        this.print(data.json());
                                        if (!this.tokenInvalido(data.json())) {
                                                let res = data.json();
                                                if (res.rpta) {
                                                        return res.tiposProductos;
                                                } else {
                                                        return null;
                                                }
                                        }
                                }
                        )
                        ,catchError(this.handleError));

        }



        getTotalParametros(parametros:any) {

                let options = this.getOptions();
                return this.http.post(this.rutasMantenedores.API_CATEGORIA_COMPROBANTE_REST + "/total/", parametros,options)
                        .pipe(map(
                        /************FILTRAR LA DATA QUE SE QUIERE ENVIAR**************** */
                        data => {
                                if (!this.tokenInvalido(data.json())) {
                                        if (data.json().rpta) {
                                                return data.json().total;
                                        } else {
                                                return null;
                                        }
                                }
                        }
                        )
                        ,catchError(this.handleError));

        }
}
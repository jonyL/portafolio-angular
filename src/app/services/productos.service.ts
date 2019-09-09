import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { Productos } from '../interfaces/productos.interface';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  producto: Productos[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
   }


  private cargarProductos() {

    return new Promise((res, rej) => {
      this.http.get('https://ionic-curso-c77c8.firebaseio.com/productos_idx.json')
          .subscribe( (resp: Producto[]) => {
            this.cargando = false;
            this.productos = resp;
            res();
          });
    });

  }

   getProducto(id: string) {
    return this.http.get(`https://ionic-curso-c77c8.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino: string) {

    if (this.productos.length === 0){
      this.cargarProductos().then( () => {
        this.filtrarProductos(termino);
      });
    } else {
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino: string) {
    termino = termino.toLocaleLowerCase();
    this.productosFiltrado = [];
    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if ( prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >=0 ) {
        this.productosFiltrado.push(prod);
      }
    });
  }


}

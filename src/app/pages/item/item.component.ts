import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { Productos } from '../../interfaces/productos.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  producto: Productos;
  id: string;
  constructor(private route: ActivatedRoute,
              private prodService: ProductosService) { }

  ngOnInit() {

    // Leer todo los parametros que pasan por el URL
    this.route.params
        .subscribe( parametros => {
          this.prodService.getProducto(parametros['id'])
          .subscribe((producto: Productos) => {
              this.producto = producto;
              this.id = parametros['id'];
          });
        });


  }

}

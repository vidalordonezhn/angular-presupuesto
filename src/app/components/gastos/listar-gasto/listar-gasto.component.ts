import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PresupuestoService } from 'src/app/services/presupuesto.service';

@Component({
  selector: 'app-listar-gasto',
  templateUrl: './listar-gasto.component.html',
  styleUrls: ['./listar-gasto.component.css']
})
export class ListarGastoComponent implements OnInit, OnDestroy {
  susbcription: Subscription;
  presupuesto: number;
  restante: number;
  listGastos: any[] = [];

  constructor(private _presupuestoService: PresupuestoService) {
    this.susbcription = this._presupuestoService.getGastos().subscribe(data => {
      console.log(data);
      this.restante = this.restante - data.cantidad;
      this.listGastos.push(data);
    })
    this.presupuesto = 0;
    this.restante = 0;
   }

  ngOnInit(): void {
    this.presupuesto = this._presupuestoService.presupuesto;
    this.restante = this._presupuestoService.restante;
  }

  ngOnDestroy(): void {
      this.susbcription.unsubscribe();
  }

  aplicarColorRestante(){
    if(this.presupuesto / 4 > this.restante){
      return 'alert alert-danger';
    }else if(this.presupuesto / 2 > this.restante){
      return 'alert alert-warning';
    }else{
      return 'alert alert-secondary'
    }
  }

}

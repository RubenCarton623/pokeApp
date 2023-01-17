import { Component, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.scss']
})
export class NavegacionComponent {
  @Output() regresar = new EventEmitter<number>();
  @Output() siguiente = new EventEmitter<number>();

  @Input() offset=0;
  @Input() limit=0;  

  @Input() skeleton = false;
  anterioresPokemones(){
    this.regresar.emit(this.offset-this.limit);
  }

  posterioresPokemones(){
    this.siguiente.emit(this.offset+this.limit);
  }
}


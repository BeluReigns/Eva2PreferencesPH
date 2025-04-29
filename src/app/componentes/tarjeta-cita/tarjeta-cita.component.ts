// IonList, IonItem, IonLabel, IonButtons, IonButton, IonIcon
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cita } from 'src/app/modelo/cita';
import { IonList, IonItem, IonLabel, IonButtons, IonButton, IonIcon } from '@ionic/angular/standalone'


@Component({
  selector: 'app-tarjeta-cita',
  templateUrl: './tarjeta-cita.component.html',
  styleUrls: ['./tarjeta-cita.component.scss'],
  standalone: true,
  imports: [IonList, IonItem, IonLabel, IonButtons, IonButton, IonIcon]
})

export class TarjetaCitaComponent {
  // recdibe la cita y un booleano para saber si debe mostrar la cita
  @Input() cita!: Cita
  @Input() mostrarEliminar: boolean = false
  @Output() eliminar = new EventEmitter<number>()

  constructor() {}

  onEliminar(): void {
    this.eliminar.emit(this.cita.id)
  }
}

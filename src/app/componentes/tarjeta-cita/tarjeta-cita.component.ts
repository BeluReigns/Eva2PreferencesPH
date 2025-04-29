import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cita } from 'src/app/modelo/cita';
import { IonList, IonItem, IonLabel, IonIcon,IonButtons, IonButton } from '@ionic/angular/standalone'
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common'


@Component({
  selector: 'app-tarjeta-cita',
  templateUrl: './tarjeta-cita.component.html',
  styleUrls: ['./tarjeta-cita.component.scss'],
  standalone: true,
  imports: [IonList, IonItem, IonLabel, IonIcon,IonButtons, IonButton, CommonModule ]
})

export class TarjetaCitaComponent {
  // recdibe la cita y un booleano para saber si debe mostrar la cita
  @Input() cita!: Cita
  @Input() mostrarEliminar: boolean = false
  @Output() eliminar = new EventEmitter<number>()

  constructor() {
    addIcons({trashOutline});
  }

  onEliminar(): void {
    this.eliminar.emit(this.cita.id)
  }
}

// IonList, IonItem, IonLabel, IonButtons, IonButton, IonIcon
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cita } from 'src/app/modelo/cita';
import { IonicModule } from '@ionic/angular'
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tarjeta-cita',
  templateUrl: './tarjeta-cita.component.html',
  styleUrls: ['./tarjeta-cita.component.scss'],
  standalone: true,
  imports: [IonicModule]
})

export class TarjetaCitaComponent {
  // recdibe la cita y un booleano para saber si debe mostrar la cita
  @Input() cita!: Cita
  @Input() mostrarEliminar: boolean = false
  @Output() eliminar = new EventEmitter<number>()

  constructor() {
    addIcons({
      trashOutline
    })
  }

  onEliminar(): void {
    this.eliminar.emit(this.cita.id)
  }
}

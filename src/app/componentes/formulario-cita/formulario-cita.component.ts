import { Component, Output, EventEmitter } from '@angular/core'
import { Cita } from 'src/app/modelo/cita'
import { IonList, IonItem, IonLabel, IonText, IonButton, IonIcon } from '@ionic/angular/standalone'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-formulario-cita',
  templateUrl: './formulario-cita.component.html',
  styleUrls: ['./formulario-cita.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonList, IonItem, IonLabel, IonText, IonButton, IonIcon ]
})
export class FormularioCitaComponent {
  nuevaCita: Omit<Cita, 'id'> = {
    frase: '',
    autor: ''
  }

  @Output() agregarCita = new EventEmitter<Omit<Cita, 'id'>>()

  constructor() {}

  onSubmit(formulario: any): void {
    if (formulario.valid) {
      this.agregarCita.emit(this.nuevaCita)
      this.nuevaCita = { frase: '', autor: '' }
      formulario.resetForm()
    }
  }
}

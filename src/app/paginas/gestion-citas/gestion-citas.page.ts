import { Component, OnInit } from '@angular/core'
import { CitasService } from 'src/app/servicios/citas.service'
import { Cita } from 'src/app/modelo/cita'
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonList, IonText } from '@ionic/angular/standalone'
import { TarjetaCitaComponent } from 'src/app/componentes/tarjeta-cita/tarjeta-cita.component'
import { FormularioCitaComponent } from 'src/app/componentes/formulario-cita/formulario-cita.component'
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'
import { addIcons } from 'ionicons'
import { homeOutline } from 'ionicons/icons'

@Component({
  selector: 'app-gestion-citas',
  templateUrl: './gestion-citas.page.html',
  styleUrls: ['./gestion-citas.page.scss'],
  standalone: true,
  imports: [CommonModule, TarjetaCitaComponent, FormularioCitaComponent, RouterLink, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonList, IonText]
})
export class GestionCitasPage implements OnInit {
  citas: Cita[] = []

  constructor(private citasService: CitasService) {
    addIcons({
      homeOutline
    })
  }

  async ngOnInit(): Promise<void> {
    await this.cargarCitas()
  }

  async cargarCitas(): Promise<void> {
    this.citas = await this.citasService.obtenerTodasLasCitas()
  }

  async agregarCita(cita: Omit<Cita, 'id'>): Promise<void> {
    await this.citasService.agregarCita(cita)
    await this.cargarCitas()
  }

  async eliminarCita(id: number): Promise<void> {
    await this.citasService.eliminarCita(id)
    await this.cargarCitas()
  }
}

import { Component, OnInit } from '@angular/core'
import { CitasService } from 'src/app/servicios/citas.service'
import { ConfiguracionService } from 'src/app/servicios/configuracion.service'
import { Cita } from 'src/app/modelo/cita'
import { TarjetaCitaComponent } from 'src/app/componentes/tarjeta-cita/tarjeta-cita.component'
import { CommonModule } from '@angular/common'
import { RouterLink } from '@angular/router'
import { addIcons } from 'ionicons'
import { settingsOutline, listOutline } from 'ionicons/icons'
import { ViewWillEnter } from '@ionic/angular'
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonText, IonFooter, IonItem } from "@ionic/angular/standalone";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonItem, IonHeader, CommonModule, TarjetaCitaComponent, RouterLink, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonContent, IonText, IonFooter]
})
export class HomePage implements OnInit, ViewWillEnter {
  citaAleatoria: Cita | null = null
  mostrarEliminar: boolean = false

  constructor(
    private citasService: CitasService,
    private configuracionService: ConfiguracionService
  ) {
    addIcons({settingsOutline,listOutline});
  }

  async ngOnInit(): Promise<void> {
    await this.cargarConfiguracion()
    await this.cargarCitaAleatoria()
  }

  async cargarConfiguracion(): Promise<void> {
    this.mostrarEliminar = await this.configuracionService.obtenerEstadoEliminar()
  }

  async cargarCitaAleatoria(): Promise<void> {
    this.citaAleatoria = await this.citasService.obtenerCitaAleatoria()
  }

  async eliminarCita(id: number): Promise<void> {
    await this.citasService.eliminarCita(id)
    await this.cargarCitaAleatoria()
  }

  async ionViewWillEnter(): Promise<void> {
    await this.cargarConfiguracion()
    await this.cargarCitaAleatoria()
  }
}

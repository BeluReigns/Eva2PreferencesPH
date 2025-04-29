import { Component, OnInit } from '@angular/core'
import { ConfiguracionService } from 'src/app/servicios/configuracion.service'
import { IonicModule } from '@ionic/angular'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router'
import { addIcons } from 'ionicons'
import { homeOutline } from 'ionicons/icons'

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule, RouterLink]
})
export class ConfiguracionPage implements OnInit {
  eliminarActivado: boolean = false

  constructor(private configuracionService: ConfiguracionService) {
    addIcons({
      homeOutline
    })
  }

  async ngOnInit(): Promise<void> {
    await this.cargarConfiguracion()
  }

  async cargarConfiguracion(): Promise<void> {
    this.eliminarActivado = await this.configuracionService.obtenerEstadoEliminar()
  }

  async cambiarEstadoEliminar(): Promise<void> {
    await this.configuracionService.guardarEstadoEliminar(this.eliminarActivado)
  }
}

import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences'

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  private readonly KEY_ELIMINAR_ACTIVADO = 'eliminar_activado'

  constructor() { }

  // guardar estadoEliminar
  async guardarEstadoEliminar(activar: boolean): Promise<void> {
    await Preferences.set({
      key: this.KEY_ELIMINAR_ACTIVADO,
      value: JSON.stringify(activar)
    })
  }

  // y recuperar si el botón eliminar debe estar activado en home o no
  async obtenerEstadoEliminar(): Promise<boolean> {
    const { value } = await Preferences.get({ key: this.KEY_ELIMINAR_ACTIVADO })
    return value ? JSON.parse(value) : false
  }
}

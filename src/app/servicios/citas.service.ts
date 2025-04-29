import { Injectable } from '@angular/core'
import { Preferences } from '@capacitor/preferences'
import { Cita } from '../modelo/cita'

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  private readonly KEY_CITAS = 'citas'
  private readonly KEY_ULTIMO_ID = 'ultimo_id'

  constructor() {}

  // para poder asignar N° iD a cada cita
  private async obtenerUltimoId(): Promise<number> {
    const { value } = await Preferences.get({ key: this.KEY_ULTIMO_ID })
    return value ? JSON.parse(value) : 0
  }

  private async actualizarUltimoId(nuevoId: number): Promise<void> {
    await Preferences.set({
      key: this.KEY_ULTIMO_ID,
      value: JSON.stringify(nuevoId)
    })
  }

  // recuperar citas
  private async obtenerCitas(): Promise<Cita[]> {
    const { value } = await Preferences.get({ key: this.KEY_CITAS })
    return value ? JSON.parse(value) : []
  }

  // guardar cita
  private async guardarCitas(citas: Cita[]): Promise<void> {
    await Preferences.set({
      key: this.KEY_CITAS,
      value: JSON.stringify(citas)
    })
  }

  // agregar cita
  async agregarCita(cita: Omit<Cita, 'id'>): Promise<void> {
    const citas = await this.obtenerCitas()
    const ultimoId = await this.obtenerUltimoId()
    const nuevoId = ultimoId + 1
    const nuevaCita: Cita = { id: nuevoId, ...cita }
    citas.push(nuevaCita)
    await this.guardarCitas(citas)
    await this.actualizarUltimoId(nuevoId)
  }

  // recuperar lista de citas
  async obtenerTodasLasCitas(): Promise<Cita[]> {
    return await this.obtenerCitas()
  }

  // eliminar cita por id
  async eliminarCita(id: number): Promise<void> {
    const citas = await this.obtenerCitas()
    const nuevasCitas = citas.filter(cita => cita.id !== id)
    await this.guardarCitas(nuevasCitas)
  }

  // cita aleatoria para el home
  async obtenerCitaAleatoria(): Promise<Cita | null> {
    const citas = await this.obtenerCitas()
    if (citas.length === 0) {
      return null
    }
    const indiceAleatorio = Math.floor(Math.random() * citas.length)
    return citas[indiceAleatorio]
  }
}

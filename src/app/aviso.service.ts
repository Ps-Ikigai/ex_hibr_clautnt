import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Aviso } from './interfaces/aviso';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvisoService {
  private avisosSubject = new BehaviorSubject<Aviso[]>([]);
  public avisos$ = this.avisosSubject.asObservable();
  private readonly STORAGE_KEY = 'avisos';

  constructor() {
    this.cargarAvisos();
  }

  async cargarAvisos(): Promise<void> {
    const { value } = await Preferences.get({ key: this.STORAGE_KEY });
    this.avisosSubject.next(value ? JSON.parse(value) : []);
  }

  async guardarAvisos(avisos: Aviso[]): Promise<void> {
    await Preferences.set({ key: this.STORAGE_KEY, value: JSON.stringify(avisos) });
    this.avisosSubject.next(avisos);
  }

  agregarAviso(aviso: Aviso): void {
    const avisosActuales = this.avisosSubject.getValue();
    aviso.fecha = new Date().toISOString();
    const nuevosAvisos = [...avisosActuales, aviso];
    this.guardarAvisos(nuevosAvisos);
  }

  async eliminarAviso(id: string): Promise<void> {
    const avisosActuales = this.avisosSubject.getValue().filter(a => a.id !== id);
    await this.guardarAvisos(avisosActuales);
  }

  obtenerAvisoPorId(id: string): Aviso | undefined {
    return this.avisosSubject.getValue().find(a => a.id === id);
  }
}
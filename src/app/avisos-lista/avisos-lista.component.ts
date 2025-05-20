import { Component, OnInit } from '@angular/core';
import { AvisoService } from '../aviso.service';
import { Aviso } from '../interfaces/aviso';
import { ModalController } from '@ionic/angular';
import { ConfirmarEliminarComponent } from '../confirmar-eliminar/confirmar-eliminar.component';

@Component({
  selector: 'app-avisos-lista',
  templateUrl: './avisos-lista.page.html',
  styleUrls: ['./avisos-lista.page.scss'],
})
export class AvisosListaPage implements OnInit {
  avisos: Aviso[] = [];

  constructor(
    private avisoService: AvisoService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.avisoService.avisos$.subscribe(avisos => {
      this.avisos = avisos;
    });
  }

  async confirmarEliminacion(aviso: Aviso) {
    const modal = await this.modalCtrl.create({
      component: ConfirmarEliminarComponent,
      componentProps: {
        aviso
      }
    });
    await modal.present();

    const { data, role } = await modal.onDidDismiss();
    if (role === 'confirm') {
      this.eliminarAviso(aviso.id);
    }
  }

  eliminarAviso(id: string) {
    this.avisoService.eliminarAviso(id);
  }
}


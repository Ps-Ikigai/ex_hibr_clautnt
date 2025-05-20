import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Aviso } from '../interfaces/aviso';

@Component({
  selector: 'app-confirmar-eliminar',
  templateUrl: './confirmar-eliminar.component.html',
  styleUrls: ['./confirmar-eliminar.component.scss'],
})
export class ConfirmarEliminarComponent implements OnInit {
  @Input() aviso!: Aviso;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  confirmar() {
    this.modalCtrl.dismiss(null, 'confirm');
  }

  cancelar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
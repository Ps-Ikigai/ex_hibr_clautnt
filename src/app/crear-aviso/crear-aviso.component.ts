import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvisoService } from '../aviso.service';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-crear-aviso',
  templateUrl: './crear-aviso.page.html',
  styleUrls: ['./crear-aviso.page.scss'],
})
export class CrearAvisoPage implements OnInit {
  formularioAviso: FormGroup;
  imagenCapturada: string | undefined;

  constructor(
    private fb: FormBuilder,
    private avisoService: AvisoService,
    private router: Router
  ) {
    this.formularioAviso = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(20)]],
      imagen: ['']
    });
  }

  ngOnInit() {
  }

  async tomarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });
      this.imagenCapturada = image.dataUrl;
      this.formularioAviso.patchValue({ imagen: this.imagenCapturada });
    } catch (error) {
      console.error('Error al tomar la foto', error);
    }
  }

  guardarAviso() {
    if (this.formularioAviso.valid) {
      const nuevoAviso = { ...this.formularioAviso.value, id: Date.now().toString() };
      this.avisoService.agregarAviso(nuevoAviso);
      this.router.navigate(['/avisos']);
    } else {
      // Marcar los controles como tocados para mostrar los errores
      Object.keys(this.formularioAviso.controls).forEach(key => {
        this.formularioAviso.get(key)?.markAsTouched();
      });
    }
  }
}
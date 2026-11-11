import {inject, Service} from '@angular/core';
import {ToastController} from "@ionic/angular";

@Service()
export class ToastService {
  private readonly toastController: ToastController = inject(ToastController);

  async mostrarToast(color: string, message: string) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000,
      position: 'middle'
    });
    await toast.present();
  }
}

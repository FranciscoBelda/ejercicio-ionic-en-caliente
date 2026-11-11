import {Component, inject, input, model, OnInit, output} from '@angular/core';
import {CharacterGoT} from "../../common/models/game-of-thrones.model";
import {
  IonBadge, IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonContent,
  IonFooter, IonIcon,
  IonModal,
  IonTitle,
  IonToolbar
} from "@ionic/angular";
import {addIcons} from "ionicons";
import {save, close} from "ionicons/icons";
import {ToastService} from "../../services/toast-service";

@Component({
  selector: 'app-got-modal',
  templateUrl: './got-modal.component.html',
  styleUrls: ['./got-modal.component.scss'],
  imports: [
    IonModal,
    IonFooter,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardContent,
    IonBadge,
    IonButtons,
    IonButton,
    IonIcon
  ],
})
export class GotModalComponent implements OnInit {
  char = input.required<CharacterGoT>();
  favoriteChars = model.required<CharacterGoT[]>();
  private readonly toastService: ToastService = inject(ToastService);
  constructor() {
    addIcons({save, close});
  }

  ngOnInit() {}

  onWillDismiss(event: CustomEvent) {
    if (event.detail.role === "save") {
      this.favoriteChars.update(chars => {
        if(chars.find(char => char.id === this.char().id)){
          return chars;
        }
        this.toastService.mostrarToast('success', this.char().fullName + ' added to favorites!');
        return [...chars, this.char()]
      });
    }
    if (event.detail.role === "cancel") {
      this.toastService.mostrarToast('danger', 'Canceling...');
    }
  }
}

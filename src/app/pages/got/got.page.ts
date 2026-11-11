import {Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar,
  IonBadge,
  IonContent, IonFab, IonFabButton, IonFabList,
  IonHeader, IonIcon,
  IonItem, IonItemOption, IonItemOptions, IonItemSliding,
  IonLabel,
  IonList, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular';
import {GotService} from "../../services/got-service";
import {toSignal} from "@angular/core/rxjs-interop";
import {GotModalComponent} from "../../components/got-modal/got-modal.component";
import {CharacterGoT} from "../../common/models/game-of-thrones.model";
import {addIcons} from "ionicons";
import {add, logoIonitron, trash} from "ionicons/icons";
import {ToastService} from "../../services/toast-service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-got',
  templateUrl: './got.page.html',
  styleUrls: ['./got.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonAvatar, IonLabel, IonBadge, GotModalComponent, IonText, IonItemSliding, IonItemOptions, IonItemOption, IonIcon, IonFab, IonFabButton, IonFabList, RouterLink],
})
export class GotPage implements OnInit {
  private readonly gotService: GotService = inject(GotService);
  private readonly toastService: ToastService = inject(ToastService);
  characters = toSignal(this.gotService.getCharacters());
  favoriteChars = signal<CharacterGoT[]>([]);


  constructor() {
    addIcons({trash, add, logoIonitron})
  }

  ngOnInit() {}

  deleteFav(fav: CharacterGoT) {
    this.favoriteChars.update(chars => chars.filter(char => char.id !== fav.id));
    this.toastService.mostrarToast('danger', fav.fullName + 'deleted from Favorites');
  }
}

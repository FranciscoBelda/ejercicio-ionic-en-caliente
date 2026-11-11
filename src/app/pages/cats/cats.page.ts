import {Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonHeader, IonIcon,
  IonItemDivider,
  IonTitle,
  IonToolbar
} from '@ionic/angular';
import {RouterLink} from "@angular/router";
import {DogService} from "../../services/dog-service";
import {addIcons} from "ionicons";
import {logoGitlab} from "ionicons/icons";

@Component({
  selector: 'app-cats',
  templateUrl: './cats.page.html',
  styleUrls: ['./cats.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, RouterLink, IonCard, IonCardContent, IonItemDivider, IonIcon],
})
export class CatsPage implements OnInit {
  private readonly dogService: DogService = inject(DogService);
  catFact = signal<string>('');
  constructor() {
    addIcons({logoGitlab})
  }

  ngOnInit() {
    this.loadCatFact();
  }

  protected loadCatFact() {
    this.dogService.getCatFact().subscribe(
      {
        next: res => {
          this.catFact.set(res.data[0]);
        }
      }
    )
  }
}

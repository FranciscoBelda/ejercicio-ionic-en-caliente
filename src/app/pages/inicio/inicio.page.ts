import {Component, inject, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonButton, IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/angular';
import {DogService} from "../../services/dog-service";
import {DogModel} from "../../common/models/dog.model";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, RouterLink],
})
export class InicioPage implements OnInit {
  private readonly dogService: DogService = inject(DogService);
  dog = signal<DogModel>({message: '', status: 'success'});

  constructor() {}

  ngOnInit() {
    this.loadDog();
  }

  private loadDog() {
    this.dogService.getDog().subscribe(
      {
        next: res => {
          this.dog.set(res);
        }
      }
    )
  }
}

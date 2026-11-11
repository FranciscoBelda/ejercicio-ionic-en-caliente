import {Component, inject, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  InfiniteScrollCustomEvent,
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader, IonInfiniteScroll, IonInfiniteScrollContent,
  IonTitle,
  IonToolbar
} from '@ionic/angular';
import {RmService} from "../../services/rm-service";
import {CharacterRM, Info} from "../../common/models/rm-characters.model";

@Component({
  selector: 'app-rm-characters',
  templateUrl: './rm-characters.page.html',
  styleUrls: ['./rm-characters.page.scss'],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonBadge, IonInfiniteScroll, IonInfiniteScrollContent],
})
export class RmCharactersPage implements OnInit {
  private readonly rmService: RmService = inject(RmService);
  characters = signal<CharacterRM[]>([]);
  info = signal<Info | undefined>(undefined);
  currentPage = signal<number>(1);

  constructor() {}

  ngOnInit() {
    this.loadCharacters();
  }

  private loadCharacters() {
    this.rmService.getCharacters(this.currentPage()).subscribe(
      {
        next: res => {
          this.characters.set(res.results);
          this.info.set(res.info);
        },
        error: err => {
          console.error(err);
        }
      }
    )
  }

  loadMore(event: InfiniteScrollCustomEvent) {
     this.currentPage.update(pag => pag +1);
     this.rmService.getCharacters(this.currentPage()).subscribe(
       {
         next: res => {
           this.characters.update(chars => [...chars, ... res.results]);
           if (res.info.pages === this.currentPage()){
             event.target.complete();
             event.target.disabled = true;
           }else {
             event.target.complete();
           }
         },
         error: err => {
           console.error(err)
         }
       }
     )
  }
}

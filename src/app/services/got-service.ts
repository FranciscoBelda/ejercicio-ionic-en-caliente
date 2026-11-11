import {inject, Service} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of} from "rxjs";
import {CharacterGoT} from "../common/models/game-of-thrones.model";
import {environment} from "../../environments/environment";

@Service()
export class GotService {
  private readonly httpClient: HttpClient = inject(HttpClient);

  getCharacters(): Observable<CharacterGoT[]>{
    return this.httpClient.get<CharacterGoT[]>(
        environment.URLBaseGoT
    ).pipe(
      catchError(error => {
        console.error(error);
        return of([])
      })
    )
  }
}

import {inject, Service} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CatFact, DogModel} from "../common/models/dog.model";
import {environment} from "../../environments/environment";

@Service()
export class DogService {
  private readonly httpClient: HttpClient = inject(HttpClient);

  getDog(): Observable<DogModel>{
    return this.httpClient.get<DogModel>(
      environment.URLBaseDog
    )
  }

  getCatFact(): Observable<CatFact>{
    return this.httpClient.get<CatFact>(
      environment.URLBaseCat
    )
  }
}

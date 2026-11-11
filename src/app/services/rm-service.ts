import {inject, Service} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiResponseRM} from "../common/models/rm-characters.model";
import {environment} from "../../environments/environment";

@Service()
export class RmService {
  private readonly httpClient: HttpClient = inject(HttpClient);

  getCharacters(page: number): Observable<ApiResponseRM>{
    return this.httpClient.get<ApiResponseRM>(
        environment.URLBaseRM + '/character?page='+ page,
    )
  }
}

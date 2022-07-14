import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { map,  } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { SearchInterface } from '@interfaces/search.interface';
import { UserCollection } from '@models/user-collection';
import { User } from '@models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  // will get users based on the search interface filter
  getList(query: SearchInterface): Observable<UserCollection> {
    const params = this.prepareHttpParams(query);
    return this.httpClient.get<any>(environment.apiUrl + '/search/users', {params})
    .pipe(map(data => {
      const users: User[] = data.items.map(
        (user: any) => new User(
          user.id, user.login,
          user.avatar_url, user.html_url,
          user.site_admin,
          user.score
        )
      );
      return new UserCollection(
        users, data.total_count
      );
    })); 
  }

  // prepare the params accepted by the API.
  private prepareHttpParams(attributes: SearchInterface): HttpParams {
    return new HttpParams()
    .set('q', attributes.text).set('page', attributes.page || 1)
    .set('per_page', attributes.perPage || 30).set('sort', attributes.sort);
  }
}

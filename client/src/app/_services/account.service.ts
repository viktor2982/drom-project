import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from "rxjs/operators";
import { environment } from '@environment/environment';
import { User } from '@app/_models/user.model';

@Injectable()
export class AccountService {

  private baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>( 1 );
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login( model: any ) {
    return this.http.post( `${ this.baseUrl }account/login`, model )
      .pipe(
        map(
          (user: User) => {
            if ( user ) {
              this.setCurrentUser( user );
            }
            // return user;
          }
        )
      );
  }

  setCurrentUser( user: User ) {
    if ( user ) {
      user.roles = [];
      const roles = this.getDecodedToken( user.token ).role;
      Array.isArray( roles ) ? user.roles = roles : user.roles.push( roles );
      // console.log( user.roles );
    }
    localStorage.setItem( 'user', JSON.stringify( user ));
    this.currentUserSource.next( user );
  }

  logout() {
    localStorage.removeItem( 'user' );
    this.setCurrentUser( null );
  }

  getDecodedToken( token: string ) {
    return JSON.parse( atob( token.split( '.' )[ 1 ] ) );
  }
}

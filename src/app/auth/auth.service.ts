import { Injectable } from '@angular/core';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private localStorage: StorageService) { }

  public isAuthenticated(): boolean {
    const user = this.localStorage.getData('user');
    // true or false
    return ((user !== null) && (Object.keys(user).length !== 0))
  }

}

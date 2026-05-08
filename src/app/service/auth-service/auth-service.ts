import { Token } from './token';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly tokenKey = "bomboplats_token"

  grantAccess() {
    const token: Token = new Token()
    localStorage.setItem(this.tokenKey, token.toString())
    console.log("Sesion iniciada con token " + token.sessionId)
  }

  getToken(): Token | null {
    const tokenJson = localStorage.getItem(this.tokenKey)
    return this.isLogged() ? Token.fromJson(tokenJson!) : null;
  }

  isLogged(): boolean {
    this.updateAccess();
    let tokenJson = localStorage.getItem(this.tokenKey)
    return tokenJson != null && tokenJson != undefined && Token.isValid(Token.fromJson(tokenJson))
  }

  updateAccess() {
    const tokenJson = localStorage.getItem(this.tokenKey)
    if (tokenJson) {
      const token : Token = Token.fromJson(tokenJson)
      if (!Token.isValid(token)) {
        localStorage.removeItem(this.tokenKey)
        console.log("Eliminando token expirado")
      }
    }
  }

  revokeAccess() {
    localStorage.removeItem(this.tokenKey)
  }

}

import { UserRegister } from '../../../api/model/userRegister';
import { Component, Inject } from '@angular/core';
import { UserControllerService } from '../../../api';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-user-adder',
  imports: [FormsModule],
  templateUrl: './user-adder.html',
  styleUrl: '../adders-style.css',
})
export class UserAdder {

  nickname: string = "";
  email: string = "";
  password: string = "";

  constructor(@Inject(UserControllerService) private userService: UserControllerService) {}

  registerUser(): void {

    if (this.verificarDatos()) {

      const register: UserRegister = { nickname: this.nickname, email: this.email, password: this.password };

      this.userService.registerUser(register).subscribe(
        {
          next: function(success) {
            if (success) {
              alert("Se ha registrado el usuario");
            } else {
              alert("No se ha podido guardar el usuario")
            }
          },
          error: function (err) {
            alert("Se ha producido un error con el servidor! Mira la consola del navegador")
            console.error(err)
          },
          complete: function () {
            // se completo jeje
          }
        }
      )
    } else {
      alert("Los datos introducidos no son validos!")
    }


  }

  verificarDatos(): boolean | null {
    let nickCorrecto = this.nickname.length <= 16
    let emailCorrecto = this.email.match(/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/)
    let passwordCorrecto = this.password.length > 4

    return nickCorrecto && emailCorrecto && passwordCorrecto;
  }

}

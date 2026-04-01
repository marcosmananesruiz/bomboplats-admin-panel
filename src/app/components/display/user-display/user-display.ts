import { UserControllerService } from '../../../api/api/userController.service';
import { User } from '../../../api/model/user';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementDisplay } from '../element-display/element-display';

@Component({
  selector: 'app-user-display',
  imports: [CommonModule],
  templateUrl: './user-display.html',
  styleUrl: './user-display.css',
})
export class UserDisplay extends ElementDisplay implements OnInit{
  users: User[] = [];

  constructor(
    @Inject(UserControllerService) private userService: UserControllerService,
    private cdr: ChangeDetectorRef
  ) {super()}

  ngOnInit(): void {
    this.userService.findAll().subscribe({
      next: (data) => {
        this.users = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err)
        this.error = true;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      complete: () => {
        this.cargando = false;
        this.cdr.detectChanges();
        if (this.users.length === 0) {
          this.empty = true;
        }
      }
    })
  }
}

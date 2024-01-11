import { Component, OnInit } from '@angular/core';
import { IUser } from '@shared/interfaces/user.interface';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  users!: IUser[];
  selectedUser!: IUser;

  constructor(private _userService: UserService) {}

  ngOnInit() {
    this._userService.listUsers().subscribe({
      next: (res) => {
        this.users = res.result;
      },
      error: console.error,
    });
  }
  check() {
    console.log(this.selectedUser);
  }
}

import { Component, OnInit } from '@angular/core';
import { IUser } from '@shared/interfaces/user.interface';
import { UserService } from '@shared/services/user.service';
import { Router } from '@angular/router';
import { DashboardStore } from './dashboard.store';
import { HabitsService } from '@shared/services/habit.service';
import { HabitRegistryService } from '@shared/services/habitRegistry.service';
import { MoodRegistryService } from '@shared/services/moodRegistry.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  users!: IUser[];
  selectedUser!: IUser;

  constructor(
    private _userService: UserService,
    private _habitService: HabitsService,
    private _habitRegistryService: HabitRegistryService,
    private _moodRegistryService: MoodRegistryService,
    private router: Router,
    private _dashboardStore: DashboardStore
  ) {}

  ngOnInit() {
    this._userService.listUsers().subscribe({
      next: (res) => {
        this.users = res.result;
        this._dashboardStore.users = this.users;
      },
      error: console.error,
    });
  }

  updateSelectedUser() {
    this._dashboardStore.selectedUser = this.selectedUser;
    //get all registries
    if (this.selectedUser) {
      //get habits
      this._habitService.listHabits(this.selectedUser.id).subscribe({
        next: (res) => {
          this._dashboardStore.habits = res.result;
        },
        error: console.error,
      });
      //get habit registries
      this._habitRegistryService
        .listHabitRegistries(this.selectedUser.id)
        .subscribe({
          next: (res) => {
            this._dashboardStore.habitRegistries = res.result;
          },
        });
      // get moods
      this._moodRegistryService
        .listMoodRegistries(this.selectedUser.id)
        .subscribe({
          next: (res) => {
            this._dashboardStore.moodRegistries = res.result;
          },
        });
    }
  }

  navigate(path: string) {
    this.router.navigateByUrl(`/dashboard/${path}`);
  }
}

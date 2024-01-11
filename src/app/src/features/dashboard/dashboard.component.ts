import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  users: any[] = [];

  ngOnInit() {
    this.users = [
      { id: 1, name: 'javo' },
      { id: 2, name: 'irener' },
    ];
  }
}

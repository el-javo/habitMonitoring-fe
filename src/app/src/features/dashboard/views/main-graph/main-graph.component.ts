import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardStore } from '@features/dashboard/dashboard.store';
import { ChartOptions } from '@shared/apex-charts/apex.interfaces';
import { IHabit, IHabitRegistry } from '@shared/interfaces/habit.interface';
import { IMoodRegistry } from '@shared/interfaces/mood.interface';
import { chartConfig, primeBoilerData } from './config/chart.config';
import { format } from 'date-fns';
import { getDay } from 'date-fns';
import { ChartComponent } from 'ng-apexcharts';

@Component({
  selector: 'app-main-graph',
  templateUrl: './main-graph.component.html',
  styleUrl: './main-graph.component.scss',
})
export class MainGraphComponent implements OnInit {
  habits!: IHabit[];
  habitsMap: Map<number, IHabit> = new Map();
  habitRegistries!: IHabitRegistry[];
  moodRegistries!: IMoodRegistry[];
  wait = false;
  dataRegistriesMap: Map<
    string,
    { habits: IHabitRegistry[]; mood?: IMoodRegistry }
  > = new Map<string, { habits: IHabitRegistry[]; mood?: IMoodRegistry }>();
  chartOptions: ChartOptions = chartConfig;
  primeData = primeBoilerData;
  @ViewChild('apexChart') apexChart!: ChartComponent;
  showChart = true;
  constructor(private _dashboardStore: DashboardStore) {}

  ngOnInit(): void {
    this.setupSubscribers();
  }

  updateCharts() {
    if (this.wait) return;
    //refill the DataMap
    this.refillDataMap();
    // this.updateBasicChartSeries();
    this.updatePrimeBasicChart();
  }

  updateBasicChartSeries() {
    const series = [...this.dataRegistriesMap.keys()].map((date) => {
      const register = this.dataRegistriesMap.get(date);
      const habitValue = register?.habits.reduce(
        (acc, curr) =>
          acc + curr.value * this.habitsMap.get(curr.habitId)?.weight!,
        0
      ); //sum total habits
      const habitMax = this.habits.reduce((acc, curr) => {
        if (curr.weekDays.includes(((getDay(new Date(date)) + 6) % 7) + 1)) {
          //sorry for this but i work w [1-7] 1 = monday and datefns [0-6]  0 = sunday
          return acc + curr.weight;
        }
        return acc;
      }, 0);
      const moodValue = register?.mood?.value;
      const habitRegData = { x: date, y: habitValue };
      const maxRegData = { x: date, y: habitMax };
      const moodRegData = { x: date, y: moodValue };
      return { habitRegData, moodRegData, maxRegData };
    });
    const newHabitSeries = series.map((s) => s.habitRegData);
    const newMaxSeries = series.map((s) => s.maxRegData);
    const newMoodSeries = series.map((s) => s.moodRegData);
    this.chartOptions.series![0].data = newHabitSeries;
    this.chartOptions.series![1].data = newMaxSeries;
    // this.chartOptions.series![2].data = newMoodSeries; //TODO include mood
    this.apexChart.updateSeries(this.chartOptions.series!, true);
  }

  updatePrimeBasicChart() {
    const data = [...this.dataRegistriesMap.keys()].map((date) => {
      const register = this.dataRegistriesMap.get(date);
      const habitValue = register?.habits.reduce(
        (acc, curr) =>
          acc + curr.value * this.habitsMap.get(curr.habitId)?.weight!,
        0
      ); //sum total habits
      const habitMax = this.habits.reduce((acc, curr) => {
        if (curr.weekDays.includes(((getDay(new Date(date)) + 6) % 7) + 1)) {
          //sorry for this but i work w [1-7] 1 = monday and datefns [0-6]  0 = sunday
          return acc + curr.weight;
        }
        return acc;
      }, 0);
      const moodValue = register?.mood?.value;

      return { habitValue, habitMax, moodValue, date };
    });
    const habitData = data.map((d) => d.habitValue);
    const maxHabitData = data.map((d) => d.habitMax);
    const moodData = data.map((d) => d.moodValue);
    const labels = data.map((d) => d.date);
    this.primeData.labels = labels;
    this.primeData.datasets[0].data = habitData;
    this.primeData.datasets[1].data = maxHabitData;
    this.primeData.datasets[2].data = moodData;
    this.refreshPChart();
  }

  refreshPChart() {
    this.showChart = false;
    setTimeout(() => {
      this.showChart = true;
    });
  }

  refillDataMap() {
    this.dataRegistriesMap.clear();
    this.habitRegistries.forEach((hr) => {
      const hrDate = new Date(hr.date);
      const stringDate = format(hrDate, 'MM-dd-yyyy');
      const dateReg = this.dataRegistriesMap.get(stringDate);
      if (!dateReg) {
        this.dataRegistriesMap.set(stringDate, { habits: [hr] });
      } else {
        dateReg.habits.push(hr);
        this.dataRegistriesMap.set(stringDate, dateReg);
      }
    });
    this.moodRegistries.forEach((mr) => {
      const mrDate = new Date(mr.date);
      const stringDate = format(mrDate, 'MM-dd-yyyy');
      const dateReg = this.dataRegistriesMap.get(stringDate);
      if (!dateReg) {
        this.dataRegistriesMap.set(stringDate, { habits: [], mood: mr });
      } else {
        dateReg.mood = mr;
      }
    });
  }

  setupSubscribers() {
    this._dashboardStore.habitsRegistries$.subscribe({
      next: (res) => {
        this.habitRegistries = res as IHabitRegistry[];
        this.wait = !this.wait;
        this.updateCharts();
      },
    });
    this._dashboardStore.moodRegistries$.subscribe({
      next: (res) => {
        this.wait = !this.wait;
        this.moodRegistries = res as IMoodRegistry[];
      },
    });
    this._dashboardStore.habits$.subscribe({
      next: (res) => {
        this.habits = res as IHabit[];
        this.habitsMap.clear();
        this.habits.forEach((h) => {
          this.habitsMap.set(h.id, h);
        });
      },
    });
  }
}

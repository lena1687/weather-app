import { Component, Input, OnInit } from '@angular/core';
import { IWeatherDataParams } from '../../../../../services/weather.data.service';
import {
  DayNames,
  DayNamesType,
  MonthNames,
  MonthNamesType,
} from '../../../../shared/enums/dateData.enum';

@Component({
  selector: 'app-forecast-widget',
  templateUrl: './forecast-widget.component.html',
  styleUrls: ['./forecast-widget.component.sass'],
})
export class ForecastWidgetComponent implements OnInit {
  @Input() forecastData: IWeatherDataParams[] = [];

  ngOnInit(): void {
    this.initWidget();
  }

  initWidget(): void {
    this.getAverageTemp();
  }

  getDateInfo(): string {
    const firstPeriodDate = new Date(this.forecastData[0].date);
    const lastPeriodDate = new Date(this.forecastData[6].date);
    const monthNames = Object.keys(MonthNames) as MonthNamesType[];

    const firstPeriodMonth = monthNames[firstPeriodDate.getMonth()];
    const lastPeriodMonth = monthNames[lastPeriodDate.getMonth()];

    const firstPeriodDay = firstPeriodDate.getDate();
    const lastPeriodDay = lastPeriodDate.getDate();

    const year = lastPeriodDate.getFullYear();
    const isSameMonth = firstPeriodMonth === lastPeriodMonth;

    return `${firstPeriodMonth} ${firstPeriodDay} - ${
      isSameMonth ? '' : lastPeriodMonth
    } ${lastPeriodDay} ${year}`;
  }

  getAverageTemp(): number {
    const tempList = this.forecastData.map(({ value }) => value);
    const result =
      tempList.reduce((acc, currentValue) => acc + currentValue, 0) /
      tempList.length;
    return Math.round(result);
  }

  getWeekDay(date: string): string {
    const day = new Date(date).getDay();
    const daysNames = Object.keys(DayNames) as DayNamesType[];
    return DayNames[daysNames[day]].toUpperCase();
  }
}

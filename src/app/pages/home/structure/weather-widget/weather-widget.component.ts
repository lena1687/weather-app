import { Component, HostBinding } from '@angular/core';
import { IWeatherDataParams } from '../../../../../services/weather.data.service';
import { LoaderService } from '../../../../../services/loader.service';

@Component({
  selector: 'app-weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.sass'],
})
export class WeatherWidgetComponent {
  @HostBinding('style.--app-weather-widget-background')
  gradientBackground: string = 'linear-gradient(#00000000, #00000000)';
  weatherData: IWeatherDataParams[] = [];
  isWeatherLoaded: boolean = false;
  colorsArray: string[] = [
    '#102F7E',
    '#0C8DD6',
    '#1AA0EC',
    '#60C6FF',
    '#9BDBFF',
    '#B4DEDA',
    '#FFD66B',
    '#FFC178',
    '#FE9255',
    '#FE7A55',
  ];
  minTemperature = -40;
  maxTemperature = 40;

  constructor(public loaderContentService: LoaderService) {}

  ngOnInit(): void {
    this.loaderContentService.isLoading$.subscribe((isLoading: boolean) => {
      this.isWeatherLoaded = isLoading;
    });
  }

  forecastData(data: IWeatherDataParams[]): void {
    this.weatherData = data;
    this.calculateGradient();
    if (this.weatherData.length > 0) {
      this.loaderContentService.show();
      //setTimeout just to demonstrate app-loader operation
      setTimeout(() => {
        this.loaderContentService.hide();
      }, 1000);
    }
  }

  calculateGradient(): void {
    const temperatures = this.weatherData.map((data) => data.value);
    if (temperatures.length === 0) {
      this.gradientBackground = 'linear-gradient(to bottom, white, white)';
      return;
    }
    const colorStops = temperatures.map((temp) => {
      const index = Math.round(
        ((temp - this.minTemperature) /
          (this.maxTemperature - this.minTemperature)) *
          (this.colorsArray.length - 1),
      );
      return this.colorsArray[index];
    });
    this.gradientBackground = `linear-gradient(to right, ${colorStops.join(
      ', ',
    )})`;
  }
}

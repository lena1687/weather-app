import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface IWeatherData {
  data: Array<{
    coordinates: Array<{
      dates: Array<IWeatherDataParams>;
      lat: number;
      lon: number;
    }>;
    parameter: string;
  }>;
  dateGenerated: string;
  status: string;
  user: string;
  version: string;
}

export interface IWeatherDataParams {
  date: string;
  value: number;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  private apiUrl = environment.weatherApiUrl;

  constructor(private http: HttpClient) {}

  getWeather(
    code: string | number,
    isoCurrentDate: string,
  ): Observable<IWeatherData> {
    const periodStep = 'P9D:P1D';
    const unitsParam = 't_2m:C';
    const formatParam = 'json';
    const params = `${isoCurrentDate}${periodStep}/${unitsParam}/${code}/${formatParam}`;

    return this.http.get<IWeatherData>(`${this.apiUrl}${params}`, {
      headers: {
        authorization: `Basic ${environment.weatherApiKey}`,
      },
    });
  }
}

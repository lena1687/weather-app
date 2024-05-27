import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface IIGeoData {
  documentation: string;
  licenses: { name: string };
  results: Array<IGeoResultData>;
}

export interface IGeoResultData {
  annotations: Record<string, number>;
  bounds: Record<string, number>;
  components: Record<string, any>;
  confidence: number;
  formatted: string;
  geometry: { lat: number; lng: number };
}

@Injectable({
  providedIn: 'root',
})
export class GeoDataService {
  private apiUrl = environment.geoApiUrl;

  constructor(private http: HttpClient) {}

  getLists(input: string, limit?: number): Observable<IIGeoData> {
    return this.http.get<IIGeoData>(this.apiUrl, {
      params: { location: input, language: 'en', limit: limit || 8 },
    });
  }
}

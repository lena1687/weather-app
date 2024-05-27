import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  GeoDataService,
  IIGeoData,
} from '../../../../../services/geo.data.service';
import {
  CountryCodes,
  CountryCodeType,
} from '../../../../shared/enums/countryCodes.enum';
import { MatSelectChange } from '@angular/material/select';
import { FormControl, Validators } from '@angular/forms';
import {
  IWeatherDataParams,
  WeatherDataService,
} from '../../../../../services/weather.data.service';
import { IOption } from '../../../../components/autocomplete/autocomplete.component';

export interface ICountryList {
  code: string;
  value: string;
  iconClass?: string;
}

export interface ICityList {
  code: string;
  value: string;
}

@Component({
  selector: 'app-search-panel',
  templateUrl: './search-panel.component.html',
  styleUrls: ['./search-panel.component.sass'],
})
export class SearchPanelComponent implements OnInit {
  @Output() weatherData = new EventEmitter<IWeatherDataParams[]>();
  countries: ICountryList[] = [];
  cityList: ICityList[] = [];
  autocompleteControl = new FormControl(
    { value: '', disabled: true },
    Validators.required,
  );
  selectedCountryCode: CountryCodeType;
  isLoadingCityList = false;

  constructor(
    private geoDataService: GeoDataService,
    private weatherDataService: WeatherDataService,
  ) {}

  ngOnInit(): void {
    this.initCountries();
  }
  initCountries(): void {
    this.countries = Object.keys(CountryCodes)
      .map((key): ICountryList => {
        return {
          code: CountryCodes[key as CountryCodeType],
          value: key,
          iconClass: `fi fi-${key.toLowerCase()}`,
        };
      })
      .sort((a, b) => a.value.localeCompare(b.value));
  }

  selectedCountry(option: MatSelectChange): void {
    this.autocompleteControl.enable();
    this.autocompleteControl.setValue('');
    this.weatherData.emit([]);
    this.cityList = [];
    this.selectedCountryCode = option.value;
  }

  changeLocation(input: string): void {
    this.weatherData.emit([]);
    this.geoDataService
      .getLists(`${this.selectedCountryCode},${input}`)
      .subscribe((response: IIGeoData) => {
        this.isLoadingCityList = true;
        //setTimeout just to demonstrate loader operation
        setTimeout(() => {
          this.isLoadingCityList = false;
          this.cityList = response.results.map(({ formatted, geometry }) => {
            return {
              code: `${geometry.lat},${geometry.lng}`,
              value: formatted,
            };
          });
        }, 100);
      });
  }

  selectedLocation({ code }: IOption): void {
    const isoCurrentDate = new Date().toISOString();
    this.weatherDataService
      .getWeather(code, isoCurrentDate)
      .subscribe((response) => {
        this.weatherData.emit(response.data[0].coordinates[0].dates);
      });
  }
}

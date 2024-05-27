import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { SearchPanelComponent } from './pages/home/structure/search-panel/search-panel.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { GeoDataService } from '../services/geo.data.service';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOptimizedImage } from '@angular/common';
import { SelectComponent } from './components/select/select.component';
import { WeatherDataService } from '../services/weather.data.service';
import { ForecastWidgetComponent } from './pages/home/structure/forecast-widget/forecast-widget.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from '../services/loader.service';
import { IconComponent } from './components/icon/icon.component';
import { WeatherWidgetComponent } from './pages/home/structure/weather-widget/weather-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AutocompleteComponent,
    SelectComponent,
    LoaderComponent,
    IconComponent,
    SearchPanelComponent,
    ForecastWidgetComponent,
    WeatherWidgetComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
  ],
  bootstrap: [AppComponent],
  providers: [
    GeoDataService,
    WeatherDataService,
    LoaderService,
    provideAnimationsAsync(),
  ],
})
export class AppModule {}

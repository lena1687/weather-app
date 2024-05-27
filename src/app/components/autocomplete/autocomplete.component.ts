import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatAutocompleteSelectedEvent,
  MatOption,
} from '@angular/material/autocomplete';

export interface IOption {
  code: string | number;
  value: string | number;
  icon?: string;
}

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.sass'],
})
export class AutocompleteComponent {
  @Input() options: IOption[] = [];
  @Input() autocompleteControl: FormControl;
  @Input() isLoadingList: boolean = false;
  @Input() placeholder: string = 'Please enter a value';
  @Output() inputValue = new EventEmitter<string>();
  @Output() optionSelected = new EventEmitter<IOption>();

  displayFn(option: IOption): string {
    return option ? option.value.toString() : '';
  }

  onInputChange(event: Event): void {
    const inputTarget = event.target as HTMLInputElement;
    this.inputValue.emit(inputTarget.value);
  }

  selectOption(event: MatAutocompleteSelectedEvent): void {
    const option = event.option as MatOption;
    this.optionSelected.emit(option.value);
  }
}

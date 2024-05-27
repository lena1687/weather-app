import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { FormControl } from '@angular/forms';

interface IOption {
  code: string | number;
  value: string | number;
  iconClass?: string;
}
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.sass'],
})
export class SelectComponent {
  @Input() label?: string;
  @Input() options: IOption[] = [];
  @Output() optionSelected = new EventEmitter<MatSelectChange>();
  classOfSelectedValue: IOption['iconClass'] = '';
  optionsList = new FormControl();

  onSelectionChange(event: MatSelectChange): void {
    this.optionSelected.emit(event);
    this.classOfSelectedValue = this.options.find((option) => {
      return option.value === event.value;
    })?.iconClass;
  }
}

import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.sass'],
})
export class IconComponent {
  @HostBinding('style.--app-icon-size')
  @Input()
  size: number = 24;
  @Input() imagePath: string;
  @Input() alt: string;
}

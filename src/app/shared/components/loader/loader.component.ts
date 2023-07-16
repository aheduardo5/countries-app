import { Component, Input } from '@angular/core';
import { CountriesService } from '../../../countries/services/countries.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent {
  @Input() public loadComponent: boolean = true;
  constructor(public countriesService: CountriesService) {}
}

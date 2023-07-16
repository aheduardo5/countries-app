import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [],
})
export class ByCapitalPageComponent {
  public countries: Country[] = [];
  public isLoading: boolean = false;
  public initialValue?: string; 
  constructor(private countriesService: CountriesService) {}

  ngOnInit(){
    this.countries = this.countriesService.cashStore.byCapital.countries;
    this.initialValue = this.countriesService.cashStore.byCapital.term;
  }
  searchByCapital(term: any): void {
    this.isLoading = true;
    this.countriesService.searchCapital(term).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}

import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent {
  public countries: Country[]=[];
  public isLoading: boolean = false;
  public initialValue?: string;

  constructor( private countriesService: CountriesService){}

  ngOnInit(){
    this.countries = this.countriesService.cashStore.byCountries.countries;
    this.initialValue = this.countriesService.cashStore.byCountries.term;
  }
  searchByName( name: any ):void{
    this.isLoading = true;
    this.countriesService.searchName(name).subscribe(
      countries => {
        this.countries = countries;
        this.isLoading = false;
      }
    )
  }
}

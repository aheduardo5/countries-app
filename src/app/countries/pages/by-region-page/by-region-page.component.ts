import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
  ]
})
export class ByRegionPageComponent {

  public countries: Country[] = [];
  public isLoading: boolean = false;
  public regions: Region[] = ['Africa','Americas','Asia','Europe','Oceania']
  public selectedRegion?: Region;
  constructor( private countriesService: CountriesService){}

  ngOnInit(){
    this.selectedRegion = this.countriesService.cashStore.byRegion.region;
    this.countries = this.countriesService.cashStore.byRegion.countries;
  }
  searchByRegion(region: Region):void{
    this.selectedRegion = region;
    this.isLoading = true;
    this.countriesService.searchRegion(region).subscribe( countries =>{
      this.countries = countries;
      this.isLoading = false;
    })
  }
}

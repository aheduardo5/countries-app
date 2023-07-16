import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';
@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  apiUrl: string = 'https://restcountries.com/v3.1';
  public cashStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  };

  constructor(private http: HttpClient) {
    this.loadToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cashStore));
  }

  private loadToLocalStorage() {
    if (!localStorage.getItem('cacheStore')) return;
    this.cashStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getHttpCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url).pipe(catchError((err) => of([])));
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http.get<Country[]>(url).pipe(
      map((countries) => (countries.length > 0 ? countries[0] : null)),
      catchError((err) => of(null))
    );
  }

  searchCapital(capital: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${capital}`;

    return this.getHttpCountriesRequest(url).pipe(
      tap(
        (countries) =>
          (this.cashStore.byCapital = { term: capital, countries: countries })
      ),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchName(name: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${name}`;
    return this.getHttpCountriesRequest(url).pipe(
      tap(
        (countries) =>
          (this.cashStore.byCountries = { term: name, countries: countries })
      ),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchRegion(region: Region): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    return this.getHttpCountriesRequest(url).pipe(
      tap(
        (countries) =>
          (this.cashStore.byRegion = { region: region, countries: countries })
      ),
      tap(() => this.saveToLocalStorage())
    );
  }
}

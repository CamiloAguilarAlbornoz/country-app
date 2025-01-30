import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({providedIn: 'root'})
export class CountriesService {

  private apiUrl: string;
  public cacheStore: CacheStore = {
    byCapital:   {term: '', countries: []},
    byCountries: {term: '', countries: []},
    byRegion:    {region: '', countries: []},
  }

  constructor(
    private http: HttpClient
  ) {
    this.apiUrl = 'https://restcountries.com/v3.1';
    this.loadFromLocalStorage();
  }

  public searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.consult(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null), // Obtiene el primer pais si se cumple que vanga al menos uno en la lista
        catchError(() => ([]))
      );
  }

  public searchCapital(searchTearm: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${searchTearm}`;
    return this.consult(url)
      .pipe(
        tap( countries => this.cacheStore.byCapital = {
            term: searchTearm,
            countries: countries
          }
        ),
        tap(() => this.saveToLocalStorage())
    );
  }

  public searchCountry(searchTearm: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${searchTearm}/?fullText=true`;
    return this.consult(url)
      .pipe(
        tap( countries => this.cacheStore.byCountries = {
            term: searchTearm,
            countries: countries
          }
        ),
        tap(() => this.saveToLocalStorage())
    );
  }

  public searchRegion(region: Region): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    return this.consult(url)
      .pipe(
        tap(countries => this.cacheStore.byRegion = {
            region: region,
            countries: countries
          }
        ),
        tap(() => this.saveToLocalStorage())
      );
  }

  private consult(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(error => of ([])),
        delay( 200 )
      );
  }

  private saveToLocalStorage() {
    localStorage.setItem('catchStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    if (localStorage.getItem('catchStore')) {
      this.cacheStore = JSON.parse(localStorage.getItem('catchStore')!);
    }
  }
}

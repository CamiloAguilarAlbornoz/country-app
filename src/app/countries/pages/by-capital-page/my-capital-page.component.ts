import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-my-capital-page',
  templateUrl: './my-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {

  public countries: Country[] = [];
  public initValue: string = '';
  public isLoading: boolean = false;

  constructor(
    private countriesService: CountriesService
  ) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initValue = this.countriesService.cacheStore.byCapital.term;
  }

  public searchByCapital(term: string): void {
    this.isLoading = true;
    this.countriesService.searchCapital(term)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      }
    );
  }
}

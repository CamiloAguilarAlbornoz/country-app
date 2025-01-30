import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent implements OnInit {

  public countries: Country[] = [];
  public regions: Region[];
  public selectedRegion?: Region;
  public isLoading: boolean = false;
  public isSelectedCountry: boolean = false;

  constructor(
    private countriesService: CountriesService
  ) {
    this.regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  }

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countriesService.cacheStore.byRegion.region;
  }

  public searchByRegion(region: Region) {
    this.isLoading = true;
    this.selectedRegion = region;
    this.countriesService.searchRegion(region)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      }
    )
  }
}

import { Country } from './../country';
import { countries } from './../countries';
import { Component, OnInit, ViewChild, Input } from '@angular/core';


@Component({
  selector: 'app-list-country',
  templateUrl: './list-country.component.html',
  styleUrls: ['./list-country.component.scss']
})
export class ListCountryComponent implements OnInit {

  countries: Country[] ;
  ngOnInit() {
    this.countries = countries;
  }

}

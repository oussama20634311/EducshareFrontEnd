import { FavoriService } from './../favori.service';
import { AuthenticationService } from './../../service/authentication.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/users/user';
import { Favori } from '../favori';

@Component({
  selector: 'app-list-favori',
  templateUrl: './list-favori.component.html',
  styleUrls: ['./list-favori.component.scss']
})
export class ListFavoriComponent implements OnInit {

  user: User;
  favoris: Favori[];
  userDocuments: Document[];
  constructor(
    private authenticationService: AuthenticationService,
    private favoriService: FavoriService
  ) { }

  ngOnInit() {
    this.authenticationService.getUserByEmail(localStorage.getItem('email')).subscribe(
      user => {
        this.user = user;
        this.favoriService.getUserFavoris(this.user.id).subscribe(
            favoris => {
              this.favoris = favoris['documentId'];

              
                console.log('ddddddddddddd', favoris[0].documentId);

          }
        );
      }
    );

  }

}

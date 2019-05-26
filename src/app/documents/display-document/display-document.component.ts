import { Comment } from './../../comments/comment';
import { CommentService } from './../../comments/service/comment.service';
import { Favori } from './../../favoris/favori';
import { AuthenticationService } from './../../service/authentication.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DocumentService } from './../service/document.service';
import { Document } from './../document';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from 'src/app/users/user';

declare var $;

@Component({
  selector: 'app-display-document',
  templateUrl: './display-document.component.html',
  styleUrls: ['./display-document.component.scss']
})
export class DisplayDocumentComponent implements OnInit {

  public document: Document;
  pdfData: any;
  pdfFile: any;
  documentName: string;
  documentMatter: string;
  documentUniversity: string;
  documentValidated: string;
  documentLevel: string;
  documentDepartment: string;
  documentYear: string;
  documentTheme: string;
  documentType: string;
  createdAt: string;
  userId: number;
  enonceName: string;


  user: User;
  avatarData: string;
  userAvatar: string;
  displayAvatar: boolean;

  matterExist: boolean = false;
  typeExist: boolean = false;
  themeExist: boolean = false;
  yearExist: boolean = false;
  departmentExist: boolean = false;
  levelExist: boolean = false;

  favori: Favori;
  comment: Comment;
  documentComments: Comment[];
  @ViewChild('successModal') successModal: ElementRef;


  constructor(
    private documentService: DocumentService,
    private route: ActivatedRoute,
    public domSanitizer: DomSanitizer,
    private authenticationService: AuthenticationService,
    private commentService: CommentService
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.documentService.getDocument(id)
    .subscribe(document => {
            this.document = document;
            console.log('this is my document', document);
            this.pdfData = this.document.enonceData;
            this.documentName = this.document.documentName;
             //   this.enonceName = "https://s3.us-east-2.amazonaws.com/educshare/"+ this.document.documentFileEnonce;
          // this.enonceName = 'C:/Users/Oussama/Desktop/Educshare -Oussama' + this.document.documentFileEnonce;
           this.enonceName = 'assets/' + this.document.documentFileEnonce;
         //  this.enonceName = 'assets/a.pdf';
            console.log('This is the path', this.enonceName);
            this.userId = this.document.userId;
             this.authenticationService.getUserById(this.userId).subscribe(
               user => {
                 this.user = user;
                 this.avatarData = this.user.avatar;
                 if (this.avatarData == null) {
                   this.displayAvatar = false;
                 } else {
                   this.displayAvatar = true;
                   this.userAvatar = 'data:image/jpeg;base64,' + this.avatarData;
                  console.log('this is my user', this.user);
              }
               });
        if ( this.document.documentMatter !== null) {
          this.matterExist = true;
          this.documentMatter = this.document.documentMatter;
        }
        if ( this.document.documentLevel !== null) {
          this.levelExist = true;
          this.documentLevel = this.document.documentLevel;
        }
        if ( this.document.documentDepartment !== null) {
          this.departmentExist = true;
        this.documentDepartment = this.document.documentDepartment;
        }
        if ( this.document.documentYear !== null) {
          this.yearExist = true;
        this.documentYear = this.document.documentYear;
        }
        if ( this.document.documentTheme !== null) {
          this.themeExist = true;
        this.documentTheme = this.document.documentTheme;
        }
        if ( this.document.documentType !== null) {
          this.typeExist = true;
        this.documentType = this.document.documentType;
        }
        this.createdAt = this.document.createdAt;
    });

   
    //   });

      this.commentService.getAllComments().subscribe(
        data => {
          this.documentComments = data;
          console.log('List of comments', data);
        }
      );
  }

  addToFavori() {
      this.favori = new Favori();
      this.favori.userId = this.user.id;
      this.favori.documentId = this.document.id;
      this.documentService.addFavori(this.favori).subscribe(
        data => {
          console.log(data);
          $(this.successModal.nativeElement).modal('show');
        }
      );
  }

}

import { AuthenticationService } from './../../service/authentication.service';
import { Comment } from './../comment';
import { CommentService } from './../service/comment.service';
import { ActivatedRoute } from '@angular/router';

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/users/user';

declare var $;
@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {

  constructor() {}

    ngOnInit() {}

}

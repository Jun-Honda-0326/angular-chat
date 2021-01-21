import { Component } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';

import { Comment } from './class/comment';
import { User } from './class/user';

const CURRENT_USER: User = new User(1, '本多淳');
const ANOTHER_USER: User = new User(2, '大谷翔平');

const COMMENTS: Comment[] = [
  new Comment(CURRENT_USER, "good morning"),
  new Comment(ANOTHER_USER, "hello")
];

@Component({
  selector: 'ac-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  comments$: Observable<Comment[]>;
  commentsRef: AngularFireList<Comment>;
  // comments = COMMENTS;
  currentUser = CURRENT_USER;
  comment = '';
  item$: Observable<any>;

  constructor(private db: AngularFireDatabase) {
    this.item$ = db.object('/item').valueChanges();
    this.commentsRef = db.list('/comments');
    this.comments$ = this.commentsRef.valueChanges();
  }

  addComment(comment:string): void {
    if (comment) {
      this.commentsRef.push(new Comment(this.currentUser, comment));
      this.comment = '';
    }
  }
}

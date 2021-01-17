import { Component } from '@angular/core';

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

  comments = COMMENTS;
  currentUser = CURRENT_USER;
}

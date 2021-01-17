import { Component } from '@angular/core';

import { Comment } from './class/comment';

const COMMENTS: Comment[] = [
  {name: "本多 淳", message: "good morning"},
  {name: "田中 将大", message: "good afternoon"},
  {name: "大谷 翔平", message: "good evening"},
];

@Component({
  selector: 'ac-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  comments = COMMENTS;
}

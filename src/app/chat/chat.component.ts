import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Comment } from '../class/comment';
import { User } from '../class/user';

@Component({
  selector: 'ac-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {


  comments$: Observable<Comment[]>;
  commentsRef: AngularFireList<Comment>;
  currentUser: User;
  currentUser$: Observable<User>;
  comment = '';
  item$: Observable<any>;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) {
    this.item$ = db.object('/item').valueChanges();
    this.commentsRef = db.list('/comments');
  }

  ngOnInit(): void {
    this.currentUser$ = this.afAuth.authState.pipe(
      map((user: firebase.User | null) => {
        if (user) {
          this.currentUser = new User(user);
          return this.currentUser;
        }
        return null;
      })
    );

    this.comments$ = this.commentsRef.snapshotChanges()
      .pipe(
        map((snapshots: SnapshotAction<Comment>[]) => {
          return snapshots.map(snapshot => {
            const value = snapshot.payload.val();
            return new Comment({ key: snapshot.payload.key, ...value });
          })
        })
      );
  }

  addComment(comment: string): void {
    if (comment) {
      this.commentsRef.push(new Comment({ user: this.currentUser, message: comment }));
      this.comment = '';
    }
  }

  updateComment(comment: Comment): void {
    const { key, message } = comment;
    this.commentsRef.update(key, { message });
  }

  deleteComment(commnet: Comment): void {
    this.commentsRef.remove(commnet.key);
  }

}

import { Component, OnDestroy, OnInit } from "@angular/core";
import { Post } from "../interface/post";
import { PostService } from "../services/post.service";
import { Router } from "@angular/router";
import { PostModel } from "../state/post.model";
import { Store } from "@ngrx/store";
import { getPost, getPostInfo } from "../state/post.selectors";
import { deletepost, loadposts } from "../state/post.actions";
import { Subject } from "rxjs";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy{

  postInfo!: any; // Post
  unsubscribe$ = new Subject<void>;

  constructor(
    private router: Router,
    private store: Store<Post>,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadposts());
    this.store.select(getPostInfo).subscribe(data => {
      this.postInfo = data;
    })
  }

  deletePost(id: number) {
    this.store.dispatch(deletepost({ id: id }));
    this.router.navigate(['/list']);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}

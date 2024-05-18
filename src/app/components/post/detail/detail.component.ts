import { Component, OnDestroy, OnInit } from "@angular/core";
import { Post } from "../interface/post";
import { PostService } from "../services/post.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Subject, Subscription } from "rxjs";
import { getpostid } from "../state/post.selectors";
import { getpost } from "../state/post.actions";
import { getRouterInfo } from "src/app/state/router/RouterSelector";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  post!: any;
  unsubscribe$ = new Subject<void>;
  actualUrl: any;

  constructor(
    private route: ActivatedRoute,
    private store: Store<Post>,
  ) {}

  ngOnInit(): void {
    this.getPostById();
    this.store.select(getRouterInfo).subscribe(item => {
      this.actualUrl = item;
    })
  }

  getPostById() {
    this.route.paramMap.subscribe((params) => {

      const id = params.get('id');

      this.store.dispatch(getpost({ id: Number(id) }));
      this.store.select(getpostid).subscribe(res => {
        console.log('[RESPONSE POST]', res);
        this.post = res;
      });

    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}

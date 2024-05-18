import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PostService } from "../services/post.service";
import { LOAD_POST, addpost, addpostsuccess, deletepost, deletepostsuccess, getpost, getpostsuccess, loadpostfail, loadposts, loadpostsuccess, updatepost, updatepostsuccess } from "./post.actions";
import { catchError, exhaustMap, map, of } from "rxjs";
import { PostModel } from "./post.model";

@Injectable()
export class PostEffects {

  constructor(
    private action$: Actions,
    private service: PostService,
  ) {}

  _post = createEffect(() =>
    this.action$.pipe(
      ofType(loadposts),
      exhaustMap(() => {
        return this.service.getAll().pipe(
          map((data) => {
            return loadpostsuccess({ postlist: data })
          }),
          catchError((_error) => of(loadpostfail({ ErrorText: _error.message })))
        )
      })
    )
  );

  _addPost = createEffect(() =>
    this.action$.pipe(
      ofType(addpost),
      exhaustMap((action: any) => {
        return this.service.create(action.postinput).pipe(
          map((data) => {
            console.log('[ADD EFFECTS]', data);
            return addpostsuccess({ postinput: data as PostModel })
          }),
          catchError((_error) => of(loadpostfail({ ErrorText: _error.message })))
        )
      })
    )
  );

  _updatePost = createEffect(() =>
    this.action$.pipe(
      ofType(updatepost),
      exhaustMap((action: any) => {
        console.log('[UPDATE EFFECTS]', action);
        return this.service.update(action.postinput).pipe(
          map(() => {
            return updatepostsuccess({ postinput: action.postinput });
          }),
          catchError((_error) => of(loadpostfail({ ErrorText: _error.message })))
        )
      })
    )
  );

  _findPostById = createEffect(() =>
    this.action$.pipe(
      ofType(getpost),
      exhaustMap((action: any) => {
        console.log('[DETAIL EFFECTS BY ID SERVICE]', action.id);
        return this.service.findById(action.id).pipe(
          map((data) => {
            return getpostsuccess({ obj: data });
          }),
          catchError((_error) => of(loadpostfail({ ErrorText: _error.message })))
        )
      })
    )
  );

  _deletePost = createEffect(() =>
    this.action$.pipe(
      ofType(deletepost),
      exhaustMap((action) => {
        console.log('[DELETE EFFECTS]', action.id);
        return this.service.delete(action.id).pipe(
          map(() => {
            return deletepostsuccess({ id: action.id });
          }),
          catchError((_error) => of(loadpostfail({ ErrorText: _error.message })))
        )
      })
    )
  );

}

import { createAction, props } from "@ngrx/store";
import { PostModel } from "./post.model";

export const LOAD_POST_SUCCESS = '[post page] load post success';
export const LOAD_POST = '[post page] load post';
export const LOAD_POST_FAIL = '[post page] load post fail';

export const LOAD_POST_BY_ID = '[post page] load post by id';
export const LOAD_POST_BY_ID_SUCCESS = '[post page] load post by id success';

export const ADD_POST_SUCCESS = '[post page] add post success';
export const ADD_POST = '[post page] add post';

export const UPDATE_POST = '[post page] update post';
export const UPDATE_POST_SUCCESS = '[post page] update post success';

export const DELETE_POST = '[post page] delete post';
export const DELETE_POST_SUCCESS = '[post page] delete post success';

export const loadposts = createAction(LOAD_POST);
export const loadpostsuccess = createAction(LOAD_POST_SUCCESS, props<{postlist: PostModel[] }>());

export const getpost= createAction(LOAD_POST_BY_ID, props<{id: number}>());
export const getpostsuccess= createAction(LOAD_POST_BY_ID_SUCCESS, props<{obj: PostModel}>());

export const loadpostfail = createAction(LOAD_POST_FAIL, props<{ ErrorText: string }>());

export const addpost   = createAction(ADD_POST, props<{ postinput: PostModel }>());
export const addpostsuccess   = createAction(ADD_POST_SUCCESS, props<{ postinput: PostModel }>());

export const updatepost   = createAction(UPDATE_POST, props<{ postinput: PostModel }>());
export const updatepostsuccess = createAction(UPDATE_POST_SUCCESS, props<{ postinput: PostModel }>());

export const deletepost= createAction(DELETE_POST, props<{id: number}>());
export const deletepostsuccess= createAction(DELETE_POST_SUCCESS, props<{id: number}>());

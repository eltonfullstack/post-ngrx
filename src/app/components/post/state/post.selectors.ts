import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Posts } from "./post.model";


export const POST_STATE_NAME = 'post';

const getPostState = createFeatureSelector<Posts>(POST_STATE_NAME);

export const getPost = createSelector(getPostState, (state) => {
  return state.postlist;
});

export const getPostInfo = createSelector(getPostState, (state) => {
  return state;
});

export const getpostid = createSelector(getPostState, (state) => {
  console.log('[SELECT ID]', state.postobj);
  return state.postobj;
})




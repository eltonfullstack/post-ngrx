import { createReducer, on } from "@ngrx/store";
import { initialPostState } from "./post.state";
import { addpost, addpostsuccess, deletepost, getpost, getpostsuccess, loadpostfail, loadposts, loadpostsuccess, updatepostsuccess } from "./post.actions";
import { PostModel } from "./post.model";

const _postReducer = createReducer(initialPostState,
  on(loadposts, (state) => {
    return {
      ...state,
    }
  }),
  on(loadpostsuccess, (state, action) => {
    return {
      ...state,
      postlist: [...action.postlist],
      Errormessage: ''
    }
  }),
  on(loadpostfail, (state, action) => {
    return {
      ...state,
      postlist: [],
      Errormessage: action.ErrorText
    }
  }),
  // on(addpost, (state, action) => {
  //   const _post = {...action.postinput};
  //   _post.id = state.postlist.length + 1;
  //   return {
  //     postlist:[...state.postlist, _post],
  //     Errormessage: ''
  //   }
  // }),
  on(addpostsuccess, (state, action) => {
    const _post = {...action.postinput};
    return {
      ...state,
      postlist:[...state.postlist, _post],
      Errormessage: ''
    }
  }),
  on(updatepostsuccess, (state, action) => {
    const _post = {...action.postinput};
    const updatepost = state.postlist.map(post => { return _post.id === post.id ? _post : post });
    console.log('REDUCER', deletepost)
    return {
      ...state,
      postlist: updatepost
    }
  }),
  on(deletepost, (state, action) => {
    const deletepost = state.postlist.filter((data: PostModel) => {
      return data.id !== action.id;
    });
    console.log('REDUCER', deletepost)
    return {
      ...state,
      postlist: deletepost
    }
  }),
  on(getpostsuccess, (state: any, action) => {
    console.log('[ACTION]', action);
    return {
      ...state,
      postobj: action.obj
    }
  })
);

export function postReducer(state: any, action: any) {
  return _postReducer(state, action);
}

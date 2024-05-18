import { Posts } from "./post.model";

export const initialPostState: Posts = {
  postlist: [],
  Errormessage: '',
  postobj: {
    id: 0,
    title: '',
    body: ''
  }
}

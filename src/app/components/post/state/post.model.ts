export interface PostModel {
  id?: number;
  title: string;
  body: string;
}

// export interface Post {
//   id: any;
//   title: string;
//   body: string;
// }

export interface Posts {
  postlist: PostModel[];
  postobj: PostModel,
  Errormessage: string;
}

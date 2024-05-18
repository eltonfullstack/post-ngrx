import { Component, OnInit } from "@angular/core";
import { Post } from "../interface/post";
import { FormControl, FormGroup } from "@angular/forms";
import { PostService } from "../services/post.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { getpost, updatepost } from "../state/post.actions";
import { PostModel } from "../state/post.model";
import { getpostid } from "../state/post.selectors";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit{

  id!: any;
  post!: any;
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<Post>,
  ) {}

  ngOnInit(): void {
    this.getPostById();
    this.initializeFormEdit();
  }

  getPostById() {
    this.route.paramMap.subscribe((params) => {

      const id = params.get('id');

      this.store.dispatch(getpost({ id: Number(id) }));
      this.store.select(getpostid).subscribe(res => {
        console.log('[RESPONSE POST]', res);

        if(res) {
          this.post = {
            title: res.title,
            body: res.body
          };
        }

      });

    });
  }

  onChangeCode(value: string) {
    console.log(value)
  }

  initializeFormEdit() {
    this.form = new FormGroup({
      title: new FormControl(''),
      body: new FormControl('')
    })
  }

  get f() {
    return this.form.controls;
  }

  submit() {

    console.log(this.form.value);

    let data: any = {
      id: this.id = this.route.snapshot.params['id'],
      title: this.form.get('title')?.value,
      body: this.form.get('body')?.value
    }

    this.store.dispatch(updatepost({postinput: data }));
    this.router.navigate(['list']);

  }

}

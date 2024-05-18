import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { PostService } from "../services/post.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Posts } from "../state/post.model";
import { addpost } from "../state/post.actions";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit{

  form!: FormGroup;

  constructor(
    private service: PostService,
    private router: Router,
    private store: Store<Posts>,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = new FormGroup({
      title: new FormControl(''),
      body: new FormControl('')
    });
  }

  get f() {
    return this.form.controls;
  }
  submit() {
    this.store.dispatch(addpost({postinput: this.form.value}));
    this.router.navigate(['/list']);
  }
}

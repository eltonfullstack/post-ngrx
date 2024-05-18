import { NgModule } from "@angular/core";
import { ListComponent } from "./list/list.component";
import { PostRoutingModule } from "./post-routing.module";
import { PostService } from "./services/post.service";
import { CreateComponent } from "./create/create.component";
import { EditComponent } from "./edit/edit.component";
import { DetailComponent } from "./detail/detail.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { POST_STATE_NAME } from "./state/post.selectors";
import { postReducer } from "./state/post.reducers";
import { PostEffects } from "./state/post.effects";
import { EffectsModule } from "@ngrx/effects";

@NgModule({
  declarations: [
    ListComponent,
    CreateComponent,
    EditComponent,
    DetailComponent,
  ],
  imports: [
    CommonModule,
    PostRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(POST_STATE_NAME, postReducer),
    EffectsModule.forFeature([PostEffects])
  ],
  exports: [PostRoutingModule],
  providers: [PostService]
})
export class PostModule {}

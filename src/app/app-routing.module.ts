import { NgModule, importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import {HomeComponent} from './home/home.component'
import {SignoutComponent} from './signout/signout.component'
import {UploadImageComponent} from './upload-image/upload-image.component'
import { SearchImageByTagsComponent } from './search-image-by-tags/search-image-by-tags.component';
import { GetImageByTagsComponent } from './get-image-by-tags/get-image-by-tags.component';
import { DeleteImageComponent } from './delete-image/delete-image.component';
import { AddRemoveTagComponent } from './add-remove-tag/add-remove-tag.component';


const routes: Routes = [
{ path: '', component: SignupComponent },
{ path: 'home', component: HomeComponent },
{ path: 'signout', component: SignoutComponent },
{ path: 'uploadimage', component: UploadImageComponent },
{ path: 'searchByTag', component: SearchImageByTagsComponent},
{ path: 'getTag', component: GetImageByTagsComponent},
{ path: 'deleteImage', component:DeleteImageComponent},
{ path: 'add_remove', component:AddRemoveTagComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }

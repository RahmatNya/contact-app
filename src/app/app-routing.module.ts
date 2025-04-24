import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactListComponent } from './contact-list/contact-list.component';

const routes: Routes = [
  {path: "", component: HomeComponent},
  {path: "list", component: ContactListComponent},
  {path: "new", component: ContactFormComponent},
  {path: "edit/:id", component: ContactFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

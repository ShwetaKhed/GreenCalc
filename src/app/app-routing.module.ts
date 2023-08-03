import { NgModule, importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component'
import { CalculatorComponent } from './calculator/calculator.component';
import { SolutionsComponent } from './solutions/solutions.component';



const routes: Routes = [

{ path: '', component: HomeComponent },
{ path: 'calculator', component: CalculatorComponent },
{ path: 'solutions', component: SolutionsComponent }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }

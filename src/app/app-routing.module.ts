import { NgModule, importProvidersFrom } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './home/home.component'
import { CalculatorComponent } from './calculator/calculator.component';
import { SolutionsComponent } from './solutions/solutions.component';
import { ComparisonComponent } from './comparison/comparison.component';
import { RecommendComponent } from './recommend/recommend.component';
import { LoadscreenComponent } from './loadscreen/loadscreen.component';
import { BillComponentComponent } from './bill-component/bill-component.component';



const routes: Routes = [

{ path: '', component: LoadscreenComponent },
{ path: 'home', component: HomeComponent },
{ path: 'calc', component: CalculatorComponent },
{ path: 'solution', component: SolutionsComponent },
{ path: 'recommend', component: RecommendComponent },
{ path: 'compare/:data', component: ComparisonComponent },
{ path: 'billComp/:data', component: BillComponentComponent}
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RootComponent } from './layout/root/root.component';
import { HomeIndexComponent } from './pages/home/home-index/home-index.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent, 
    children:  [
      { path: '', redirectTo: 'home', pathMatch: 'full'  },
      { path: 'home' , component: HomeIndexComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

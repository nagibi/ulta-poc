import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './pages/auth/services/auth-guard.service';

const routes: Routes = [
    // {
    //     path:'**',
    //     redirectTo: '/auth/login',
    // },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/auth/login',
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./pages/auth/auth.routing.module').then(m => m.AuthRoutingModule),
    },
    {
        path: 'admin',
        canActivate:[AuthGuardService],
        loadChildren: () =>
            import('./pages/admin/admin.routing.module').then(m => m.AdminRoutingModule),
    },
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes,{
        scrollPositionRestoration: 'top'
      })],
    exports: [RouterModule],
})
export class AppRoutingModule {}

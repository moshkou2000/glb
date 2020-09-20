import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
        data: { showAlert: false, showHeader: false, showFooter: false, showSidebar: false }
    },
    {
        path: 'contact',
        loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule),
        data: { showAlert: false, showHeader: false, showFooter: false, showSidebar: false }
    },
    {
        path: 'error',
        loadChildren: () => import('./error/error.module').then(m => m.ErrorModule),
        data: { showAlert: false, showHeader: false, showFooter: false, showSidebar: false }
    },
    {
        path: '**',
        loadChildren: './error/error.module#ErrorModule',
        data: { showAlert: false, showHeader: false, showFooter: false, showSidebar: false }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
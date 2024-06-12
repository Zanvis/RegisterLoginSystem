import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { authGuard } from './auth.guard';
import { ProtectedComponent } from './protected/protected.component';

export const routes: Routes = [
    {path: '', component: MainPageComponent},
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'main-page', component: MainPageComponent },
    // { path: 'protected', component: ProtectedComponent, canActivate: [authGuard] },
    {path: '**', component: PageNotFoundComponent}
];

import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { ReportsComponent } from './components/reports/reports.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
    {path: "login", component: LoginComponent},
    {path: "register", component: RegisterComponent},
    {path: "home", component: DashboardComponent, canActivate: [authGuard]},
    {path: "reports", component: ReportsComponent, canActivate: [authGuard]},
    {path: "", redirectTo:"home", pathMatch: "full"},
    {path: "**", component: PageNotFoundComponent}
];

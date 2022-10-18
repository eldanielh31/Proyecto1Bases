import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AuthGuardService } from 'src/app/auth/auth-guard.service';
import { EditUserComponent } from 'src/app/pages/edit-user/edit-user.component';
import { ListUsersComponent } from 'src/app/pages/list-users/list-users.component';
import { CalendarioComponent } from 'src/app/pages/calendario/calendario.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuardService] },
    { path: 'tables', component: TablesComponent, canActivate: [AuthGuardService] },
    { path: 'user/:userId/:userType', component: EditUserComponent, canActivate: [AuthGuardService] },
    { path: 'users', component: ListUsersComponent, canActivate: [AuthGuardService] },
    { path: 'calendar', component: CalendarioComponent, canActivate: [AuthGuardService] },
];

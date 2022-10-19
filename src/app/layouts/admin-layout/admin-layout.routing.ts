import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AuthGuardService } from 'src/app/auth/auth-guard.service';
import { EditUserComponent } from 'src/app/pages/edit-user/edit-user.component';
import { ListUsersComponent } from 'src/app/pages/list-users/list-users.component';
import { CalendarioComponent } from 'src/app/pages/calendario/calendario.component';
import { ProductsComponent } from 'src/app/pages/products/products.component';
import { ProvidersComponent } from 'src/app/pages/providers/providers.component';
import { StoresComponent } from 'src/app/pages/stores/stores.component';
import { WashedComponent } from 'src/app/pages/washed/washed.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuardService] },
    { path: 'tables', component: TablesComponent, canActivate: [AuthGuardService] },
    { path: 'user/:userId/:userType', component: EditUserComponent, canActivate: [AuthGuardService] },
    { path: 'users', component: ListUsersComponent, canActivate: [AuthGuardService] },
    { path: 'calendar', component: CalendarioComponent, canActivate: [AuthGuardService] },
    { path: 'products', component: ProductsComponent, canActivate: [AuthGuardService] },
    { path: 'providers', component: ProvidersComponent, canActivate: [AuthGuardService] },
    { path: 'stores', component: StoresComponent, canActivate: [AuthGuardService] },
    { path: 'washed', component: WashedComponent, canActivate: [AuthGuardService] },
];

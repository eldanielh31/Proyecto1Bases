import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { BrowserModule } from '@angular/platform-browser';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { ListUsersComponent } from './pages/list-users/list-users.component';

import { CommonModule } from '@angular/common';
import { CalendarioComponent } from './pages/calendario/calendario.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { StoresComponent } from './pages/stores/stores.component';
import { ProvidersComponent } from './pages/providers/providers.component';
import { ProductsComponent } from './pages/products/products.component';
import { WashedComponent } from './pages/washed/washed.component';

FullCalendarModule.registerPlugins([
  interactionPlugin,
  dayGridPlugin
]);

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FullCalendarModule,
    HttpClientModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    EditUserComponent,
    CalendarioComponent,
    ListUsersComponent,
    StoresComponent,
    ProvidersComponent,
    ProductsComponent,
    WashedComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {BrowserModule} from '@angular/platform-browser';
import {ChangeDetectorRef, NgModule} from '@angular/core';
import {
  AlertModule,
  BsDropdownModule,
  ModalModule,
  PopoverModule,
  ProgressbarModule,
  TabsModule,
  TooltipModule,
} from 'ngx-bootstrap';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {HeaderComponent} from './components/header/header.component';
import {UserComponent} from './components/user/user.component';
import {ProgressBarComponent} from './components/progress-bar/progress-bar.component';
import {BlihComponent} from './components/blih/blih.component';
import {RepoComponent} from './components/blih/repo/repo.component';
import {LoaderComponent} from './components/loader/loader.component';
import {ModalComponent} from './components/modal-acl/modal.component';
import {FormComponent} from './components/form/form.component';
import {MoreComponent} from './components/blih/more/more.component';
import {ModifyUserComponent} from './components/user/modify-user/modify-user.component';
import {RouterModule, Routes} from '@angular/router';
import {UserService} from './service/user.service';
import {RequestService} from './service/request.service';
import {BlihService} from './service/blih.service';
import {Ng2OrderModule} from 'ng2-order-pipe';
import {SearchPipe} from './service/search.pipe';
import {FileDropModule} from 'ngx-file-drop';
import {BreadcumbComponent} from './components/breadcumb/breadcumb.component';
import {InfoComponent} from './components/info/info.component';
import {PagerComponent} from './components/pager/pager.component';
import {NotificationComponent} from './components/notification/notification.component';
import {ToastyModule} from 'ng2-toasty';
import {NotificationService} from './service/notification.service';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {ClipboardModule} from 'ngx-clipboard';
import {AppRoutesInfo} from './model/Routes';
import {RoutesInfoService} from './service/routes-info.service';
import { ContributorsComponent } from './components/contributors/contributors.component';
import {ContributorsService} from "./service/contributors.service";
import { ModalContributorsComponent } from './components/modal-contributors/modal-contributors.component';
import {AuthGuardService} from "./service/auth-gard.service";
import {ModalNewComponent} from './components/modal-new/modal-new.component';
import {UserBreadcrumbComponent} from "./components/user/user-breadcrumb/user-breadcrumb.component";

const appRoutes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: UserComponent},
  {path: 'home', component: BlihComponent, canActivate: [AuthGuardService]},
  {path: 'user', component: ModifyUserComponent, canActivate: [AuthGuardService]},
  {path: 'more', component: MoreComponent, canActivate: [AuthGuardService, BlihService]},
  {path: 'contributors', component: ContributorsComponent, canActivate: [AuthGuardService]},
  {path: '**', redirectTo: 'home'}
];
@NgModule({
  declarations: [
    AppComponent, SidebarComponent, HeaderComponent, UserComponent, ProgressBarComponent, BlihComponent,
    LoaderComponent, RepoComponent, MoreComponent, SearchPipe, ModifyUserComponent, BreadcumbComponent, InfoComponent, PagerComponent,
    NotificationComponent, ModalComponent, FormComponent, ContributorsComponent, ModalContributorsComponent, ModalNewComponent, UserBreadcrumbComponent],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false} // <-- debugging purposes only,
    ),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    AlertModule.forRoot(),
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    PopoverModule.forRoot(),
    ModalModule.forRoot(),
    Ng2OrderModule,
    FileDropModule,
    TooltipModule.forRoot(),
    AlertModule.forRoot(),
    ToastyModule.forRoot(),
    ButtonsModule.forRoot(),
    ClipboardModule,
    ProgressbarModule.forRoot(),
    TabsModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  providers: [RequestService, UserService, BlihService, NotificationService, RoutesInfoService, ContributorsService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

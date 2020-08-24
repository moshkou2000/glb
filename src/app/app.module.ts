import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatIconModule, MatToolbarModule, MatSnackBarModule, MatInputModule,
    MatSelectModule, MatListModule, MatButtonModule, MatSidenavModule, MatDialogModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutModule } from './layout/layout.module';
import { ConfirmationComponent } from './layout/confirmation/confirmation.component';
import { SnackbarComponent } from './layout/snackbar/snackbar.component';

import { GeneralService } from './services/general/general.service';
//25


@NgModule({
    declarations: [
        AppComponent,
        ConfirmationComponent,
        SnackbarComponent
    ],
    entryComponents: [
        ConfirmationComponent,
        SnackbarComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        RouterModule.forRoot([]),
        AppRoutingModule,
        LayoutModule,
        AppRoutingModule,
        MatSidenavModule,
        MatButtonModule,
        MatDialogModule,
        MatListModule,
        HttpClientModule,
        MatSnackBarModule,
        MatInputModule,
        MatSelectModule,
        MatToolbarModule,
        MatIconModule
    ],
    providers: [
        GeneralService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

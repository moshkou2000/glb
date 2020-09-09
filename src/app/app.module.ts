import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatIconModule, MatMenuModule, MatToolbarModule, MatCheckboxModule, MatSnackBarModule, MatInputModule,
    MatSelectModule, MatListModule, MatButtonModule, MatSidenavModule, MatDialogModule, MatTooltipModule } from '@angular/material';

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
        MatMenuModule,
        FormsModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        RouterModule.forRoot([]),
        AppRoutingModule,
        LayoutModule,
        MatCheckboxModule,
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
        MatIconModule,
        MatTooltipModule
    ],
    providers: [
        GeneralService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

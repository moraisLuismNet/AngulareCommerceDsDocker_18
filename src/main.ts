import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { LOCALE_ID, DEFAULT_CURRENCY_CODE, importProvidersFrom } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';

// Import the AppRoutingModule which now contains our routes
import { AppRoutingModule } from './app/app-routing.module';

// Register Spanish locale data
registerLocaleData(localeEs, 'es-ES', localeEsExtra);

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(AppRoutingModule), // Use importProvidersFrom for the RouterModule
    provideAnimations(),
    MessageService,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'es-ES' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
  ]
}).catch(err => console.error(err));

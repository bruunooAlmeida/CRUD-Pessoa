import { ApplicationConfig } from '@angular/core';

import { provideHttpClient } from '@angular/common/http';

import { CommonModule } from '@angular/common'; // Importe o CommonModule aqui


export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient()],
};

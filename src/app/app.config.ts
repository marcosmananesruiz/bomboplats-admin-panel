import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BASE_PATH, Configuration } from './api';
import { provideHttpClient } from '@angular/common/http';

class JsonConfiguration extends Configuration {
  override selectHeaderAccept(accepts: string[]): string | undefined {
    if (accepts.includes('*/*')) return "application/json"
    return super.selectHeaderAccept(accepts)
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(routes),
    {
      provide: Configuration,
      useValue: new JsonConfiguration({ basePath: 'http://localhost:8080' })
    }
  ]
};

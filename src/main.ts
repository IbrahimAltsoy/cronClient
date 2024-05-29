import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(
      BrowserModule,
      CommonModule,
      RouterModule.forRoot([
        {
          path: '',
          loadComponent: () =>
            import('./app/ui/ui/layout/layout.component').then(
              (c) => c.LayoutComponent
            ),
          children: [
            // {path:"users", loadComponent:()=>import("./app/ui/components/user/user.component").then(c=>c.UserComponent)},
          ],
        },
        {
          path: 'admin',
          loadComponent: () =>
            import('./app/admin/admin.component').then((c) => c.AdminComponent),
          children: [
            {
              path: 'blog',
              loadComponent: () =>
                import('./app/admin/blog/blog.component').then(
                  (c) => c.BlogComponent
                ),
            },
          ],
        },
      ])
    ), provideAnimationsAsync(),
  ],
});

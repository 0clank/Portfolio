import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectPreviewComponent } from './shared/components/project-preview/project-preview.component';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import { ProjectsSectionComponent } from './shared/components/projects-section/projects-section.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectPreviewComponent,
    DefaultLayoutComponent,
    IndexPageComponent,
    ProjectsSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

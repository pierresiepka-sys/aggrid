import { bootstrapApplication } from '@angular/platform-browser';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { RowGroupingModule, RowGroupingPanelModule } from 'ag-grid-enterprise';
import {  } from 'ag-grid-enterprise';
import { appConfig } from './app/app.config';
import { App } from './app/app';

ModuleRegistry.registerModules([AllCommunityModule, RowGroupingModule, RowGroupingPanelModule]);

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

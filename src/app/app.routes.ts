import { Routes } from '@angular/router';
import { GridComponent } from './grid/grid';

export const routes: Routes = [
    {
        path: 'grid',
        component: GridComponent,
    },
    {
        path: '',
        redirectTo: 'grid',
        pathMatch: 'full',
    },
];

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { themeQuartz, type ColDef } from 'ag-grid-community';

interface RowData {
    id: string;
    name: string;
    email: string;
    amount: number;
    status: string;
    date: string;
}

@Component({
    selector: 'app-grid',
    standalone: true,
    imports: [AgGridAngular],
    templateUrl: './grid.html',
    styleUrl: './grid.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent {
    rowData: RowData[] = [
        {
            id: '001',
            name: 'Marie Dupont',
            email: 'marie.dupont@bnp.fr',
            amount: 45230.50,
            status: 'Active',
            date: '2024-05-01',
        },
        {
            id: '002',
            name: 'Jean Martin',
            email: 'jean.martin@bnp.fr',
            amount: 62150.00,
            status: 'Pending',
            date: '2024-05-02',
        },
        {
            id: '003',
            name: 'Sophie Bernard',
            email: 'sophie.bernard@bnp.fr',
            amount: 38900.75,
            status: 'Active',
            date: '2024-05-01',
        },
        {
            id: '004',
            name: 'Pierre Leclerc',
            email: 'pierre.leclerc@bnp.fr',
            amount: 51200.25,
            status: 'Inactive',
            date: '2024-05-03',
        },
        {
            id: '005',
            name: 'Valérie Moreau',
            email: 'valerie.moreau@bnp.fr',
            amount: 73400.00,
            status: 'Active',
            date: '2024-05-03',
        },
    ];

    columnDefs: ColDef<RowData>[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 80,
            headerClass: 'bnp-header',
            cellClass: 'bnp-cell bnp-cell-id',
            hide: true,
        },
        {
            field: 'name',
            headerName: 'Name',
            flex: 1,
            minWidth: 150,
            headerClass: 'bnp-header',
            cellClass: 'bnp-cell bnp-cell-name',
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 1,
            minWidth: 200,
            headerClass: 'bnp-header',
            cellClass: 'bnp-cell bnp-cell-email',
        },
        {
            field: 'amount',
            headerName: 'Amount',
            width: 130,
            headerClass: 'bnp-header',
            cellClass: 'bnp-cell bnp-cell-amount',
            valueFormatter: (params) => {
                if (!params.value) return '';
                return `€${(params.value as number).toLocaleString('fr-FR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}`;
            },
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 110,
            headerClass: 'bnp-header',
            cellClass: 'bnp-cell bnp-cell-status',
            cellRenderer: StatusRenderer,
        },
        {
            field: 'date',
            headerName: 'Date',
            width: 120,
            headerClass: 'bnp-header',
            cellClass: 'bnp-cell bnp-cell-date',
            valueFormatter: (params) => {
                if (params.value == null) return '';

                const date = new Date(params.value as string);
                return date.toLocaleDateString('fr-FR');
            },
        },
    ];

    defaultColDef: ColDef = {
        resizable: true,
        sortable: true,
        filter: true,
        enableRowGroup: true,
    };

    gridOptions = {
        theme: customTheme
    };
}

const customTheme = themeQuartz.withParams({
    headerTextColor: '#ffffff',
});

// Status badge renderer
function StatusRenderer(params: any) {
    if (!params.value) return '';

    const value = params.value as string;
    let statusClass = '';

    switch (value) {
        case 'Active':
            statusClass = 'bg-emerald-100 text-emerald-800 border border-emerald-300';
            break;
        case 'Pending':
            statusClass = 'bg-amber-100 text-amber-800 border border-amber-300';
            break;
        case 'Inactive':
            statusClass = 'bg-slate-100 text-slate-800 border border-slate-300';
            break;
        default:
            statusClass = 'bg-slate-100 text-slate-800 border border-slate-300';
    }

    return `<span class="inline-flex items-center px-2 py-1 rounded-md text-sm font-semibold ${statusClass}">
    ${value}
    </span>`;
}

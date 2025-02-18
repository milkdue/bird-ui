<!--
    getRowId: GetRowIdFunc<TData>;

    interface GetRowIdFunc<TData = any> {
        (params: GetRowIdParams<TData>) : string
    }

    interface GetRowIdParams<TData = any, TContext = any> {
        data: TData;
        level: number;
        parentKeys?: string[];
        api: GridApi<TData>;
        context: TContext;
    }
-->
<template>
    <div class="row-id-table">
        <ag-grid-vue
            style="width: 100%; height: 240px"
            class="ag-theme-quartz"
            :columnDefs="colDefs"
            :rowData="rowData"
            :defaultColDef="defaultColDef"
            :getRowId="getRowId"
            @grid-ready="onGridReady"
        ></ag-grid-vue>
    </div>
</template>

<script>
export default {
    data() {
        return {
            rowData: [
                { id: "c1", make: "Toyota", model: "Celica", price: 35000 },
                { id: "c2", make: "Ford", model: "Mondeo", price: 32000 },
                {
                    id: "c8",
                    make: "Porsche",
                    model: "Boxster",
                    price: 72000
                },
                { id: "c4", make: "BMW", model: "M50", price: 60000 },
                {
                    id: "c14",
                    make: "Aston Martin",
                    model: "DBX",
                    price: 190000
                }
            ],
            gridApi: null,
            colDefs: [
                { field: "id", headerName: "ID" },
                { field: "make", headerName: "制造者" },
                { field: "model", headerName: "型号" },
                { field: "price", headerName: "价格" }
            ],
            getRowId: params => params.data.id,
            defaultColDef: {
                flex: 1
            }
        };
    },
    methods: {
        onGridReady(params) {
            this.gridApi = params.api;
        }
    }
};
</script>

<!--
    pinnedTopRowData
    pinnedBottomRowData
-->
<template>
    <div class="row-pinning-table">
        <ag-grid-vue
            style="width: 100%; height: 500px"
            class="ag-theme-quartz"
            :columnDefs="columnDefs"
            :defaultColDef="defaultColDef"
            :rowData="rowData"
            :pinnedTopRowData="pinnedTopRowData"
            :pinnedBottomRowData="pinnedBottomRowData"
            @grid-ready="onGridReady"
        ></ag-grid-vue>
    </div>
</template>

<script>
export default {
    data() {
        return {
            columnDefs: [
                {
                    field: "athlete",
                    headerName: "运动员"
                },
                {
                    field: "country",
                    headerName: "国家"
                },
                {
                    field: "sport",
                    headerName: "运动"
                }
            ],
            gridApi: null,
            defaultColDef: {
                flex: 1
            },
            pinnedBottomRowData: [
                {
                    athlete: "BOTTOM (athlete)",
                    country: "BOTTOM (country)",
                    sport: "BOTTOM (sport)"
                }
            ],
            pinnedTopRowData: [
                {
                    athlete: "TOP (athlete)",
                    country: "TOP (country)",
                    sport: "TOP (sport)"
                }
            ],
            rowData: null
        };
    },
    methods: {
        onGridReady(params) {
            this.gridApi = params.api;
            fetch(
                "https://www.ag-grid.com/example-assets/olympic-winners.json"
            )
                .then(resp => resp.json())
                .then(data => (this.rowData = data));
        }
    }
};
</script>

<style lang="less"></style>

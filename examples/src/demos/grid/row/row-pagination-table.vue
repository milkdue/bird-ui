<!--
    分页 设置属性 pagination=true

    paginationPageSize: 每页的数量
    paginationPageSizeSelector: 每页的数量选择器
    paginationNumberFormatter: 分页的数字格式化
-->

<template>
    <div class="row-pagination-table">
        <ag-grid-vue
            style="width: 100%; height: 500px"
            class="ag-theme-alpine"
            :columnDefs="colDefs"
            :autoGroupColumnDef="autoGroupColumnDef"
            :defaultColDef="defaultColDef"
            :suppressRowClickSelection="true"
            :groupSelectsChildren="true"
            :rowSelection="rowSelection"
            :rowGroupPanelShow="rowGroupPanelShow"
            :pagination="true"
            :rowData="rowData"
            :paginationPageSize="paginationPageSize"
            :paginationPageSizeSelector="paginationPageSizeSelector"
            :paginationNumberFormatter="paginationNumberFormatter"
            @grid-ready="onGridReady"
            @first-data-rendered="onFirstDataRendered"
        ></ag-grid-vue>
    </div>
</template>

<script>
export default {
    data() {
        return {
            colDefs: [
                {
                    field: "athlete",
                    minWidth: 170,
                    checkboxSelection: params =>
                        params.api.getRowGroupColumns().length === 0,
                    headerCheckboxSelection: params =>
                        params.api.getRowGroupColumns().length === 0,
                    headerName: "运动员"
                },
                {
                    field: "age",
                    headerName: "年龄"
                },
                {
                    field: "country",
                    headerName: "国家"
                },
                {
                    field: "year",
                    headerName: "年份"
                },
                {
                    field: "date",
                    headerName: "日期"
                },
                {
                    field: "sport",
                    headerName: "运动"
                },
                {
                    field: "gold",
                    headerName: "金牌"
                },
                {
                    field: "silver",
                    headerName: "银牌"
                },
                {
                    field: "bronze",
                    headerName: "铜牌"
                },
                {
                    field: "total",
                    headerName: "总计"
                }
            ],
            gridApi: null,
            defaultColDef: {
                editable: true,
                enableRowGroup: true,
                enablePivot: true,
                enableValue: true,
                filter: true,
                flex: 1,
                minWidth: 100
            },
            autoGroupColumnDef: {
                headerName: "分组",
                minWidth: 170,
                field: "athlete",
                valueGetter: params => {
                    if (params.node.group) {
                        return params.node.key;
                    } else {
                        return params.data[params.colDef.field];
                    }
                },
                headerCheckboxSelection: true,
                cellRenderer: "agGroupCellRenderer",
                cellRendererParams: {
                    checkbox: true
                }
            },
            rowSelection: "multiple",
            rowGroupPanelShow: "always",
            rowData: null,
            paginationPageSize: 500,
            paginationPageSizeSelector: [200, 500, 1000],
            paginationNumberFormatter: params => {
                return "[¥" + params.value.toLocaleString() + "¥]";
            }
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
        },
        onFirstDataRendered(params) {
            params.api.paginationGoToPage(4);
        }
    }
};
</script>

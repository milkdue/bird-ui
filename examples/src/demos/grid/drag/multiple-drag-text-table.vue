<!--
    可以单独为列设置 rowDragText 来指定拖拽时显示的文本，如果不指定使用全局的如果还没有使用当前单元格的值
-->

<template>
    <div class="multiple-drag-text-table">
        <ag-grid-vue
            style="width: 100%; height: 500px"
            class="ag-theme-quartz"
            rowDragManaged
            rowDragMultiRow
            :columnDefs="colDefs"
            :defaultColDef="defaultColDef"
            :rowDragText="rowDragText"
            :rowSelection="rowSelection"
            :rowData="rowData"
            @grid-ready="onGridReady"
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
                    rowDrag: true,
                    rowDragText: (params, count) => {
                        return `${count} 运动员 选中`;
                    },
                    headerName: "运动员"
                },
                {
                    field: "country",
                    rowDrag: true,
                    headerName: "国家"
                },
                {
                    field: "year",
                    headerName: "年份",
                    width: 100
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
                }
            ],
            gridApi: null,
            defaultColDef: {
                width: 170,
                filter: true
            },
            rowDragText: params => {
                if (params.rowNode.data.year === 2012) {
                    return params.defaultTextValue + " (2012)";
                } else {
                    return params.defaultTextValue;
                }
            },
            rowSelection: "multiple",
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
                .then(data => {
                    this.rowData = data;
                });
        }
    }
};
</script>

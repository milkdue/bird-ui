<template>
    <div class="auto-size-grid-table">
        <div class="button-group">
            <bird-button
                v-for="button in buttons"
                size="md"
                :key="button.value"
                @click="sizeToFit"
            >
                {{ button.label }}
            </bird-button>
        </div>
        <div class="grid-wrapper">
            <div class="fit-grid-width">
                <ag-grid-vue
                    style="width: 100%; height: 400px"
                    class="ag-theme-alpine"
                    :columnDefs="colDefs"
                    :rowData="rowData"
                    :autoSizeStrategy="autoSizeStrategy"
                    @grid-ready="onGridReady"
                ></ag-grid-vue>
            </div>
            <div class="fit-cell-content">
                <ag-grid-vue
                    style="width: 100%; height: 400px"
                    class="ag-theme-alpine"
                    :columnDefs="colDefs"
                    :rowData="rowData"
                    :autoSizeStrategy="autoSizeStrategyD"
                    @grid-ready="gridReady"
                ></ag-grid-vue>
            </div>
        </div>
    </div>
</template>

<script>
const gridDefs = [
    {
        field: "athlete",
        width: 150,
        headerName: "运动员",
        suppressSizeToFit: true
    },
    {
        field: "age",
        headerName: "年龄",
        width: 50
    },
    {
        field: "country",
        headerName: "国家",
        maxWidth: 300
    },
    {
        field: "year",
        width: 90,
        headerName: "年份"
    },
    {
        field: "sport",
        headerName: "运动",
        width: 110
    },
    {
        field: "gold",
        width: 100,
        headerName: "金牌"
    }
];

export default {
    data() {
        return {
            rowData: null,
            autoSizeStrategy: null,
            autoSizeStrategyD: null,
            colDefs: gridDefs,
            gridApi: null,
            gridDApi: null,
            buttons: [
                {
                    label: "自动调整",
                    value: "sizeToFit"
                }
            ]
        };
    },
    created() {
        this.autoSizeStrategy = {
            type: "fitGridWidth",
            defaultMinWidth: 100,
            columnLimits: [
                {
                    colId: "country",
                    minWidth: 900
                }
            ]
        };
        this.autoSizeStrategyD = {
            type: "fitCellContents"
        };
        fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
            .then(resp => resp.json())
            .then(data => (this.rowData = data));
    },
    methods: {
        sizeToFit() {
            this.gridApi.sizeColumnsToFit({
                defaultMinWidth: 100,
                columnLimits: [
                    {
                        key: "country",
                        minWidth: 900
                    }
                ]
            });
            // this.gridApi.sizeColumnsToFit();
            const allColumnIds = [];
            this.gridDApi
                .getColumns()
                .forEach(column => allColumnIds.push(column.getId()));
            // 两个参数 列Id colId 以及是否忽略 表头内容
            this.gridDApi.autoSizeColumns(allColumnIds, false);
        },
        onGridReady(params) {
            this.gridApi = params.api;
        },
        gridReady(params) {
            this.gridDApi = params.api;
        }
    }
};
</script>

<style lang="less">
    .auto-size-grid-table {
        .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
        .grid-wrapper {
            display: flex;
            flex-direction: column;
            gap: 30px;
        }
    }
</style>

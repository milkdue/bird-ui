<template>
    <div class="pinned-table">
        <div class="button-group">
            <bird-button
                v-for="button in buttons"
                size="md"
                :key="button.value"
                @click="clickButton(button.value)"
            >
                {{ button.label }}
            </bird-button>
        </div>
        <ag-grid-vue
            style="width: 100%; height: 500px"
            class="ag-theme-quartz"
            :columnDefs="colDefs"
            :rowData="rowData"
            @grid-ready="onGridReady"
        ></ag-grid-vue>
    </div>
</template>

<script>
export default {
    data() {
        return {
            buttons: [
                {
                    label: "运动员、年龄、总计冻结",
                    value: "fixed"
                },
                {
                    label: "全部解除冻结",
                    value: "clear"
                },
                {
                    label: "跳转第20行第8列",
                    value: "20-8"
                }
            ],
            gridApi: null,
            rowData: null,
            colDefs: [
                {
                    valueGetter: "node.id",
                    headerName: "序号",
                    pinned: "left"
                },
                {
                    field: "athlete",
                    headerName: "运动员",
                    pinned: "left"
                },
                {
                    field: "age",
                    headerName: "年龄",
                    pinned: "left"
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
                    headerName: "运动",
                    minWidth: 200
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
                    headerName: "总计",
                    pinned: "right"
                }
            ]
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
        clickButton(code) {
            if (code === "fixed") {
                this.gridApi.applyColumnState({
                    state: [
                        { colId: "athlete", pinned: "left" },
                        { colId: "age", pinned: "left" },
                        { colId: "total", pinned: "right" }
                    ],
                    defaultState: { pinned: null }
                });
            } else if (code === "clear") {
                this.gridApi.applyColumnState({
                    defaultState: { pinned: null }
                });
            } else {
                this.gridApi.ensureIndexVisible(20);
                const allColumns = this.gridApi.getColumns();
                if (allColumns) {
                    const column = allColumns[8];
                    if (column) {
                        this.gridApi.ensureColumnVisible(column);
                    }
                }
            }
        }
    }
};
</script>

<style lang="less">
    .pinned-table {
        .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
    }
</style>

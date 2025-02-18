<template>
    <div class="move-table">
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
            :suppressDragLeaveHidesColumns="true"
            :autoSizeStrategy="autoSizeStrategy"
            @grid-ready="onGridReady"
            @column-pinned="onColumnPinned"
        ></ag-grid-vue>
    </div>
</template>

<script>
export default {
    data() {
        return {
            colDefs: [
                {
                    lockPosition: "left",
                    valueGetter: "node.rowIndex",
                    suppressNavigable: true,
                    headerName: "序号"
                },
                {
                    field: "athlete",
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
                    headerName: "总计"
                }
            ],
            autoSizeStrategy: {
                type: "fitCellContents"
            },
            rowData: null,
            gridApi: null,
            buttons: [
                {
                    label: "锁定",
                    value: "lock"
                },
                {
                    label: "解锁",
                    value: "unlock"
                }
            ]
        };
    },
    methods: {
        clickButton(code) {
            if (code === "lock") {
                this.gridApi.applyColumnState({
                    state: [
                        {
                            colId: "athlete",
                            pinned: "left"
                        }
                    ]
                });
            } else {
                this.gridApi.applyColumnState({
                    state: [
                        {
                            colId: "athlete",
                            pinned: null
                        }
                    ]
                });
            }
        },
        onGridReady(params) {
            this.gridApi = params.api;
            fetch(
                "https://www.ag-grid.com/example-assets/olympic-winners.json"
            )
                .then(resp => resp.json())
                .then(data => (this.rowData = data));
        },
        onColumnPinned(event) {
            const allCols = event.api.getAllGridColumns();
            const allFixedCols = allCols.filter(
                col => col.getColDef().lockPosition
            );
            const allNoFixedCols = allCols.filter(
                col => !col.getColDef().lockPosition
            );
            const pinnedCount = allNoFixedCols.filter(
                col => col.getPinned() === "left"
            ).length;
            const pinFixed = pinnedCount > 0;
            const columnStates = [];
            allFixedCols.forEach(col => {
                if (pinFixed !== col.isPinned()) {
                    columnStates.push({
                        colId: col.getColId(),
                        pinned: pinFixed ? "left" : null
                    });
                }
            });

            if (columnStates.length) {
                event.api.applyColumnState({
                    state: columnStates
                });
            }
        }
    }
};
</script>

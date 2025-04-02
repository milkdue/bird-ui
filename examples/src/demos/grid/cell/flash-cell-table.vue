<!--
 设置列属性 enableCellChangeFlash 为 true，单元格值发生变化时会产生闪烁效果
 如果想要该效果变得更长，使用 girdOptions 配置 cellFlashDuration 和 cellFadeDuration 设置闪烁持续时间和淡出时间

 默认的闪烁在值改变后不会应用于过滤的数据，这个行为可以通过 gridOptions 配置 allowShowChangeAfterFilter 来改变

 flash cells 使用的 api
 flashCells: (
    params: FlashCellsParams<TData>
 ) => void;

 interface FlashCellsParams<TData> {
    flashDuration?: number; // 持续时间 ms
    fadeDuration?: number; // 淡出时间 ms
    rowNodes?: IRowNode<TData>[];
    columns?: (string | Column)[];
 }

 自定义闪烁颜色

 每次单元格改变时，这个网格就会添加类名 `ag-cell-data-changed` 到单元格上持续500ms然后添加 `ag-cell-data-changed-animation` 1000ms.
 提供主题去应用到背景颜色去重写这些样式 `--ag-value-change-value-highlight-background-color` 来控制背景颜色
-->

<template>
    <div class="flash-cell-table" :class="{ 'custom-flash-color': custom }">
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
            :defaultColDef="defaultColDef"
            :rowData="rowData"
            @grid-ready="onGridReady"
        ></ag-grid-vue>
    </div>
</template>

<script>
function formatNumber(number) {
    return Math.floor(number).toLocaleString();
}
function createRowData() {
    let rowData = [];
    for (let i = 0; i < 20; i++) {
        rowData.push({
            a: Math.floor(((i + 323) * 25435) % 10000),
            b: Math.floor(((i + 323) * 23221) % 10000),
            c: Math.floor(((i + 323) * 468276) % 10000),
            d: 0,
            e: 0,
            f: 0
        });
    }
    return rowData;
}
export default {
    data() {
        return {
            colDefs: [
                { field: "a" },
                { field: "b" },
                { field: "c" },
                { field: "d" },
                { field: "e" },
                { field: "f" }
            ],
            gridApi: null,
            defaultColDef: {
                flex: 1,
                cellClass: "align-right",
                enableCellChangeFlash: true,
                valueFormatter: params => formatNumber(params.value)
            },
            buttons: [
                {
                    label: "更新一些数据",
                    value: "updateSomeValues"
                },
                {
                    label: "闪烁时间10s",
                    value: "flashDuration"
                },
                {
                    label: "淡出时间10s",
                    value: "fadeDuration"
                },
                {
                    label: "重置时间",
                    value: "resetDuration"
                },
                {
                    label: "闪烁单元格",
                    value: "flashCell"
                },
                {
                    label: "闪烁两行",
                    value: "flashRows"
                },
                {
                    label: "闪烁两列",
                    value: "flashColumns"
                },
                {
                    label: "自定义闪烁颜色",
                    value: "customFlashColor"
                },
                {
                    label: "恢复默认颜色",
                    value: "resetFlashColor"
                }
            ],
            custom: false
        };
    },
    created() {
        this.rowData = createRowData();
    },
    methods: {
        onUpdateSomeValues() {
            let rowCount = this.gridApi.getDisplayedRowCount();
            for (let i = 0; i < 20; i++) {
                let row = Math.floor(Math.random() * rowCount);
                let rowNode = this.gridApi.getDisplayedRowAtIndex(row);
                let col = ["a", "b", "c", "d", "e", "f"][i % 6];
                rowNode.setDataValue(
                    col,
                    Math.floor(Math.random() * 10000)
                );
            }
        },
        onCellFlashDurationChange(value) {
            this.gridApi.setGridOption("cellFlashDuration", value);
        },
        onCellFadeDurationChange(value) {
            this.gridApi.setGridOption("cellFadeDuration", value);
        },
        onFlashCell() {
            let rowNode = this.gridApi.getDisplayedRowAtIndex(4);
            this.gridApi.flashCells({
                rowNodes: [rowNode],
                columns: ["c"]
            });
        },
        onFlashRows() {
            let rowNode1 = this.gridApi.getDisplayedRowAtIndex(4);
            let rowNode2 = this.gridApi.getDisplayedRowAtIndex(5);
            this.gridApi.flashCells({ rowNodes: [rowNode1, rowNode2] });
        },
        onFlashColumns() {
            this.gridApi.flashCells({ columns: ["c", "d"] });
        },
        onGridReady(params) {
            this.gridApi = params.api;
        },
        clickButton(value) {
            if (value === "updateSomeValues") {
                this.onUpdateSomeValues();
            } else if (value === "flashDuration") {
                this.onCellFlashDurationChange(10000);
            } else if (value === "fadeDuration") {
                this.onCellFadeDurationChange(10000);
            } else if (value === "resetDuration") {
                this.onCellFlashDurationChange(500);
                this.onCellFadeDurationChange(1000);
            } else if (value === "flashCell") {
                this.onFlashCell();
            } else if (value === "flashRows") {
                this.onFlashRows();
            } else if (value === "flashColumns") {
                this.onFlashColumns();
            } else if (value === "customFlashColor") {
                this.custom = true;
            } else if (value === "resetFlashColor") {
                this.custom = false;
            }
        }
    }
};
</script>

<style lang="less">
    .flash-cell-table {
        .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
        &.custom-flash-color {
            .ag-theme-quartz {
                --ag-value-change-value-highlight-background-color: #c224;
            }
        }
    }
</style>

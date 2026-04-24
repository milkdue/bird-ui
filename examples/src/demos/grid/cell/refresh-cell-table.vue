<!--
    视图刷新
    1. 刷新单元格 api.refreshCells(cellRefreshParams)
    2. 刷新行 api.redrawRows(redrawRowsParams)
    优先使用 refreshCells，性能超过 redrawRows，除非 refreshCells 无法满足需求。

    refreshCells: (
        params: RefreshCellsParams<TData>
    ) => void;

    interface RefreshCellsParams<TData> {
        force?: boolean;
        suppressFlash?: boolean;
        rowNodes?: IRowNode<TData>[];
        columns?: (string | Column)[]
    }
-->

<template>
    <div class="refresh-cell-table">
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
            class="ag-theme-alpine"
            :columnDefs="colDefs"
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
            colDefs: [
                { field: "a", enableCellChangeFlash: false },
                { field: "b" },
                { field: "c" },
                { field: "d" },
                { field: "e" },
                { field: "f" }
            ],
            gridApi: null,
            defaultColDef: {
                flex: 1,
                enableCellChangeFlash: true
            },
            rowData: [],
            pinnedTopRowData: [],
            pinnedBottomRowData: [],
            buttons: [
                {
                    label: "刷新所有单元格",
                    value: "refreshAllCells"
                },
                {
                    label: "从左往右刷新单元格",
                    value: "refreshCellsLeftToRight"
                },
                {
                    label: "从上往下刷新单元格",
                    value: "refreshCellsTopToBottom"
                },
                {
                    label: "开启强制刷新",
                    value: "enableForceRefresh"
                },
                {
                    label: "关闭强制刷新",
                    value: "disableForceRefresh"
                },
                {
                    label: "禁用单元格闪烁",
                    value: "disableCellChangeFlash"
                },
                {
                    label: "启用单元格闪烁",
                    value: "enableCellChangeFlash"
                }
            ],
            force: false,
            flash: true
        };
    },
    methods: {
        createData(count) {
            let data = [];
            for (let i = 0; i < count; i++) {
                data.push({
                    a: (i * 863) % 100,
                    b: (i * 811) % 100,
                    c: (i * 743) % 100,
                    d: (i * 677) % 100,
                    e: (i * 619) % 100,
                    f: (i * 571) % 100
                });
            }
            return data;
        },
        onGridReady(params) {
            this.gridApi = params.api;
            this.rowData = this.createData(14);
            this.pinnedTopRowData = this.createData(2);
            this.pinnedBottomRowData = this.createData(2);
        },
        scrambleData() {
            const { scrambleItem } = this;
            this.rowData.forEach(scrambleItem);
            this.pinnedTopRowData.forEach(scrambleItem);
            this.pinnedBottomRowData.forEach(scrambleItem);
        },
        scrambleItem(item) {
            ["a", "b", "c", "d", "e", "f"].forEach(colId => {
                if (Math.random() > 0.5) {
                    return;
                }
                item[colId] = Math.floor(Math.random() * 100);
            });
        },
        enableForceRefresh() {
            this.force = true;
        },
        disableForceRefresh() {
            this.force = false;
        },
        enableCellChangeFlash() {
            this.flash = true;
        },
        disableCellChangeFlash() {
            this.flash = false;
        },
        refreshAllCells() {
            const { force, flash, scrambleData } = this;
            scrambleData();
            let params = {
                force: force,
                suppressFlash: !flash
            };
            this.gridApi.refreshCells(params);
        },
        refreshCellsLeftToRight() {
            const { force, flash, refreshAfterMillis, scrambleData } = this;
            scrambleData();
            ["a", "b", "c", "d", "e", "f"].forEach((col, index) => {
                let millis = index * 100;
                let params = {
                    force,
                    suppressFlash: !flash,
                    columns: [col]
                };
                refreshAfterMillis(params, millis);
            });
        },
        refreshAfterMillis(params, millis) {
            const { gridApi } = this;
            setTimeout(() => {
                gridApi.refreshCells(params);
            }, millis);
        },
        refreshCellsTopToBottom() {
            const {
                scrambleData,
                gridApi,
                force,
                flash,
                refreshAfterMillis
            } = this;
            scrambleData();
            let frame = 0;
            let i;
            let rowNode;
            for (i = 0; i < gridApi.getPinnedTopRowCount(); i++) {
                rowNode = gridApi.getPinnedTopRow(i);
                refreshRow(rowNode, gridApi);
            }
            for (i = 0; i < gridApi.getDisplayedRowCount(); i++) {
                rowNode = gridApi.getDisplayedRowAtIndex(i);
                refreshRow(rowNode, gridApi);
            }
            for (i = 0; i < gridApi.getPinnedBottomRowCount(); i++) {
                rowNode = gridApi.getPinnedBottomRow(i);
                refreshRow(rowNode, gridApi);
            }
            function refreshRow(rowNode, api) {
                let millis = frame++ * 100;
                let rowNodes = [rowNode];
                let params = {
                    force,
                    suppressFlash: !flash,
                    rowNodes
                };
                refreshAfterMillis(params, millis);
            }
        },
        clickButton(value) {
            this[value]();
        }
    }
};
</script>
<style lang="less">
    .refresh-cell-table {
        .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
    }
</style>

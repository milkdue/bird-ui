<!--
    可以使用 cellComponent 来实现自定义的单元格改变的效果，ag-grid 提供了两个动画效果

    其中包括
        1. agAnimateShowChangeCellRenderer
        2. agAnimateSlideCellRenderer
-->
<template>
    <div class="flash-animate-table">
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
function createRowData() {
    let rowData = [];
    for (let i = 0; i < 20; i++) {
        rowData.push({
            a: Math.floor(((i + 323) * 145045) % 10000),
            b: Math.floor(((i + 323) * 543020) % 10000),
            c: Math.floor(((i + 323) * 305920) % 10000),
            d: Math.floor(((i + 323) * 204950) % 10000),
            e: Math.floor(((i + 323) * 103059) % 10000),
            f: Math.floor(((i + 323) * 468276) % 10000)
        });
    }
    return rowData;
}
function formatNumber(number) {
    return Math.floor(number).toLocaleString();
}
export default {
    data() {
        return {
            colDefs: [
                {
                    field: "a",
                    enableCellChangeFlash: true
                },
                {
                    field: "b",
                    enableCellChangeFlash: true
                },
                {
                    field: "c",
                    cellRenderer: "agAnimateShowChangeCellRenderer"
                },
                {
                    field: "d",
                    cellRenderer: "agAnimateShowChangeCellRenderer"
                },
                {
                    field: "e",
                    cellRenderer: "agAnimateSlideCellRenderer"
                },
                {
                    field: "f",
                    cellRenderer: "agAnimateSlideCellRenderer"
                }
            ],
            gridApi: null,
            defaultColDef: {
                flex: 1,
                cellClass: "align-right",
                valueFormatter: params => formatNumber(params.value)
            },
            rowData: null
        };
    },
    created() {
        this.rowData = createRowData();
    },
    methods: {
        onGridReady(params) {
            this.gridApi = params.api;
            const updateValues = () => {
                let rowCount = params.api.getDisplayedRowCount();
                for (let i = 0; i < 2; i++) {
                    let row = Math.floor(Math.random() * rowCount);
                    let rowNode = params.api.getDisplayedRowAtIndex(row);
                    let col = ["a", "b", "c", "d", "e", "f"][
                        Math.floor(Math.random() * 6)
                    ];
                    rowNode.setDataValue(
                        col,
                        Math.floor(Math.random() * 10000)
                    );
                }
            };
            let timer = setInterval(updateValues, 250);
            this.$once("hook:beforeDestroy", () => {
                clearInterval(timer);
            });
        }
    }
};
</script>
<style lang="less">
    .flash-animate-table {
        .align-right {
            text-align: right;
        }
    }
</style>

<!--
    redrawRows: (
        params: RedrawRowsParams<TData>
    ) => void;

    interface RedrawRowsParams<TData> {
        rowNodes?: IRowNode<TData>[];
    }
-->

<template>
    <div class="redraw-row-table">
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
            :getRowStyle="getRowStyle"
            @grid-ready="onGridReady"
        ></ag-grid-vue>
    </div>
</template>
<script>
const colors = ["#99999944", "#CC333344", "#33CC3344", "#2244CC44"];
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
                flex: 1
            },
            rowData: null,
            colorIndex: 0,
            getRowStyle: null,
            buttons: [
                {
                    label: "重绘所有行",
                    value: "redrawAllRows"
                },
                {
                    label: "重绘上面6行",
                    value: "redrawTopRows"
                }
            ]
        };
    },
    created() {
        this.rowData = this.createData(12);
        this.getRowStyle = () => {
            return {
                backgroundColor: colors[this.colorIndex]
            };
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
        },
        clickButton(value) {
            this[value]();
        },
        progressColor() {
            this.colorIndex++;
            if (this.colorIndex === colors.length) {
                this.colorIndex = 0;
            }
        },
        redrawAllRows() {
            this.progressColor();
            this.gridApi.redrawRows();
        },
        redrawTopRows() {
            this.progressColor();
            let rows = [];
            for (let i = 0; i < 6; i++) {
                let row = this.gridApi.getDisplayedRowAtIndex(i);
                rows.push(row);
            }
            this.gridApi.redrawRows({ rowNodes: rows });
        }
    }
};
</script>
<style lang="less">
    .redraw-row-table {
        .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
    }
</style>

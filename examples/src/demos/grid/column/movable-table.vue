<template>
    <div class="movable-table">
        <div class="legend-bar">
            <div class="legend-item locked-column-item">
                <span class="legend-color"></span>
                <span class="legend-label">锁定列</span>
            </div>
            <div class="legend-item movable-column-item">
                <span class="legend-color"></span>
                <span class="legend-label">不可移动列</span>
            </div>
        </div>
        <ag-grid-vue
            style="width: 100%; height: 500px"
            class="ag-theme-quartz"
            :columnDefs="colDefs"
            :defaultColDef="defaultColDef"
            :suppressDragLeaveHidesColumns="true"
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
                    headerName: "运动员",
                    cellClass: "suppress-movable",
                    suppressMovable: true
                },
                {
                    field: "age",
                    lockPosition: "left",
                    cellClass: "locked-column",
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
                    field: "total",
                    lockPosition: "right",
                    cellClass: "locked-column"
                }
            ],
            defaultColDef: {
                flex: 1,
                lockPinned: true // 锁定列冻结住
            },
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

<style lang="less">
    .movable-table {
        @locked-color: #99999944;
        @movable-color: #33cc3344;
        .legend-bar {
            display: flex;
            margin-bottom: 10px;
            gap: 10px;
            .legend-item {
                display: flex;
                gap: 5px;
                .legend-color {
                    display: block;
                    width: 18px;
                    height: 18px;
                }
                &.locked-column-item {
                    .legend-color {
                        background-color: @locked-color;
                    }
                }
                &.movable-column-item {
                    .legend-color {
                        background-color: @movable-color;
                    }
                }
            }
        }
        .locked-column {
            background-color: @locked-color;
        }
        .suppress-movable {
            background-color: @movable-color;
        }
    }
</style>

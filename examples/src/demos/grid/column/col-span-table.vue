<template>
    <div class="col-span-table">
        <ag-grid-vue
            style="width: 100%; height: 500px"
            class="ag-theme-quartz"
            :columnDefs="colDefs"
            :getRowHeight="getRowHeight"
            :rowData="rowData"
            :defaultColDef="defaultColDef"
            :autoSizeStrategy="autoSizeStrategy"
            @grid-ready="onGridReady"
        ></ag-grid-vue>
    </div>
</template>

<script>
function isHeaderRow(params) {
    return params.data.section === "big-title";
}

function isQuarterRow(params) {
    return params.data.section === "quarters";
}

const cellClassRules = {
    "header-cell": 'data.section === "big-title"',
    "quarters-cell": 'data.section === "quarters"'
};
export default {
    data() {
        return {
            rowData: [
                { section: "big-title", jan: "Warehouse 1" },
                { section: "quarters", jan: "Q1", apr: "Q2" },
                {
                    jan: 534,
                    feb: 612,
                    mar: 243,
                    apr: 231,
                    may: 428,
                    jun: 231
                },
                {
                    jan: 765,
                    feb: 146,
                    mar: 243,
                    apr: 231,
                    may: 428,
                    jun: 231
                },
                {
                    jan: 335,
                    feb: 122,
                    mar: 243,
                    apr: 231,
                    may: 428,
                    jun: 231
                },
                {
                    jan: 35,
                    feb: 342,
                    mar: 243,
                    apr: 231,
                    may: 428,
                    jun: 231
                },
                {
                    jan: 568,
                    feb: 531,
                    mar: 243,
                    apr: 231,
                    may: 428,
                    jun: 231
                },
                {
                    jan: 365,
                    feb: 361,
                    mar: 243,
                    apr: 231,
                    may: 428,
                    jun: 231
                },
                { section: "big-title", jan: "Warehouse 2" },
                { section: "quarters", jan: "Q1", apr: "Q2" },
                { jan: 21, feb: 12, mar: 24, apr: 31, may: 28, jun: 31 },
                { jan: 21, feb: 12, mar: 24, apr: 31, may: 28, jun: 31 },
                { jan: 21, feb: 12, mar: 24, apr: 31, may: 28, jun: 31 },
                { jan: 21, feb: 12, mar: 24, apr: 31, may: 28, jun: 31 },
                { jan: 2, feb: 32, mar: 24, apr: 31, may: 48, jun: 21 },
                { jan: 21, feb: 12, mar: 24, apr: 31, may: 28, jun: 31 }
            ],
            colDefs: [
                {
                    field: "jan",
                    headerName: "一月",
                    colSpan: params => {
                        if (isHeaderRow(params)) {
                            return 6;
                        } else if (isQuarterRow(params)) {
                            return 3;
                        } else {
                            return 1;
                        }
                    },
                    cellClassRules
                },
                {
                    field: "feb",
                    headerName: "二月"
                },
                {
                    field: "mar",
                    headerName: "三月"
                },
                {
                    field: "apr",
                    headerName: "四月",
                    colSpan: params => {
                        if (isQuarterRow(params)) {
                            return 3;
                        } else {
                            return 1;
                        }
                    },
                    cellClassRules
                },
                {
                    field: "may",
                    headerName: "五月"
                },
                {
                    field: "jun",
                    headerName: "六月"
                }
            ],
            gridApi: null,
            defaultColDef: {
                width: 100
            },
            getRowHeight: params => {
                if (isHeaderRow(params)) {
                    return 60;
                }
            },
            autoSizeStrategy: {
                type: "fitGridWidth"
            }
        };
    },
    methods: {
        onGridReady(params) {
            this.gridApi = params.api;
        }
    }
};
</script>

<style lang="less">
    .col-span-table {
        .header-cell {
            font-size: 25px;
            font-weight: bold;
            text-align: center;
            background-color: #24c4;
        }
        .quarters-cell {
            font-weight: bold;
            background-color: #24c4;
        }
    }
</style>

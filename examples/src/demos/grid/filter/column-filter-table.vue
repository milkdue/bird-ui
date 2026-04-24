<!--
    column filter 类型，能够使用提供的过滤组件或者能够使用自定义的过滤组件
-->
<template>
    <div class="column-filter-table">
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
export default {
    data() {
        return {
            colDefs: [
                { field: "athlete", headerName: "运动员" },
                {
                    field: "age",
                    headerName: "年龄",
                    filter: "agNumberColumnFilter",
                    maxWidth: 100
                },
                {
                    field: "date",
                    headerName: "日期",
                    filter: "agDateColumnFilter",
                    filterParams: {
                        comparator: (
                            filterLocalDateAtMidnight,
                            cellValue
                        ) => {
                            let dateAsString = cellValue;
                            if (!dateAsString) return -1;
                            let dateParts = dateAsString.split("/");
                            let cellDate = new Date(
                                Number(dateParts[2]),
                                Number(dateParts[1]) - 1,
                                Number(dateParts[0])
                            );
                            if (
                                filterLocalDateAtMidnight.getTime() ===
                                    cellDate.getTime()
                            ) {
                                return 0;
                            }
                            if (cellDate < filterLocalDateAtMidnight) {
                                return -1;
                            }
                            if (cellDate > filterLocalDateAtMidnight) {
                                return 1;
                            }
                            return 0;
                        }
                    }
                },
                {
                    field: "country",
                    headerName: "国家",
                    filter: "agSetColumnFilter"
                },
                {
                    field: "sport",
                    headerName: "体育项目",
                    filter: "agMultiColumnFilter"
                },
                {
                    field: "silver",
                    headerName: "金牌",
                    filter: "agNumberColumnFilter"
                },
                {
                    field: "bronze",
                    headerName: "银牌",
                    filter: "agNumberColumnFilter"
                },
                { field: "total", filter: false }
            ],
            gridApi: null,
            defaultColDef: {
                flex: 1,
                minWidth: 150,
                filter: "agTextColumnFilter",
                menuTabs: ["filterMenuTab"]
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

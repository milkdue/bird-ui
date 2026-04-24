<!--
    setFilter 默认按照选项的字符串进行排序
-->
<template>
    <div class="sort-filter-list-table">
        <ag-grid-vue
            style="width: 100%; height: 500px"
            class="ag-theme-quartz"
            :columnDefs="colDefs"
            :defaultColDef="defaultColDef"
            :rowData="rowData"
            :sideBar="sideBar"
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
                    headerName: "年龄(未提供排序)",
                    field: "age",
                    filter: "agSetColumnFilter"
                },
                {
                    headerName: "年龄(提供排序)",
                    field: "age",
                    filter: "agSetColumnFilter",
                    filterParams: {
                        comparator: (a, b) => {
                            const A = !a ? 0 : parseInt(a, 10);
                            const B = !b ? 0 : parseInt(b, 10);
                            return A === B ? 0 : A > B ? 1 : -1;
                        }
                    }
                }
            ],
            gridApi: null,
            defaultColDef: {
                flex: 1,
                filter: true,
                cellDataType: false
            },
            rowData: null,
            sideBar: "filters"
        };
    },
    methods: {
        onGridReady(params) {
            this.gridApi = params.api;
            this.rowData = this.getRowData();
            params.api.getToolPanelInstance("filters").expandFilters();
        },
        getRowData() {
            let rows = [];
            for (let i = 1; i < 117; i++) {
                rows.push({ age: i });
            }
            return rows;
        }
    }
};
</script>

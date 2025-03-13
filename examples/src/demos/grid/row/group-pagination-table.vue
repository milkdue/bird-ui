<!--
    分页的第二种模式，是否包含子项，当有分组时，子项默认不会计算到分页页数当中去(子项展开的情况下)
    设置 paginateChildRows 为 true 则包含子项
-->

<template>
    <div class="group-pagination-table">
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
            pagination
            :key="gridKey"
            :columnDefs="colDefs"
            :paginationPageSize="pageSize"
            :paginationPageSizeSelector="pageSizeSelector"
            :paginateChildRows="paginateChildRows"
            :animateRows="false"
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
            buttons: [
                {
                    label: "包含子项",
                    value: true
                },
                {
                    label: "不包含子项",
                    value: false
                }
            ],
            colDefs: [
                {
                    headerName: "运动员",
                    field: "athlete"
                },
                {
                    headerName: "年龄",
                    field: "age"
                },
                {
                    headerName: "国家",
                    field: "country",
                    rowGroup: true
                },
                {
                    headerName: "年份",
                    rowGroup: true,
                    field: "year"
                },
                {
                    headerName: "日期",
                    field: "date"
                },
                {
                    headerName: "运动",
                    field: "sport",
                    rowGroup: true
                },
                {
                    headerName: "金牌",
                    field: "gold"
                },
                {
                    headerName: "银牌",
                    field: "silver"
                },
                {
                    headerName: "铜牌",
                    field: "bronze"
                },
                {
                    headerName: "总计",
                    field: "total"
                }
            ],
            gridApi: null,
            defaultColDef: {
                editable: true,
                filter: true,
                flex: 1,
                minWidth: 190
            },
            pageSize: 10,
            pageSizeSelector: [10, 20, 50, 100],
            rowData: null,
            paginateChildRows: true,
            gridKey: "1"
        };
    },
    methods: {
        onGridReady(params) {
            this.gridApi = params.api;
            fetch(
                "https://www.ag-grid.com/example-assets/olympic-winners.json"
            )
                .then(resp => resp.json())
                .then(data => {
                    this.rowData = data;
                });
        },
        clickButton(value) {
            this.paginateChildRows = value;
            this.gridKey = `${new Date().getTime()}`;
        }
    }
};
</script>

<style lang="less">
    .group-pagination-table {
        .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
    }
</style>

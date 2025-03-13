<!--
    gridOptions: {
        alignedGrids: () => [gridApi]
    }
-->
<template>
    <div class="align-grid-table">
        <div class="align-grid">
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
                style="margin-bottom: 10px; width: 100%; height: 300px"
                ref="topGrid"
                class="ag-theme-alpine"
                :columnDefs="colDefs"
                :rowData="rowData"
                :gridOptions="topOptions"
                @grid-ready="onGridReady($event)"
            ></ag-grid-vue>
            <ag-grid-vue
                ref="bottomGrid"
                style="width: 100%; height: 300px"
                class="ag-theme-alpine"
                :columnDefs="colDefs"
                :rowData="rowData"
                :gridOptions="bottomOptions"
            ></ag-grid-vue>
        </div>
        <div class="align-grid-as-footer">
            <ag-grid-vue
                style="width: 100%; height: 300px"
                ref="footerTopGrid"
                class="ag-theme-alpine"
                :gridOptions="footerTopGridOptions"
                :columnDefs="footerColumnDefs"
                :rowData="rowData"
                @grid-ready="footerGridReady"
            ></ag-grid-vue>
            <ag-grid-vue
                style="width: 100%; height: 60px"
                ref="footerBottomGrid"
                class="ag-theme-alpine"
                :gridOptions="footerBottomGridOptions"
                :headerHeight="0"
                :columnDefs="footerColumnDefs"
                :rowData="bottomData"
            ></ag-grid-vue>
        </div>
        <div class="align-column-group">
            <ag-grid-vue
                style="width: 100%; height: 300px"
                class="ag-theme-alpine"
                ref="groupTopGrid"
                :gridOptions="groupTopGridOptions"
                :columnDefs="groupColumnDefs"
                :rowData="rowData"
            ></ag-grid-vue>
            <ag-grid-vue
                style="width: 100%; height: 300px"
                class="ag-theme-alpine"
                ref="groupBottomGrid"
                :gridOptions="groupBottomGridOptions"
                :columnDefs="groupColumnDefs"
                :rowData="rowData"
            ></ag-grid-vue>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            buttons: [
                {
                    label: "显示/隐藏运动员",
                    value: "athlete"
                },
                {
                    label: "显示/隐藏年龄",
                    value: "age"
                },
                {
                    label: "显示/隐藏国家",
                    value: "country"
                }
            ],
            colDefs: [
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
                    field: "sport",
                    headerName: "运动"
                },
                {
                    headerName: "奖牌信息",
                    groupId: "medals",
                    children: [
                        {
                            columnGroupShow: "closed",
                            colId: "total",
                            valueGetter:
                                    "data.gold + data.silver + data.bronze",
                            width: 200
                        },
                        {
                            columnGroupShow: "open",
                            field: "gold",
                            width: 100,
                            headerName: "金牌"
                        },
                        {
                            columnGroupShow: "open",
                            field: "silver",
                            width: 100,
                            headerName: "银牌"
                        },
                        {
                            columnGroupShow: "open",
                            field: "bronze",
                            width: 100,
                            headerName: "铜牌"
                        }
                    ]
                }
            ],
            rowData: null,
            topOptions: {
                alignedGrids: () => [this.$refs.bottomGrid],
                defaultColDef: {
                    filter: true,
                    minWidth: 100
                },
                autoSizeStrategy: {
                    type: "fitGridWidth"
                }
            },
            bottomOptions: {
                alignedGrids: () => [this.$refs.topGrid],
                defaultColDef: {
                    filter: true,
                    minWidth: 100
                }
            },
            topGridApi: null,
            footerGridApi: null,
            footerTopGridOptions: {
                alignedGrids: () => [this.$refs.footerBottomGrid],
                defaultColDef: {
                    filter: true,
                    flex: 1,
                    minWidth: 100
                },
                suppressHorizontalScroll: true,
                alwaysShowVerticalScroll: true,
                autoSizeStrategy: {
                    type: "fitCellContents"
                }
            },
            footerBottomGridOptions: {
                alignedGrids: () => [this.$refs.footerTopGrid],
                defaultColDef: {
                    filter: true,
                    flex: 1,
                    minWidth: 100
                },
                alwaysShowVerticalScroll: true
            },
            footerColumnDefs: [
                { field: "athlete", width: 200, headerName: "运动员" },
                { field: "age", width: 150, headerName: "年龄" },
                { field: "country", width: 150, headerName: "国家" },
                { field: "year", width: 120, headerName: "年份" },
                { field: "date", width: 150, headerName: "日期" },
                { field: "sport", width: 150, headerName: "运动" },
                {
                    colId: "total",
                    valueGetter: "data.gold + data.silver + data.bronze",
                    width: 200,
                    headerName: "总计"
                },
                { field: "gold", width: 100, headerName: "金牌" },
                { field: "silver", width: 100, headerName: "银牌" },
                { field: "bronze", width: 100, headerName: "铜牌" }
            ],
            bottomData: [
                {
                    athlete: "Total",
                    age: "15 - 61",
                    country: "Ireland",
                    year: "2020",
                    date: "26/11/1970",
                    sport: "Synchronised Riding",
                    gold: 55,
                    silver: 65,
                    bronze: 12
                }
            ],
            groupTopGridOptions: {
                alignedGrids: () => [this.$refs.groupBottomGrid],
                defaultColDef: {
                    filter: true,
                    flex: 1,
                    minWidth: 120
                },
                autoSizeStrategy: {
                    type: "fitGridWidth"
                }
            },
            groupBottomGridOptions: {
                alignedGrids: () => [this.$refs.groupTopGrid],
                defaultColDef: {
                    filter: true,
                    flex: 1,
                    minWidth: 120
                }
            },
            groupColumnDefs: [
                {
                    headerName: "运动员信息1",
                    groupId: "group1",
                    children: [
                        {
                            field: "athlete",
                            pinned: true,
                            headerName: "运动员"
                        },
                        {
                            field: "age",
                            pinned: true,
                            columnGroupShow: "open",
                            headerName: "年龄"
                        },
                        {
                            field: "country",
                            headerName: "国家"
                        },
                        {
                            field: "year",
                            columnGroupShow: "open",
                            headerName: "年份"
                        },
                        {
                            field: "date",
                            headerName: "日期"
                        },
                        {
                            field: "sport",
                            headerName: "运动",
                            columnGroupShow: "open"
                        }
                    ]
                },
                {
                    headerName: "运动员信息2",
                    groupId: "group2",
                    children: [
                        {
                            field: "athlete",
                            pinned: true,
                            headerName: "运动员"
                        },
                        {
                            field: "age",
                            pinned: true,
                            columnGroupShow: "open",
                            headerName: "年龄"
                        },
                        {
                            field: "country",
                            headerName: "国家"
                        },
                        {
                            field: "year",
                            columnGroupShow: "open",
                            headerName: "年份"
                        },
                        {
                            field: "date",
                            headerName: "日期"
                        },
                        {
                            field: "sport",
                            headerName: "运动",
                            columnGroupShow: "open"
                        }
                    ]
                }
            ]
        };
    },
    created() {
        fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
            .then(resp => resp.json())
            .then(rowData => (this.rowData = rowData));
    },
    methods: {
        onGridReady(params) {
            this.topGridApi = params.api;
        },
        footerGridReady(params) {
            this.footerGridApi = params.api;
        },
        clickButton(code) {
            let columns = this.topGridApi.getColumnDefs();
            let column = columns.filter(item => item.field === code).pop();
            console.log(column, "column");
            if (column) {
                this.topGridApi.setColumnsVisible([code], !!column.hide);
            }
        }
    }
};
</script>

<style lang="less">
    .align-grid-table {
        display: flex;
        flex-direction: column;
        gap: 30px;
        .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
        .align-column-group {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
    }
</style>

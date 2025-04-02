<!--
    设置 paginationAutoPageSize 为 true，表格将会根据每一页能显示的行数自动调整每页的数量
    如果调整了容器高度，每页的数量也会发生改变 行高改变不会影响到每页的数量

    当设置了 paginationAutoPageSize 不会展示选择分页数量的下拉框 并且会忽略 paginationPageSizeSelector 配置
-->
<template>
    <div v-exposure.once="exposureEvent">
        <div v-if="showContent" class="auto-page-size-table">
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
                class="ag-theme-alpine"
                :style="style"
                :columnDefs="colDefs"
                :autoGroupColumnDef="autoGroupColumnDef"
                :defaultColDef="defaultColDef"
                :suppressRowClickSelection="true"
                :groupSelectsChildren="true"
                :rowSelection="rowSelection"
                :rowGroupPanelShow="rowGroupPanelShow"
                :pagination="true"
                :rowData="rowData"
                :paginationAutoPageSize="true"
                @grid-ready="onGridReady"
            ></ag-grid-vue>
        </div>
    </div>
</template>

<script>
import CommonMixin from "../common.mixin";
export default {
    mixins: [CommonMixin],
    data() {
        return {
            colDefs: [
                {
                    field: "athlete",
                    minWidth: 170,
                    checkboxSelection: params =>
                        params.api.getRowGroupColumns().length === 0,
                    headerCheckboxSelection: params =>
                        params.api.getRowGroupColumns().length === 0,
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
                    field: "year",
                    headerName: "年份"
                },
                {
                    field: "date",
                    headerName: "日期"
                },
                {
                    field: "sport",
                    headerName: "运动"
                },
                {
                    field: "gold",
                    headerName: "金牌"
                },
                {
                    field: "silver",
                    headerName: "银牌"
                },
                {
                    field: "bronze",
                    headerName: "铜牌"
                },
                {
                    field: "total",
                    headerName: "总计"
                }
            ],
            gridApi: null,
            defaultColDef: {
                editable: true,
                enableRowGroup: true,
                enablePivot: true,
                enableValue: true,
                filter: true,
                flex: 1,
                minWidth: 100
            },
            autoGroupColumnDef: {
                headerName: "分组",
                minWidth: 170,
                field: "athlete",
                valueGetter: params => {
                    if (params.node.group) {
                        return params.node.key;
                    } else {
                        return params.data[params.colDef.field];
                    }
                },
                headerCheckboxSelection: true,
                cellRenderer: "agGroupCellRenderer",
                cellRendererParams: {
                    checkbox: true
                }
            },
            rowSelection: "multiple",
            rowGroupPanelShow: "always",
            rowData: null,
            buttons: [
                {
                    label: "500 -- 高度",
                    value: 500
                },
                {
                    label: "700 -- 高度",
                    value: 700
                }
            ],
            height: 500
        };
    },
    computed: {
        style() {
            return {
                height: this.height + "px",
                width: "100%"
            };
        }
    },
    methods: {
        onGridReady(params) {
            this.gridApi = params.api;
            fetch(
                "https://www.ag-grid.com/example-assets/olympic-winners.json"
            )
                .then(resp => resp.json())
                .then(data => (this.rowData = data));
        },
        clickButton(code) {
            this.height = code;
        }
    }
};
</script>

<style lang="less">
    .auto-page-size-table {
        .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
    }
</style>

<!--
    gradApi 获取列配置
        this.gridApi.getColumnDefs()
-->
<template>
    <div v-exposure.once="exposureEvent">
        <div v-if="showContent" class="column-event-table">
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
                :rowData="rowData"
                @grid-ready="onGridReady"
                @sort-changed="sortEvent"
                @column-resized="resizeEvent"
                @column-visible="visibleEvent"
                @column-pivot-changed="pivotEvent"
                @column-row-group-changed="rowGroupEvent"
                @column-value-changed="valueEvent"
                @column-moved="moveEvent"
                @column-pinned-changed="pinnedEvent"
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
            // defaultColDef: {
            //     enableRowGroup: true,
            //     enablePivot: true,
            //     enableValue: true
            // },
            colDefs: [
                {
                    field: "athlete",
                    headerName: "运动员"
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
                    field: "year",
                    headerName: "年份"
                },
                {
                    field: "date",
                    headerName: "日期"
                }
            ],
            gridApi: null,
            rowData: null,
            buttons: [
                {
                    label: "隐藏/显示年龄",
                    value: "age"
                },
                {
                    label: "分组/取消分组运动",
                    value: "sport"
                },
                // {
                //     label: "数据透视",
                //     value: "country"
                // },
                {
                    label: "统计函数",
                    value: "aggFunc"
                },
                {
                    label: "冻结/取消冻结运动员",
                    value: "athlete"
                }
            ]
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
        },
        clickButton(code) {
            let colDefs = this.getColDefs();
            let columns = this.gridApi.getColumnDefs();

            if (code !== "aggFunc") {
                let column = columns
                    .filter(item => item.field === code)
                    .pop();
                let colDef = colDefs
                    .filter(item => item.field === code)
                    .pop();
                if (code === "age") {
                    if (column && colDef) {
                        colDef.hide = !column.hide;
                    }
                } else if (code === "sport") {
                    if (column && colDef) {
                        colDef.rowGroup = !column.rowGroup;
                    }
                } else if (code === "country") {
                    if (column && colDef) {
                        let flag = !column.pivot;
                        this.gridApi.setGridOption("privotMode", flag);
                        colDef.pivot = flag;
                    }
                } else if (code === "athlete") {
                    if (column && colDef) {
                        colDef.pinned = column.pinned ? null : "left";
                    }
                }
            } else {
                colDefs.forEach(col => {
                    if (["gold", "silver", "bronze"].includes(col.field)) {
                        col.aggFunc = col.aggFunc ? null : "sum";
                    }
                });
            }
            this.gridApi.setGridOption("columnDefs", colDefs);
        },
        sortEvent(e) {
            console.log("sortEvent", e);
        },
        resizeEvent(e) {
            console.log("resizeEvent", e);
        },
        visibleEvent(e) {
            console.log("visibleEvent", e);
        },
        pivotEvent(e) {
            console.log("pivotEvent", e);
        },
        rowGroupEvent(e) {
            console.log("rowGroupEvent", e);
        },
        valueEvent(e) {
            console.log("valueEvent", e);
        },
        moveEvent(e) {
            console.log("moveEvent", e);
        },
        pinnedEvent(e) {
            console.log("pinnedEvent", e);
        },
        getColDefs() {
            return [
                {
                    field: "athlete",
                    headerName: "运动员"
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
                    field: "year",
                    headerName: "年份"
                },
                {
                    field: "date",
                    headerName: "日期"
                }
            ];
        }
    }
};
</script>

<style lang="less">
    .column-event-table {
        .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
    }
</style>

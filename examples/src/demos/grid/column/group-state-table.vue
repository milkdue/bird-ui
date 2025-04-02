<template>
    <div v-exposure.once="exposureEvent">
        <div v-if="showContent" class="group-state-table">
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
                :defaultColDef="defaultColDef"
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
            rowData: null,
            colDefs: [
                {
                    groupId: "athlete",
                    headerName: "运动员信息",
                    children: [
                        { field: "athlete", headerName: "运动员" },
                        {
                            field: "country",
                            columnGroupShow: "open",
                            headerName: "国家"
                        },
                        {
                            field: "sport",
                            columnGroupShow: "open",
                            headerName: "运动"
                        },
                        {
                            field: "year",
                            columnGroupShow: "open",
                            headerName: "年份"
                        },
                        {
                            field: "date",
                            columnGroupShow: "open",
                            headerName: "日期"
                        }
                    ]
                },
                {
                    headerName: "奖牌信息",
                    groupId: "medals",
                    children: [
                        {
                            field: "total",
                            columnGroupShow: "closed",
                            headerName: "总数"
                        },
                        {
                            field: "gold",
                            columnGroupShow: "open",
                            headerName: "金牌"
                        },
                        {
                            field: "silver",
                            columnGroupShow: "open",
                            headerName: "银牌"
                        },
                        {
                            field: "bronze",
                            columnGroupShow: "open",
                            headerName: "铜牌"
                        }
                    ]
                }
            ],
            defaultColDef: {
                width: 150
            },
            gridApi: null,
            state: null,
            buttons: [
                {
                    label: "保存状态",
                    value: "save"
                },
                {
                    label: "应用状态",
                    value: "restore"
                },
                {
                    label: "重置状态",
                    value: "reset"
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
            if (code === "save") {
                this.state = this.gridApi.getColumnGroupState();
            } else if (code === "restore") {
                if (!this.state) {
                    this.$message({
                        type: "error",
                        message: "没有保存的状态"
                    });
                } else {
                    this.gridApi.setColumnGroupState(this.state);
                }
            } else {
                this.gridApi.resetColumnGroupState();
            }
        }
    }
};
</script>

<style lang="less">
    .group-state-table {
        .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
    }
</style>

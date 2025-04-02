<!--
    表格移动
        - moveColumns
        - moveColumnByIndex
-->

<template>
    <div v-exposure.once="exposureEvent">
        <div v-if="showContent" class="move-table">
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
                :suppressDragLeaveHidesColumns="true"
                :suppressColumnMoveAnimation="suppressColumnMoveAnimation"
                :autoSizeStrategy="autoSizeStrategy"
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
                    headerName: "合计",
                    flex: 1
                }
            ],
            gridApi: null,
            autoSizeStrategy: {
                type: "fitGridWidth"
            },
            buttons: [
                {
                    label: "金牌、银牌、铜牌、总计移动到第一列",
                    value: 1
                },
                {
                    label: "金牌、银牌、铜牌、总计移动到最后一列",
                    value: 2
                },
                {
                    label: "移动国家到第一列",
                    value: 3
                },
                {
                    label: "交换第一列和第二列",
                    value: 4
                },
                {
                    label: "关闭移动动画",
                    value: 5
                },
                {
                    label: "开启移动动画",
                    value: 6
                }
            ],
            suppressColumnMoveAnimation: false
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
            switch (code) {
                case 1:
                    this.gridApi.moveColumns(
                        ["gold", "silver", "bronze", "total"],
                        0
                    );
                    break;
                case 2:
                    this.gridApi.moveColumns(
                        ["gold", "silver", "bronze", "total"],
                        6
                    );
                    break;
                case 3:
                    this.gridApi.moveColumns(["country"], 0);
                    break;
                case 4:
                    this.gridApi.moveColumnByIndex(0, 1);
                    break;
                case 5:
                    this.suppressColumnMoveAnimation = true;
                    break;
                case 6:
                    this.suppressColumnMoveAnimation = false;
                    break;
                default:
                    break;
            }
        }
    }
};
</script>

<style lang="less">
    .move-table {
        .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
    }
</style>

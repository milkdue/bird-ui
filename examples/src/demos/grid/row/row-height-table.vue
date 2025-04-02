<!--
    rowHeight: 属性 绝对值

    getRowHeight: (params: RowHeightParams<TData>) => number | undefined | null;

    interface RowHeightParams<TData, TContext> {
        data: TData | undefined;
        node: IRowNode<TData>;
        api: GridApi<TData>;
        context: TContext;
    }
-->

<template>
    <div v-exposure.once="exposureEvent">
        <div v-if="showContent" class="row-height-table">
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
            <div class="row-height-property">
                <ag-grid-vue
                    style="width: 100%; height: 250px"
                    class="ag-theme-quartz"
                    :columnDefs="colDefs"
                    :rowHeight="rowHeight"
                    :rowData="rowData"
                    @grid-ready="onGridReady"
                ></ag-grid-vue>
            </div>
            <div class="row-height-callback">
                <ag-grid-vue
                    style="width: 100%; height: 250px"
                    class="ag-theme-quartz"
                    :columnDefs="colDefs"
                    :getRowHeight="getRowHeight"
                    :rowData="rowData"
                    @grid-ready="onGridReady"
                ></ag-grid-vue>
            </div>
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
                    headerName: "运动员"
                },
                {
                    field: "age",
                    width: 80,
                    headerName: "年龄"
                },
                {
                    field: "country",
                    headerName: "国家"
                },
                {
                    field: "year",
                    headerName: "年份",
                    width: 90
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
            rowData: null,
            rowHeight: 42,
            buttons: [
                {
                    label: "42px",
                    value: 42
                },
                {
                    label: "52px",
                    value: 52
                },
                {
                    label: "62px",
                    value: 62
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
                .then(data => {
                    let differentHeights = [40, 80, 120, 200];
                    data.forEach((item, index) => {
                        item.rowHeight = differentHeights[index % 4];
                    });
                    this.rowData = data;
                });
        },
        clickButton(code) {
            this.rowHeight = code;
        },
        getRowHeight(parmas) {
            return parmas.data.rowHeight;
        }
    }
};
</script>
<style lang="less">
    .row-height-table {
        .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
        .row-height-property {
            margin-bottom: 10px;
        }
    }
</style>

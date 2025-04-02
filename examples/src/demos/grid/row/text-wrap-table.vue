<!--
    文本换行 Column prop
        wrapText: true

        取决于行高是否还能容纳更多的文本，如果使用了 cellRenderer，那么该属性由 cellRenderer 进行处理
        当然也可以使用自动行高来自动计算高度
-->

<template>
    <div v-exposure.once="exposureEvent">
        <div v-if="showContent" class="text-wrap-table">
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
                :defaultColDef="defaultColDef"
                :rowData="rowData"
                :rowHeight="rowHeight"
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
                    field: "latinText",
                    width: 350,
                    wrapText: true,
                    autoHeight: true,
                    headerName: "长文本"
                },
                {
                    field: "athlete",
                    headerName: "运动员"
                },
                {
                    field: "country",
                    headerName: "国家"
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
                width: 170,
                editable: true,
                filter: true
            },
            rowData: null,
            buttons: [
                {
                    label: "行高 42",
                    value: "rowHeight-42"
                },
                {
                    label: "行高 80",
                    value: "rowHeight-80"
                },
                {
                    label: "行高 120",
                    value: "rowHeight-120"
                },
                {
                    label: "自动行高",
                    value: "autoHeight"
                }
            ],
            rowHeight: 42
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
                    data.forEach(item => {
                        item.latinText =
                                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
                    });
                    this.rowData = data;
                });
        },
        clickButton(code) {
            if (code === "autoHeight") {
                this.gridApi.applyColumnState({
                    state: [
                        {
                            colId: "latinText",
                            autoHeight: true
                        }
                    ]
                });
            } else {
                let [type, height] = code.split("-");
                if (type === "rowHeight") {
                    height = Number(height);
                    this.rowHeight = height;
                }
            }
        }
    }
};
</script>

<style lang="less">
    .text-wrap-table {
        .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
    }
</style>

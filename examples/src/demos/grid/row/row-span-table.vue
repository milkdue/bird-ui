<!--
rowSpan: (params: RowSpanParams<TData, TValue>) => number

interface RowSpanParams<TData, TValue> {
    node: IRowNode<TData> | null;
    data: TData | null;
    column: Colum<TValue>;
    colDef: ColDef<TData, TValue>;
    api: GridApi<TData>;
    context: any;
}

suppressRowTransform: true 才可以跨度行样式

rowSpan 规则
1. 不要跨最后一行，尤其是有排序或过滤的情况
2. 应用样式可以让被覆盖的单元格不可见
3. 被覆盖的单元格任然存在，但是不可见，这意味着原生的行为存在，例如 tab 聚焦
4. rowSpan 不能工作在自动行高
5. 排序或过滤可能有特殊的行为
-->
<template>
    <div class="row-span-table">
        <ag-grid-vue
            style="width: 100%; height: 500px"
            class="ag-theme-alpine"
            :columnDefs="colDefs"
            :defaultColDef="defaultColDef"
            :suppressRowTransform="true"
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
                {
                    field: "athlete",
                    rowSpan: params => {
                        let athlete = params.data
                            ? params.data.athlete
                            : undefined;
                        if (athlete === "Aleksey Nemov") {
                            return 2;
                        } else if (athlete === "Ryan Lochte") {
                            return 4;
                        } else {
                            return 1;
                        }
                    },
                    headerName: "运动员",
                    width: 200,
                    cellClassRules: {
                        "cell-span":
                                "value === 'Aleksey Nemov' || value === 'Ryan Lochte'"
                    }
                },
                {
                    field: "age",
                    headerName: "年龄",
                    width: 100
                },
                {
                    field: "country",
                    headerName: "国家"
                },
                {
                    field: "year",
                    headerName: "年份",
                    width: 100
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
                width: 170
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
<style lang="less">
    .row-span-table {
        .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
        .cell-span {
            background-color: #c4cdf2;
            // display: flex;
            // align-items: center;
        }
    }
</style>

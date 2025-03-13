<!--
    GridApi.resetRowHeights() // 重新生成行高 执行 getRowHeight
        resetRowHeights = () => void;
    RowNode.setRowHeight(height)
        setRowHeight = (rowHeight: number | undefined | null, estimated?: boolean) => void;
    GridApi.onRowHeightChanged()
        onRowHeightChanged = () => void;
-->
<template>
    <div class="change-row-height-table">
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
            :columnDefs="colDefs"
            :rowData="rowData"
            :groupDefaultExpanded="groupDefaultExpanded"
            :getRowHeight="getRowHeight"
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
                    field: "country",
                    rowGroup: true,
                    headerName: "国家"
                },
                {
                    field: "athlete",
                    headerName: "运动员"
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
            groupDefaultExpanded: 1,
            buttons: [
                {
                    label: "一级分组 42",
                    value: "1-42"
                },
                {
                    label: "一级分组 75",
                    value: "1-75"
                },
                {
                    label: "一级分组 125",
                    value: "1-125"
                },
                {
                    label: "游泳 42",
                    value: "swimming-42"
                },
                {
                    label: "游泳 75",
                    value: "swimming-75"
                },
                {
                    label: "游泳 125",
                    value: "swimming-125"
                },
                {
                    label: "美国 42",
                    value: "usa-42"
                },
                {
                    label: "美国 75",
                    value: "usa-75"
                },
                {
                    label: "美国 125",
                    value: "usa-125"
                }
            ],
            groupHeight: 42,
            usaHeight: 42,
            swimmingHeight: 42
        };
    },
    created() {
        this.rowData = this.getData();
    },
    methods: {
        getData() {
            return [
                {
                    athlete: "Ryan Lochte",
                    age: 27,
                    country: "United States",
                    year: 2012,
                    date: "12/08/2012",
                    sport: "Swimming",
                    gold: 2,
                    silver: 2,
                    bronze: 1,
                    total: 5
                },
                {
                    athlete: "Yekaterina Lobaznyuk",
                    age: 17,
                    country: "Russia",
                    year: 2000,
                    date: "01/10/2000",
                    sport: "Gymnastics",
                    gold: 0,
                    silver: 2,
                    bronze: 1,
                    total: 3
                },
                {
                    athlete: "Ryan Lochte",
                    age: 20,
                    country: "United States",
                    year: 2004,
                    date: "29/08/2004",
                    sport: "Swimming",
                    gold: 1,
                    silver: 1,
                    bronze: 0,
                    total: 2
                },
                {
                    athlete: "Ericka Lorenz",
                    age: 23,
                    country: "United States",
                    year: 2004,
                    date: "29/08/2004",
                    sport: "Waterpolo",
                    gold: 0,
                    silver: 0,
                    bronze: 1,
                    total: 1
                },
                {
                    athlete: "Ericka Lorenz",
                    age: 19,
                    country: "United States",
                    year: 2000,
                    date: "01/10/2000",
                    sport: "Waterpolo",
                    gold: 0,
                    silver: 1,
                    bronze: 0,
                    total: 1
                },
                {
                    athlete: "Nikita Lobintsev",
                    age: 23,
                    country: "Russia",
                    year: 2012,
                    date: "12/08/2012",
                    sport: "Swimming",
                    gold: 0,
                    silver: 0,
                    bronze: 1,
                    total: 1
                },
                {
                    athlete: "Tatyana Logunova",
                    age: 24,
                    country: "Russia",
                    year: 2004,
                    date: "29/08/2004",
                    sport: "Fencing",
                    gold: 1,
                    silver: 0,
                    bronze: 0,
                    total: 1
                },
                {
                    athlete: "Tatyana Logunova",
                    age: 20,
                    country: "Russia",
                    year: 2000,
                    date: "01/10/2000",
                    sport: "Fencing",
                    gold: 1,
                    silver: 0,
                    bronze: 0,
                    total: 1
                },
                {
                    athlete: "Nelson Loyola",
                    age: 32,
                    country: "Cuba",
                    year: 2000,
                    date: "01/10/2000",
                    sport: "Fencing",
                    gold: 0,
                    silver: 0,
                    bronze: 1,
                    total: 1
                }
            ];
        },
        clickButton(code) {
            let [type, height] = code.split("-");
            height = Number(height);
            if (type === "swimming") {
                this.swimmingHeight = height;
                this.gridApi.resetRowHeights();
            } else if (type === "usa") {
                // this.usaHeight = height;
                // this.gridApi.resetRowHeights(); // 也可以但是用另一种方法
                this.gridApi.forEachNode(node => {
                    if (
                        node.data &&
                            node.data.country === "United States"
                    ) {
                        node.setRowHeight(height);
                    }
                });
                this.gridApi.onRowHeightChanged();
            } else {
                this.groupHeight = height;
                this.gridApi.resetRowHeights();
            }
        },
        getRowHeight(params) {
            if (params.node.group && this.groupHeight) {
                return this.groupHeight;
            } else if (
                params.data &&
                    params.data.country === "United States" &&
                    this.usaHeight
            ) {
                return this.usaHeight;
            } else if (
                params.data &&
                    params.data.sport === "Swimming" &&
                    this.swimmingHeight
            ) {
                return this.swimmingHeight;
            } else {
                return 42;
            }
        },
        onGridReady(params) {
            this.gridApi = params.api;
        }
    }
};
</script>

<style lang="less">
    .change-row-height-table {
        .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
    }
</style>

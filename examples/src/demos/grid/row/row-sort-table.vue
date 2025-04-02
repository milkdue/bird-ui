<!--
    comparator: (valueA: TValue, valueB: TValue, nodeA: IRowNode<TData>, nodeB: IRowNode<TData>, isDescending: boolean) => number
    0 valueA === valueB
    > 0 A 在 B 之后
    < 0 A 在 B 之前

    使用 multiSortKey 可以实现同时排序 ctrl 按住 或者 command

    默认的排序是 从升序 -> 降序 -> 没有排序

    sortingOrder: ['asc', 'desc', null] // 默认行为
    可配置单个字段的排序行为
-->
<template>
    <div v-exposure.once="exposureEvent">
        <div v-if="showContent" class="row-sort-table">
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
                style="width: 100%; height: 240px"
                class="ag-theme-quartz"
                multiSortKey="ctrl"
                :columnDefs="colDefs"
                :rowData="rowData"
                :defaultColDef="defaultColDef"
                :sortingOrder="sortingOrder"
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
                    headerName: "运动员"
                },
                {
                    field: "age",
                    width: 90,
                    comparator: (a, b) => {
                        // console.info(a, "a");
                        // console.info(b, "b");
                        return a - b;
                    },
                    headerName: "年龄"
                },
                {
                    field: "country",
                    headerName: "国家"
                },
                {
                    field: "year",
                    width: 120,
                    unSortIcon: true,
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
                    headerName: "金牌",
                    sortingOrder: ["desc", null]
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
            rowData: null,
            buttons: [
                {
                    label: "同时排序国家和运动员",
                    value: "sortA"
                },
                {
                    label: "降序运动员",
                    value: "sortB"
                },
                {
                    label: "升序运动员",
                    value: "sortC"
                }
            ],
            sortingOrder: ["desc", "asc", null]
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
            if (code === "sortA") {
                this.gridApi.applyColumnState({
                    state: [
                        { colId: "country", sort: "asc", sortIndex: 0 },
                        { colId: "athlete", sort: "asc", sortIndex: 1 }
                    ]
                });
            } else if (code === "sortB") {
                this.gridApi.applyColumnState({
                    state: [{ colId: "athlete", sort: "desc" }],
                    defaultState: { sort: null }
                });
            } else if (code === "sortC") {
                this.gridApi.applyColumnState({
                    state: [{ colId: "athlete", sort: "asc" }],
                    defaultState: { sort: null }
                });
            }
        }
    }
};
</script>

<style lang="less">
    .row-sort-table {
        .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
    }
</style>

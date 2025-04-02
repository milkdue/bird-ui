<!--
    postSortRows: (params: PostSortRowsParams<TData>) => void;
    interface PostSortRowsParams<TData, TContext> {
        nodes: IRowNode<TData>[];
        api: GridApi<TData>;
        context: TContext;
    }
-->
<template>
    <div v-exposure.once="exposureEvent" class="post-sort-table">
        <ag-grid-vue
            v-if="showContent"
            style="width: 100%; height: 500px"
            class="ag-theme-alpine"
            :columnDefs="colDefs"
            :defaultColDef="defaultColDef"
            :rowData="rowData"
            :postSortRows="postSortRows"
            @grid-ready="onGridReady"
        ></ag-grid-vue>
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
                    width: 100,
                    headerName: "年龄"
                },
                {
                    field: "country",
                    sort: "asc",
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
                width: 170
            },
            postSortRows: params => {
                console.log(params, "params");
                const rowNodes = params.nodes;
                let nextInsertPos = 0;
                for (let i = 0; i < rowNodes.length; i++) {
                    const country = rowNodes[i].data
                        ? rowNodes[i].data.country
                        : null;
                    if (country === "Ireland") {
                        rowNodes.splice(
                            nextInsertPos,
                            0,
                            rowNodes.splice(i, 1)[0]
                        );
                        nextInsertPos++;
                    }
                }
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

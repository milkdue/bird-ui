<!--
    整行拖拽
        设置 rowDragEntireRow 为 true 即可开启整行拖拽
        总是可以拖拽行，不需要设置拖拽操作标识

    同时也可以设置多行拖拽
        rowDragMultiRow: true
        rowSelection: "multiple"
-->

<template>
    <div v-exposure.once="exposureEvent" class="entire-row-drag-table">
        <ag-grid-vue
            v-if="showContent"
            style="width: 100%; height: 500px"
            class="ag-theme-quartz"
            rowDragEntireRow
            rowDragManaged
            rowDragMultiRow
            rowSelection="multiple"
            :columnDefs="columnDefs"
            :rowData="rowData"
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
            columnDefs: [
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
                }
            ],
            rowData: null,
            gridApi: null
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
                    this.rowData = data;
                });
        }
    }
};
</script>

<!--
    组织行拖拽
        属性：suppressRowDrag true 可阻止行拖拽
-->

<template>
    <div class="suppress-row-drag-table">
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
            rowDragManaged
            :columnDefs="colDefs"
            :defaultColDef="defaultColDef"
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
                    headerName: "运动员",
                    rowDrag: true
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
                }
            ],
            gridApi: null,
            defaultColDef: {
                width: 170,
                filter: true
            },
            rowData: null,
            buttons: [
                {
                    label: "阻止行拖拽",
                    value: "no"
                },
                {
                    label: "允许行拖拽",
                    value: "yes"
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
            let suppressRowDrag = code === "no";
            this.gridApi.setGridOption("suppressRowDrag", suppressRowDrag);
        }
    }
};
</script>

<style lang="less">
    .suppress-row-drag-table {
        .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
    }
</style>

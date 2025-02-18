<!--
    gridApi.setGridOption 设置表格的配置对象。
        - columnDefs 更新新的表头 setGridOption("columnDefs", columnDefs)
-->
<template>
    <div class="definition-table">
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
            :defaultColDef="defaultColDef"
            @grid-ready="onGridReady"
        ></ag-grid-vue>
    </div>
</template>

<script>
const fullFields = [
    {
        field: "athlete",
        width: 200,
        headerName: "运动员"
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
        field: "sport",
        headerName: "运动"
    },
    {
        field: "year",
        headerName: "年份"
    },
    {
        field: "date",
        headerName: "日期"
    }
];
const slortFields = [
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
        field: "sport",
        headerName: "运动"
    },
    {
        field: "year",
        headerName: "年份"
    },
    {
        field: "date",
        headerName: "日期"
        // flex: 1
    }
];
export default {
    data() {
        return {
            colDefs: fullFields,
            gridApi: null,
            defaultColDef: {
                initialWidth: 100
            },
            rowData: null,
            buttons: [
                {
                    label: "全部字段",
                    value: "full"
                },
                {
                    label: "部分字段",
                    value: "slort"
                },
                {
                    label: "清空字段",
                    value: "clear"
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
            let colDefs;
            if (code === "full") {
                colDefs = fullFields;
            } else if (code === "clear") {
                colDefs = [];
            } else {
                colDefs = slortFields;
            }
            this.gridApi.setGridOption("columnDefs", colDefs);
        }
    }
};
</script>

<style lang="less">
    .definition-table {
        .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
    }
</style>

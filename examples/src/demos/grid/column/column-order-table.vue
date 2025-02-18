<template>
    <div class="column-order-table">
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
            :maintainColumnOrder="maintainColumnOrder"
            @grid-ready="onGridReady"
        ></ag-grid-vue>
    </div>
</template>

<script>
const fields = [
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
    }
];
export default {
    data() {
        return {
            colDefs: fields,
            gridApi: null,
            rowData: null,
            buttons: [
                {
                    label: "设置保持排序",
                    value: "maintain"
                },
                {
                    label: "不保持排序",
                    value: "noMaintain"
                },
                {
                    label: "A字段",
                    value: "a"
                },
                {
                    label: "B字段",
                    value: "b"
                },
                {
                    label: "清空字段",
                    value: "clear"
                },
                {
                    label: "新增字段",
                    value: "add"
                }
            ],
            maintainColumnOrder: false
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
            if (code === "maintain" || code === "noMaintain") {
                this.maintainColumnOrder = code === "maintain";
                return;
            }
            let colDefs;
            if (code === "a") {
                colDefs = fields.map(item => ({
                    ...item,
                    headerName: "A " + item.headerName
                }));
            } else if (code === "clear") {
                colDefs = [];
            } else if (code === "b") {
                colDefs = fields.map(item => ({
                    ...item,
                    headerName: "B " + item.headerName
                }));
            } else if (code === "add") {
                colDefs = [
                    ...fields,
                    {
                        headerName: "新增字段",
                        valueGetter: () => {
                            return Math.floor(Math.random() * 100);
                        }
                    }
                ];
            }
            this.gridApi.setGridOption("columnDefs", colDefs);
        }
    }
};
</script>

<style lang="less">
    .column-order-table {
        .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
    }
</style>

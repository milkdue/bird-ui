<!--
    允许的单元格数据类型
        text 文本
        number 数字
        boolean 布尔值
        date 日期
        dateString 日期字符串
        object 对象

    通过显式设置 cellDataType 来指定单元格的数据类型
        colDefs = [
            {
                field: "price",
                cellDataType: "number"
            }
        ]
    默认的，网格会在第一行数据传入后根据单元格的值来推断单元格的数据类型。想要推断正常工作，他必须包含非空值并且设置了 field 属性。
    处理列定义必须没有 valueGetter ValueParser 或者 引入属性设置。如果不满足这些条件，将不会设置 cellDataType 属性

    可以通过 cellDataType: false 来禁用单元格类型的推断
-->

<template>
    <div class="enable-data-type-table">
        <ag-grid-vue
            style="width: 100%; height: 500px"
            class="ag-theme-quartz"
            :columnDefs="colDefs"
            :defaultColDef="defaultColDef"
            :dataTypeDefinitions="dataTypeDefinitions"
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
                { field: "athlete", headerName: "运动员" },
                { field: "age", minWidth: 100, headerName: "年龄" },
                { field: "hasGold", minWidth: 100, headerName: "金牌" },
                {
                    field: "hasSilver",
                    minWidth: 100,
                    headerName: "银牌",
                    cellRendererParams: { disabled: true }
                },
                { field: "dateObject", headerName: "日期" },
                { field: "date", headerName: "日期字符串" },
                { field: "countryObject", headerName: "国家" }
            ],
            gridApi: null,
            defaultColDef: {
                flex: 1,
                minWidth: 180,
                filter: true,
                floatingFilter: true,
                editable: true
            },
            dataTypeDefinitions: {
                object: {
                    baseDataType: "object",
                    extendsDataType: "object",
                    valueParser: params => {
                        return { name: params.newValue };
                    },
                    valueFormatter: params => {
                        return params.value === null
                            ? ""
                            : params.value.name;
                    }
                }
            },
            rowData: null
        };
    },
    methods: {
        onGridReady(params) {
            this.gridApi = params.api;

            const updateData = data => {
                this.rowData = data.map(row => {
                    const dateParts = row.date.split("/");
                    return {
                        ...row,
                        date: `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`,
                        dateObject: new Date(
                            parseInt(dateParts[2], 10),
                            parseInt(dateParts[1], 10) - 1,
                            parseInt(dateParts[0], 10)
                        ),
                        countryObject: {
                            name: row.country
                        },
                        hasGold: row.gold > 0,
                        hasSilver: row.silver > 0
                    };
                });
            };

            fetch(
                "https://www.ag-grid.com/example-assets/olympic-winners.json"
            )
                .then(resp => resp.json())
                .then(data => updateData(data));
        }
    }
};
</script>

<!--
    数字过滤

    Number Filter Parameters: INumberFilterParams
        allowedCharPattern: string; // 允许用户输入的字符正则字符串，当输入不允许的字符时会被阻止
        buttons: FilterButtonType[]; // 同 text filter params
        closeOnApply: boolean; // 同 text filter params
        debounceMs: number; // 同 text filter params
        defaultJoinOperator: JoinOperator; // 同 text filter params
        defaultOption: string; // 同 text filter params
        filterOptions: (IFilterOptionDef | ISimpleFilterModelType)[]; // 同 text filter params
        filterPlaceholder: string | FilterPlaceholderFunction; // 同 text filter params
        inRangeInclusive: boolean; // 范围是否包含边界值 例如 true 表示[10, 20]，false，表示(10, 20)
        includeBlanksInEquals: boolean; // 为空的单元格对于equals条件是否通过
        includeBlanksInGreaterThan: boolean; // 为空的单元格对于greater than条件是否通过
        includeBlanksInLessThan: boolean; // 为空的单元格对于less than条件是否通过
        includeBlanksInRange: boolean; // 为空的单元格对于range条件是否通过
        maxNumConditions: number; // 同 text filter params
        numAlwaysVisibleConditions: number; // 同 text filter params
        numberFormatter: (value: number | null) => string | null; // 在过滤之前格式化用户输入和单元格值
        numberParser: (text: string | null) => number | null; // 通常和 allowedCharPattern 一起使用，提供一个自定义的解析器来转换用户输入
        readOnly: boolean; // 同 text filter params
-->
<template>
    <div class="number-filter-table">
        <ag-grid-vue
            style="width: 100%; height: 500px"
            class="ag-theme-quartz"
            :columnDefs="colDefs"
            :defaultColDef="defaultColDef"
            :rowData="rowData"
            @grid-ready="onGridReady"
        ></ag-grid-vue>
    </div>
</template>
<script>
function getData() {
    let rows = [];
    for (let i = 0; i < 1000; i++) {
        rows.push({
            sale:
                    Math.random() > 0.8
                        ? undefined
                        : parseFloat(getRandomNumber(-500, 1000).toFixed(2))
        });
    }
    return rows;
}
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
export default {
    data() {
        return {
            colDefs: [
                {
                    field: "sale",
                    headerName: "销售额 $",
                    filter: "agNumberColumnFilter",
                    floatingFilter: true,
                    valueFormatter: params => {
                        return params.value?.toFixed(2);
                    },
                    filterParams: {
                        inRangeInclusive: true,
                        includeBlanksInEquals: true,
                        includeBlanksInGreaterThan: true
                    }
                },
                {
                    field: "sale",
                    headerName: "销售额",
                    filter: "agNumberColumnFilter",
                    floatingFilter: true,
                    filterParams: {
                        allowedCharPattern: "\\d\\-\\,\\$",
                        numberParser: text => {
                            return text
                                ? parseFloat(
                                    text
                                        .replace(",", ".")
                                        .replace("$", "")
                                )
                                : null;
                        },
                        numberFormatter: value =>
                            value
                                ? value.toString().replace(".", ",")
                                : null
                    },
                    valueFormatter: params => {
                        let formatted = params.value
                            ?.toFixed(2)
                            ?.replace(".", ",");
                        if (formatted?.indexOf("-") === 0) {
                            return "-$" + formatted.slice(1);
                        }
                        return formatted ? "$" + formatted : null;
                    }
                }
            ],
            gridApi: null,
            defaultColDef: {
                flex: 1,
                minWidth: 150
            },
            rowData: null
        };
    },
    created() {
        this.rowData = getData();
    },
    methods: {
        onGridReady(params) {
            this.gridApi = params.api;
        }
    }
};
</script>

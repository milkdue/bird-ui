<!--
    date filter params: IDateFilterParams
        browserDatePicker: boolean; // 是否使用浏览器默认的日期选择还是自定义的日期选择
        buttons: FilterButtonType[]; // 同 text filter params
        closeOnApply: boolean; // 同 text filter params
        comparator: (filterLocalDateAtMidnight: Date, cellValue: any) => any; // 如果数据不是原始的 Date 对象，那么它是必须的
        debounceMs: number; // 同 text filter params
        defaultJoinOperator: JoinOperator; // 同 text filter params
        defaultOption: string; // 同 text filter params
        filterOptions: (IFilterOptionDef | ISimpleFilterModelType)[]; // 同 text filter params
        filterPlaceholder: FilterPlaceholderFunction | string; // 同 text filter params
        inRangeFloatingFilterDateFormat: string; // 默认 YYYY-MM-DD
        inRangeInclusive: boolean; // 同 number filter params
        includeBlanksInEquals: boolean; // 同 number filter params
        includeBlanksInGreaterThan: boolean; // 同 number filter params
        includeBlanksInLessThan: boolean; // 同 number filter params
        includeBlanksInRange: boolean; // 同 number filter params
        maxNumConditions: number; // 同 text filter params
        maxValidDate: Date | string; // 可过滤的日期的最大日期，可以是 Date 对象或者 YYYY-MM-DD 格式的字符串
        minValidYear: number; // 可过滤的日期的最小年份 默认1000
        numAlwaysVisibleConditions: number; // 同 text filter params
        readOnly: boolean; // 同 text filter params

    comparator 接受两个参数，第一个是用户选中的过滤时间，第二个是表格中的数据。该函数必须返回一个 number,
    当返回的数字 < 0 时，表明单元格的值小于过滤值，大于0时，表明单元格的值大于过滤值，等于0时，表明单元格的值等于过滤值。
-->
<template>
    <div class="date-filter-table">
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
export default {
    data() {
        return {
            colDefs: [
                {
                    field: "athlete",
                    headerName: "运动员"
                },
                {
                    field: "date",
                    filter: "agDateColumnFilter",
                    filterParams: {
                        browserDatePicker: true,
                        comparator: (
                            filterLocalDateAtMidnight,
                            cellValue
                        ) => {
                            let dateAsString = cellValue;
                            if (!dateAsString) return -1;
                            let dateParts = dateAsString.split("/");
                            let cellDate = new Date(
                                Number(dateParts[2]),
                                Number(dateParts[1]) - 1,
                                Number(dateParts[0])
                            );
                            if (
                                filterLocalDateAtMidnight.getTime() ===
                                    cellDate.getTime()
                            ) {
                                return 0;
                            }
                            if (cellDate < filterLocalDateAtMidnight) {
                                return -1;
                            }
                            if (cellDate > filterLocalDateAtMidnight) {
                                return 1;
                            }
                            return 0;
                        },
                        minValidYear: 2000,
                        maxValidYear: 2026,
                        inRangeFloatingFilterDateFormat: "Do MMM YYYY",
                        maxValidDate: "2028-01-01"
                    }
                },
                {
                    field: "total",
                    filter: false
                }
            ],
            gridApi: null,
            defaultColDef: {
                flex: 1,
                minWidth: 150,
                filter: true,
                floatingFilter: true
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

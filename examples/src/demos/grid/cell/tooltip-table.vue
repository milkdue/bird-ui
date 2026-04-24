<!--
    使用此版本此功能时需要设置 样式，才可以显示提示
    .ag-popup {
        position: static !important;
    }

    tooltipField: ColDefField; // 应用于单元格tootip的字段
    tooltipValue: (
        params: ITooltipParams<TData, TValue>
    ) => string | any;

    interface ITooltipParams<TData, TValue> {
        location: TooltipLocation;
        value?: TValue | null;
        valueFormatted?: string | null;
        colDef?: ColDef<TData, TValue> | ColGroupDef<TData> | null;
        column?: Column<TValue> | ColumnGroup;
        rowIndex?: number;
        node?: TData;
        hideTooltipCallback?: () => void; // 隐藏 tooltip 的回调
        api: GridApi<TData>;
        context: TContext;
    }

    type TooltipLocation = "advancedFilter" |
        "cell" |
        "columnToolPanelColumn" |
        "ColumnToolPanelColumnGroup" |
        "filterToolPanelColumnGroup" |
        "fullWidthRow" |
        "header" |
        "headerGroup" |
        "menu" |
        "pivotColumnsList" |
        "rowGroupColumnsList" |
        "setFilterValue" |
        "valueColumnsList" |
        "UNKNOWN";

    headerTooltip: string; // 表头的提示

    展示和隐藏延时 ag-gird-vue props 或者 gridOptions 属性
    gridOptions: {
        tooltipShowDelay: 500,
        tooltipHideDelay: 500
    }

    对于空值，undefined null "" 等，tooltip 默认展示 missing

    鼠标跟随，开启后 tooltip 会跟随鼠标移动 ag-gird-vue props 或者 gridOptions 属性
        - tooltipMouseTrack: true

    使用浏览器默认的提示 enableBrowserTooltips: true 阻止使用html或自定义组件的提示 ag-gird-vue props 或者 gridOptions 属性
        - enableBrowserTooltips: true

    自定义提示组件
        使用 colDef.tooltipComponent 来设置单元格的提示组件
        colDef.tooltipComponentParams 是来传递给组件的一些参数 和 ITooltipParams 一起传入
-->
<template>
    <div class="tooltip-table">
        <ag-grid-vue
            style="width: 100%; height: 500px"
            class="ag-theme-quartz"
            :enableBrowserTooltips="false"
            :columnDefs="colDefs"
            :defaultColDef="defaultColDef"
            :rowData="rowData"
            :tooltipShowDelay="tooltipShowDelay"
            @grid-ready="onGridReady"
        ></ag-grid-vue>
    </div>
</template>
<script>
const CustomTooltip = {
    render(h) {
        let { color = "#999", value } = this.params;
        return h(
            "div",
            {
                class: "custom-tooltip",
                style: {
                    backgroundColor: color,
                    position: "absolute",
                    padding: "8px",
                    "border-radius": "4px",
                    "background-color": "#fff",
                    "box-shadow": "0 2px 4px rgba(0,0,0,0.2)",
                    "z-index": 99999, // 必须高于ag-grid默认层级
                    border: "2px solid red !important"
                }
            },
            [
                h("div", {}, [h("b", {}, "Custom Tooltip")]),
                h("div", {}, value)
            ]
        );
    },
    beforeMount() {
        console.info(this.params, "params");
    }
};
export default {
    components: {
        CustomTooltip
    },
    data() {
        return {
            colDefs: [
                {
                    headerName: "运动员",
                    field: "athlete",
                    tooltipComponentParams: {
                        color: "#55AA77"
                    },
                    tooltipField: "country",
                    headerTooltip: "Tooltip for Athlete Column Header",
                    tooltipComponent: "CustomTooltip"
                },
                {
                    field: "age",
                    tooltipValueGetter: p =>
                        `Create any fixed message, e.g. This is the Athlete’s Age: ${p.value}`,
                    headerTooltip: "Tooltip for Age Column Header",
                    headerName: "年龄"
                },
                {
                    field: "year",
                    tooltipValueGetter: p =>
                        `This is a dynamic tooltip using the value of ${p.value}`,
                    headerTooltip: "Tooltip for Age Column Header",
                    headerName: "年份"
                },
                {
                    headerName: "提示",
                    headerTooltip: "Column Groups can have Tooltips also",
                    children: [
                        {
                            field: "sport",
                            tooltipValueGetter: () =>
                                "Tooltip text about Sport should go here",
                            headerTooltip: "Tooltip for Sport Column Header"
                        }
                    ]
                }
            ],
            gridApi: null,
            defaultColDef: {
                flex: 1,
                minWidth: 100
            },
            tooltipShowDelay: 0,
            tooltipHideDelay: 2000,
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

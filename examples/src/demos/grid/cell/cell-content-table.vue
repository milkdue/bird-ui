<!--
    cellContent的渲染逻辑 =>
        1. 先判断有没有 valueGetter 有走 value = valueGetter(params)，否则 value = data[field]
        2. 然后判断是否有 valueFormatter 有 走 value = valueFormatter(params), 否则什么也不做
        3. 判断是否有 cellRenderer 有 eCell.appendChild(cellRenderer.getGui) 否则 eCell.textContent = value.toString()

    field: 不支持多级对象，如果有，请使用 valueGetter 比如 "model.page"

    valueGetter: string | ValueGetterFunc;
    valueFormatter: string | ValueFormatterFunc<TData, TValue>;

    interface ValueGetterFunc<TData, TValue> {
        (params: ValueGetterParams<TData, TValue>): TValue | null | undefined;
    }
    interface ValueGetterParams<TData, TValue> {
        getValue: (field: string) => any;
        node: IRowNode<TData> | null;
        data: TData | undefined;
        column: Column<TValue>;
        colDef: ColDef<TData, TValue>;
        api: GridApi<TData>;
        context: any;
    }
    interface ValueFormatterFunc<TData, TValue> {
        (params: ValueFormatterParams<TData, TValue>): string;
    }

    interface ValueFormatterParams<TData, TValue> {
        value: TValue | null | undefined;
        node: IRowNode<TData> | null;
        data: TData | undefined;
        column: Column<TValue>;
        colDef: ColDef<TData, TValue>;
        api: GridApi<TData>;
        context: any;
    }
-->

<!--
在 cellComponent 中 ag-gird-vue 自动注入params到组件实例中
params: ICellRendererParams

interface ICellRendererParams {
    value: TValue | null | undefined; // 原始值
    valueFormatted: string | null | undefined; // 格式化后的值
    fullWidth: boolean; // 是否是全宽行
    pinned: "left" | "right" | null; // 冻结
    data: TData | undefined; // 行数据
    node: IRowNode; // 行节点
    colDef: ColDef; // 单元格列定义
    column: Column; // 单元格列
    eGridCell: HTMLElement; // 单元格元素
    getValue: () => TValue | null | undefined; // 获取单元格值的方法
    setValue: (value: TValue | null | undefined) => void; // 设置单元格值的方法
    formatValue: (value: TValue | null | undefined) => string; // 格式化单元格值的方法
    refreshCell: () => void; // 刷新单元格的方法
    registerRowDragger: (
        rowDraggerElement: HTMLElement, // 被用作拖拽的元素
        dragStartPixels?: number, // 开始拖拽的像素数，默认是4
        value?: string, // 这个值在拖拽时会显示
        suppressVisibilityChange?: boolean // 设置true将阻止网格隐藏拖拽图标当拖拽被禁用时
    ) => void; // 注册行拖动元素的方法
    setTooltip: (
        value: string, // 展示提示的值
        shouldDisplayTooltip?: () => boolean; // 是否允许显示提示的方法，这个配置在 enableBrowserTooltips 为 true 时失效
    ); // 对于组件设置单元格工具提示的方法
    api: GridApi; // 网格API
    context: TContext; // 上下文对象
}
-->
<template>
    <div v-exposure.once="exposureEvent" class="cell-content-table">
        <ag-grid-vue
            v-if="showContent"
            style="width: 100%; height: 500px"
            class="ag-theme-quartz"
            enableRangeSelection
            enableFillHandle
            :columnDefs="columnDefs"
            :defaultColDef="defaultColDef"
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
                    headerName: "#",
                    maxWidth: 100,
                    valueGetter: params =>
                        params.node ? params.node.rowIndex : null
                },
                { field: "a" },
                { field: "b" },
                {
                    headerName: "A + B",
                    colId: "a&b",
                    valueGetter: params => params.data.a + params.data.b
                },
                {
                    headerName: "A * 1000",
                    minWidth: 95,
                    valueGetter: params => params.data.a * 1000
                },
                {
                    headerName: "B * 137",
                    minWidth: 90,
                    valueGetter: params => params.data.b * 137
                },
                {
                    headerName: "Random",
                    minWidth: 90,
                    valueGetter: () => Math.floor(Math.random() * 1000),
                    valueFormatter: params => `¥${params.value}`
                },
                {
                    headerName: "Chain",
                    valueGetter: params => params.getValue("a&b") * 1000
                },
                {
                    headerName: "Const",
                    minWidth: 85,
                    valueGetter: () => 99999999
                }
            ],
            gridApi: null,
            defaultColDef: {
                flex: 1,
                minWidth: 75
            },
            rowData: null
        };
    },
    created() {
        this.rowData = this.createRowData();
    },
    methods: {
        onGridReady(params) {
            this.gridApi = params.api;
        },
        createRowData() {
            let rowData = [];
            for (let i = 0; i < 100; i++) {
                rowData.push({
                    a: i % 4,
                    b: i % 7
                });
            }
            return rowData;
        }
    }
};
</script>

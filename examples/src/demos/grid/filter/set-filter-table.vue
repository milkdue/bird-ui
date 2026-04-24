<!--
    set filter params
        applyMiniFilterWhileTyping: boolean; // 默认 false 是否在输入时及时过滤表格数据，false 则是在回车后过滤表格数据
        buttons: FilterButtonType[]; // 同 text filter parmas
        caseSensitive: boolean; // 同 text filter params
        cellHeight: number; // 过滤选项的高度
        cellRenderer: any; // 过滤选项渲染的自定义组件
        closeOnApply: boolean; // 同 text filter params
        comparator: (a: V | null, b: V | null) => number; // 排序器
        debounceMs: number; // 同 text filter params
        defaultToNothingSelected: boolean; // 默认是否不选择任何选项 设置为 true 打开过滤面板时不会选中任何选项
        excelMode: "mac" | "windows";
        keyCreator: (params: KeyCreatorParams<TData>) => string; // 当过滤值是一个复杂的对象或者是树或者组列时，必须规定返回一个唯一的key，如果没有提供，网格会使用默认的创建器
        readOnly: boolean; // false 同 text filter params
        refreshValuesOnOpen: boolean; // 控制每次打开过滤面板时是否重新收集过滤值，确保过滤值是最新的
        showTooltips: boolean; // 默认 false 鼠标悬在显示过滤值时显示提示
        suppressMiniFilter: boolean; // 默认 false 是否显示搜索过滤输入框
        suppressSelectAll: boolean; // 默认 false 是否显示全选多选框
        suppressSorting: boolean; // 默认 false 过滤项是否按照顺序排序，默认是按大小排好序的
        textFormatter: (from: string) => string; // 在过滤输入框中输入和选项的格式化函数
        treeList: boolean; // 是否是树的过滤
        treeListFormatter: (
            pathKey: string | null,
            level: number,
            parentPathKeys: (string | null)[]
        ) => string; // 树的过滤选项的格式化函数
        treeListPathGetter: (value: V | null) => string[] | null;
        valueFormatter: (params: ValueFormatterParams) => string;
        values: SetFilterValues<TData, V>;

    interface KeyCreatorParams<TData, TValue> {
        value: TValue | null | undefined;
        node: IRowNode<TData> | null;
        data: TData;
        column: Column<TValue>;
        colDef: ColDef<TData, TValue>;
        api: GridApi<TData>;
        context: any;
    }

    interface ValueFormatterParams {
        value: TValue | null | undefined;
        node: IRowNode<TData> | null;
        data: TData | undefined;
        column: Column<TValue>;
        colDef: ColDef<TData, TValue>;
        api: GridApi<TData>;
        context: any;
    }
-->
<template>
    <div class="set-filter-table">
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
                { field: "athlete", filter: true, headerName: "运动员" },
                {
                    field: "country",
                    filter: "agSetColumnFilter",
                    headerName: "国家",
                    filterParams: {
                        applyMiniFilterWhileTyping: false,
                        // cellHeight: 50,
                        defaultToNothingSelected: true,
                        // suppressMiniFilter: true,
                        suppressSelectAll: true,
                        suppressSorting: true,
                        textFormatter(from) {
                            return from;
                        }
                    }
                },
                {
                    field: "gold",
                    filter: "agNumberColumnFilter",
                    headerName: "金牌"
                },
                {
                    field: "silver",
                    filter: "agNumberColumnFilter",
                    headerName: "银牌"
                },
                {
                    field: "bronze",
                    filter: "agNumberColumnFilter",
                    headerName: "铜牌"
                }
            ],
            gridApi: null,
            defaultColDef: {
                flex: 1,
                minWidth: 200,
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

<!--
    文本过滤

    Text Filter Parameters: TextFilterparams
        buttons: FilterButtonType[]; // 是否有下面几个按钮
        caseSensitive: boolean; // 默认值 false，是否区分大小写
        closeOnApply: boolean; // 默认值 false，如果使用了应用按钮，在点击应用后是否关闭过滤框
        debounceMs: number; // 文本过滤和数字过滤默认是 500ms，DateFilter 和 SetFilter 过滤 0ms，防抖
        defaultJoinOperator: JoinOperator; // 指定默认的条件连接符 AND 或者 OR，默认使用 AND
        defaultOption: string; // 默认选中的过滤条件
        filterOptions: (IFilterOptionDef | ISimpleFilterModelType)[]; // 允许选择的过滤条件
        filterPlaceholder: FilterPlaceholderFunction | string; // 输入框的提示文字
        maxNumConditions: number; // 默认2 允许多少个过滤条件
        numAlwaysVisibleConditions: number; // 默认1，显示的条件框，必须要小于等于 maxNumConditions
        readOnly: boolean; // 默认false， 禁用过滤器，但依然可以使用api的方式进行过滤
        textFormatter: (from: string) => string | null; // 在过滤比较之前格式化用户输入的文本和单元格的文本
        textMatcher: (params: TextMatcherParams) => boolean; // 用来自定义匹配逻辑来确定哪些行需要保留
        trimInput: boolean; // 默认false 是否去除用户输入前后的空格

    type FilterButtonType = "apply" | "clear" | "reset" | "cancel" ，应用 ｜ 清除 ｜ 重置 | 取消
    type JoinOperator = "AND" | "OR";
    interface IFilterOptionDef {
        displayKey: string;
        displayName: string;
        predicate?: (filterValues: any[], cellValue: any) => boolean; // 用于自定义的判断逻辑，来判断哪些行应该保留，它接受过滤值(用户输入或选择的值)和单元格值，当使用这个值后网格将完全依赖函数的返回值来判断是否保留行
        numberOfInputs?: 0 | 1 | 2; // 指定需要几个输入框
    }
    type ISimpleFilterModelType = "empty" | "equals" | "notEqual" | "lessThan" | "lessThanOrEqual" |
        "greaterThan" | "greaterThanOrEqual" | "inRange" | "contains" | "notContains" |
        "startsWith" | "endsWith" | "blank" | "notBlank";
    type FilterPlaceholderFunction = (params: IFilterPlaceholderFunctionParams) => string;
    interface IFilterPlaceholderFunctionParams {
        filterOptionKey: ISimpleFilterModeType;
        filterOption: string;
        placeholder: string;
    }
    interface TextMatcherParams {
        filterOption: string | null | undefined;
        value: any;
        filterText: string | null;
        textFormatter?: TextFormatter;
        node: IRowNode<TData> | null;
        data: TData;
        column: Column<TValue>;
        colDef: ColDef<TData, TValue>;
        api: GridApi<TData>;
        context: any;
    }

    interface TextFormatter {
        (from?: string | null): string | null;
    }
-->
<template>
    <div class="text-filter-table">
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
function contains(target, lookingFor) {
    return target && lookingFor && target.indexOf(lookingFor) >= 0;
}
export default {
    data() {
        return {
            colDefs: [
                {
                    field: "athlete",
                    headerName: "运动员",
                    filterParams: {
                        filterOptions: ["contains", "notContains"],
                        textFormatter: r => {
                            if (!r) return "";
                            return r
                                .toLowerCase()
                                .replace(/[àáâãäå]/g, "a")
                                .replace(/æ/g, "ae")
                                .replace(/ç/g, "c")
                                .replace(/[èéêë]/g, "e")
                                .replace(/[ìíîï]/g, "i")
                                .replace(/ñ/g, "n")
                                .replace(/[òóôõö]/g, "o")
                                .replace(/œ/g, "oe")
                                .replace(/[ùúûü]/g, "u")
                                .replace(/[ýÿ]/g, "y");
                        },
                        debounceMs: 200,
                        maxNumConditions: 3,
                        numAlwaysVisibleConditions: 3,
                        buttons: ["apply", "clear", "reset", "cancel"],
                        closeOnApply: true
                    }
                },
                {
                    field: "country",
                    headerName: "国家",
                    filterParams: {
                        filterOptions: ["contains"],
                        textMatcher: ({ value, filterText }) => {
                            let aliases = {
                                usa: "united states",
                                holland: "netherlands",
                                niall: "ireland",
                                sean: "south africa",
                                alberto: "mexico",
                                john: "australia"
                            };
                            let literalMatch = contains(
                                value,
                                filterText || ""
                            );
                            return (
                                !!literalMatch ||
                                    !!contains(value, aliases[filterText || ""])
                            );
                        },
                        trimInput: true,
                        debounceMs: 1000,
                        defaultJoinOperator: "OR",
                        filterPlaceholder: "请输入111"
                        // readOnly: true
                    }
                },
                {
                    field: "sport",
                    headerName: "体育项目",
                    filterParams: {
                        caseSensitive: true,
                        defaultOption: "startsWith"
                    }
                }
            ],
            gridApi: null,
            defaultColDef: {
                flex: 1,
                // filter: true,
                filter: "agTextColumnFilter",
                menuTabs: ["filterMenuTab"]
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

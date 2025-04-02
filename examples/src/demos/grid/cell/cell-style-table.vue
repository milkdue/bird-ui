<!--
cellStyle: CellStyle | CellStyleFunc;

interface CellStyle {
    [cssProperty: string]: string | number;
}

interface CellStyleFunc<TData, TValue> {
    (cellClassParams: CellClassParams<TData, TValue>): CellStyle | null | undefined;
}

interface CellClassParams<TData, TValue> {
    column: Column<TValue>;
    colDef: ColDef<TData, TValue>;
    value: TValue | null | undefined;
    data: TData | undefined;
    node: IRowNode<TData>;
    rowIndex: number;
    api: GridApi<TData>;
    context: TContext;
}

cellClass: string | string[] | CellClassFunc;

interface CellClassFunc<TData, TValue> {
    (cellClassParams: CellClassParams<TData, TValue>) : string | string[] | null | undefined
}

cellClassRules: CellClassRules;

interface CellClassRules<TData, TValue> {
    [cssClassName: string]: (((params: CellClassParams<TData, TValue>) => boolean) | string);
}

第一列和最后一列有特殊的类名

.ag-cell.ag-column-first
.ag-cell.ag-column-last
-->

<template>
    <div class="cell-style-table">
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
function cellStyle(params) {
    const color = numberToColor(params.value);
    return {
        backgroundColor: color
    };
}
function cellClass(params) {
    return params.value === "Swimming" ? "rag-green" : "rag-blue";
}
function numberToColor(val) {
    if (val === 0) {
        return "#ffaaaa";
    } else if (val === 1) {
        return "#aaaaff";
    } else {
        return "#aaffaa";
    }
}
function ragRenderer(params) {
    return `<span class="rag-element">${params.value}</span>`;
}
function numberParser(params) {
    const newValue = params.newValue;
    let valueAsNumber;
    if (!newValue) {
        valueAsNumber = null;
    } else {
        valueAsNumber = parseFloat(params.newValue);
    }
    return valueAsNumber;
}

const ragCellClassRules = {
    "rag-green-outer": params => params.value === 2008,
    "rag-blue-outer": params => params.value === 2004,
    "rag-red-outer": params => params.value === 2000
};
export default {
    data() {
        return {
            colDefs: [
                {
                    field: "athlete",
                    headerName: "运动员"
                },
                {
                    field: "age",
                    maxWidth: 90,
                    valueParser: numberParser,
                    cellClassRules: {
                        "rag-green": "x < 20",
                        "rag-blue": "x >= 20 && x < 25",
                        "rag-red": "x >= 25"
                    },
                    headerName: "年龄"
                },
                {
                    field: "country",
                    headerName: "国家"
                },
                {
                    field: "year",
                    maxWidth: 90,
                    valueParser: numberParser,
                    cellClassRules: ragCellClassRules,
                    cellRenderer: ragRenderer,
                    headerName: "年份"
                },
                {
                    field: "date",
                    headerName: "年份",
                    cellClass: "rag-blue"
                },
                {
                    field: "sport",
                    cellClass: cellClass,
                    headerName: "运动项目"
                },
                {
                    field: "gold",
                    valueParser: numberParser,
                    cellStyle: {
                        backgroundColor: "#aaffaa"
                    },
                    headerName: "金牌"
                },
                {
                    field: "silver",
                    valueParser: numberParser,
                    cellStyle: cellStyle,
                    headerName: "银牌"
                },
                {
                    field: "bronze",
                    valueParser: numberParser,
                    cellStyle: cellStyle,
                    headerName: "铜牌"
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

<style lang="less">
    .cell-style-table {
        .rag-red {
            background-color: #c224;
        }
        .rag-green {
            background-color: #3c34;
        }
        .rag-blue {
            background-color: #24c4;
        }
        .rag-red-outer .rag-element {
            background-color: #c224;
        }
        .rag-green-outer .rag-element {
            background-color: #3c34;
        }
        .rag-blue-blue .rag-element {
            background-color: #24c4;
        }
    }
</style>

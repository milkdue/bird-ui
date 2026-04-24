<!--
    预定义单元格数据类型

    dataTypeDefinitions 可以用来预定义单元格数据类型

    dataTypeDefinitions: {
        [cellDataType: string]: DataTypeDefinition<TData>;
    }

    type DataTypeDefinition<T> =
        TextDataTypeDefinition<T> |
        NumberDataTypeDefinition<T> |
        BooleanDataTypeDefinition<T> |
        DateDataTypeDefinition<T> |
        DateStringDataTypeDefinition<T> |
        ObjectDataTypeDefinition<T, any>;

    interface TextDataTypeDefinition<TData> {
        baseDataType: TValueType;
        extendsDataType: string;
        valueParser?: ValueParserLiteFunc<TData, TValue>;
        valueFormatter?: ValueFormatterLiteFunc<TData, TValue>;
        dataTypeMatcher?: (value: any) => boolean;
        columnTypes?: string | string[];
        appendColumnTypes?: boolean;
        suppressDefaultProperties?: boolean;
    }
    interface ValueParserLiteFunc<TData, TValue> {
        (params: ValueParserLiteParams<TData, TValue>): TValue | null | undefined;
    }
    type ValueParserLiteParams = Omit<ValueParserParams<TData, TValue>, "data" | "node" | "oldValue">;
    interface ValueParserParams<TData, TValue> {
        oldValue: TValue | null | undefined;
        newValue: string;
        node: IRowNode<TData> | null;
        data: TData;
        column: Column<TValue>;
        colDef: ColDef<TData, TValue>;
        api: GridApi<TData>;
        context: any;
    }
    interface NumberDataTypeDefinition<TData> {
        baseDataType: TValueType;
        extendsDataType: string;
        valueParser?: ValueParserLiteFunc<TData, TValue>;
        valueFormatter?: ValueFormatterLiteFunc<TData, TValue>;
        dataTypeMatcher?: (value: any) => boolean;
        columnTypes?: string | string[];
        appendColumnTypes?: boolean;
        suppressDefaultProperties?: boolean;
    }
    interface BooleanDataTypeDefinition<TData> {
        baseDataType: TValueType;
        extendsDataType: string;
        valueParser?: ValueParserLiteFunc<TData, TValue>;
        valueFormatter?: ValueFormatterLiteFunc<TData, TValue>;
        dataTypeMatcher?: (value: any) => boolean;
        columnTypes?: string | string[];
        appendColumnTypes?: boolean;
        suppressDefaultProperties?: boolean;
    }
    interface DateDataTypeDefinition<TData> {
        baseDataType: TValueType;
        extendsDataType: string;
        valueParser?: ValueParserLiteFunc<TData, TValue>;
        valueFormatter?: ValueFormatterLiteFunc<TData, TValue>;
        dataTypeMatcher?: (value: any) => boolean;
        columnTypes?: string | string[];
        appendColumnTypes?: boolean;
        suppressDefaultProperties?: boolean;
    }
    interface DateStringDataTypeDefinition<TData> {
        dateParser?: (value: string | undefined) => Date | undefined;
        dateFormatter?: (value: Date | undefined) => string | undefined;
        baseDataType: TValueType;
        extendsDataType: string;
        valueParser?: ValueParserLiteFunc<TData, TValue>;
        valueFormatter?: ValueFormatterLiteFunc<TData, TValue>;
        dataTypeMatcher?: (value: any) => boolean;
        columnTypes?: string | string[];
        appendColumnTypes?: boolean;
        suppressDefaultProperties?: boolean;
    }
    interface ObjectDataTypeDefinition<TData, TValue> {
        baseDataType: TValueType;
        extendsDataType: string;
        valueParser?: ValueParserLiteFunc<TData, TValue>;
        valueFormatter?: ValueFormatterLiteFunc<TData, TValue>;
        dataTypeMatcher?: (value: any) => boolean;
        columnTypes?: string | string[];
        appendColumnTypes?: boolean;
        suppressDefaultProperties?: boolean;
    }

    每个自定义的数据类型必须拥有 baseDataType 属性。并且提供了 extendsDataType 继承，每个自定义类型也必须继承一个类型。通过 suppressDefaultProperties 可以禁用默认的继承属性
    dataTypeMatcher 可匹配的数据类型 返回 true 表示可匹配为该数据类型

    dateParser: (
        value: string | undefined
    ) => Date | undefined; 转换 date string 为 Date 对象

    dateFormatter: (
        value: Date | undefined
    ) => string | undefined; 转换 Date 对象为 date string
-->

<template>
    <div class="pre-define-data-type-table">
        <ag-grid-vue
            style="width: 100%; height: 500px"
            class="ag-theme-quartz"
            :columnDefs="colDefs"
            :defaultColDef="defaultColDef"
            :dataTypeDefinitions="dataTypeDefinitions"
            :enableFillHandle="true"
            :enableRangeSelection="true"
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
                { field: "countryObject", headerName: "国家" },
                { field: "sportObject", headerName: "体育项目" }
            ],
            gridApi: null,
            defaultColDef: {
                filter: true,
                floatingFilter: true,
                editable: true,
                flex: 1
            },
            dataTypeDefinitions: {
                country: {
                    baseDataType: "object",
                    extendsDataType: "object",
                    valueParser: params =>
                        params.newValue ? { code: params.newValue } : null,
                    valueFormatter: params =>
                        params.value ? params.value.code : "",
                    dataTypeMatcher: value => value && !!value.code
                },
                sport: {
                    baseDataType: "object",
                    extendsDataType: "object",
                    valueParser: params =>
                        params.newValue ? { name: params.newValue } : null,
                    valueFormatter: params =>
                        params.value ? params.value.name : "",
                    dataTypeMatcher: value => value && !!value.name
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
                    return {
                        ...row,
                        countryObject: {
                            code: row.country
                        },
                        sportObject: {
                            name: row.sport
                        }
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

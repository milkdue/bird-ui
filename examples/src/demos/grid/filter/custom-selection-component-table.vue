<!--
    默认的网格使用浏览器提供的日期选择框，如果需要自定义日期选择框，通过

    自定义的日期选择组件必须实现以下方法
        interface IDate {
            getDate(): Date | null;
            setDate(date: Date | null): void;
            refresh?(params: IDateParams): void;
            setDisabled?(disabled: boolean): void;
            setInputPlaceholder?(placeholder: string): void;
            setInputAriaLabel?(placeholder: string): void;
            afterGuiAttached?(params?: IAfterGuiAttachedParams): void;
        }

        interface IDateParams {
            onDateChanged(): void;
            filterParams: DateFilterParams;
            api: GridApi;
            context: TContext;
        }

        type DateFilterParams = IDateFilterParams & IFilterParams<TData>;
        interface IDateFilterParams {
            comparator?: IDateComparatorFunc;
            browserDatePicker?: boolean;
            minValidYear?: number;
            maxValidYear?: number;
            minValidDate?: Date | string;
            maxValidDate?: Date | string;
            inRangeFloatingFilterDateFormat?: string;
            inRangeInclusive?: boolean;
            includeBlanksInEquals?: boolean;
            includeBlanksInLessThan?: boolean;
            includeBlanksInGreaterThan?: boolean;
            includeBlanksInRange?: boolean;
            filterOptions?: (IFilterOptionDef | ISimpleFilterModelType)[];
            defaultOption?: string;
            defaultJoinOperator?: JoinOperator;
            maxNumConditions?: number;
            numAlwaysVisibleConditions?: number;
            filterPlaceholder?: FilterPlaceholderFunction | string;
            buttons?: FilterButtonType[];
            closeOnApply?: boolean;
            debounceMs?: number;
            readOnly?: boolean;
        }

        type FilterPlaceholderFunction = (params: IFilterPlaceholderFunctionParams) => string;
        interface IFilterPlaceholderFunctionParams {
            filterOptionKey: ISimpleFilterModelType;
            filterOption: string;
            placeholder: string;
        }

        interface IFilterParams<TData, TContext> {
            filterChangedCallback: (additionalEventAttributes?: any) => void;
            filterModifiedCallback: () => void;
            column: Column;
            colDef: ColDef<TData>;
            rowModel: IRowModel;
            getValue: <TValue>(node: IRowNode<TData>, column?: string | ColDef<TData, TValue> | Column<TValue>) => TValue | null | undefined;
            doesRowPassOtherFilter: (rowNode: IRowNode<TData>) => boolean;
            api: GridApi<TData>;
            context: TContext;
        }

        interface IRowModel {
            getRow(index: number): RowNode | undefined;
            getRowNode(id: string): RowNode | undefined;
            getRowCount(): number;
            getTopLevelRowCount(): number;
            getTopLevelRowDisplayedIndex(topLevelIndex: number): number;
            getRowIndexAtPixel(pixel: number): number;
            isRowPresent(rowNode: RowNode): boolean;
            getRowBounds(index: number): RowBounds | null;
            isEmpty(): boolean;
            isRowsToRender(): boolean;
            getNodesInRangeForSelection(first: RowNode, last: RowNode | null): RowNode[];
            forEachNode(callback: (rowNode: RowNode, index: number) => void, includeFooterNodes?: boolean): void;
            getType(): RowModelType;
            isLastRowIndexKnown(): boolean;
            ensureRowHeightsValid(startPixel: number, endPixel: number, startLimitIndex: number, endLimitIndex: number): boolean;
            start(): void;
        }

        interface RowBounds {
            rowTop: number;
            rowHeight: number;
            rowIndex?: number;
        }

        type RowModelType = "infinite" | "viewport" | "clientSide" | "serverSide";
-->

<template>
    <div class="custom-selection-component-table">
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
const CustomDateComponent = {
    render(h) {
        return h(
            "div",
            {
                class: "ag-input-wrapper custom-date-filter",
                attrs: {
                    role: "presentation"
                },
                ref: "flatpickr"
            },
            [
                h("input", {
                    attrs: {
                        type: "text"
                    },
                    style: {
                        width: "100%"
                    },
                    ref: "eInput"
                })
            ]
        );
    },
    data() {
        return {
            date: null,
            ariaLabel: undefined,
            eInput: null,
            picker: null
        };
    },
    mounted() {},
    methods: {
        onDateChanged(selectedDates) {
            this.date = selectedDates[0] || null;
            this.params.onDateChanged();
        },
        getDate() {
            return this.date;
        },
        setDate(date) {
            if (!this.picker) return;
            this.picker.setDate(date);
            this.date = date || null;
        },
        setInputPlaceholder(placeholder) {
            if (!this.eInput) return;
            this.eInput.setAttribute("placeholder", placeholder);
        },
        setInputAriaLabel(label) {
            if (this.eInput) {
                this.eInput.setAttribute("aria-label", label);
            } else {
                this.ariaLabel = label;
            }
        }
    }
};
export default {
    components: {
        agDateInput: CustomDateComponent // 自定义 agDateInput 的输入框来自定义
    },
    data() {
        return {
            colDefs: [
                { field: "athlete", headerName: "运动员" },
                { field: "country", headerName: "国家" },
                {
                    field: "date",
                    headerName: "日期",
                    minWidth: 190,
                    filter: "agDateColumnFilter",
                    filterParams: {
                        comparator(filterLocalDateAtMidnight, cellValue) {
                            const dateAsString = cellValue;
                            const dateParts = dateAsString.split("/");
                            const cellDate = new Date(
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
                        }
                    }
                },
                { field: "sport", headerName: "运动项目" }
            ],
            gridApi: null,
            defaultColDef: {
                editable: true,
                flex: 1,
                minWidth: 100,
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

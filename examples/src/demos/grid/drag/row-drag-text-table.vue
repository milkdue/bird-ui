<!--
    自定义行拖拽文本，不设置时使用当前单元格的内容
    gridOptions.rowDragText

    rowDragText: (
        params: IRowDragItem,
        dragItemCount: number
    ) => string;

    interface IRowDragItem {
        defaultTextValue: string;
        rowNode?: IRowNode;
        rowNodes?: IRowNode[];
        columns?: Column[];
        visibleState?: { [key: string]: boolean; };
        pivotState?: {
            [key: string]: {
                pivot?: boolean;
                rowGroup?: boolean;
                aggFunc?: string | IAggFunc | null;
            };
        };
        value?: TValue;
    }
-->

<template>
    <div class="row-drag-text-table">
        <div class="button-group">
            <bird-button
                v-for="button in buttons"
                size="md"
                :key="button.value"
                @click="clickButton(button.value)"
            >
                {{ button.label }}
            </bird-button>
        </div>
        <ag-grid-vue
            style="width: 100%; height: 500px"
            class="ag-theme-quartz"
            rowDragManaged
            :columnDefs="colDefs"
            :rowDragText="rowDragText"
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
                    headerName: "运动员",
                    rowDrag: true
                },
                {
                    field: "country",
                    headerName: "国家"
                },
                {
                    field: "sport",
                    headerName: "运动"
                },
                {
                    field: "year",
                    headerName: "年份",
                    width: 100
                },
                {
                    field: "gold",
                    headerName: "金牌"
                },
                {
                    field: "silver",
                    headerName: "银牌"
                },
                {
                    field: "bronze",
                    headerName: "铜牌"
                }
            ],
            gridApi: null,
            defaultColDef: {
                width: 170,
                filter: true
            },
            rowDragText: params => {
                if (params.rowNode.data.year === 2012) {
                    return params.defaultTextValue + " (2012)";
                } else {
                    return params.defaultTextValue;
                }
            },
            rowData: null,
            buttons: [
                {
                    label: "整行拖拽",
                    value: "yes"
                },
                {
                    label: "单列拖拽",
                    value: "no"
                }
            ]
        };
    },
    methods: {
        onGridReady(params) {
            this.gridApi = params.api;
            fetch(
                "https://www.ag-grid.com/example-assets/olympic-winners.json"
            )
                .then(resp => resp.json())
                .then(data => {
                    this.rowData = data;
                });
        },
        clickButton(code) {
            let flag = code === "yes";
            this.gridApi.setGridOption("rowDragEntireRow", flag);
        }
    }
};
</script>

<style lang="less">
    .row-drag-text-table {
        .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
    }
</style>

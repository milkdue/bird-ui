<!--
interface ColumnState {
    colId: string;
    hide?: boolean | null,
    width?: number | null,
    flex?: number | null,
    sort?: "asc" | "desc" | null,
    sortIndex?: number | null,
    aggFunc?: string | IAggFunc | null,
    pivot?: boolean | null,
    pivotIndex?: number | null,
    pinned?: "left" | "right" | boolean | null  | undefined,
    rowGroup?: boolean | null,
    rowGroupIndex?: number | null
}

interface ApplyColumnStateParams {
    state?: ColumnState[];
    applyOrder?: boolean;
    defaultState?: ColumnStateParams;
}

interface ColumnStateParams {
    hide?: boolean | null,
    width?: number | null,
    flex?: number | null,
    sort?: "asc" | "desc" | null,
    sortIndex?: number | null,
    aggFunc?: string | IAggFunc | null,
    pivot?: boolean | null,
    pivotIndex?: number | null,
    pinned?: "left" | "right" | boolean | null  | undefined,
    rowGroup?: boolean | null,
    rowGroupIndex?: number | null
}

const getColumnState: () => ColumnState[];
const applyColumnState: (params: ApplyColumnStateParams) => void;
-->
<template>
    <div v-exposure.once="exposureEvent">
        <div v-if="showContent" class="save-apply-table">
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
                rowGroupPanelShow="always"
                :columnDefs="colDefs"
                :rowData="rowData"
                :defaultColDef="defaultColDef"
                :autoGroupColumnDef="autoGroupColumnDef"
                :autoSizeStrategy="autoSizeStrategy"
                @grid-ready="onGridReady"
            ></ag-grid-vue>
        </div>
    </div>
</template>

<script>
import CommonMixin from "../common.mixin";
export default {
    mixins: [CommonMixin],
    data() {
        return {
            buttons: [
                {
                    label: "保存状态",
                    value: "save"
                },
                {
                    label: "应用状态",
                    value: "restore"
                },
                {
                    label: "重置状态",
                    value: "reset"
                }
            ],
            colDefs: [
                {
                    field: "athlete",
                    headerName: "运动员"
                },
                {
                    field: "age",
                    headerName: "年龄"
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
                    headerName: "年份"
                },
                {
                    field: "date",
                    headerName: "日期"
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
                },
                {
                    field: "total",
                    headerName: "总计"
                }
            ],
            gridApi: null,
            defaultColDef: {
                width: 100,
                enableRowGroup: true,
                enablePivot: true,
                enableValue: true
            },
            autoGroupColumnDef: {
                minWidth: 200
            },
            autoSizeStrategy: {
                type: "fitGridWidth"
            },
            rowData: null,
            state: null
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
        },
        clickButton(code) {
            if (code === "save") {
                this.state = this.gridApi.getColumnState();
            } else if (code === "restore") {
                if (!this.state) {
                    this.$message({
                        type: "error",
                        message: "没有保存的状态"
                    });
                } else {
                    this.gridApi.applyColumnState({
                        state: this.state,
                        applyOrder: true
                    });
                }
            } else {
                this.gridApi.resetColumnState();
            }
        }
    }
};
</script>

<style lang="less">
    .save-apply-table {
        .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
    }
</style>

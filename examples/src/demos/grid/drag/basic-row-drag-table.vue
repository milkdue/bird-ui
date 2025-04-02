<!--
    rowDrag: boolean | RowDragCallback; // 默认值为 false
    在列配置上指定 rowDrag 为 true 或者指定回调函数(返回true)，即可开启行拖拽功能。

    interface RowDragCallback<TData, TValue> {
        (params: RowDragCallbackParams<TData, TValue>): boolean;
    }

    interface RowDragCallbackParams<TData, TValue> {
        node: IRowNode<TData>;
        data: TData | undefined;
        column: Column<TValue>;
        colDef: ColDef<TData, TValue>;
        api: GridApi<TData>;
        context: any;
    }

    两种方式:
        - Managed Drag: 有 ag-grid 来管理拖拽行为，网格会自动处理数据更新，无需手动操作
        - Unmanaged Drag: 由用户自己来管理拖拽行为，网格不会自动处理行拖拽时的数据更新。当你通过拖拽移动行时，网格不会自动调整数据的顺序，需要你手动编写代码来更新数据源

    注意如果有排序、过滤等那么拖拽图标会隐藏，有分页也不会拖拽

    Multi-Row Dragging: 多行拖拽
        - 指定 rowDragMultiRow 为 true 可以开启多行拖拽但是需要设置 rowSelection 为 'multiple'
        - 按住 shift或ctrl(command) 键可以选择多行
-->

<template>
    <div v-exposure.once="exposureEvent">
        <div v-if="showContent" class="basic-row-drag-table">
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
                rowDragMultiRow
                rowSelection="multiple"
                :columnDefs="colDefs"
                :rowData="rowData"
                :defaultColDef="defaultColDef"
                :suppressMoveWhenRowDragging="suppressMoveWhenRowDragging"
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
                    field: "year",
                    headerName: "年份",
                    width: 100
                },
                {
                    field: "date",
                    headerName: "日期"
                },
                {
                    field: "sport",
                    headerName: "运动"
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
            rowData: null,
            buttons: [
                {
                    label: "去除移动动画",
                    value: "suppressMoveWhenRowDragging"
                }
            ],
            suppressMoveWhenRowDragging: false
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
            this.gridApi.setGridOption(code, !this[code]);
        }
    }
};
</script>

<style lang="less">
    .basic-row-drag-table {
        .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
    }
</style>

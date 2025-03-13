<!--
    Unmanaged Dragging: 这是默认的drag行为，不去设置 rowDragManaged 属性即可，获取设置 false

    默认行为：
        - 网格不会管理拖动行为。只会发射它的拖拽事件
        - 在排序的时候也会发射拖拽事件
        - 过滤同上
        - 分组同上

    Row Drag Events: 行拖拽事件
        - rowDragEnter: 拖拽开始时或者在拖拽时鼠标重新进入到网格时 触发一次
        - rowDragMove: 鼠标移动时 触发多次
        - rowDragLeave: 拖拽时鼠标离开这个网格时
        - rowDragEnd: 拖拽完成时 触发一次

    事件的 event 对象 RowDragEvent

    interface RowDragEvent<TData, TContext> {
        type: "rowDragEnter" | "rowDragMove" | "rowDragEnd" | "rowDragLeave";
        node: IRowNode<TData>;
        nodes: IRowNode<TData>[];
        event: MouseEvent;
        eventPath: EventTarget[];
        vDirection: "up" | "down" | null;
        overIndex: number; // 鼠标拖动到的行索引
        overNode: IRowNode<TData>; // 鼠标拖动到的行
        y: number; // 像素
        api: GridApi<TData>;
        context: TContext;
    }
-->
<template>
    <div class="unmanaged-drag-table">
        <ag-grid-vue
            style="width: 100%; height: 500px"
            class="ag-theme-quartz"
            :columnDefs="colDefs"
            :defaultColDef="defaultColDef"
            :rowData="rowData"
            @row-drag-enter="onRowDragEnter"
            @row-drag-end="onRowDragEnd"
            @row-drag-move="onRowDragMove"
            @row-drag-leave="onRowDragLeave"
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
                    rowDrag: true,
                    headerName: "运动员"
                },
                {
                    field: "country",
                    headerName: "国家"
                },
                {
                    field: "year",
                    headerName: "年份"
                },
                {
                    headerName: "日期",
                    field: "date"
                },
                {
                    field: "sport",
                    headerName: "体育项目"
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
                .then(data => {
                    this.rowData = data;
                });
        },
        onRowDragEnter(event) {
            console.log("onRowDragEnter", event);
        },
        onRowDragEnd(event) {
            console.log("onRowDragEnd", event);
        },
        onRowDragMove(event) {
            console.log("onRowDragMove", event);
        },
        onRowDragLeave(event) {
            console.log("onRowDragLeave", event);
        }
    }
};
</script>

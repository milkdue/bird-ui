<!--
    gridApi 关于 Node 的 Api
        getRowNode: (id: string) => IRowNode<TData> | undefined; 根据 rowId 获取 rowNode
        forEachNode: (
            callback: (rowNode: IRowNode<TData>, index: number) => void,
            includeFooterNodes?: boolean
        ) => void; 忽略任何过滤排序的遍历 rowNode, 是否包含固定在底部的元素node
        forEachNodeAfterFilter: (
            callback: (rowNode: IRowNode<TData>, index: number) => void;
        ) => void; 过滤后的遍历node
        forEachNodeAfterFilterAndSort: (
            callback: (rowNode: IRowNode<TData>, index: number) => void
        ) => void; 过滤并且排序后遍历node
        forEachLeafNode(
            callback: (rowNode: IRowNode<TData>) => void
        ) => void; 遍历叶子节点
-->

<template>
    <div class="each-row-table">
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
            class="ag-theme-alpine"
            rowSelection="multiple"
            :getRowId="getRowId"
            :columnDefs="colDefs"
            :defaultColDef="defaultColDef"
            :autoGroupColumnDef="autoGroupColumnDef"
            :groupDefaultExpanded="groupDefaultExpanded"
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
                    field: "country",
                    headerName: "国家",
                    hide: true,
                    rowGroup: true
                },
                {
                    field: "athlete",
                    headerName: "运动员",
                    minWidth: 180
                },
                {
                    field: "age",
                    headerName: "年龄"
                },
                {
                    field: "year",
                    headerName: "年份"
                },
                {
                    field: "date",
                    headerName: "日期",
                    minWidth: 150
                },
                {
                    field: "sport",
                    headerName: "运动",
                    minWidth: 150
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
                    headerName: "总数"
                }
            ],
            gridApi: null,
            rowData: null,
            defaultColDef: {
                flex: 1,
                minWidth: 100,
                filter: true
            },
            autoGroupColumnDef: {
                minWidth: 200,
                headerName: "分组",
                field: "country",
                headerCheckboxSelection: false,
                cellRenderer: "agGroupCellRenderer",
                cellRendererParams: {
                    checkbox: params => !params.node.group
                }
            },
            groupDefaultExpanded: 1,
            buttons: [
                {
                    label: "获取ID为10的节点并选中",
                    value: "getRowNode"
                },
                {
                    label: "forEachNode",
                    value: "forEachNode"
                },
                {
                    label: "forEachNodeAfterFilter",
                    value: "forEachNodeAfterFilter"
                },
                {
                    label: "forEachNodeAfterFilterAndSort",
                    value: "forEachNodeAfterFilterAndSort"
                },
                {
                    label: "forEachLeafNode",
                    value: "forEachLeafNode"
                }
            ],
            getRowId: params => params.data.id
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
                    data.forEach((item, index) => {
                        item.id = index;
                    });
                    this.rowData = data;
                });
        },
        clickButton(code) {
            if (code === "getRowNode") {
                let rowNode = this.gridApi.getRowNode(10);
                console.log(rowNode);
                rowNode && rowNode.setSelected(true);
            } else {
                console.log(
                    `------------------------ ${code} start -----------------------`
                );
                this.gridApi[code](this.printNodeInfo);
                console.log(
                    `------------------------ ${code} end -----------------------`
                );
            }
        },
        printNodeInfo(node, index) {
            if (node.group) {
                console.log(`${index} -> 分组: ${node.key}`);
            } else {
                console.log(
                    `${index} -> 数据: ${node.data.country}, ${node.data.athlete}`
                );
            }
        }
    }
};
</script>
<style lang="less">
    div.each-row-table {
        .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
    }
</style>

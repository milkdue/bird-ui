<!--
    gridApi.forEachNode(node: RowNode => unknown)
    interface RowNode {
        id: string;
        rowIndex: number;
        data: TData;
        group: any;
        rowHeight: number;
        isSelected: () => boolean;
    }

    gridApi.getRowNode(id: string) => RowNode | undefined;
-->
<template>
    <div class="row-node-table">
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
            style="width: 100%; height: 240px"
            class="ag-theme-quartz"
            :columnDefs="colDefs"
            :rowData="rowData"
            :defaultColDef="defaultColDef"
            :getRowId="getRowId"
            @grid-ready="onGridReady"
        ></ag-grid-vue>
    </div>
</template>

<script>
export default {
    data() {
        return {
            rowData: [
                { id: "c1", make: "Toyota", model: "Celica", price: 35000 },
                { id: "c2", make: "Ford", model: "Mondeo", price: 32000 },
                {
                    id: "c8",
                    make: "Porsche",
                    model: "Boxster",
                    price: 72000
                },
                { id: "c4", make: "BMW", model: "M50", price: 60000 },
                {
                    id: "c14",
                    make: "Aston Martin",
                    model: "DBX",
                    price: 190000
                }
            ],
            gridApi: null,
            colDefs: [
                { field: "id", headerName: "ID" },
                { field: "make", headerName: "制造者" },
                { field: "model", headerName: "型号" },
                { field: "price", headerName: "价格" }
            ],
            getRowId: params => params.data.id,
            defaultColDef: {
                flex: 1
            },
            buttons: [
                {
                    label: "获取所有节点",
                    value: "all"
                },
                {
                    label: "获取C2节点",
                    value: "c2"
                }
            ]
        };
    },
    methods: {
        onGridReady(params) {
            this.gridApi = params.api;
        },
        clickButton(code) {
            if (code === "all") {
                this.gridApi.forEachNode(node => {
                    console.log(
                        `------------- ROW ${node.rowIndex} ROW -------------`
                    );
                    console.log(`id = ${node.id}`);
                    console.log(`rowIndex = ${node.rowIndex}`);
                    console.log(`data = ${JSON.stringify(node.data)}`);
                    console.log(`group = ${node.group}`);
                    console.log(`height = ${node.rowHeight}px`);
                    console.log(`isSelected = ${node.isSelected()}`);
                });
            } else {
                const rowNode = this.gridApi.getRowNode("c2");
                if (rowNode && rowNode.id === "c2") {
                    console.log("################ Got Row Node C2");
                    console.log(`data = ${JSON.stringify(rowNode.data)}`);
                }
            }
        }
    }
};
</script>

<style lang="less">
    .row-node-table {
        .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
    }
</style>

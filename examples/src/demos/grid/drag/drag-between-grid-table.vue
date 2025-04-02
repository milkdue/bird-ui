<!--
    网格之间拖拽
-->
<template>
    <div v-exposure.once="exposureEvent">
        <div v-if="showContent" class="drag-between-grid-table">
            <div class="left-grid grid">
                <div class="button-group">
                    <bird-button
                        v-for="button in buttons"
                        size="md"
                        :key="button.value"
                        @click="clickButton(button.value, 'left')"
                    >
                        {{ button.label }}
                    </bird-button>
                </div>
                <ag-grid-vue
                    style="width: 100%; height: 500px"
                    ref="leftGrid"
                    class="ag-theme-quartz"
                    rowDragManaged
                    suppressMoveWhenRowDragging
                    :defaultColDef="defaultColDef"
                    :getRowId="getRowId"
                    :rowClassRules="rowClassRules"
                    :rowData="leftRowData"
                    :columnDefs="colDefs"
                    @grid-ready="onGridReady($event, 'left')"
                ></ag-grid-vue>
            </div>
            <bird-svg-icon
                style="transition: all 0.3s ease-in"
                name="delete"
                :width="20"
                :height="20"
                ref="icon"
            ></bird-svg-icon>
            <div class="right-grid grid">
                <div class="button-group">
                    <bird-button
                        v-for="button in buttons"
                        size="md"
                        :key="button.value"
                        @click="clickButton(button.value, 'right')"
                    >
                        {{ button.label }}
                    </bird-button>
                </div>
                <ag-grid-vue
                    style="width: 100%; height: 500px"
                    ref="rightGrid"
                    class="ag-theme-quartz"
                    rowDragManaged
                    suppressMoveWhenRowDragging
                    :defaultColDef="defaultColDef"
                    :getRowId="getRowId"
                    :rowClassRules="rowClassRules"
                    :rowData="rightRowData"
                    :columnDefs="colDefs"
                    @grid-ready="onGridReady($event, 'right')"
                ></ag-grid-vue>
            </div>
        </div>
    </div>
</template>

<script>
import CommonMixin from "../common.mixin";
let rowId = 100;
export default {
    mixins: [CommonMixin],
    data() {
        return {
            leftRowData: null,
            rightRowData: null,
            colDefs: [
                { field: "id", rowDrag: true },
                { field: "color" },
                { field: "value1" },
                { field: "value2" }
            ],
            defaultColDef: {
                flex: 1,
                minWidth: 100,
                filter: true
            },
            leftGridApi: null,
            rightGridApi: null,
            rowClassRules: {
                "red-row": "data.color === 'Red'",
                "green-row": "data.color === 'Green'",
                "blue-row": "data.color === 'Blue'"
            },
            buttons: [
                {
                    label: "添加红色",
                    value: "Red"
                },
                {
                    label: "添加绿色",
                    value: "Green"
                },
                {
                    label: "添加蓝色",
                    value: "Blue"
                }
            ],
            getRowId: params => params.data.id
        };
    },
    beforeMount() {
        this.leftRowData = this.createLeftRowData();
        this.rightRowData = [];
    },
    methods: {
        onGridReady(params, side) {
            if (side === "left") {
                this.leftGridApi = params.api;
            } else {
                this.rightGridApi = params.api;
            }

            this.addBinZone(params.api);
            this.addGridDropZone(side, params.api);
        },
        createLeftRowData() {
            return ["Red", "Green", "Blue"].map(color =>
                this.createDataItem(color)
            );
        },
        createDataItem(color) {
            return {
                id: rowId++,
                color,
                value1: Math.floor(Math.random() * 100),
                value2: Math.floor(Math.random() * 100)
            };
        },
        addBinZone(api) {
            const dropZone = {
                getContainer: () => {
                    let vNode = this.$refs.icon;
                    return vNode.$el;
                },
                onDragEnter: () => {
                    let dom = this.$refs.icon.$el;
                    dom.style.color = "blue";
                    dom.style.transform = "scale(1.5)";
                },
                onDragLeave: () => {
                    let dom = this.$refs.icon.$el;
                    dom.style.color = "black";
                    dom.style.transform = "scale(1)";
                },
                onDragStop: params => {
                    this.binDrop(params.node.data);
                    let dom = this.$refs.icon.$el;
                    dom.style.color = "black";
                    dom.style.transform = "scale(1)";
                }
            };

            api.addRowDropZone(dropZone);
        },
        binDrop(data) {
            if (!data || !data.id) return;
            let transaction = {
                remove: [data]
            };
            [this.leftGridApi, this.rightGridApi].forEach(api => {
                let rowsInGrid = !!api.getRowNode(data.id);
                if (rowsInGrid) {
                    api.applyTransaction(transaction);
                }
            });
        },
        addGridDropZone(side, api) {
            const dropSide = side === "left" ? "right" : "left";
            const dropZone = {
                getContainer: () => {
                    let vNode = this.$refs[`${dropSide}Grid`];
                    return vNode.$el;
                },
                onDragStop: params => {
                    this.addRecordToGrid(dropSide, params.node.data);
                }
            };
            api.addRowDropZone(dropZone);
        },
        addRecordToGrid(side, data) {
            if (!data || !data.id) return;
            const api = this[`${side}GridApi`];
            const rowAlreadyInGrid = !!api.getRowNode(data.id);
            let transaction = {
                add: [data]
            };
            if (rowAlreadyInGrid) {
                this.$message({
                    type: "warning",
                    message: "该记录已存在"
                });
                return;
            }

            api.applyTransaction(transaction);
        },
        clickButton(color, side) {
            this.addRecordToGrid(side, this.createDataItem(color));
        }
    }
};
</script>

<style lang="less">
    .drag-between-grid-table {
        display: grid;
        gap: 10px;
        grid-template-columns: 4fr 1fr 4fr;
        .grid {
            .button-group {
                display: flex;
                gap: 6px;
                margin-bottom: 10px;
            }
            .red-row {
                background-color: #c334 !important;
            }
            .green-row {
                background-color: #3c34 !important;
            }
            .blue-row {
                background-color: #24c4 !important;
            }
        }
    }
</style>

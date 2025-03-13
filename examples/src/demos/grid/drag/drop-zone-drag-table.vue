<!-- 
    拖拽和外部容器框，可将行拖拽至外部容器框中，在排序、过滤、分组作用时拖拽在网格内不工作，但是外部容器正常工作

    addRowDropZone: (params: RowDropZoneParams) => void;
    removeRowDropZone: (params: RowDropZoneParams) => void;

    interface RowDropZoneParams {
        getContainer: () => HTMLElement;
        onDragEnter?: (params: RowDragEnterEvent) => void;
        onDragLeave?: (params: RowDragLeaveEvent) => void;
        onDragging?: (params: RowDragMoveEvent) => void;
        onDragStop?: (params: RowDragEndEvent) => void;
    }

    getRowDropZoneParams: (events?: RowDropZoneEvents) => RowDropZoneParams;

    interface RowDropZoneEvents {
        onDragEnter?: (params: RowDragEnterEvent) => void;
        onDragLeave?: (params: RowDragLeaveEvent) => void;
        onDragging?: (params: RowDragMoveEvent) => void;
        onDragStop?: (params: RowDragEndEvent) => void;
    }
-->

<template>
    <div class="drop-zone-drag-table">
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
        <div class="ag-grid-drop-zone">
            <ag-grid-vue
                style="width: 50%; height: 500px"
                class="ag-theme-quartz"
                rowDragManaged
                :columnDefs="colDefs"
                :defaultColDef="defaultColDef"
                :rowClassRules="rowClassRules"
                :rowData="rowData"
                @grid-ready="onGridReady"
            ></ag-grid-vue>
            <div class="drop-zone" ref="container">
                <div
                    v-for="item in dropZoneList"
                    class="tile"
                    :key="item.id"
                    :class="item.color.toLowerCase()"
                >
                    <div class="id">{{ item.id }}</div>
                    <div class="value">{{ item.value1 }}</div>
                    <div class="value">{{ item.value2 }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                buttons: [
                    {
                        label: "去除拖拽动画",
                        value: true
                    },
                    {
                        label: "添加拖拽动画",
                        value: false
                    }
                ],
                colDefs: [
                    { field: "id", rowDrag: true },
                    { field: "color" },
                    { field: "value1" },
                    { field: "value2" }
                ],
                gridApi: null,
                defaultColDef: {
                    filter: true,
                    flex: 1
                },
                rowClassRules: {
                    "red-row": "data.color === 'Red'",
                    "green-row": "data.color === 'Green'",
                    "blue-row": "data.color === 'Blue'"
                },
                rowData: null,
                dropZoneList: []
            };
        },
        methods: {
            onGridReady(params) {
                this.gridApi = params.api;
                this.rowData = this.createData();
                this.addDropZones(params);
            },
            createData() {
                let data = [];
                [
                    "Red",
                    "Green",
                    "Blue",
                    "Red",
                    "Green",
                    "Blue",
                    "Red",
                    "Green",
                    "Blue"
                ].forEach((color, index) => {
                    let item = {
                        id: index + 1,
                        color,
                        value1: Math.floor(Math.random() * 100),
                        value2: Math.floor(Math.random() * 100)
                    };
                    data.push(item);
                });
                return data;
            },
            addDropZones(params) {
                const vm = this;
                let dropZone = {
                    getContainer: () => {
                        return vm.$refs.container;
                    },
                    onDragStop: params => {
                        vm.dropZoneList.push(params.node.data);
                    }
                };
                params.api.addRowDropZone(dropZone);
            },
            clickButton(code) {
                this.gridApi.setGridOption("suppressMoveWhenRowDragging", code);
            }
        }
    };
</script>

<style lang="less">
    .drop-zone-drag-table {
        .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
        .ag-grid-drop-zone {
            display: flex;
            gap: 10px;
            .drop-zone {
                width: 50%;
            }
        }
        .red-row {
            background-color: #c334;
        }
        .green-row {
            background-color: #3c34;
        }
        .blue-row {
            background-color: #24c4;
        }
        .drop-zone {
            display: flex;
            align-items: flex-start;
            overflow: auto;
            border: 1px solid #888;
            border-radius: 5px;
            background-color: #9994;
            box-sizing: border-box;
            align-content: flex-start;
            flex-wrap: wrap;
            flex: 1 1 auto;
            .tile {
                margin: 5px;
                padding: 10px;
                width: calc(50% - 10px);
                border-radius: 5px;
                color: white;
                box-sizing: border-box;
                &.red {
                    background-color: #c334;
                }
                &.green {
                    background-color: #3c34;
                }
                &.blue {
                    background-color: #24c4;
                }
            }
        }
    }
</style>

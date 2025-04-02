<!--
    网格之间的多行拖拽
-->

<template>
    <div v-exposure.once="exposureEvent">
        <div v-if="showContent" class="multiple-between-grid-table">
            <div class="button-group">
                <bird-button
                    v-for="button in buttons"
                    size="md"
                    :key="button.value"
                    :type="computedType(button.value)"
                    @click="clickButton(button.value)"
                >
                    {{ button.label }}
                </bird-button>
            </div>
            <div class="grid-content">
                <ag-grid-vue
                    style="width: 100%; height: 500px"
                    class="ag-theme-quartz left-grid"
                    rowSelection="multiple"
                    rowDragMultiRow
                    rowDragManaged
                    suppressMoveWhenRowDragging
                    :defaultColDef="defaultColDef"
                    :columnDefs="leftColDefs"
                    :getRowId="getRowId"
                    :rowData="leftRowData"
                    @grid-ready="onGridReady($event, 'left')"
                ></ag-grid-vue>
                <ag-grid-vue
                    style="width: 100%; height: 500px"
                    class="ag-theme-quartz right-grid"
                    rowDragManaged
                    :defaultColDef="defaultColDef"
                    :getRowId="getRowId"
                    :rowData="rightRowData"
                    :columnDefs="rightColDefs"
                    @grid-ready="onGridReady($event, 'right')"
                ></ag-grid-vue>
            </div>
        </div>
    </div>
</template>

<script>
import CommonMixin from "../common.mixin";
const SportRenderer = {
    render(h) {
        const { applyTransaction } = this;
        return h(
            "div",
            {
                style: {
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "100%"
                }
            },
            [
                h("bird-svg-icon", {
                    props: {
                        width: 16,
                        height: 16,
                        name: "delete"
                    },
                    nativeOn: {
                        click: applyTransaction
                    }
                })
            ]
        );
    },
    methods: {
        applyTransaction() {
            this.params.api.applyTransaction({
                remove: [this.params.node.data]
            });
        }
    }
};
export default {
    mixins: [CommonMixin],
    components: {
        SportRenderer
    },
    data() {
        return {
            leftRowData: null,
            rightRowData: null,
            leftGridApi: null,
            rightGridApi: null,
            defaultColDef: {
                flex: 1,
                minWidth: 100,
                filter: true
            },
            leftColDefs: [
                {
                    rowDrag: true,
                    suppressHeaderMenuButton: true,
                    maxWidth: 50,
                    rowDragText: (params, count) => {
                        if (count > 1) {
                            return count + " 个运动员";
                        }
                        return params.rowNode.data.athlete;
                    }
                },
                {
                    colId: "checkbox",
                    maxWidth: 50,
                    checkboxSelection: true,
                    suppressHeaderMenuButton: true,
                    headerCheckboxSelection: true
                },
                { field: "athlete", headerName: "运动员" },
                { field: "sport", headerName: "体育项目" }
            ],
            rightColDefs: [
                {
                    rowDrag: true,
                    maxWidth: 50,
                    suppressHeaderMenuButton: true,
                    rowDragText: (params, count) => {
                        if (count > 1) {
                            return count + " 个运动员";
                        }
                        return params.rowNode.data.athlete;
                    }
                },
                { field: "athlete", headerName: "运动员" },
                { field: "sport" },
                {
                    suppressHeaderMenuButton: true,
                    maxWidth: 50,
                    cellRenderer: "SportRenderer"
                }
            ],
            rawData: [],
            buttons: [
                {
                    label: "移除源数据",
                    value: "remove"
                },
                {
                    label: "取消选中",
                    value: "deselect"
                },
                {
                    label: "无",
                    value: "none"
                },
                {
                    label: "允许选择",
                    value: "select"
                },
                {
                    label: "重置",
                    value: "reset"
                }
            ],
            action: "remove",
            select: true
        };
    },
    computed: {
        computedType() {
            return function(value) {
                if (value === "reset") return;
                if (value === "select") {
                    return this.select ? undefined : "plain";
                }
                if (value !== this.action) {
                    return "plain";
                }
            };
        }
    },
    beforeMount() {
        fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
            .then(resp => resp.json())
            .then(data => {
                const athletes = [];
                let i = 0;

                while (athletes.length < 20 && i < data.length) {
                    let pos = i++;
                    if (
                        athletes.some(a => a.athlete === data[pos].athlete)
                    ) {
                        continue;
                    }
                    athletes.push(data[pos]);
                }

                this.rawData = athletes;
                this.loadGrids();
            });
    },
    methods: {
        getRowId(params) {
            return params.data.athlete;
        },
        loadGrids() {
            this.leftRowData = [...this.rawData];
            this.rightRowData = [];
        },
        onGridReady(params, side) {
            this[`${side}GridApi`] = params.api;
            if (side === "right") {
                this.addGridDropZone();
            }
        },
        clickButton(code) {
            if (code === "select") {
                let flag = !this.select;
                this.select = flag;
                this.leftGridApi.setColumnsVisible(["checkbox"], flag);
                this.leftGridApi.setGridOption(
                    "suppressRowClickSelection",
                    flag
                );
            } else if (code === "reset") {
                this.select = true;
                this.loadGrids();
            } else {
                this.action = code;
            }
        },
        addGridDropZone() {
            const dropZoneParams = this.rightGridApi.getRowDropZoneParams({
                onDragStop: params => {
                    let deselectCheck = this.action === "deselect";
                    let removeCheck = this.action === "remove";
                    let nodes = params.nodes;
                    if (removeCheck) {
                        this.leftGridApi.applyTransaction({
                            remove: nodes.map(node => node.data)
                        });
                    } else if (deselectCheck) {
                        this.leftGridApi.setNodesSelected({
                            nodes,
                            newValue: false
                        });
                    }
                }
            });

            this.leftGridApi.addRowDropZone(dropZoneParams);
        }
    }
};
</script>

<style lang="less">
    .multiple-between-grid-table {
        .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
        .grid-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
        }
    }
</style>

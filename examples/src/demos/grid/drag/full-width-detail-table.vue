<!--
    full-width不受冻结、滚动影响

    embedFullWidthRows: boolean; 设置true，则会让全宽行在各自的容器中表现为普通行
-->

<template>
    <div v-exposure.once="exposureEvent">
        <div v-if="showContent" class="full-width-detail-table">
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
                :columnDefs="colDefs"
                :rowData="rowData"
                :pinnedTopRowData="pinnedTopRowData"
                :pinnedBottomRowData="pinnedBottomRowData"
                :isFullWidthRow="isFullWidthRow"
                :fullWidthCellRenderer="fullWidthCellRenderer"
                :getRowHeight="getRowHeight"
                @grid-ready="onGridReady"
            ></ag-grid-vue>
        </div>
    </div>
</template>

<script>
import CommonMixin from "../common.mixin";
const getColDefs = () => {
    const colDefs = [];
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(char => {
        const colDef = {
            headerName: char,
            field: char,
            width: 150
        };
        if (char === "A") {
            colDef.pinned = "left";
        }
        if (char === "Z") {
            colDef.pinned = "right";
        }
        colDefs.push(colDef);
    });
    return colDefs;
};
const createData = (count, prefix) => {
    const rowData = [];
    for (let i = 0; i < count; i++) {
        const item = {};
        item.fullWidth = i % 3 === 2;
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach(char => {
            item[char] = prefix + "(" + char + "," + i + ")";
        });
        rowData.push(item);
    }
    return rowData;
};
const FullWidthCellRenderer = {
    render(h) {
        const { cssClass, message, onClickEvent } = this;
        return h(
            "div",
            {
                class: cssClass
            },
            [
                h(
                    "bird-button",
                    {
                        on: {
                            click: onClickEvent
                        },
                        props: {
                            size: "sm",
                            shape: "round"
                        }
                    },
                    "点击我"
                ),
                message
            ]
        );
    },
    data() {
        return {
            cssClass: "",
            message: ""
        };
    },
    beforeMount() {
        const rowPinned = this.params.node.rowPinned;
        const rowIndex = this.params.node.rowIndex;
        this.cssClass = rowPinned
            ? "full-width-pinned-row"
            : "full-width-row";
        this.message = rowPinned
            ? `Pinned full width row at index ${rowIndex}`
            : `Normal full width row at index ${rowIndex}`;
    },
    methods: {
        onClickEvent() {
            this.$message({
                type: "info",
                message: "button clicked"
            });
        }
    }
};
export default {
    mixins: [CommonMixin],
    components: {
        FullWidthCellRenderer
    },
    data() {
        return {
            colDefs: getColDefs(),
            gridApi: null,
            rowData: null,
            pinnedTopRowData: null,
            pinnedBottomRowData: null,
            isFullWidthRow: params => params.rowNode.data.fullWidth,
            fullWidthCellRenderer: "FullWidthCellRenderer",
            getRowHeight: params => {
                const isBodyRow = !params.node.rowPinned;
                const isFullWidth = params.node.data.fullWidth;
                if (isBodyRow && isFullWidth) {
                    return 75;
                }
            },
            buttons: [
                {
                    label: "全宽行在各自的容器中类型普通行",
                    value: "normal"
                },
                {
                    label: "保持全宽行",
                    value: "special"
                }
            ]
        };
    },
    created() {
        this.rowData = createData(100, "body");
        this.pinnedTopRowData = createData(3, "pinned");
        this.pinnedBottomRowData = createData(3, "pinned");
    },
    methods: {
        onGridReady(params) {
            this.gridApi = params.api;
        },
        clickButton(code) {
            const flag = code === "normal";
            this.gridApi.setGridOption("embedFullWidthRows", flag);
        }
    }
};
</script>

<style lang="less">
    .full-width-detail-table {
        .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
        .full-width-pinned-row {
            height: 100%;
            border: 2px solid rgb(32 32 171);
            white-space: normal;
            background-color: #24c4;
            box-sizing: border-box;
        }
        .full-width-row {
            height: 100%;
            border: 2px solid #35af35;
            white-space: normal;
            background-color: #3c34;
            box-sizing: border-box;
        }
    }
</style>

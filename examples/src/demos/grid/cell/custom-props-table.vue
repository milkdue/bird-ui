<!--
自定义props，使用 cellRendererParams 来传递自定义props，在组件内部使用 this.params.xxx来访问
-->

<template>
    <div class="custom-props-table">
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
            :defaultColDef="defaultColDef"
            @grid-ready="onGridReady"
        ></ag-grid-vue>
    </div>
</template>
<script>
const ActionRenderer = {
    render(h) {
        const { params } = this;
        return h(
            "bird-button",
            {
                props: {
                    status: "primary",
                    type: "plain",
                    size: "sm"
                },
                on: {
                    click: params.onClick
                }
            },
            "点击我"
        );
    }
};
const MissionResultRenderer = {
    render(h) {
        const { params } = this;
        return h("img", {
            attrs: {
                src: params.src(params.value),
                alt: params.value
            }
        });
    }
};
export default {
    components: {
        ActionRenderer,
        MissionResultRenderer
    },
    data() {
        return {
            colDefs: [
                {
                    field: "company",
                    headerName: "公司"
                },
                {
                    field: "successful",
                    headerName: "成功率",
                    cellRenderer: "MissionResultRenderer",
                    cellRendererParams: {
                        src: this.iconSrc
                    }
                },
                {
                    field: "actions",
                    headerName: "操作",
                    cellRenderer: "ActionRenderer",
                    cellRendererParams: {
                        onClick: this.handleActionClick
                    }
                }
            ],
            gridApi: null,
            defaultColDef: {
                flex: 1
            },
            rowData: [],
            buttons: [
                {
                    label: "刷新",
                    value: "refresh"
                }
            ]
        };
    },
    methods: {
        refreshData() {
            this.gridApi.forEachNode(rowNode => {
                rowNode.setDataValue("successful", Math.random() > 0.5);
            });
        },
        onGridReady(params) {
            this.gridApi = params.api;
            fetch(
                "https://www.ag-grid.com/example-assets/small-space-mission-data.json"
            )
                .then(resp => resp.json())
                .then(data => (this.rowData = data));
        },
        clickButton(value) {
            if (value === "refresh") {
                this.refreshData();
            }
        },
        iconSrc(params) {
            return params
                ? "https://www.ag-grid.com/example-assets/icons/tick-in-circle.png"
                : "https://www.ag-grid.com/example-assets/icons/cross-in-circle.png";
        },
        handleActionClick() {
            this.$message({
                type: "info",
                message: "点击了操作按钮"
            });
        }
    }
};
</script>
<style lang="less">
    .custom-props-table {
        .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
    }
</style>

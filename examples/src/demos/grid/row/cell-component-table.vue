<!--
    cellRenderer
        - 直接指定单元格渲染器：为某一列的所有单元格统一指定一个渲染组件。
        - 静态配置：适用于所有单元格使用相同渲染逻辑的场景。
        - 直接返回指定组件名或组件对象
        - 适用于统一渲染
    cellRendererSelector
        - 动态选择单元格渲染器：根据行数据动态选择不同的渲染组件。
        - 条件渲染：适用于不同行需要不同渲染逻辑的场景（例如：不同状态显示不同组件）
        - 返回一个对象 { component: ..., params: ... }
        - 支持条件渲染和动态参数传递

    不支持的项目
        - 冻结行不支持排序
        - 冻结行不支持过滤
        - 冻结行不支持分组
        - 冻结行不支持范围选中
-->
<template>
    <div class="cell-component-table">
        <ag-grid-vue
            style="width: 100%; height: 500px"
            class="ag-theme-quartz"
            :columnDefs="colDefs"
            :defaultColDef="defaultColDef"
            :rowData="rowData"
            :getRowStyle="getRowStyle"
            :pinnedTopRowData="pinnedTopRowData"
            :pinnedBottomRowData="pinnedBottomRowData"
            @grid-ready="onGridReady"
        ></ag-grid-vue>
    </div>
</template>

<script>
const CustomPinnedRowRenderer = {
    render(h) {
        return h(
            "span",
            {
                style: this.params.style
            },
            this.params.value
        );
    }
};
export default {
    components: {
        "custom-pinned-row-renderer": CustomPinnedRowRenderer
    },
    data() {
        return {
            colDefs: [
                {
                    field: "athlete",
                    headerName: "运动员",
                    cellRendererSelector: params => {
                        if (params.node.rowPinned) {
                            return {
                                component: "custom-pinned-row-renderer",
                                params: {
                                    style: {
                                        color: "#5577CC"
                                    }
                                }
                            };
                        } else {
                            return undefined;
                        }
                    }
                },
                {
                    field: "country",
                    headerName: "国家",
                    cellRendererSelector: params => {
                        if (params.node.rowPinned) {
                            return {
                                component: "custom-pinned-row-renderer",
                                params: {
                                    style: {
                                        fontStyle: "italic"
                                    }
                                }
                            };
                        } else {
                            return undefined;
                        }
                    }
                },
                {
                    field: "sport",
                    headerName: "运动"
                }
            ],
            gridApi: null,
            rowData: null,
            defaultColDef: {
                flex: 1
            },
            getRowStyle: params => {
                if (params.node.rowPinned) {
                    return {
                        fontWeight: "bold"
                    };
                }
            },
            pinnedTopRowData: [
                {
                    athlete: "TOP 1 (athlete)",
                    country: "TOP 1 (country)",
                    sport: "TOP 1 (sport)"
                },
                {
                    athlete: "TOP 2 (athlete)",
                    country: "TOP 2 (country)",
                    sport: "TOP 2 (sport)"
                }
            ],
            pinnedBottomRowData: [
                {
                    athlete: "BOTTOM 1 (athlete)",
                    country: "BOTTOM 1 (country)",
                    sport: "BOTTOM 1 (sport)"
                },
                {
                    athlete: "BOTTOM 2 (athlete)",
                    country: "BOTTOM 2 (country)",
                    sport: "BOTTOM 2 (sport)"
                }
            ]
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
        }
    }
};
</script>

<style lang="less"></style>

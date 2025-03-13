<!-- 
    在自定义单元格中使用拖拽功能
        在自定义单元格中注册对应拖拽的 icon 即可在移动到单元格时显示 icon
        注册函数 `registerRowDragger(Ref)`

    当使用了 registerRowDragger 之后，不应该为列设置属性 rowDrag，否则会出现两个拖拽
-->

<template>
    <div class="custom-cell-row-drag-table">
        <ag-grid-vue
            style="width: 100%; height: 500px"
            class="ag-theme-quartz"
            rowDragManaged
            :columnDefs="colDefs"
            :defaultColDef="defaultColDef"
            :rowData="rowData"
            @grid-ready="onGridReady"
        ></ag-grid-vue>
    </div>
</template>

<script>
    const CustomCellRenderer = {
        data() {
            return {
                athlete: "",
                country: "",
                year: ""
            };
        },
        beforeMount() {
            this.athlete = this.params.data.athlete;
            this.country = this.params.data.country;
            this.year = this.params.data.year;
        },
        mounted() {
            this.params.registerRowDragger(this.$refs.dragger.$el);
        },
        render(h) {
            const { athlete, country, year } = this;
            return h(
                "div",
                {
                    class: "custom-cell-row-drag-renderer"
                },
                [
                    h(
                        "div",
                        {
                            class: "athlete-info"
                        },
                        [h("span", {}, athlete), h("span", {}, country)]
                    ),
                    h("span", {}, year),
                    h("bird-svg-icon", {
                        ref: "dragger",
                        props: {
                            name: "move1",
                            width: 14,
                            height: 14
                        }
                    })
                ]
            );
        }
    };
    export default {
        components: {
            CustomCellRenderer: CustomCellRenderer
        },
        data() {
            return {
                colDefs: [
                    {
                        field: "athlete",
                        headerName: "运动员",
                        cellClass: "custom-athlete-cell",
                        cellRenderer: "CustomCellRenderer"
                        // rowDrag: true
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
            }
        }
    };
</script>

<style lang="less">
    .custom-cell-row-drag-table {
        .custom-athlete-cell {
            padding: 0;
        }
        .custom-cell-row-drag-renderer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 100%;
            font-size: 0.7rem;
            color: white;
            background-color: #4180d6;
            box-sizing: border-box;
            i.bird-svg-icon {
                color: orange;
                visibility: hidden;
                cursor: move;
            }
            &:hover {
                i.bird-svg-icon {
                    visibility: visible;
                }
            }
        }
    }
</style>

<!--
    自定义控制分页
    suppressPaginationPanel 不显示分页工具栏
    suppressScrollOnNewData: true 确保新数据时不自动滚动
        - 禁止在数据更新后自动重置滚动条位置，保持用户当前浏览的滚动状态，避免因数据变化导致的意外跳转

    gridApi.paginationGoToFirstPage() 去首页
    gridApi.paginationGoToLastPage() 去尾页
    gridApi.paginationGoToNextPage() 下一页
    gridApi.paginationGoToPreviousPage() 上一页
    gridApi.paginationGoToPage(4) 去某一页

    gridApi.paginationGetCurrentPage() 获取当前页码 0 开始
    gridApi.paginationGetTotalPages() 获取总页数

    pagination: boolean 属性 true 开启分页 false 不分页
    paginationPageSize: number 属性 每页数量 如果 paginationAutoPageSize 打开忽略此属性
    paginationPageSizeSelector: number[] | true | false 属性 每页数量选择器 可选值，设置true 默认值 [20, 50, 100]，设置 false 隐藏该ui
    paginationNumberFormatter: (params: PaginationNumberFormatterParams<TData>) => string; 分页显示格式化函数
    paginationAutoPageSize: boolean 开启自动调整每页数量 根据空间自适应每页条数
    suppressPaginationPanel: boolean 是否显示分页工具栏
    paginateChildRows: boolean 分页是否支持子行，默认 false，不包含，包含将子行也纳入分页数量计算

    gridApi 提供的分页方法
        paginationIsLastPageFound: () => boolean 获取当前分页是否已知最后一页的状态 true 表示已知最后一页(总页数确认)，false 表示无法确定最后一页(总页数未知，如服务器端分页未返回总数)
        paginationGetPageSize: () => number 获取每页数量
        paginationSetPageSize: (pageSize: number) => void 设置每页数量
        paginationGetCurrentPage: () => number 获取当前页码 0 开始
        paginationGetTotalPages: () => number 获取总页数，如果无法确定最后一页(总页数未知，如服务器端分页未返回总数)，则返回 null
        paginationGetRowCount: () => number 获取数据总条数，如果无法确定最后一页 返回 null
        paginationGoToPage: (page: number) => void 去某一页，如果该页不存在则到最后一页
        paginationGoToNextPage: () => void 下一页
        paginationGoToPreviousPage: () => void 上一页
        paginationGoToFirstPage: () => void 第一页
        paginationGoToLastPage: () => void 最后一页

    event
        paginationChanged: (event: PaginationChangedEvent<TData>) => void;

    interface PaginationNumberFormatterParams<TData, TContext> {
        value: number;
        api: GridApi<TData>;
        context: TContext;
    }

    interface PaginationChangedEvent<TData, TContext> {
        animate?: boolean;
        keepRenderedRows?: boolean;
        newData?: boolean;
        newPage: boolean;
        newPageSize?: boolean;
        api: GridApi<TData>;
        context: TContext;
        type: string;
    }
-->

<template>
    <div class="custom-pagination-control-table">
        <div class="button-group">
            <bird-button
                v-for="button in buttons"
                size="md"
                :key="button.value"
                :disabled="buttonMap[button.value]"
                @click="clickButton(button.value)"
            >
                {{ button.label }}
            </bird-button>
        </div>
        <div class="info-content">
            <span>当前页: {{ currentPage }}</span>
            <span>总页数: {{ totalPage }}</span>
            <span>每页数量: {{ paginationPageSize }}</span>
            <span>总数量: {{ total }}</span>
        </div>
        <ag-grid-vue
            style="width: 100%; height: 500px"
            class="ag-theme-quartz"
            :columnDefs="colDefs"
            :defaultColDef="defaultColDef"
            :rowSelection="rowSelection"
            :paginationPageSize="paginationPageSize"
            :paginationPageSizeSelector="paginationPageSizeSelector"
            :pagination="true"
            :suppressPaginationPanel="true"
            :suppressScrollOnNewData="true"
            :rowData="rowData"
            @paginationChanged="onPaginationChanged"
            @gridReady="onGridReady"
        ></ag-grid-vue>
    </div>
</template>

<script>
export default {
    data() {
        return {
            colDefs: [
                {
                    headerName: "#",
                    width: 50,
                    valueFormatter: params =>
                        `${parseInt(params.node.id, 10) + 1}`
                },
                {
                    headerName: "运动员",
                    field: "athlete",
                    width: 150
                },
                {
                    headerName: "年龄",
                    field: "age",
                    width: 90
                },
                {
                    headerName: "国家",
                    field: "country",
                    width: 120
                },
                {
                    headerName: "年份",
                    field: "year",
                    width: 90
                },
                {
                    headerName: "日期",
                    field: "date",
                    width: 110
                },
                {
                    headerName: "体育项目",
                    field: "sport",
                    width: 110
                },
                {
                    headerName: "金牌",
                    field: "gold",
                    width: 100
                },
                {
                    headerName: "银牌",
                    field: "silver",
                    width: 100
                },
                {
                    headerName: "铜牌",
                    field: "bronze",
                    width: 100
                },
                {
                    headerName: "总计",
                    field: "total",
                    width: 100
                }
            ],
            gridApi: null,
            defaultColDef: {
                filter: true
            },
            rowSelection: "multiple",
            paginationPageSize: 20,
            paginationPageSizeSelector: [20, 50, 100],
            rowData: null,
            buttons: [
                {
                    label: "首页",
                    value: "first"
                },
                {
                    label: "尾页",
                    value: "last"
                },
                {
                    label: "下一页",
                    value: "next"
                },
                {
                    label: "上一页",
                    value: "previous"
                },
                {
                    label: "第5页",
                    value: "five"
                },
                {
                    label: "第49页",
                    value: "fifty"
                },
                {
                    label: "一页50条",
                    value: "pageSize-50"
                },
                {
                    label: "一页100条",
                    value: "pageSize-100"
                }
            ],
            buttonMap: {},
            currentPage: 1,
            totalPage: 0,
            total: 0
        };
    },
    created() {
        let buttonMap = {};
        this.buttons.forEach(button => {
            buttonMap[button.value] = false;
        });
        this.buttonMap = buttonMap;
    },
    methods: {
        onPaginationChanged() {
            console.log("onPaginationChanged");
            if (!this.gridApi) return;
            let currentPage = this.gridApi.paginationGetCurrentPage() + 1;
            let totalPage = this.gridApi.paginationGetTotalPages();
            let total = this.gridApi.paginationGetRowCount();
            this.totalPage = totalPage;
            this.currentPage = currentPage;
            this.total = total;
            let isLastPage = currentPage === totalPage;
            let isFirstPage = currentPage === 1;

            if (isFirstPage) {
                this.$set(this.buttonMap, "previous", true);
            } else {
                this.$set(this.buttonMap, "previous", false);
            }

            if (isLastPage) {
                this.$set(this.buttonMap, "next", true);
            } else {
                this.$set(this.buttonMap, "next", false);
            }
        },
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
        clickButton(code) {
            switch (code) {
                case "first":
                    this.gridApi.paginationGoToFirstPage();
                    break;
                case "last":
                    this.gridApi.paginationGoToLastPage();
                    break;
                case "next":
                    this.gridApi.paginationGoToNextPage();
                    break;
                case "previous":
                    this.gridApi.paginationGoToPreviousPage();
                    break;
                case "five":
                    this.gridApi.paginationGoToPage(4);
                    break;
                case "fifty":
                    this.gridApi.paginationGoToPage(49);
                    break;
                case "pageSize-50":
                    this.paginationPageSize = 50;
                    break;
                case "pageSize-100":
                    this.paginationPageSize = 100;
                    break;
            }
        }
    }
};
</script>

<style lang="less">
    .custom-pagination-control-table {
        .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
        .info-content {
            margin-bottom: 10px;
        }
    }
</style>

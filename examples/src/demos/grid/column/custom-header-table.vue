<!--
    自定义组件 注入的 parmas 包含以下属性 since: https://www.ag-grid.com/archive/31.3.4/vue-data-grid/column-headers/
        - column
        - displayName
        - enableSorting 是否允许排序
        - enableFilterButton 是否允许过滤数据
        - enableFilterIcon 是否显示过滤图标
        - progressSort 排序方法
        - setSort 设置具体的排序
-->
<template>
    <ag-grid-vue
        style="width: 100%; height: 500px"
        class="ag-theme-quartz"
        :columnDefs="colDefs"
        :rowData="rowData"
        @grid-ready="onGridReady"
    ></ag-grid-vue>
</template>

<script>
const HeaderComponent = {
    mounted() {
        console.log(this.params, "header-params");
    },
    render(h) {
        const { displayName, progressSort } = this.params;
        return h(
            "span",
            {
                on: {
                    click(event) {
                        progressSort(event.shiftKey);
                    }
                }
            },
            `**${displayName}**`
        );
    }
};
export default {
    components: {
        HeaderComponent
    },
    data() {
        return {
            colDefs: [
                {
                    field: "athlete",
                    headerName: "运动员",
                    headerComponent: "HeaderComponent"
                },
                {
                    field: "age",
                    headerName: "年龄"
                },
                {
                    field: "country",
                    headerName: "国家"
                },
                {
                    field: "sport",
                    headerName: "运动",
                    flex: 1
                }
            ],
            rowData: null,
            gridApi: null
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

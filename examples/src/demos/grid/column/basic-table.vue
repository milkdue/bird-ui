<!--
    field: 表格字段
    headerName: 表头名字
    flex: 1 填充剩余部分，如果有多个，按照比例分配
    checkboxSelection: 是否显示复选框
    valueFormatter: 格式化数据
    valueGetter: 计算虚拟字段

    defaultColDef: 所有列都有的默认的配置
    columnTypes: 预设配置，使用相应的 type 进行统一列配置  type: keyof ColumnTypes | (keyof ColumnTypes)[]
-->
<template>
    <div v-exposure.once="exposureEvent">
        <ag-grid-vue
            v-if="showContent"
            style="width: 100%; height: 200px"
            class="ag-theme-alpine"
            rowSelection="multiple"
            :columnDefs="colDefs"
            :rowData="rowData"
            :defaultColDef="defaultColDef"
            :columnTypes="columnTypes"
        ></ag-grid-vue>
    </div>
</template>

<script>
import CommonMixin from "../common.mixin";
export default {
    mixins: [CommonMixin],
    data() {
        return {
            rowData: [
                {
                    make: "Tesla",
                    model: "Model Y",
                    price: 64950,
                    electric: true
                },
                {
                    make: "Toyota",
                    model: "Corolla",
                    price: 29600,
                    electric: false
                },
                {
                    make: "Ford",
                    model: "F-Series",
                    price: 33850,
                    electric: false
                }
            ],
            colDefs: [
                {
                    field: "make",
                    headerName: "厂商",
                    flex: 1,
                    checkboxSelection: true
                },
                {
                    field: "model",
                    flex: 1,
                    headerName: "型号"
                },
                {
                    field: "price",
                    headerName: "美元",
                    type: "money1",
                    resizable: false
                },
                {
                    headerName: "人民币",
                    type: ["money2", "format"]
                },
                {
                    headerName: "虚拟字段",
                    flex: 1,
                    valueGetter: params => {
                        return params.data.make + "-" + params.data.model;
                    }
                },
                {
                    field: "electric",
                    headerName: "价格",
                    flex: 2
                }
            ],
            defaultColDef: {
                cellStyle: {
                    fontWeight: "bold"
                }
            },
            columnTypes: {
                money1: {
                    valueFormatter: params => {
                        return "$" + params.value.toLocaleString();
                    },
                    width: 150
                },
                money2: {
                    valueFormatter: params => {
                        return "￥" + params.value.toLocaleString();
                    },
                    width: 150
                },
                format: {
                    valueGetter: params => {
                        return params.data.price * 6;
                    }
                }
            }
        };
    }
};
</script>

<style></style>

<template>
    <ag-grid-vue
        style="width: 100%; height: 500px"
        class="ag-theme-alpine"
        :gridOptions="gridOptions"
        :columnDefs="columnDefs"
        :rowData="rowData"
    />
</template>

<script>
export default {
    components: {
        MyInnerRenderer: {
            render(h) {
                return h("div", {}, "111");
            }
        }
    },
    data() {
        return {
            columnDefs: [
                {
                    field: "name",
                    headerName: "姓名"
                    // cellRenderer: 'agGroupCellRenderer',
                    // cellRendererParams: {
                    //     suppressCount: true,
                    //     // innerRendererFramework: MyInnerRenderer
                    // }
                },
                {
                    field: "age",
                    headerName: "年龄",
                    cellRenderer: "agGroupCellRenderer",
                    cellRendererParams: {
                        suppressCount: true,
                        innerRenderer: "MyInnerRenderer"
                    },
                    width: 100
                },
                {
                    field: "department",
                    headerName: "部门"
                }
            ],

            rowData: [
                {
                    id: 1,
                    name: "张三",
                    age: 28,
                    department: "研发部",
                    orders: [
                        {
                            orderId: "A001",
                            product: "MacBook Pro",
                            amount: 12999,
                            status: "paid"
                        },
                        {
                            orderId: "A002",
                            product: "Magic Mouse",
                            amount: 499,
                            status: "pending"
                        }
                    ]
                },
                {
                    id: 2,
                    name: "李四",
                    age: 31,
                    department: "产品部",
                    orders: [
                        {
                            orderId: "B001",
                            product: "iPhone",
                            amount: 5999,
                            status: "paid"
                        }
                    ]
                },
                {
                    id: 3,
                    name: "王五",
                    age: 26,
                    department: "运营部",
                    orders: []
                }
            ],

            gridOptions: {
                masterDetail: true,

                // // 关键：指定自定义 detail 组件
                // detailCellRenderer: 'UserDetailRenderer',

                // // 关键：把 Vue 组件注册给 AG Grid
                // frameworkComponents: {
                //     UserDetailRenderer: UserDetailRenderer
                // },
                detailCellRenderer: "UserDetailRenderer",

                // 让没有 orders 的行不显示展开按钮
                isRowMaster: function(dataItem) {
                    return !!(
                        dataItem &&
                            dataItem.orders &&
                            dataItem.orders.length
                    );
                },

                // 自定义子表高度
                detailRowAutoHeight: false,

                defaultColDef: {
                    flex: 1,
                    resizable: true,
                    sortable: true
                },

                animateRows: true
            }
        };
    }
};
</script>

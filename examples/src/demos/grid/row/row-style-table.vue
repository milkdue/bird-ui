<!-- 
    rowStyle: RowStyle

    interface RowStyle {
        [cssProperty: string]: string | number;
    }

    getRowStyle: (params: RowStyleParams) => RowStyle | undefined;

    interface RowStyleParams<TData, TContext> {
        data: TData | undefined;
        node: IRowNode<TData>;
        rowIndex: number;
        api: GridApi<TData>;
        context: TContext;
    }


    rowClass: string | string[]

    getRowClass: (params: RowClassParams) => string | string[] | undefined;

    interface RowClassParams<TData, TContext> {
        data: TData | undefined;
        node: IRowNode<TData>;
        rowIndex: number;
        api: GridApi<TData>;
        context: TContext;
    }

    rowClassRules: RowClassRules<TData>;

    interface RowClassRules<TData> {
        [cssClassName: string]: (((params: RowClassParams<TData>) => boolean) | string);
    }



    applyTransaction: 动态更新表格数据的一个核心 API 方法 允许你对表格中的数据进行增量修改（添加、删除、更新行），而不是重新加载整个数据集，从而高效更新 DOM 并保持当前用户的交互状态（如排序、过滤、滚动位置）
        - 添加新行（在指定位置插入数据）
        - 删除指定行（根据数据对象或索引）
        - 更新现有行（局部修改行数据）
        - 高效渲染：仅更新变化的部分，避免全表重绘
    this.gridApi.applyTransaction({
        add: [...],     // 新增行数据数组
        addIndex: 0,    // 可选，指定插入位置
        remove: [...],  // 待删除行数据数组
        update: [...],  // 待更新行数据数组（需包含行唯一ID）
    });

    this.gridApi.applyTransaction({
        add: [{ id: 100, name: "New Row" }],
        addIndex: 0, // 插入到表格顶部
    });

    // 假设 rowData 是待删除的行数据对象
    this.gridApi.applyTransaction({
        remove: [rowData],
    });

    // 更新数据需包含唯一标识（如 rowNode.id）
    this.gridApi.applyTransaction({
        update: [{ id: 5, name: "Updated Name" }],
    });
-->

<template>
    <div class="row-style-table">
        <div class="label">rowStyle</div>
        <ag-grid-vue
            style="width: 100%; height: 500px"
            class="ag-theme-alpine"
            :columnDefs="colDefs"
            :rowData="rowData"
            :rowStyle="rowStyle"
        ></ag-grid-vue>
        <bird-divider line-type="dashed"></bird-divider>
        <div class="label">getRowStyle</div>
        <ag-grid-vue
            style="width: 100%; height: 500px"
            class="ag-theme-alpine"
            :columnDefs="colDefs"
            :rowData="rowData"
            :getRowStyle="getRowStyle"
        ></ag-grid-vue>
        <bird-divider line-type="dashed"></bird-divider>
        <div class="label">rowClass</div>
        <ag-grid-vue
            style="width: 100%; height: 500px"
            class="ag-theme-alpine"
            rowClass="bird-row-item"
            :columnDefs="colDefs"
            :rowData="rowData"
        ></ag-grid-vue>
        <bird-divider line-type="dashed"></bird-divider>
        <div class="label">getRowClass</div>
        <ag-grid-vue
            style="width: 100%; height: 500px"
            class="ag-theme-alpine"
            :getRowClass="getRowClass"
            :columnDefs="colDefs"
            :rowData="rowData"
        ></ag-grid-vue>
        <bird-divider line-type="dashed"></bird-divider>
        <div class="label">rowClassRules</div>
        <ag-grid-vue
            style="width: 100%; height: 500px"
            class="ag-theme-alpine"
            :rowClassRules="rowClassRules"
            :columnDefs="colDefs"
            :rowData="rowData"
        ></ag-grid-vue>
        <bird-divider line-type="dashed"></bird-divider>
        <div class="label">setData、setDataValue、applyTransaction</div>
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
            class="ag-theme-alpine"
            :columnDefs="specialColDefs"
            :rowData="specialRowData"
            :rowClassRules="specialRowClassRules"
            :getRowId="getRowId"
            @grid-ready="onSpecialGridReady"
        ></ag-grid-vue>
    </div>
</template>

<script>
    const randomInt = () => {
        return Math.floor(Math.random() * 10);
    };
    export default {
        data() {
            return {
                colDefs: [
                    {
                        field: "athlete",
                        headerName: "运动员"
                    },
                    {
                        field: "age",
                        width: 80,
                        headerName: "年龄"
                    },
                    {
                        field: "country",
                        headerName: "国家"
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
                        headerName: "金牌",
                        flex: 1
                    }
                ],
                rowData: null,
                rowStyle: {
                    background: "#ffccbb"
                },
                rowClassRules: {
                    "age-0-20-green": params =>
                        params.data && params.data.age < 20,
                    "age-20-25-amber": params =>
                        params.data &&
                        params.data.age >= 20 &&
                        params.data.age < 25,
                    "age-25-red": params => params.data && params.data.age >= 25
                },
                specialColDefs: [
                    {
                        field: "employee",
                        headerName: "员工"
                    },
                    {
                        field: "sickDays",
                        headerName: "病假天数",
                        editable: true,
                        flex: 1
                    }
                ],
                specialGridApi: null,
                specialRowClassRules: {
                    "sick-days-warning": params =>
                        params.data &&
                        params.data.sickDays > 5 &&
                        params.data.sickDays <= 7,
                    "sick-days-breach": params =>
                        params.data && params.data.sickDays >= 8
                },
                getRowId: params => params.data.employee,
                specialRowData: [
                    { employee: "Josh Finch", sickDays: 4 },
                    { employee: "Flavia Mccloskey", sickDays: 1 },
                    { employee: "Marine Creason", sickDays: 8 },
                    { employee: "Carey Livingstone", sickDays: 2 },
                    { employee: "Brande Giorgi", sickDays: 5 },
                    { employee: "Beatrice Kugler", sickDays: 3 },
                    { employee: "Elvia Macko", sickDays: 7 },
                    { employee: "Santiago Little", sickDays: 1 },
                    { employee: "Mary Clifton", sickDays: 2 },
                    { employee: "Norris Iniguez", sickDays: 1 },
                    { employee: "Shellie Umland", sickDays: 5 },
                    { employee: "Kristi Nawrocki", sickDays: 2 },
                    { employee: "Elliot Malo", sickDays: 3 },
                    { employee: "Paul Switzer", sickDays: 11 },
                    { employee: "Lilly Boaz", sickDays: 6 },
                    { employee: "Frank Kimura", sickDays: 1 },
                    { employee: "Alena Wages", sickDays: 5 }
                ],
                buttons: [
                    {
                        label: "setData",
                        value: "setData"
                    },
                    {
                        label: "setDataValue",
                        value: "setDataValue"
                    },
                    {
                        label: "applyTransaction",
                        value: "applyTransaction"
                    },
                    {
                        label: "删除第一行数据",
                        value: "removeFirstRow"
                    },
                    {
                        label: "添加一行数据到首行",
                        value: "addFirstRow"
                    }
                ],
                removeIndex: 0
            };
        },
        created() {
            this.onGridReady({});
        },
        methods: {
            onGridReady(params) {
                this.gridApi = params.api;
                fetch(
                    "https://www.ag-grid.com/example-assets/olympic-winners.json"
                )
                    .then(resp => resp.json())
                    .then(data => (this.rowData = data));
            },
            onSpecialGridReady(params) {
                this.specialGridApi = params.api;
            },
            getRowStyle(params) {
                if (params.data && params.data.country === "United States") {
                    return {
                        background: "skyblue"
                    };
                }
            },
            getRowClass(params) {
                if (params.data && params.data.country === "United States") {
                    return "usa-row-item";
                }
            },
            clickButton(code) {
                if (code === "applyTransaction") {
                    let items = [];
                    this.specialGridApi.forEachNode(node => {
                        let data = node.data;
                        data.sickDays = randomInt();
                        items.push(data);
                    });
                    this.specialGridApi[code]({
                        update: items
                    });
                } else if (code === "removeFirstRow") {
                    this.specialGridApi.applyTransaction({
                        remove: [this.specialRowData[this.removeIndex++]]
                    });
                } else if (code === "addFirstRow") {
                    this.specialGridApi.applyTransaction({
                        add: [this.specialRowData[--this.removeIndex]],
                        addIndex: 0
                    });
                } else if (code === "setData") {
                    this.specialGridApi.forEachNode(node => {
                        let data = {
                            employee: node.data.employee,
                            sickDays: randomInt()
                        };
                        node.setData(data);
                    });
                } else {
                    this.specialGridApi.forEachNode(node => {
                        node.setDataValue("sickDays", randomInt());
                    });
                }
            }
        }
    };
</script>

<style lang="less">
    .row-style-table {
        display: flex;
        flex-direction: column;
        gap: 10px;
        .bird-row-item {
            background-color: aqua;
        }
        .usa-row-item {
            background-color: skyblue;
        }
        .age-0-20-green {
            background-color: green;
        }
        .age-20-25-amber {
            background-color: yellow;
        }
        .age-25-red {
            background-color: red;
        }
        .button-group {
            display: flex;
            gap: 6px;
            // margin-bottom: 10px;
        }
        .sick-days-warning {
            background-color: #cc693344;
        }
        .sick-days-breach {
            background-color: #c334;
        }
    }
</style>

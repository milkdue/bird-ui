<!--
    表达式
        列定义表达式: valueSetter valueFormatter valueParser

        colDefs = [
            {
                fiedl: "name",
                valueGetter: p => p.data.firstName,
                valueFormatter: p => p.value.toUpperCase()
            }
        ]

        colDefs = [
            {
                field: "name",
                valueGetter: "data.firstName",
                valueFormatter: "value.toUpperCase()"
            }
        ]

    变量对应表达式
        x => params.value
        value => params.value
        oldValue => params.oldValue
        newValue => params.newValue
        node => params.node
        data => params.data
        colDef => params.colDef
        column => params.column
        columnGroup => params.columnGroup
        getValue => params.getValue
        api => params.api
        ctx => params.context
-->

<template>
    <div class="expression-table">
        <ag-grid-vue
            style="width: 100%; height: 500px"
            class="ag-theme-alpine"
            :columnDefs="colDefs"
            :defaultColDef="defaultColDef"
            :rowData="rowData"
            @grid-ready="onGridReady"
            @cell-value-changed="onCellValueChanged"
        ></ag-grid-vue>
    </div>
</template>

<script>
export default {
    data() {
        return {
            gridApi: null,
            colDefs: [
                {
                    headerName: "String (editable)",
                    field: "simple",
                    editable: true
                },
                {
                    headerName: "Number (editable)",
                    field: "number",
                    editable: true,
                    valueFormatter: "\"f\" + Math.floor(value).toString().replace(/(\\d)(?=(\\d{3})+(?!\\d))/g, \"$1,\")"
                },
                {
                    headerName: "Name (editable)",
                    editable: true,
                    valueGetter: "data.firstName + ' ' + data.lastName",
                    valueSetter: `var nameSplit = newValue.split(" ");
                         var newFirstName = nameSplit[0];
                         var newLastName = nameSplit[1];
                         if (data.firstName !== newFirstName || data.lastName !== newLastName) {  
                            data.firstName = newFirstName;  
                            data.lastName = newLastName;  
                            return true;
                        } else {  
                            return false;
                        }
                        `
                },
                { headerName: "A", field: "a", maxWidth: 120 },
                { headerName: "B", field: "b", maxWidth: 120 },
                {
                    headerName: "A + B",
                    valueGetter: "data.a + data.b",
                    maxWidth: 120
                }
            ],
            defaultColDef: {
                flex: 1,
                minWidth: 150,
                sortable: false
            },
            rowData: this.createRowData()
        };
    },
    methods: {
        onCellValueChanged(event) {
            console.log("data after changes is: ", event.data);
        },
        onGridReady(parmas) {
            this.gridApi = parmas.api;
        },
        createRowData() {
            const rowData = [];
            const words = [
                "One",
                "Apple",
                "Moon",
                "Sugar",
                "Grid",
                "Banana",
                "Sunshine",
                "Stars",
                "Black",
                "White",
                "Salt",
                "Beach"
            ];
            const firstNames = [
                "Niall",
                "John",
                "Rob",
                "Alberto",
                "Bas",
                "Dimple",
                "Sean"
            ];
            const lastNames = [
                "Pink",
                "Black",
                "White",
                "Brown",
                "Smith",
                "Smooth",
                "Anderson"
            ];
            for (let i = 0; i < 100; i++) {
                const randomWords =
                        words[i % words.length] +
                        " " +
                        words[(i * 17) % words.length];
                rowData.push({
                    simple: randomWords,
                    number: Math.floor(((i + 2) * 476321) % 10000),
                    a: Math.floor(i % 4),
                    b: Math.floor(i % 7),
                    firstName: firstNames[i % firstNames.length],
                    lastName: lastNames[i % lastNames.length]
                });
            }
            return rowData;
        }
    }
};
</script>

<template>
    <div class="reference-data-table">
        <ag-grid-vue
            style="width: 100%; height: 500px"
            class="ag-theme-quartz"
            :columnDefs="colDefs"
            :defaultColDef="defaultColDef"
            :rowData="rowData"
            @grid-ready="onGridReady"
            @cell-value-changed="onCellValueChanged"
        ></ag-grid-vue>
    </div>
</template>

<script>
function getData() {
    var rowData = [
        {
            make: "tyt",
            exteriorColour: "fg",
            interiorColour: "bw",
            price: 35000
        },
        {
            make: "frd",
            exteriorColour: "bw",
            interiorColour: "cb",
            price: 32000
        },
        {
            make: "prs",
            exteriorColour: "cb",
            interiorColour: "fg",
            price: 72000
        },
        {
            make: "tyt",
            exteriorColour: "fg",
            interiorColour: "bw",
            price: 35000
        },
        {
            make: "frd",
            exteriorColour: "bw",
            interiorColour: "cb",
            price: 32000
        },
        {
            make: "prs",
            exteriorColour: "cb",
            interiorColour: "fg",
            price: 72000
        },
        {
            make: "tyt",
            exteriorColour: "fg",
            interiorColour: "bw",
            price: 35000
        },
        {
            make: "frd",
            exteriorColour: "bw",
            interiorColour: "cb",
            price: 32000
        },
        {
            make: "prs",
            exteriorColour: "cb",
            interiorColour: "fg",
            price: 72000
        },
        {
            make: "tyt",
            exteriorColour: "fg",
            interiorColour: "bw",
            price: 35000
        },
        {
            make: "frd",
            exteriorColour: "bw",
            interiorColour: "cb",
            price: 32000
        },
        {
            make: "prs",
            exteriorColour: "cb",
            interiorColour: "fg",
            price: 72000
        },
        {
            make: "tyt",
            exteriorColour: "fg",
            interiorColour: "bw",
            price: 35000
        },
        {
            make: "frd",
            exteriorColour: "bw",
            interiorColour: "cb",
            price: 32000
        },
        {
            make: "prs",
            exteriorColour: "cb",
            interiorColour: "fg",
            price: 72000
        },
        {
            make: "prs",
            exteriorColour: "cb",
            interiorColour: "fg",
            price: 72000
        },
        {
            make: "tyt",
            exteriorColour: "fg",
            interiorColour: "bw",
            price: 35000
        },
        {
            make: "frd",
            exteriorColour: "bw",
            interiorColour: "cb",
            price: 32000
        }
    ];
    return rowData;
}
function extractKeys(mappings) {
    return Object.keys(mappings);
}
function lookupValue(mappings, key) {
    return mappings[key];
}
function lookupKey(mappings, name) {
    const keys = Object.keys(mappings);
    for (let key of keys) {
        if (mappings[key] === name) {
            return key;
        }
    }
}
function currencyFormatter(params) {
    const value = Math.floor(params.value);
    if (isNaN(value)) return "";
    return "¥" + value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
function numberValueSetter(params) {
    const valueAsNumber = parseFloat(params.newValue);
    if (isNaN(valueAsNumber) || !isFinite(params.newValue)) return false;
    params.data.price = valueAsNumber;
    return true;
}
const carMappings = {
    tyt: "Toyota",
    frd: "Ford",
    prs: "Porsche",
    nss: "Nissan"
};
const colourMappings = {
    cb: "Cadet Blue",
    bw: "Burlywood",
    fg: "Forest Green"
};
const carCodes = extractKeys(carMappings);
const colourCodes = extractKeys(colourMappings);
const ColourCellRenderer = {
    render(h) {
        const { params, removeSpaces } = this;
        if (params.value === "(Select All)") {
            return h("div", {}, params.value);
        } else {
            return h(
                "span",
                {
                    style: {
                        color: removeSpaces(params.valueFormatted)
                    }
                },
                params.valueFormatted
            );
        }
    },
    methods: {
        removeSpaces(str) {
            return str ? str.replace(/\s/g, "") : str;
        }
    }
};
export default {
    components: {
        ColourCellRenderer
    },
    data() {
        return {
            colDefs: [
                {
                    field: "make",
                    minWidth: 100,
                    cellEditor: "agSelectCellEditor",
                    cellEditorParams: { values: carCodes },
                    filterParams: {
                        valueFormatter: params =>
                            lookupValue(carMappings, params.value)
                    },
                    valueFormatter: params =>
                        lookupValue(carMappings, params.value)
                },
                {
                    field: "exteriorColour",
                    minWidth: 150,
                    cellEditor: "agRichSelectCellEditor",
                    cellEditorParams: {
                        values: colourCodes,
                        cellRenderer: "ColourCellRenderer"
                    },
                    filter: "agSetColumnFilter",
                    filterParams: {
                        values: colourCodes,
                        valueFormatter: params =>
                            lookupValue(colourMappings, params.value),
                        cellRenderer: "ColourCellRenderer"
                    },
                    valueFormatter: params =>
                        lookupValue(colourMappings, params.value),
                    valueParser: params =>
                        lookupKey(colourMappings, params.newValue),
                    cellRenderer: "ColourCellRenderer"
                },
                {
                    field: "interiorColour",
                    minWidth: 150,
                    cellEditor: "agTextCellEditor",
                    cellEditorParams: {
                        useFormatter: true
                    },
                    filter: "agSetColumnFilter",
                    filterParams: {
                        values: colourCodes,
                        valueFormatter: params =>
                            lookupValue(colourMappings, params.value),
                        cellRenderer: "ColourCellRenderer"
                    },
                    valueFormatter: params =>
                        lookupValue(colourMappings, params.value),
                    cellRenderer: "ColourCellRenderer"
                },
                {
                    headerName: "Retail Price",
                    field: "price",
                    minWidth: 120,
                    colId: "retailPrice",
                    valueGetter: params => params.data.price,
                    valueFormatter: currencyFormatter,
                    valueSetter: numberValueSetter
                },
                {
                    headerName: "Retail Price (incl Taxes)",
                    minWidth: 120,
                    editable: false,
                    valueGetter: params =>
                        params.getValue("retailPrice") * 1.2,
                    valueFormatter: currencyFormatter
                }
            ],
            gridApi: null,
            defaultColDef: {
                flex: 1,
                filter: true,
                editable: true
            },
            rowData: null
        };
    },
    created() {
        this.rowData = getData();
    },
    methods: {
        onCellValueChanged(params) {
            console.log("onCellValueChanged Data: ", params.data);
        },
        onGridReady(params) {
            this.gridApi = params.api;
        }
    }
};
</script>

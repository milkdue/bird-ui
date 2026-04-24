<template>
    <div class="filter-cell-renderer-table">
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
            :defaultColDef="defaultColDef"
            :sideBar="sideBar"
            :rowData="rowData"
            :context="context"
            @grid-ready="onGridReady"
            @first-data-rendered="onFirstDataRendered"
        ></ag-grid-vue>
    </div>
</template>

<script>
const COUNTRY_CODES = {
    Ireland: "ie",
    Luxembourg: "lu",
    Belgium: "be",
    Spain: "es",
    France: "fr",
    Germany: "de",
    Sweden: "se",
    Italy: "it",
    Greece: "gr",
    Iceland: "is",
    Portugal: "pt",
    Malta: "mt",
    Norway: "no",
    Brazil: "br",
    Argentina: "ar",
    Colombia: "co",
    Peru: "pe",
    Venezuela: "ve",
    Uruguay: "uy"
};
const CountryCellRenderer = {
    data() {
        return {
            innerHTML: ""
        };
    },
    render(h) {
        return h("div", {
            domProps: {
                innerHTML: this.innerHTML
            }
        });
    },
    beforeMount() {
        if (!this.params.value) {
            this.innerHTML = this.params.isFilterRenderer
                ? "(Blanks)"
                : this.params.value;
        } else if (this.params.value === "(全选)") {
            this.innerHTML = this.params.value;
        } else {
            const url = `https://flags.fmcdn.net/data/flags/mini/${this.params.context[this.params.value]}.png`;
            const flagImage = `<img class="flag" border="0" width="15" height="10" src="${url}">`;
            this.innerHTML = `${flagImage} ${this.params.value}`;
        }
    }
};
export default {
    components: {
        CountryCellRenderer
    },
    data() {
        return {
            buttons: [{ label: "打印过滤模型", value: "printFilterModel" }],
            context: COUNTRY_CODES,
            colDefs: [
                {
                    headerName: "未提供自定义单元格显示",
                    field: "country",
                    cellRenderer: "CountryCellRenderer",
                    filter: "agSetColumnFilter"
                },
                {
                    headerName: "提供自定义单元格显示",
                    field: "country",
                    cellRenderer: "CountryCellRenderer",
                    filter: "agSetColumnFilter",
                    filterParams: {
                        cellRenderer: "CountryCellRenderer",
                        cellRendererParams: {
                            isFilterRenderer: true
                        }
                    }
                }
            ],
            gridApi: null,
            defaultColDef: {
                flex: 1,
                minWidth: 225,
                floatingFilter: true
            },
            sideBar: "filters",
            rowData: null
        };
    },
    methods: {
        onFirstDataRendered(params) {
            params.api.getToolPanelInstance("filters").expandFilters();
        },
        printFilterModel() {
            let filterModel = this.gridApi.getFilterModel();
            console.log("filterModel", filterModel);
        },
        onGridReady(params) {
            this.gridApi = params.api;
            const updateData = data => {
                let dataWithFlags = data.filter(
                    d => COUNTRY_CODES[d.country]
                );
                dataWithFlags[0].country = "";
                this.rowData = dataWithFlags;
            };
            fetch(
                "https://www.ag-grid.com/example-assets/olympic-winners.json"
            )
                .then(resp => resp.json())
                .then(data => updateData(data));
        },
        clickButton(value) {
            this[value]();
        }
    }
};
</script>

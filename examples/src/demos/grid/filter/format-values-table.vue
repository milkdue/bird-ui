<!--
    格式化显示过滤列表
-->

<template>
    <div class="format-values-table">
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
function valueFormatter(params) {
    return `${params.value}(${COUNTRY_CODES[params.value].toUpperCase()})`;
}
export default {
    data() {
        return {
            colDefs: [
                {
                    headerName: "未格式化",
                    field: "country",
                    valueFormatter,
                    filter: "agSetColumnFilter"
                },
                {
                    headerName: "格式化",
                    field: "country",
                    valueFormatter,
                    filter: "agSetColumnFilter",
                    filterParams: {
                        valueFormatter
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
            rowData: null,
            buttons: [
                {
                    label: "获取过滤模型",
                    value: "printFilterModel"
                }
            ]
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
<style lang="less">
    .format-values-table {
        .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
    }
</style>

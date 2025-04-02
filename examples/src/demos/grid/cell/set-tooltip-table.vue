<template>
    <div class="set-tooltip-table">
        <ag-grid-vue
            style="width: 100%; height: 500px"
            class="ag-theme-quartz"
            :columnDefs="colDefs"
            :defaultColDef="defaultColDef"
            :rowData="rowData"
            @grid-ready="onGridReady"
        ></ag-grid-vue>
    </div>
</template>
<script>
const AthleteCellRenderer = {
    render(h) {
        const { params } = this;
        return h(
            "div",
            {
                ref: "wrapper",
                style: {
                    overflow: "hidden",
                    "text-overflow": "ellipsis"
                }
            },
            params.value
        );
    },
    beforeMount() {
        this.params.setTooltip(
            `Dynamic Tooltip for ${this.params.value}`,
            () =>
                this.$refs.wrapper.scrollWidth >
                    this.$refs.wrapper.clientWidth
        );
    }
};
export default {
    components: {
        AthleteCellRenderer
    },
    data() {
        return {
            colDefs: [
                {
                    field: "athlete",
                    width: 120,
                    cellRenderer: "AthleteCellRenderer",
                    headerName: "运动员"
                },
                {
                    field: "country",
                    width: 150,
                    headerName: "国家"
                }
            ],
            gridApi: null,
            defaultColDef: {
                minWidth: 100,
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
                .then(data => (this.rowData = data));
        }
    }
};
</script>

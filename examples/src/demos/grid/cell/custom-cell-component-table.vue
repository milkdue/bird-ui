<template>
    <div v-exposure.once="exposureEvent" class="custom-cell-component-table">
        <ag-grid-vue
            v-if="showContent"
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
import CommonMixin from "../common.mixin";

const WebsiteRenderer = {
    render(h) {
        const { value, parsedValue } = this;
        return h(
            "a",
            {
                attrs: {
                    href: value,
                    target: "_blank"
                }
            },
            parsedValue
        );
    },
    data() {
        return {
            parsedValue: "",
            value: ""
        };
    },
    beforeMount() {
        this.updateDisplay(this.params);
    },
    methods: {
        refresh(params) {
            this.updateDisplay(params);
        },
        updateDisplay(params) {
            this.value = params.value;
            this.parsedValue = new URL(params.value).hostname;
        }
    }
};
const LogoRenderer = {
    render(h) {
        const { cellValueLowerCase } = this;
        return h("span", { class: "img-span-logo" }, [
            h("img", {
                attrs: {
                    src: `https://www.ag-grid.com/example-assets/software-company-logos/${cellValueLowerCase}.png`
                },
                class: "logo"
            })
        ]);
    },
    data() {
        return {
            cellValue: "",
            cellValueLowerCase: ""
        };
    },
    beforeMount() {
        this.cellValue = this.params.value;
        this.cellValueLowerCase = this.params.value.toLowerCase();
    }
};
const PriceRenderer = {
    render(h) {
        const { priceMultiplier, src } = this;
        return h(
            "span",
            { class: "img-span" },
            new Array(priceMultiplier).fill(0).map((item, index) => {
                return h("img", {
                    key: index,
                    attrs: {
                        src
                    },
                    class: "price-icon"
                });
            })
        );
    },
    data() {
        return {
            src: "https://www.ag-grid.com/example-assets/icons/pound-coin-color-icon.png",
            priceMultiplier: 1
        };
    },
    beforeMount() {
        this.updateDisplay(this.params);
    },
    methods: {
        refresh(params) {
            this.updateDisplay(params);
        },
        updateDisplay(params) {
            if (params.value > 5000000000) {
                this.priceMultiplier = 2;
            }
            if (params.value > 10000000000) {
                this.priceMultiplier = 3;
            }
            if (params.value > 20000000000) {
                this.priceMultiplier = 4;
            }
            if (params.value > 300000000000) {
                this.priceMultiplier = 5;
            }
        }
    }
};
const HardwareRenderer = {
    render(h) {
        const { params, cellValue } = this;
        return h("span", { class: "mission-span" }, [
            h("img", {
                attrs: {
                    alt: params.value,
                    src: `https://www.ag-grid.com/example-assets/icons/${cellValue}.png`
                },
                class: "mission-icon"
            })
        ]);
    },
    data() {
        return {
            cellValue: ""
        };
    },
    beforeMount() {
        this.cellValue = this.params.value
            ? "tick-in-circle"
            : "cross-in-circle";
    }
};
const ActionRenderer = {
    render(h) {
        const { $message, params } = this;
        return h(
            "bird-button",
            {
                props: {
                    status: "primary",
                    type: "plain",
                    size: "sm"
                },
                on: {
                    click: () =>
                        $message({
                            type: "info",
                            message: `点击了${params.data.company}`
                        })
                }
            },
            "点击我"
        );
    }
};
export default {
    mixins: [CommonMixin],
    components: {
        WebsiteRenderer,
        LogoRenderer,
        PriceRenderer,
        HardwareRenderer,
        ActionRenderer
    },
    data() {
        return {
            colDefs: [
                {
                    field: "company",
                    headerName: "公司名称",
                    flex: 6
                },
                {
                    field: "website",
                    headerName: "官网",
                    cellRenderer: "WebsiteRenderer"
                },
                {
                    field: "company",
                    headerName: "Logo",
                    cellRenderer: "LogoRenderer",
                    cellClass: "logo-cell",
                    minWidth: 100
                },
                {
                    field: "revenue",
                    cellRenderer: "PriceRenderer",
                    headerName: "收入"
                },
                {
                    field: "hardware",
                    headerName: "硬件",
                    cellRenderer: "HardwareRenderer"
                },
                {
                    field: "actions",
                    headerName: "操作",
                    cellRenderer: "ActionRenderer"
                }
            ],
            gridApi: null,
            defaultColDef: {
                flex: 10
            },
            rowData: null
        };
    },
    methods: {
        onGridReady(params) {
            this.gridApi = params.api;
            fetch(
                "https://www.ag-grid.com/example-assets/small-company-data.json"
            )
                .then(resp => resp.json())
                .then(data => (this.rowData = data));
        }
    }
};
</script>

<style lang="less">
    .custom-cell-component-table {
        .logo {
            display: block;
            margin-right: 12px;
            width: 90px;
            height: auto;
            filter: brightness(1.1);
        }
        .img-span {
            display: flex;
            align-items: center;
            width: 100%;
            height: 100%;
        }
        .img-span-logo {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
        }
        .mission-span {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
        }
        .mission-icon {
            width: auto;
            height: auto;
        }
        .price-icon {
            display: block;
            margin-right: 2px;
            width: 15px;
            height: auto;
            max-height: 50%;
        }
        .logo-cell {
            background-color: #fff3;
        }
    }
</style>

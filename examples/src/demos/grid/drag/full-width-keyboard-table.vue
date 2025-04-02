<!--
    默认的全宽行在 tab 时，作为一整个内容进行切换聚焦元素
    使用 suppressKeyboardEvent 返回 true 阻止键盘的默认行为由用户定义，返回 false 继续使用默认行为
-->

<template>
    <div v-exposure.once="exposureEvent" class="full-width-keyboard-table">
        <ag-grid-vue
            v-if="showContent"
            style="width: 100%; height: 500px"
            class="ag-theme-quartz"
            :columnDefs="colDefs"
            :defaultColDef="defaultColDef"
            :rowData="rowData"
            :isFullWidthRow="isFullWidthRow"
            :fullWidthCellRenderer="fullWidthCellRenderer"
            @grid-ready="onGridReady"
        ></ag-grid-vue>
    </div>
</template>

<script>
import CommonMixin from "../common.mixin";
const isFullWidth = data => ["Peru", "France", "Italy"].includes(data.name);
const GRID_CELL_CLASS_NAME = "ag-full-width-row";
const getData = () => {
    return [
        {
            // these attributes appear in the top level rows of the grid
            name: "Ireland",
            continent: "Europe",
            language: "English",
            code: "ie",
            // these are used in the panel
            population: 4000000,
            summary: "Master Drinkers"
        },
        // and then repeat for all the other countries
        {
            name: "Spain",
            continent: "Europe",
            language: "Spanish",
            code: "es",
            population: 4000000,
            summary: "Bull Fighters"
        },
        {
            name: "United Kingdom",
            continent: "Europe",
            language: "English",
            code: "gb",
            population: 4000000,
            summary: "Center of the World"
        },
        {
            name: "France",
            continent: "Europe",
            language: "French",
            code: "fr",
            population: 4000000,
            summary: "Best Lovers"
        },
        {
            name: "Germany",
            continent: "Europe",
            language: "German",
            code: "de",
            population: 4000000,
            summary: "Always on Time"
        },
        {
            name: "Sweden",
            continent: "Europe",
            language: "Swedish",
            code: "se",
            population: 4000000,
            summary: "Home of Vikings"
        },
        {
            name: "Norway",
            continent: "Europe",
            language: "Norwegian",
            code: "no",
            population: 4000000,
            summary: "Best Vikings"
        },
        {
            name: "Italy",
            continent: "Europe",
            language: "Italian",
            code: "it",
            population: 4000000,
            summary: "Pizza Pizza"
        },
        {
            name: "Greece",
            continent: "Europe",
            language: "Greek",
            code: "gr",
            population: 4000000,
            summary: "Many Gods"
        },
        {
            name: "Iceland",
            continent: "Europe",
            language: "Icelandic",
            code: "is",
            population: 4000000,
            summary: "Exploding Volcano"
        },
        {
            name: "Portugal",
            continent: "Europe",
            language: "Portuguese",
            code: "pt",
            population: 4000000,
            summary: "Ship Builders"
        },
        {
            name: "Malta",
            continent: "Europe",
            language: "Maltese",
            code: "mt",
            population: 4000000,
            summary: "Fishermen"
        },
        {
            name: "Brazil",
            continent: "South America",
            language: "Portuguese",
            code: "br",
            population: 4000000,
            summary: "Best Footballers"
        },
        {
            name: "Argentina",
            continent: "South America",
            language: "Spanish",
            code: "ar",
            population: 4000000,
            summary: "Beef Steaks"
        },
        {
            name: "Colombia",
            continent: "South America",
            language: "Spanish",
            code: "co",
            population: 4000000,
            summary: "Wonderful Hospitality"
        },
        {
            name: "Peru",
            continent: "South America",
            language: "Spanish",
            code: "pe",
            population: 4000000,
            summary: "Paddington Bear"
        },
        {
            name: "Venezuela",
            continent: "South America",
            language: "Spanish",
            code: "ve",
            population: 4000000,
            summary: "Never Been, Dunno"
        },
        {
            name: "Uruguay",
            continent: "South America",
            language: "Spanish",
            code: "uy",
            population: 4000000,
            summary: "Excellent Food"
        }
    ];
};
const getEventPath = event => {
    const path = [];
    let currentTarget = event.target;
    while (currentTarget) {
        path.push(currentTarget);
        currentTarget = currentTarget.parentElement;
    }
    return path;
};
const getAllFocusableElementsOf = element => {
    return Array.from(
        element.querySelectorAll(
            "button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])"
        )
    ).filter(el => el.tabIndex !== -1);
};
const suppressKeyboardEvent = ({ event }) => {
    const { key, shiftKey } = event;
    const path = getEventPath(event);
    const isTabForward = key === "Tab" && !shiftKey;
    const isTabBackward = key === "Tab" && shiftKey;
    let suppressEvent = false;
    if (isTabForward || isTabBackward) {
        const eGridCell = path.find(el => {
            if (!el.classList) return false;
            return el.classList.contains(GRID_CELL_CLASS_NAME);
        });
        if (!eGridCell) return suppressEvent;
        const focusAbleChildrenElements =
                getAllFocusableElementsOf(eGridCell);
        if (focusAbleChildrenElements.length) {
            const lastCellChildEl =
                    focusAbleChildrenElements[
                        focusAbleChildrenElements.length - 1
                    ];
            const firstCellChildEl = focusAbleChildrenElements[0];
            if (isTabForward) {
                const isLastChildFocused =
                        lastCellChildEl &&
                        document.activeElement === lastCellChildEl;
                if (!isLastChildFocused) {
                    suppressEvent = true;
                }
            } else if (isTabBackward) {
                const cellHasFocusedChildren =
                        eGridCell.contains(document.activeElement) &&
                        eGridCell !== document.activeElement;
                if (!cellHasFocusedChildren) {
                    lastCellChildEl.focus();
                    event.preventDefault();
                }
                const isFirstChildFocused =
                        firstCellChildEl &&
                        document.activeElement === firstCellChildEl;
                if (!isFirstChildFocused) {
                    suppressEvent = false;
                }
            }
        }
    }
    return suppressEvent;
};
const FullWidthCellRenderer = {
    render(h) {
        const { params } = this;
        const src =
                "https://www.ag-grid.com/example-assets/flags/" +
                params.data.code +
                ".png";
        const language = params.data.language;
        return h(
            "div",
            {
                class: "full-width-panel"
            },
            [
                h("button", {}, [
                    h("img", {
                        attrs: {
                            width: "15",
                            height: "10",
                            src
                        }
                    })
                ]),
                h("input", {
                    attrs: {
                        value: params.data.name
                    }
                }),
                h(
                    "a",
                    {
                        attrs: {
                            href:
                                    "https://www.google.com/search?q=" +
                                    language,
                            target: "_blank"
                        }
                    },
                    language
                )
            ]
        );
    }
};
export default {
    mixins: [CommonMixin],
    components: {
        FullWidthCellRenderer
    },
    data() {
        return {
            colDefs: [
                {
                    field: "name",
                    headerName: "国家"
                },
                {
                    field: "continent",
                    headerName: "大陆"
                },
                {
                    field: "language",
                    headerName: "语言"
                }
            ],
            gridApi: null,
            defaultColDef: {
                flex: 1,
                filter: true,
                suppressKeyboardEvent
            },
            rowData: getData(),
            isFullWidthRow: params => isFullWidth(params.rowNode.data),
            fullWidthCellRenderer: "FullWidthCellRenderer"
        };
    },
    methods: {
        onGridReady(params) {
            this.gridApi = params.api;
        }
    }
};
</script>

<style lang="less">
    .full-width-keyboard-table {
        .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
        .full-width-panel {
            display: flex;
            align-items: center;
            padding-left: var(--ag-cell-horizontal-padding);
            width: 100%;
            height: 100%;
            border: 2px solid grey;
            white-space: normal;
            background-color: #ccaa22a9;
            border-style: ridge;
            box-sizing: border-box;
            gap: 5px;
        }
        .full-width-panel input {
            width: 80px;
        }
        .ag-row:focus .full-width-panel {
            background-color: #ca2c;
        }
    }
</style>

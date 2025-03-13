<!-- 
    整列行拖拽
        只有占有所有列的行才可以拖拽

    isFullWidthRow: (params: IsFullWidthRowParams<TData>) => boolean;

    interface IsFullWidthRowParams<TData, TContext> {
        rowNode: IRowNode<TData>;
        api: GridApi<TData>;
        context: TContext;
    }

    fullWidthCellRenderer: typeof CellRenderer;
-->

<template>
    <div class="full-width-row-drag-table">
        <ag-grid-vue
            style="width: 100%; height: 500px"
            class="ag-theme-quartz"
            rowDragManaged
            :columnDefs="colDefs"
            :defaultColDef="defaultColDef"
            :rowData="rowData"
            :getRowHeight="getRowHeight"
            :isFullWidthRow="isFullWidthRow"
            :fullWidthCellRenderer="fullWidthCellRenderer"
            @grid-ready="onGridReady"
        ></ag-grid-vue>
    </div>
</template>

<script>
    const isFullWidth = data => {
        return ["Peru", "France", "Italy"].includes(data.name);
    };
    const NameCellRender = params => {
        if (!params.fullWidth) {
            return params.value;
        }

        let flag = `<img border="0" width="15" height="10" src="https://www.ag-grid.com/example-assets/flags/${params.data.code}.png" />`;
        return `<span style="cursor: default;">${flag} ${params.value}</span>`;
    };
    const FullWidthCellRender = {
        data() {
            return {
                maxValue: 0,
                currentValue: 0,
                imgSrc: null
            };
        },
        beforeMount() {
            this.maxValue = this.params.maxValue;
            this.imgSrc = `https://www.ag-grid.com/example-assets/large-flags/${this.params.node.data.code}.png`;
            this.params.registerRowDragger(
                this.params.eParentOfValue,
                undefined,
                this.params.data.name,
                true
            );
        },
        methods: {
            latinText() {
                return "<p>Sample Text in a Paragraph</p><p>Lorem ipsum dolor sit amet, his mazim necessitatibus te, mea volutpat intellegebat at. Ea nec perpetua liberavisse, et modo rebum persius pri. Velit recteque reprimique quo at. Vis ex persius oporteat, esse voluptatum moderatius te vis. Ex agam suscipit aliquando eum. Mediocrem molestiae id pri, ei cibo facilisis mel. Ne sale nonumy sea. Et vel lorem omittam vulputate. Ne prima impedit percipitur vis, erat summo an pro. Id urbanitas deterruisset cum, at legere oportere has. No saperet lobortis elaboraret qui, alii zril at vix, nulla soluta ornatus per ad. Feugiat consequuntur vis ad, te sit quodsi persequeris, labore perpetua mei ad. Ex sea affert ullamcorper disputationi, sit nisl elit elaboraret te, quodsi doctus verear ut eam. Eu vel malis nominati, per ex melius delenit incorrupte. Partem complectitur sed in. Vix dicta tincidunt ea. Id nec urbanitas voluptaria, pri no nostro disputationi. Falli graeco salutatus pri ea.</p><p>Quo ad omnesque phaedrum principes, tale urbanitas constituam et ius, pericula consequat ad est. Ius tractatos referrentur deterruisset an, odio consequuntur sed ad. Ea molestie adipiscing adversarium eos, tale veniam sea no. Mutat nullam philosophia sed ad. Pri eu dicta consulatu, te mollis quaerendum sea. Ei doming commodo euismod vis. Cu modus aliquip inermis his, eos et eirmod regione delicata, at odio definiebas vis.</p><p>Lorem ipsum dolor sit amet, his mazim necessitatibus te, mea volutpat intellegebat at. Ea nec perpetua liberavisse, et modo rebum persius pri. Velit recteque reprimique quo at. Vis ex persius oporteat, esse voluptatum moderatius te vis. Ex agam suscipit aliquando eum. Mediocrem molestiae id pri, ei cibo facilisis mel. Ne sale nonumy sea. Et vel lorem omittam vulputate. Ne prima impedit percipitur vis, erat summo an pro. Id urbanitas deterruisset cum, at legere oportere has. No saperet lobortis elaboraret qui, alii zril at vix, nulla soluta ornatus per ad. Feugiat consequuntur vis ad, te sit quodsi persequeris, labore perpetua mei ad. Ex sea affert ullamcorper disputationi, sit nisl elit elaboraret te, quodsi doctus verear ut eam. Eu vel malis nominati, per ex melius delenit incorrupte. Partem complectitur sed in. Vix dicta tincidunt ea. Id nec urbanitas voluptaria, pri no nostro disputationi. Falli graeco salutatus pri ea.</p><p>Quo ad omnesque phaedrum principes, tale urbanitas constituam et ius, pericula consequat ad est. Ius tractatos referrentur deterruisset an, odio consequuntur sed ad. Ea molestie adipiscing adversarium eos, tale veniam sea no. Mutat nullam philosophia sed ad. Pri eu dicta consulatu, te mollis quaerendum sea. Ei doming commodo euismod vis. Cu modus aliquip inermis his, eos et eirmod regione delicata, at odio definiebas vis.</p>";
            }
        },
        render(h) {
            const { latinText, imgSrc, params } = this;
            return h(
                "div",
                {
                    class: "full-width-panel",
                    on: {
                        wheel: e => e.stopPropagation()
                    }
                },
                [
                    h(
                        "div",
                        {
                            class: "full-width-flag"
                        },
                        [
                            h("img", {
                                attrs: {
                                    border: "0",
                                    src: imgSrc
                                }
                            })
                        ]
                    ),
                    h(
                        "div",
                        {
                            class: "full-width-summary"
                        },
                        [
                            h(
                                "span",
                                { class: "full-width-title" },
                                params.node.data.name
                            ),
                            h("br"),
                            h("label", {}, [
                                h(
                                    "b",
                                    {},
                                    "Population:" + params.node.data.population
                                )
                            ]),
                            h("br"),
                            h("label", {}, [
                                h(
                                    "b",
                                    {},
                                    "Known For:" + params.node.data.summary
                                )
                            ]),
                            h("br")
                        ]
                    ),
                    h("div", { class: "full-width-center" }, latinText())
                ]
            );
        }
    };
    export default {
        components: {
            FullWidthCellRender: FullWidthCellRender
        },
        data() {
            return {
                colDefs: [
                    {
                        field: "name",
                        cellRenderer: NameCellRender,
                        headerName: "名称"
                    },
                    { field: "continent", headerName: "洲" },
                    { field: "language", headerName: "语言" }
                ],
                gridApi: null,
                defaultColDef: {
                    flex: 1,
                    filter: true
                },
                rowData: null,
                getRowHeight: params => {
                    if (isFullWidth(params.data)) {
                        return 100;
                    }
                },
                isFullWidthRow: params => isFullWidth(params.rowNode.data),
                fullWidthCellRenderer: "FullWidthCellRender"
            };
        },
        methods: {
            onGridReady(params) {
                this.gridApi = params.api;
                this.rowData = [
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
            }
        }
    };
</script>

<style lang="less">
    .full-width-row-drag-table {
        .full-width-panel {
            padding: 5px;
            width: 100%;
            height: 100%;
            border: 2px solid grey;

            /* undo the white-space setting Fresh puts in */
            white-space: normal;
            background-color: #9994;
            border-style: ridge;
            box-sizing: border-box;
            .full-width-flag {
                float: left;
                padding: 6px;
            }
            .full-width-summary {
                float: left;

                /* margin-left: 10px; */
                margin-right: 10px;
            }
            .full-width-panel label {
                display: inline-block;
                padding-top: 3px;
                font-size: 12px;
            }
            .full-width-center {
                overflow-y: scroll;
                padding: 2px;
                height: 100%;
                font-family: cursive;
                border: 1px solid grey;
                background-color: #9994;
                box-sizing: border-box;
            }
            .full-width-center p {
                margin-top: 0;
            }
            .full-width-title {
                font-size: 20px;
            }
        }
    }
</style>

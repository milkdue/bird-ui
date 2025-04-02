<!--

-->
<template>
    <div v-exposure.once="exposureEvent">
        <ag-grid-vue
            v-if="showContent"
            style="width: 100%; height: 500px"
            class="ag-theme-quartz"
            :columnDefs="colDefs"
            :rowData="rowData"
            @grid-ready="onGridReady"
        ></ag-grid-vue>
    </div>
</template>

<script>
import CommonMixin from "../common.mixin";
const GroupComponent = {
    mounted() {
        console.log(this.params, "group-params");
        this.expanded = this.params.columnGroup
            .getProvidedColumnGroup()
            .isExpanded();
    },
    data() {
        return {
            expanded: false
        };
    },
    render(h) {
        const { expanded } = this;
        const { displayName, columnGroup, setExpanded } = this.params;
        const setExpandedEvent = state => {
            this.expanded = state;
            setExpanded(state);
        };
        return h(
            "div",
            {
                class: "ag-header-group-cell-label"
            },
            [
                h(
                    "div",
                    { class: "custom-header-label" },
                    `**${displayName}**`
                ),
                h("bird-svg-icon", {
                    props: {
                        name: expanded ? "left" : "right",
                        width: 14,
                        height: 14
                    },
                    nativeOn: {
                        click() {
                            let state = columnGroup
                                .getProvidedColumnGroup()
                                .isExpanded();
                            setExpandedEvent(!state);
                        }
                    }
                })
            ]
        );
    }
};
export default {
    mixins: [CommonMixin],
    components: {
        GroupComponent
    },
    data() {
        return {
            colDefs: [
                {
                    headerName: "基本信息",
                    groupId: "basic",
                    marryChildren: true,
                    headerGroupComponent: "GroupComponent",
                    children: [
                        {
                            field: "athlete",
                            headerName: "运动员"
                        },
                        {
                            field: "age",
                            headerName: "年龄"
                        },
                        {
                            field: "country",
                            headerName: "国家",
                            columnGroupShow: "open"
                        }
                    ]
                },
                {
                    headerName: "其他信息",
                    marryChildren: true,
                    children: [
                        {
                            field: "sport",
                            headerName: "运动"
                        },
                        {
                            field: "year",
                            headerName: "年份"
                        },
                        {
                            field: "date",
                            headerName: "日期",
                            columnGroupShow: "open"
                        }
                    ]
                },
                {
                    headerName: "奖牌信息",
                    groupId: "medal",
                    marryChildren: true,
                    suppressStickyLabel: true,
                    children: [
                        {
                            headerName: "总计",
                            valueGetter: params => {
                                return (
                                    params.data.gold +
                                        params.data.silver +
                                        params.data.bronze
                                );
                            }
                        },
                        {
                            field: "gold",
                            headerName: "金牌"
                        },
                        {
                            field: "silver",
                            headerName: "银牌",
                            columnGroupShow: "open"
                        },
                        {
                            field: "bronze",
                            headerName: "铜牌",
                            columnGroupShow: "open"
                        }
                    ]
                }
            ],
            rowData: null,
            gridApi: null
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

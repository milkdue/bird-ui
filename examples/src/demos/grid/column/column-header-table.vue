<!--
    headerName: 列名
    headerHeight: 列头高度
    groupHeaderHeight: 组头高度
    autoHeaderHeight: true 自适应表头高度

    pinned: left right 会打断分组
-->
<template>
    <div v-exposure.once="exposureEvent">
        <div v-if="showContent" class="column-header-table">
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
                :headerHeight="headerHeight"
                :groupHeaderHeight="groupHeaderHeight"
                :columnDefs="colDefs"
                :rowData="rowData"
                @grid-ready="onGridReady"
            ></ag-grid-vue>
        </div>
    </div>
</template>

<script>
import CommonMixin from "../common.mixin";
const colDefs = [
    {
        headerName: "详细信息",
        groupId: "basic",
        children: [
            {
                field: "athlete",
                headerName: "运动员",
                width: 150,
                suppressSizeToFit: true,
                enableRowGroup: true,
                rowGroupIndex: 0
                // pinned: "left",
            },
            {
                field: "age",
                headerName: "年龄",
                width: 90,
                minWidth: 75,
                maxWidth: 100,
                enableRowGroup: true
            },
            {
                field: "country",
                headerName: "国家"
            },
            {
                field: "year",
                headerName: "年份",
                width: 90,
                enableRowGroup: true,
                pivotIndex: 0
            },
            {
                field: "sport",
                headerName: "运动",
                width: 110,
                enableRowGroup: true
            },
            {
                field: "gold",
                headerName: "金牌",
                aggFunc: "sum"
            },
            {
                field: "silver",
                headerName: "银牌",
                enableValue: true,
                aggFunc: "sum"
            },
            {
                field: "bronze",
                headerName: "铜牌",
                enableValue: true,
                aggFunc: "sum"
            },
            {
                field: "total",
                headerName: "总计",
                aggFunc: "sum"
            }
        ]
    }
];
export default {
    mixins: [CommonMixin],
    data() {
        return {
            colDefs,
            buttons: [
                {
                    label: "表头高度-40",
                    value: 40
                },
                {
                    label: "表头高度-50",
                    value: 50
                },
                {
                    label: "组头高度-80",
                    value: 80
                },
                {
                    label: "组头高度-100",
                    value: 100
                }
            ],
            rowData: null,
            gridApi: null,
            headerHeight: undefined,
            groupHeaderHeight: undefined
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
        },
        clickButton(code) {
            if (code === 40 || code === 50) {
                this.headerHeight = code;
            } else {
                this.groupHeaderHeight = code;
            }
        }
    }
};
</script>

<style lang="less">
    .column-header-table {
        .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
    }
</style>

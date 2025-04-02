<!--
    为 group 提供 groupId 可以保证更新列时的open状态保持之前的状态，否则每次更新列都会关闭之前的group

    columnGroupShow: "open" 表示组打开时显示此字段
    columnGroupShow: "closed" 表示组关闭时显示此字段
    null undefined 总是显示此字段

    设置 marryChildren: true 可以保证拖动组的时候可以一并保持其子属性的一起拖动

    suppressStickyLabel: true, 抑制横向滑动时粘滞定位组头

    suppressSpanHeaderHeight: true 不合并组的单元格
-->
<template>
    <div v-exposure.once="exposureEvent">
        <div v-if="showContent" class="column-group-table">
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
        headerName: "基本信息",
        groupId: "basic",
        marryChildren: true,
        suppressStickyLabel: true,
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
        // suppressStickyLabel: true,
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
    },
    {
        headerName: "总计",
        suppressSpanHeaderHeight: true,
        valueGetter: params => {
            return (
                params.data.gold + params.data.silver + params.data.bronze
            );
        }
    }
];

export default {
    mixins: [CommonMixin],
    data() {
        return {
            colDefs,
            buttons: [
                {
                    label: "组名-A",
                    value: "A"
                },
                {
                    label: "组名-B",
                    value: "B"
                },
                {
                    label: "打开所有组",
                    value: "open"
                },
                {
                    label: "关闭所有组",
                    value: "close"
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
        },
        clickButton(code) {
            if (code === "open") {
                this.gridApi.setColumnGroupOpened("basic", true);
                this.gridApi.setColumnGroupOpened("medal", true);
                return;
            }
            if (code === "close") {
                this.gridApi.setColumnGroupOpened("basic", false);
                this.gridApi.setColumnGroupOpened("medal", false);
                return;
            }
            this.gridApi.setGridOption(
                "columnDefs",
                colDefs.map(item => ({
                    ...item,
                    headerName: item.headerName + "-" + code
                }))
            );
        }
    }
};
</script>

<style lang="less">
    .column-group-table {
        .button-group {
            display: flex;
            gap: 6px;
            margin-bottom: 10px;
        }
    }
</style>

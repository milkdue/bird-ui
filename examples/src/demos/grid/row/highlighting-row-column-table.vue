<!--
    高亮行是默认的行为，需要关闭它可以设置属性 suppressRowHoverHighlight=true，抑制这个默认的行为
    高亮列默认是关闭的，打开需要设置属性 columnHoverHighlight=true

    高行行取决于 类名 ag-row-hover
    高亮列取决于 类名 ag-column-hover

    .ag-row-first .ag-row-last 分别对应首行和尾行
-->
<template>
    <div class="highlighting-row-column-table">
        <ag-grid-vue
            style="width: 100%; height: 500px"
            class="ag-theme-alpine"
            columnHoverHighlight
            :columnDefs="colDefs"
            :rowData="rowData"
        ></ag-grid-vue>
    </div>
</template>

<script>
export default {
    data() {
        return {
            colDefs: [
                {
                    field: "athlete",
                    headerName: "运动员"
                },
                {
                    field: "age",
                    width: 80,
                    headerName: "年龄"
                },
                {
                    field: "country",
                    headerName: "国家"
                },
                {
                    field: "date",
                    headerName: "日期"
                },
                {
                    field: "sport",
                    headerName: "运动"
                },
                {
                    field: "gold",
                    headerName: "金牌",
                    flex: 1
                }
            ],
            rowData: null
        };
    },
    created() {
        fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
            .then(resp => resp.json())
            .then(data => (this.rowData = data));
    }
};
</script>

<style lang="less">
    .highlighting-row-column-table {
        .ag-row-hover {
            background-color: aqua;
        }
        .ag-column-hover {
            background-color: red;
        }
        .ag-row-first {
            background-color: skyblue;
        }
        .ag-row-last {
            background-color: skyblue;
        }
    }
</style>

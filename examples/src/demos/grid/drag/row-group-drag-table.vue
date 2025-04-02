<!--
    行分组和拖拽
        开启分组后，需要用户指定触发的事件
        所有不受排序 过滤影响
-->

<template>
    <div v-exposure.once="exposureEvent" class="row-group-drag-table">
        <ag-grid-vue
            v-if="showContent"
            style="width: 100%; height: 500px"
            class="ag-theme-quartz"
            :columnDefs="colDefs"
            :groupDefaultExpanded="1"
            @row-drag-move="onRowDragMove"
            @grid-ready="onGridReady"
        ></ag-grid-vue>
    </div>
</template>

<script>
import CommonMixin from "../common.mixin";
const data = [
    {
        athlete: "Aleksey Nemov",
        age: 24,
        country: "Russia",
        year: 2000,
        date: "01/10/2000",
        sport: "Gymnastics",
        gold: 2,
        silver: 1,
        bronze: 3,
        total: 6
    },
    {
        athlete: "Alicia Coutts",
        age: 24,
        country: "Australia",
        year: 2012,
        date: "12/08/2012",
        sport: "Swimming",
        gold: 1,
        silver: 3,
        bronze: 1,
        total: 5
    },
    {
        athlete: "Ian Thorpe",
        age: 17,
        country: "Australia",
        year: 2000,
        date: "01/10/2000",
        sport: "Swimming",
        gold: 3,
        silver: 2,
        bronze: 0,
        total: 5
    },
    {
        athlete: "Dara Torres",
        age: 33,
        country: "United States",
        year: 2000,
        date: "01/10/2000",
        sport: "Swimming",
        gold: 2,
        silver: 0,
        bronze: 3,
        total: 5
    },
    {
        athlete: "Cindy Klassen",
        age: 26,
        country: "Canada",
        year: 2006,
        date: "26/02/2006",
        sport: "Speed Skating",
        gold: 1,
        silver: 2,
        bronze: 2,
        total: 5
    },
    {
        athlete: "Nastia Liukin",
        age: 18,
        country: "United States",
        year: 2008,
        date: "24/08/2008",
        sport: "Gymnastics",
        gold: 1,
        silver: 3,
        bronze: 1,
        total: 5
    },
    {
        athlete: "Marit Bjørgen",
        age: 29,
        country: "Norway",
        year: 2010,
        date: "28/02/2010",
        sport: "Cross Country Skiing",
        gold: 3,
        silver: 1,
        bronze: 1,
        total: 5
    },
    {
        athlete: "Sun Yang",
        age: 20,
        country: "China",
        year: 2012,
        date: "12/08/2012",
        sport: "Swimming",
        gold: 2,
        silver: 1,
        bronze: 1,
        total: 4
    },
    {
        athlete: "Kirsty Coventry",
        age: 24,
        country: "Zimbabwe",
        year: 2008,
        date: "24/08/2008",
        sport: "Swimming",
        gold: 1,
        silver: 3,
        bronze: 0,
        total: 4
    },
    {
        athlete: "Libby Lenton-Trickett",
        age: 23,
        country: "Australia",
        year: 2008,
        date: "24/08/2008",
        sport: "Swimming",
        gold: 2,
        silver: 1,
        bronze: 1,
        total: 4
    },
    {
        athlete: "Ryan Lochte",
        age: 24,
        country: "United States",
        year: 2008,
        date: "24/08/2008",
        sport: "Swimming",
        gold: 2,
        silver: 0,
        bronze: 2,
        total: 4
    },
    {
        athlete: "Inge de Bruijn",
        age: 30,
        country: "Netherlands",
        year: 2004,
        date: "29/08/2004",
        sport: "Swimming",
        gold: 1,
        silver: 1,
        bronze: 2,
        total: 4
    },
    {
        athlete: "Petria Thomas",
        age: 28,
        country: "Australia",
        year: 2004,
        date: "29/08/2004",
        sport: "Swimming",
        gold: 3,
        silver: 1,
        bronze: 0,
        total: 4
    },
    {
        athlete: "Ian Thorpe",
        age: 21,
        country: "Australia",
        year: 2004,
        date: "29/08/2004",
        sport: "Swimming",
        gold: 2,
        silver: 1,
        bronze: 1,
        total: 4
    },
    {
        athlete: "Inge de Bruijn",
        age: 27,
        country: "Netherlands",
        year: 2000,
        date: "01/10/2000",
        sport: "Swimming",
        gold: 3,
        silver: 1,
        bronze: 0,
        total: 4
    },
    {
        athlete: "Gary Hall Jr.",
        age: 25,
        country: "United States",
        year: 2000,
        date: "01/10/2000",
        sport: "Swimming",
        gold: 2,
        silver: 1,
        bronze: 1,
        total: 4
    },
    {
        athlete: "Michael Klim",
        age: 23,
        country: "Australia",
        year: 2000,
        date: "01/10/2000",
        sport: "Swimming",
        gold: 2,
        silver: 2,
        bronze: 0,
        total: 4
    },
    {
        athlete: "Susie O'Neill",
        age: 27,
        country: "Australia",
        year: 2000,
        date: "01/10/2000",
        sport: "Swimming",
        gold: 1,
        silver: 3,
        bronze: 0,
        total: 4
    },
    {
        athlete: "Jenny Thompson",
        age: 27,
        country: "United States",
        year: 2000,
        date: "01/10/2000",
        sport: "Swimming",
        gold: 3,
        silver: 0,
        bronze: 1,
        total: 4
    },
    {
        athlete: "Pieter van den Hoogenband",
        age: 22,
        country: "Netherlands",
        year: 2000,
        date: "01/10/2000",
        sport: "Swimming",
        gold: 2,
        silver: 0,
        bronze: 2,
        total: 4
    },
    {
        athlete: "An Hyeon-Su",
        age: 20,
        country: "South Korea",
        year: 2006,
        date: "26/02/2006",
        sport: "Short-Track Speed Skating",
        gold: 3,
        silver: 0,
        bronze: 1,
        total: 4
    },
    {
        athlete: "Aliya Mustafina",
        age: 17,
        country: "Russia",
        year: 2012,
        date: "12/08/2012",
        sport: "Gymnastics",
        gold: 1,
        silver: 1,
        bronze: 2,
        total: 4
    },
    {
        athlete: "Shawn Johnson",
        age: 16,
        country: "United States",
        year: 2008,
        date: "24/08/2008",
        sport: "Gymnastics",
        gold: 1,
        silver: 3,
        bronze: 0,
        total: 4
    },
    {
        athlete: "Dmitry Sautin",
        age: 26,
        country: "Russia",
        year: 2000,
        date: "01/10/2000",
        sport: "Diving",
        gold: 1,
        silver: 1,
        bronze: 2,
        total: 4
    },
    {
        athlete: "Leontien Zijlaard-van Moorsel",
        age: 30,
        country: "Netherlands",
        year: 2000,
        date: "01/10/2000",
        sport: "Cycling",
        gold: 3,
        silver: 1,
        bronze: 0,
        total: 4
    },
    {
        athlete: "Petter Northug Jr.",
        age: 24,
        country: "Norway",
        year: 2010,
        date: "28/02/2010",
        sport: "Cross Country Skiing",
        gold: 2,
        silver: 1,
        bronze: 1,
        total: 4
    },
    {
        athlete: "Ole Einar Bjørndalen",
        age: 28,
        country: "Norway",
        year: 2002,
        date: "24/02/2002",
        sport: "Biathlon",
        gold: 4,
        silver: 0,
        bronze: 0,
        total: 4
    },
    {
        athlete: "Janica Kostelic",
        age: 20,
        country: "Croatia",
        year: 2002,
        date: "24/02/2002",
        sport: "Alpine Skiing",
        gold: 3,
        silver: 1,
        bronze: 0,
        total: 4
    },
    {
        athlete: "Nathan Adrian",
        age: 23,
        country: "United States",
        year: 2012,
        date: "12/08/2012",
        sport: "Swimming",
        gold: 2,
        silver: 1,
        bronze: 0,
        total: 3
    },
    {
        athlete: "Yannick Agnel",
        age: 20,
        country: "France",
        year: 2012,
        date: "12/08/2012",
        sport: "Swimming",
        gold: 2,
        silver: 1,
        bronze: 0,
        total: 3
    },
    {
        athlete: "Brittany Elmslie",
        age: 18,
        country: "Australia",
        year: 2012,
        date: "12/08/2012",
        sport: "Swimming",
        gold: 1,
        silver: 2,
        bronze: 0,
        total: 3
    }
];
export default {
    mixins: [CommonMixin],
    data() {
        return {
            colDefs: [
                {
                    field: "athlete",
                    headerName: "运动员",
                    rowDrag: params => !params.node.group
                },
                {
                    field: "country",
                    headerName: "国家",
                    rowGroup: true
                },
                {
                    field: "year",
                    width: 100,
                    headerName: "年份"
                },
                {
                    field: "date",
                    headerName: "日期"
                },
                {
                    field: "sport",
                    headerName: "体育项目"
                },
                {
                    field: "gold",
                    headerName: "金牌"
                },
                {
                    field: "silver",
                    headerName: "银牌"
                },
                {
                    field: "bronze",
                    headerName: "铜牌"
                }
            ],
            gridApi: null
        };
    },
    methods: {
        onRowDragMove(event) {
            let movingNode = event.node;
            let overNode = event.overNode;
            let groupCountry;
            if (overNode.group) {
                groupCountry = overNode.key;
            } else {
                groupCountry = overNode.data.country;
            }
            let needToChangeparent =
                    movingNode.data.country !== groupCountry;
            if (needToChangeparent) {
                let movingData = movingNode.data;
                movingData.country = groupCountry;
                this.gridApi.applyTransaction({
                    update: [movingData]
                });
                this.gridApi.clearFocusedCell();
            }
        },
        onGridReady(params) {
            this.gridApi = params.api;
            this.gridApi.setGridOption("rowData", data);
        }
    }
};
</script>

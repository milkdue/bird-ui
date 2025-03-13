<!--
    如果想要在过滤排序的时候不进行拖拽可以设置
    gridOptions.suppressRowDrag 为 true
    这样在排序过滤时不出现拖拽按钮

    用户非托管拖拽需要指定 rowId 才可以有动画效果
-->

<template>
    <div class="simple-unmanaged-table">
        <ag-grid-vue
            style="width: 100%; height: 500px"
            class="ag-theme-quartz"
            :columnDefs="colDefs"
            :defaultColDef="defaultColDef"
            :getRowId="getRowId"
            @sort-changed="onSortChanged"
            @filter-changed="onFilterChanged"
            @row-drag-move="onRowDragMove"
            @grid-ready="onGridReady"
        ></ag-grid-vue>
    </div>
</template>

<script>
const getData = () => {
    const data = [
        {
            athlete: "Michael Phelps",
            age: 23,
            country: "United States",
            year: 2008,
            date: "24/08/2008",
            sport: "Swimming",
            gold: 8,
            silver: 0,
            bronze: 0,
            total: 8
        },
        {
            athlete: "Michael Phelps",
            age: 19,
            country: "United States",
            year: 2004,
            date: "29/08/2004",
            sport: "Swimming",
            gold: 6,
            silver: 0,
            bronze: 2,
            total: 8
        },
        {
            athlete: "Michael Phelps",
            age: 27,
            country: "United States",
            year: 2012,
            date: "12/08/2012",
            sport: "Swimming",
            gold: 4,
            silver: 2,
            bronze: 0,
            total: 6
        },
        {
            athlete: "Natalie Coughlin",
            age: 25,
            country: "United States",
            year: 2008,
            date: "24/08/2008",
            sport: "Swimming",
            gold: 1,
            silver: 2,
            bronze: 3,
            total: 6
        },
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
            athlete: "Missy Franklin",
            age: 17,
            country: "United States",
            year: 2012,
            date: "12/08/2012",
            sport: "Swimming",
            gold: 4,
            silver: 0,
            bronze: 1,
            total: 5
        },
        {
            athlete: "Ryan Lochte",
            age: 27,
            country: "United States",
            year: 2012,
            date: "12/08/2012",
            sport: "Swimming",
            gold: 2,
            silver: 2,
            bronze: 1,
            total: 5
        },
        {
            athlete: "Allison Schmitt",
            age: 22,
            country: "United States",
            year: 2012,
            date: "12/08/2012",
            sport: "Swimming",
            gold: 3,
            silver: 1,
            bronze: 1,
            total: 5
        },
        {
            athlete: "Natalie Coughlin",
            age: 21,
            country: "United States",
            year: 2004,
            date: "29/08/2004",
            sport: "Swimming",
            gold: 2,
            silver: 2,
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
    data.forEach((item, index) => {
        item.id = index;
    });
    return data;
};

const moveInArray = (array, from, to) => {
    let element = array[from];
    array.splice(from, 1);
    array.splice(to, 0, element);
};

export default {
    data() {
        return {
            colDefs: [
                {
                    field: "athlete",
                    headerName: "运动员",
                    rowDrag: true
                },
                {
                    field: "country",
                    headerName: "国家"
                },
                {
                    field: "year",
                    headerName: "年份",
                    width: 100
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
            defaultColDef: {
                width: 170,
                filter: true
            },
            gridApi: null,
            sortActive: false,
            filterActive: false,
            rowData: getData(),
            getRowId: params => params.data.id
        };
    },
    methods: {
        onGridReady(params) {
            this.gridApi = params.api;
            params.api.setGridOption("rowData", this.rowData);
        },
        onSortChanged() {
            let colStatus = this.gridApi.getColumnState() || [];
            let sortActive = colStatus.some(c => c.sort);
            this.sortActive = sortActive;
            let suppressRowDrag = this.filterActive || sortActive;
            this.gridApi.setGridOption("suppressRowDrag", suppressRowDrag);
        },
        onFilterChanged() {
            let filterActive = this.gridApi.isAnyFilterPresent();
            this.filterActive = filterActive;
            let suppressRowDrag = filterActive || this.sortActive;
            this.gridApi.setGridOption("suppressRowDrag", suppressRowDrag);
        },
        onRowDragMove(event) {
            let movingNode = event.node;
            let overNode = event.overNode;
            let rowNeedsToMove = movingNode !== overNode;
            if (rowNeedsToMove) {
                let movingData = movingNode.data;
                let overData = overNode.data;
                let fromIndex = this.rowData.indexOf(movingData);
                let toIndex = this.rowData.indexOf(overData);
                let newData = this.rowData.slice();
                moveInArray(newData, fromIndex, toIndex);
                this.rowData = newData;
                this.gridApi.setGridOption("rowData", newData);
                this.gridApi.clearFocusedCell();
            }
        }
    }
};
</script>

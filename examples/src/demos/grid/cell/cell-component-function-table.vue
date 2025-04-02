<!--
    cellRenderer: 不必是一个组件，也可以是一个函数。
    通常如果有一个字符串类型的值去展示，可以使用此方法
        cellRenderer: String | Function
            - string: 已经注册的组件的名称
            - function: 函数返回一个html的字符串去展示

    动态组件
        colDef.cellRendererSelector: Function; 允许设置不同的单元格组件对于不同的行或列
        函数需要返回一个对象，包含 params 已经 component 两个属性 params 里可以放一些自定义的数据，和原始 params 合并后传入到组件内部
-->

<template>
    <div class="cell-component-function-table">
        <ag-grid-vue
            style="width: 100%; height: 500px"
            class="ag-theme-quartz"
            :columnDefs="colDefs"
            :rowData="rowData"
            :defaultColDef="defaultColDef"
        ></ag-grid-vue>
    </div>
</template>

<script>
const MoodCellRenderer = {
    data() {
        return {
            imgForMood: null,
            mood: "Happy"
        };
    },
    created() {
        this.setMood(this.params);
    },
    render(h) {
        const { imgForMood } = this;
        return h("img", {
            style: {
                width: "20px"
            },
            attrs: {
                src: imgForMood
            }
        });
    },
    methods: {
        refresh(params) {
            this.params = params;
            this.setMood(params);
        },
        setMood(params) {
            this.mood = params.value;
            this.imgForMood = `https://www.ag-grid.com/example-assets/smileys/${this.mood === "Happy" ? "happy.png" : "sad.png"}`;
        }
    }
};
const GenderCellRenderer = {
    render(h) {
        const { params } = this;
        return h(
            "div",
            {
                style: {
                    display: "flex",
                    "align-items": "center"
                }
            },
            [
                h("bird-svg-icon", {
                    props: {
                        name: params.value === "Male" ? "smile" : "star",
                        width: 14,
                        height: 14
                    }
                }),
                params.value
            ]
        );
    },
    beforeMount() {
        console.info(this.params, "params");
    }
};
export default {
    components: {
        MoodCellRenderer,
        GenderCellRenderer
    },
    data() {
        return {
            colDefs: [
                { field: "value" },
                {
                    headerName: "Rendered Value",
                    field: "value",
                    cellRendererSelector: params => {
                        const moodDetails = {
                            component: "MoodCellRenderer"
                        };
                        const genderDetails = {
                            component: "GenderCellRenderer",
                            params: {
                                value: ["Male", "Female"]
                            }
                        };
                        if (params.data.type === "gender") {return genderDetails;} else if (params.data.type === "mood") {return moodDetails;} else return undefined;
                    }
                },
                { field: "type" }
            ],
            defaultColDef: {
                flex: 1,
                cellDataType: false
            },
            rowData: [
                {
                    value: 14,
                    type: "age"
                },
                {
                    value: "Female",
                    type: "gender"
                },
                {
                    value: "Happy",
                    type: "mood"
                },
                {
                    value: 21,
                    type: "age"
                },
                {
                    value: "Male",
                    type: "gender"
                },
                {
                    value: "Sad",
                    type: "mood"
                }
            ]
        };
    }
};
</script>

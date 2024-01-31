<template>
    <bird-row :gutter="20">
        <bird-col :xs="24" :sm="12" :md="6" :lg="4" :xl="3">
            <div class="col-item"></div>
        </bird-col>
        <bird-col :xs="24" :sm="12" :md="6" :lg="4" :xl="3">
            <div class="col-item"></div>
        </bird-col>
        <bird-col :xs="24" :sm="12" :md="6" :lg="4" :xl="3">
            <div class="col-item"></div>
        </bird-col>
        <bird-col :xs="24" :sm="12" :md="6" :lg="4" :xl="3">
            <div class="col-item"></div>
        </bird-col>
        <bird-col :xs="24" :sm="12" :md="6" :lg="4" :xl="3">
            <div class="col-item"></div>
        </bird-col>
        <bird-col :xs="24" :sm="12" :md="6" :lg="4" :xl="3">
            <div class="col-item"></div>
        </bird-col>
        <bird-col :xs="24" :sm="12" :md="6" :lg="4" :xl="3">
            <div class="col-item"></div>
        </bird-col>
        <bird-col :xs="24" :sm="12" :md="6" :lg="4" :xl="3">
            <div class="col-item"></div>
        </bird-col>
    </bird-row>
</template>

<script>
export default {
    name: "BirdButton",
    mounted() {
        console.log("BirdButton");
    }
};
</script>

<style lang="less">
    .col-item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 60px;
        border-radius: 4px;
        background-color: #d3dce6;
    }
</style>

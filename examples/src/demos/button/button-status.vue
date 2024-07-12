<template>
    <div>
        <div
            v-for="state in status"
            :key="status"
            style="
                display: flex;
                justify-content: space-around;
                margin-bottom: 10px;
            "
        >
            <bird-button :status="state">主要按钮</bird-button>
            <bird-button :status="state" type="secondary">次要按钮</bird-button>
            <bird-button :status="state" type="plain">朴素按钮</bird-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            status: ["primary", "success", "warning", "danger"]
        };
    }
};
</script>

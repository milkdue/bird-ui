<template>
    <div class="steps-container">
        <div
            class="step-item"
            v-for="(step, index) in steps"
            :key="step.fdNodeNumber"
        >
            <div class="step-dot">
                <bird-svg-icon
                    name="tick"
                    width="12px"
                    height="12px"
                    fill="#409EFF"
                ></bird-svg-icon>
            </div>
            <div class="step-name">{{ step.fdNodeName }}</div>
            <div class="step-line"></div>
            <div class="step-content">
                <div class="step-content-top">
                    <div class="left">
                        <div class="person">{{ step.fdHandler }}</div>
                        <div class="status">{{ step.fdAction }}</div>
                    </div>
                    <div class="right">
                        <div class="date">{{ step.fdCreateTime }}</div>
                    </div>
                </div>
                <div class="bottom-message">{{ step.fdMessage }}</div>
            </div>
            <div v-if="index === steps.length - 1" class="end-dot"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        direction: {
            type: String,
            default: "horizontal",
            validator: value => {
                return ["horizontal", "vertical"].includes(value);
            }
        }
    },
    data() {
        return {
            steps: [
                {
                    fdNodeNumber: "1",
                    fdNodeName: "起草节点",
                    fdCreateTime: "2024-11-29 16:53:13",
                    fdHandler: "陆佳佳",
                    fdAction: "提交流程",
                    fdMessage: "审批意见"
                },
                {
                    fdNodeNumber: "2",
                    fdNodeName: "起草节点",
                    fdCreateTime: "2024-11-29 16:53:13",
                    fdHandler: "陆佳佳",
                    fdAction: "提交流程",
                    fdMessage: "审批意见"
                },
                {
                    fdNodeNumber: "3",
                    fdNodeName: "起草节点",
                    fdCreateTime: "2024-11-29 16:53:13",
                    fdHandler: "陆佳佳",
                    fdAction: "提交流程",
                    fdMessage: "审批意见"
                }
            ] // 步骤数组
        };
    },
    methods: {
        nextStep() {
            if (this.activeStep < this.steps.length - 1) {
                this.activeStep += 1;
            }
        },
        prevStep() {
            if (this.activeStep > 0) {
                this.activeStep -= 1;
            }
        }
    }
};
</script>

<style scoped lang="less">
    .steps-container {
        display: flex;
        flex-direction: column;
        background-color: #f8f8f8;
        .step-item {
            position: relative;
            padding-left: 30px;
            height: 100px;
            .step-dot {
                position: absolute;
                top: 0;
                left: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 16px;
                height: 16px;
                border-radius: 50%;
                background-color: #e9ebfa;
            }
            .step-name {
                line-height: 16px;
                color: #9c9c9c;
            }
            .step-line {
                position: absolute;
                top: 16px;
                left: 7px;
                width: 2px;
                height: 84px;
                background-color: #ddd;
            }
            .end-dot {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 16px;
                height: 16px;
                border: 4px solid #e9ebfa;
                border-radius: 50%;
                background-color: #fff;
                box-sizing: border-box;
            }
            .step-content {
                display: flex;
                margin-top: 6px;
                padding: 4px 10px;
                height: 70px;
                border-radius: 4px;
                background-color: #fff;
                flex-direction: column;
                .step-content-top {
                    display: flex;
                    justify-content: space-between;
                    .left {
                        display: flex;
                        font-size: 14px;
                        color: #333;
                        gap: 8px;
                        .status {
                            color: #9c9c9c;
                        }
                    }
                    .right {
                        color: #9c9c9c;
                    }
                }
                .bottom-message {
                    color: #9c9c9c;
                }
            }
        }
    }
</style>

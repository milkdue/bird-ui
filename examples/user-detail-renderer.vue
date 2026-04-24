<template>
    <div class="detail-container">
        <div class="detail-header">
            <div>
                <strong>{{ params.data.name }}</strong>
                的订单信息
            </div>
            <div class="sub-text">
                部门：{{ params.data.department }} ｜ 年龄：{{
                    params.data.age
                }}
            </div>
        </div>

        <div v-if="hasOrders" class="detail-table">
            <div class="detail-row detail-row-head">
                <div>订单号</div>
                <div>商品</div>
                <div>金额</div>
                <div>状态</div>
            </div>

            <div
                v-for="item in params.data.orders"
                :key="item.orderId"
                class="detail-row"
            >
                <div>{{ item.orderId }}</div>
                <div>{{ item.product }}</div>
                <div>¥ {{ item.amount }}</div>
                <div>
                    <span :class="['status-tag', item.status]">
                        {{ formatStatus(item.status) }}
                    </span>
                </div>
            </div>
        </div>

        <div v-else class="empty-box">暂无订单数据</div>

        <div class="action-bar">
            <button class="btn" @click="handleView">查看当前行数据</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "UserDetailRenderer",
    computed: {
        hasOrders() {
            return (
                this.params &&
                    this.params.data &&
                    this.params.data.orders &&
                    this.params.data.orders.length > 0
            );
        }
    },
    methods: {
        formatStatus(status) {
            const map = {
                paid: "已支付",
                pending: "待支付",
                cancelled: "已取消"
            };
            return map[status] || status;
        },
        handleView() {
            this.$message({
                type: "info",
                message: `点击了${this.params.data.name}`
            });
        }
    }
};
</script>

<style scoped>
    .detail-container {
        padding: 16px;
        border-left: 4px solid #409eff;
        background: #fafafa;
        box-sizing: border-box;
    }
    .detail-header {
        margin-bottom: 12px;
    }
    .sub-text {
        margin-top: 4px;
        font-size: 13px;
        color: #666;
    }
    .detail-table {
        overflow: hidden;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        background: #fff;
    }
    .detail-row {
        display: grid;
        grid-template-columns: 140px 1fr 120px 120px;
        border-bottom: 1px solid #f0f0f0;
    }
    .detail-row:last-child {
        border-bottom: none;
    }
    .detail-row > div {
        padding: 10px 12px;
        font-size: 14px;
    }
    .detail-row-head {
        font-weight: bold;
        background: #f5f7fa;
    }
    .status-tag {
        display: inline-block;
        padding: 2px 8px;
        font-size: 12px;
        border-radius: 12px;
        line-height: 20px;
    }
    .status-tag.paid {
        color: #2e7d32;
        background: #e8f5e9;
    }
    .status-tag.pending {
        color: #f57f17;
        background: #fff8e1;
    }
    .status-tag.cancelled {
        color: #c62828;
        background: #ffebee;
    }
    .empty-box {
        padding: 16px;
        border: 1px dashed #ddd;
        color: #999;
        background: #fff;
    }
    .action-bar {
        margin-top: 12px;
    }
    .btn {
        padding: 6px 12px;
        border: 1px solid #409eff;
        border-radius: 4px;
        color: #fff;
        background: #409eff;
        cursor: pointer;
    }
</style>

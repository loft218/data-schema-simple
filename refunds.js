let schema = new mongoose.Schema({
    // 退款单号
    refund_no: { type: String, unique: true },

    // 关联的支付号
    payment_no: { type: String, required: true },

    // 关联的订单号
    order_no: { type: String, required: true },

    // 商户ID
    shop_id: { type: String, required: true },

    // 商户名字
    shop_name: { type: String, required: true },

    // 退款金额
    // 小于等于支付金额
    refund_amount: { type: Number, required: true },

    // 退款方式
    // 默认同支付方式payment_way
    refund_way: { type: String, required: true },

    // 退款状态
    /**
     * WAIT_REFUND: 退款中
     * REFUND_SUCCESS: 退款成功
     * REFUND_FAIL: 退款失败
     */
    refund_status: { type: String, default: 'REFUND_PROCESS' },

    // 退款结果
    refund_result: {},
    buyer_user_id: String,
    buyer_user_name: String,
    buyer_user_type: String,
    /**
     * 商品类型
     * goods: 商品(酒水)
     * minimum：最低消费
     * ticket: 活动门票
     * gift: 虚拟礼物
     * song: 点歌
     * award: 打赏
     */
    goods_type: String,
    remark: String,

    uts_create: Number,
    uts_refund: Number,

    created: Number,
    updated: Number,
    pendingTransactions: {type: Array, default: []},
});

schema.path('refund_way').validate(function (val) {
    return ['CASH', 'ALI_PAY', 'WX_PAY', 'DUB', 'BALANCE', 'MINIMUM', 'COUPON'].indexOf(val) > -1;
}, 'invalid refund_way');

schema.path('refund_status').validate(function (val) {
    return ['WAIT_REFUND', 'REFUND_PROCESS', 'REFUND_SUCCESS', 'REFUND_FAIL'].indexOf(val) > -1
}, 'invalid refund_status');

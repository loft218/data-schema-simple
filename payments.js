const SchemaRefund = new mongoose.Schema({
    refund_no: { type: String },
    refund_amount: { type: Number, required: true },
    refund_way: { type: String, required: true },
    refund_time: { type: Number, required: true },
    remark: { type: String, default: '' },
}, { _id: false });

// 定义PaymentSchema数据表和数据结构
const PaymentSchema = new Schema({
    // 第三方支付编号
    payment_no: { type: String, unique: true },
    // 关联的订单号
    order_no: { type: String, required: true },
    // 订单类型 SALE 和 DEPOSIT 、PAYMENT
    order_type: { type: String, required: true },
    // 商户ID
    shop_id: { type: String },
    // 商户名字
    shop_name: { type: String },
    // 演出id
    // show_id: { type: String },
    // 演出时间
    show_date: { type: String },
    // 支付方式
    // ['CASH','ALI_PAY','WX_PAY','DUB','BALANCE','MINIMUM','COUPON']
    payment_way: { type: String, default: '' },
    // 货币类型
    // ['RMB','DUB']
    currency: { type: String, default: '' },
    // 支付总金额
    // 总金额 = 实际付款金额 + 已退款金额
    total_amount: { type: Number, default: 0 },
    // 实际付款金额
    // 默认等于总金额
    payment_amount: { type: Number, default: 0 },
    // 已退款金额
    refunded_amount: { type: Number, default: 0 },
    // 支付状态
    /**
     * WAIT_PAY: 待支付
     * PAIED_SUCCESS: 成功支付
     * PAIED_FAIL: 支付失败
     * REFUNDED: 已全额退款
     */
    payment_status: { type: String, default: 'WAIT_PAY' },
    /**
     * 订单平台 目前只有: 
     *      APP     APP平台 默认
     *      WX_MP   微信公众号
     */
    platform:  {type: String, default:'APP' },
    
    // 支付结果
    payment_result: {},
    // 财务校验
    finance_checked: { type: Number, default: 0 },
    mini_order_no: { type: String },
    // 财务校验时间
    finance_time: Number,
    // 结算金额
    finance_amount: Number,

    // 第三方支付退款编号
    refunds: [SchemaRefund],
    buyer_user_id: Number,
    buyer_user_name: String,
    buyer_user_type: Number,
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

    /* 现金支付的方式*/
    cash_type: String,
    uts_payment: Number,
    // 全额退款完成时间
    uts_refund: Number,
    created: Number,
    updated: Number,
    pendingTransactions: { type: Array, default: [] },
}, {
        versionKey: false, // You should be aware of the outcome after set to false
    });

PaymentSchema.path('currency').validate(val => ['RMB', 'DUB'].indexOf(val) > -1, 'invalid currency');

PaymentSchema.path('total_amount').validate(val => val >= 0, 'invalid total_amount');

PaymentSchema.path('payment_amount').validate(val => val >= 0, 'invalid payment_amount');

PaymentSchema.path('refunded_amount').validate(val => val >= 0, 'invalid refunded_amount');

PaymentSchema.path('payment_status').validate((val) => {
    const status = ['WAIT_PAY', 'PAIED_SUCCESS', 'PAIED_FAIL', 'REFUNDED'];
    return status.indexOf(val) > -1;
}, 'invalid payment_status');


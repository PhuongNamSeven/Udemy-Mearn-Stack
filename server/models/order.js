const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        count: Number,
        color: String,
      },
    ],
    paymentIntent: {},
    orderStatus: {
      type: String,
      default: "Đang chờ xử lí",
      enum: [
        "Đang chờ xử lí",
        "Shop đã xác nhận",
        "Đang giao hàng cho đơn vị vận chuyển",
        "Đang giao hàng",
        "Đã hủy",
        "Hoàn thành",
      ],
    },
    orderdBy: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);

import React from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";

const Orders = ({ orders, handleStatusChange }) => {
  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Tên</th>
          <th scope="col">Giá</th>
          <th scope="col">Thương hiệu</th>
          <th scope="col">Màu sắc</th>
          <th scope="col">Số lượng</th>
          <th scope="col">Shipping</th>
        </tr>
      </thead>

      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <b>{p.product?.title}</b>
            </td>
            <td>{p.product?.price}</td>
            <td>{p.product?.brand}</td>
            <td>{p?.color}</td>
            <td>{p?.count}</td>
            <td>
              {p.product?.shipping === "Yes" ? (
                <CheckCircleOutlined style={{ color: "green" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red" }} />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      {orders.map((order) => (
        <div key={order._id} className="row pb-5">
          <div className="btn btn-block bg-light">
            <ShowPaymentInfo order={order} showStatus={false} />

            <div className="row">
              <div className="col-md-4">Trạng thái đơn hàng</div>
              <div className="col-md-8">
                <select
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="form-control"
                  defaultValue={order.orderStatus}
                  name="status"
                >
                  <option value="Đang chờ xử lí">Đang chờ xử lí</option>
                  <option value="Shop đã xác nhận">Shop đã xác nhận</option>
                  <option value="Đang giao hàng cho đơn vị vận chuyển">Đang giao hàng cho đơn vị vận chuyển</option>
                  <option value="Đang giao hàng">Đang giao hàng</option>
                  <option value="Đã hủy">Đã hủy</option>
                  <option value="Hoàn thành">Hoàn thành</option>
                </select>
              </div>
            </div>
          </div>

          {showOrderInTable(order)}
        </div>
      ))}
    </>
  );
};

export default Orders;

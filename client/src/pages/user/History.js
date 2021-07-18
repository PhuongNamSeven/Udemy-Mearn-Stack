import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getUserOrders } from "../../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../../components/order/Invoice";

const History = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () =>
    getUserOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
      console.log(orders.products);
    });

  const format_curency = (a) => {
    a = a?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    return a;
  }

  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Tên</th>
          <th scope="col">Giá sản phẩm</th>
          <th scope="col">Thương hiệu</th>
          <th scope="col">Màu sắc</th>
          <th scope="col">Số lượng</th>
          <th scope="col">Phí vận chuyển</th>
          <th scope="col">Tổng tiền</th>
        </tr>
      </thead>

      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>
              <b>{p?.product?.title}</b>
            </td>
            <td>{format_curency(p?.product?.price)} VND</td>
            <td>{p?.product?.brand}</td>
            <td>{p?.color}</td>
            <td>{p?.count}</td>
            <td>
              {p.product?.shipping === "Yes" ? (
                <CheckCircleOutlined style={{ color: "green" }} />
              ) : (
                <CloseCircleOutlined style={{ color: "red" }} />
              )}
            </td>
            <td>{format_curency(order?.paymentIntent?.amount)} VND</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const showDownloadLink = (order) => (
    <PDFDownloadLink
      document={<Invoice order={order} />}
      fileName="hóa đơn mua hàng.pdf"
      className="btn btn-sm btn-block btn-outline-primary"
    >
      Tải hóa đơn
    </PDFDownloadLink>
  );

  const showEachOrders = () =>
    orders.reverse().map((order, i) => (
      <div key={i} className="m-5 p-3 card">
        <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}
        <div className="row">
          <div className="col">{showDownloadLink(order)}</div>
        </div>
      </div>
    ));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col text-center">
          <h4>
            {orders.length > 0 ? "Đơn hàng của người dùng" : "Không có đơn hàng nào"}
          </h4>
          {showEachOrders()}
        </div>
      </div>
    </div>
  );
};

export default History;

import React from "react";

const ShowPaymentInfo = ({ order, showStatus = true }) => (
  <div>
    <p>
      <br />
      {showStatus && (
        <span className="badge bg-primary text-white">
          Trạng thái đơn hàng: {order.orderStatus}
        </span>
      )}
    </p>
  </div>
);

export default ShowPaymentInfo;

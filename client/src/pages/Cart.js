import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";

const Cart = ({ history }) => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const saveCashOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    dispatch({
      type: "COD",
      payload: true,
    });
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };

  const format_curency = (a) => {
    a = a?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    return a;
  }

  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Hình ảnh</th>
          <th scope="col">Tên</th>
          <th scope="col">Giá</th>
          <th scope="col">Thương hiệu</th>
          <th scope="col">Màu sắc</th>
          <th scope="col">Số lượng</th>
          <th scope="col">Phí vận chuyển</th>
          <th scope="col">Xóa</th>
        </tr>
      </thead>

      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Giỏ hàng / {cart.length} Sản phẩm</h4>

          {!cart.length ? (
            <p>
              Không có sản phẩm nào trong giỏ hàng. <Link to="/shop">Mời bạn tiếp tục mua sắm.</Link>
            </p>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-4">
          <h4>Tổng đơn hàng</h4>
          <hr />
          <p>Danh sách sản phẩm</p>
          {cart.map((c, i) => (
            <div key={i}>
              <p>
                {c.title} x {c.count} = {format_curency(c.price * c.count)} VND
              </p>
            </div>
          ))}
          <hr />
          Tổng tiền: <b>{format_curency(getTotal())} VND</b>
          <hr />
          {user ? (
            <>
              
              <button
                onClick={saveCashOrderToDb}
                className="btn btn-sm btn-info mt-2"
                disabled={!cart.length}
              >
                Đặt hàng
              </button>
            </>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              <Link
                to={{
                  pathname: "/login",
                  state: { from: "cart" },
                }}
              >
                Login to Checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

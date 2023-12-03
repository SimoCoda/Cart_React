import { MdDelete } from "react-icons/md";
import { BiPlus, BiMinus } from "react-icons/bi";
import {useGlobalContext} from "../context/context.jsx"
import formatNumber from "../utils/formatNumber.jsx"

const CartItem = ({ _id, name, image, price, qty, countInStock }) => {

const {deleteItem, aumentaQty, diminuisciQty} = useGlobalContext();

  const aggiungiQty = (_id) => {
    if(qty + 1 > countInStock){
      console.log("Arrivato al massimo in stock")
      return
    }
    return aumentaQty(_id)
  }

  const diminusciQty = (_id) => {
    if(qty - 1 <= 0){
      return deleteItem(_id)
    }
    return diminuisciQty(_id)
  }

  return (
    <article className="cart-item">
      <div className="img-container">
        <img src={image} alt={name} className="img" />
      </div>
      <p className="prd-name">{name}</p>
      <div className="qty-selector">
        <button className="btn icon-btn" onClick={() => aggiungiQty(_id)}>
          <BiPlus className="icon" />
        </button>
        <p>{qty}</p>
        <button className="btn icon-btn" onClick={() => diminusciQty(_id)}>
          <BiMinus className="icon minus-icon" />
        </button>
      </div>
      <p>{formatNumber(price)}</p>
      <button className="btn icon-btn">
        <MdDelete className="icon minus-icon" onClick={() => deleteItem(_id)}/>
      </button>
    </article>
  );
};

export default CartItem;

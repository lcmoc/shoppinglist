import { useEffect, useState } from "react";

import Trash from "../../assets/trash.png";

const ShoppingList = () => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState("");
  const [productEditing, setProductEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const json = localStorage.getItem("products");
    const loadedProducts = JSON.parse(json);
    if (loadedProducts) {
      setProducts(loadedProducts);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(products);
    localStorage.setItem("products", json);
  }, [products]);

  function handleSubmit(e) {
    e.preventDefault();

    const newProduct = {
      id: new Date().getTime(),
      text: product,
      completed: false,
    };
    setProducts([...products].concat(newProduct));
    setProduct("");
  }

  function deleteProduct(id) {
    let updatedProducts = [...products].filter((product) => product.id !== id);
    setProducts(updatedProducts);
  }

  function toggleComplete(id) {
    let updatedProducts = [...products].map((product) => {
      if (product.id === id) {
        product.completed = !product.completed;
      }
      return product;
    });
    setProducts(updatedProducts);
  }

  function submitEdits(id) {
    const updatedProducts = [...products].map((product) => {
      if (product.id === id) {
        product.text = editingText;
      }
      return product;
    });
    setProducts(updatedProducts);
    setProductEditing(null);
  }

  return (
    <div>
      <div className="MainContainer">
        <div className="flex items-start justify-start flex-col bg-blue-400 w-96 mt-3 rounded">
          <h1 className="text-white text-3xl p-text my-5 ml-5">Einkaufsliste</h1>
          <form onSubmit={handleSubmit} className="my-5 ml-5">
            <input type="text" onChange={(e) => setProduct(e.target.value)} value={product} className="border border-black rounded" />
            <button type="submit" className="ml-5 border border-black rounded bg-blue-500 text-white text-base p-text px-2">
              add
            </button>
          </form>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-start flex-col bg-gray-200 w-96 h-96">
          {products.map((product) => (
            <div key={product.id} className="bg-white h-16 w-5/6 shadow-xl rounded m-2 flex items-center justify-start">
              <div className="bg-gray-500 h-16 w-5 mr-5">
                {product.id === productEditing ? (
                  <button onClick={() => submitEdits(product.id)} className="bg-gray-500 h-16 w-5 mr-5"></button>
                ) : (
                  <button onClick={() => setProductEditing(product.id)} className="bg-gray-500 h-16 w-5 mr-5"></button>
                )}
              </div>
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-col justify-start items-start">
                  {product.id === productEditing ? (
                      <input type="text" onChange={(e) => setEditingText(e.target.value)} className="border border-black rounded w-32" />
                  ) : (
                      <h2 className="text-lg mt-1">{product.text}</h2>
                  )}
                </div>                
                <div className="flex flex-row justify-center items-center w-24">
                  <input type="checkbox" id="completed" checked={product.completed} onChange={() => toggleComplete(product.id)} />
                  <button onClick={() => deleteProduct(product.id)}>
                    <img src={Trash} alt="trashcan" className="ml-3 w-6"></img>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShoppingList;

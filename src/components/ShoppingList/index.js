import { useEffect, useState } from "react";

import Trash from "../../assets/trash.png";

const ShoppingList = () => {
  const [goods, setGoods] = useState([]);
  const [good, setGood] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const json = localStorage.getItem("goods");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setGoods(loadedTodos);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(goods);
    localStorage.setItem("goods", json);
  }, [goods]);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: good,
      completed: false,
    };
    setGoods([...goods].concat(newTodo));
    setGood("");
  }

  function deleteTodo(id) {
    let updatedTodos = [...goods].filter((good) => good.id !== id);
    setGoods(updatedTodos);
  }

  function toggleComplete(id) {
    let updatedTodos = [...goods].map((good) => {
      if (good.id === id) {
        good.completed = !good.completed;
      }
      return good;
    });
    setGoods(updatedTodos);
  }

  function submitEdits(id) {
    const updatedTodos = [...goods].map((good) => {
      if (good.id === id) {
        good.text = editingText;
      }
      return good;
    });
    setGoods(updatedTodos);
    setTodoEditing(null);
  }

  return (
    <div id="shopping-list">
      <div className="MainContainer">
        <div className="flex items-start justify-start flex-col bg-blue-400 w-96 mt-3 rounded">
          <h1 className="text-white text-3xl p-text my-5 ml-5">
            Einkaufsliste
          </h1>
          <form onSubmit={handleSubmit} className="my-5 ml-5">
            <input
              type="text"
              onChange={(e) => setGood(e.target.value)}
              value={good}
              className="border border-black rounded"
            />
            <button
              type="submit"
              className="ml-5 border border-black rounded bg-blue-500 text-white text-base p-text px-2"
            >
              hinzufügen
            </button>
          </form>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-start flex-col bg-gray-200 w-96 h-96">
          {goods.map((good) => (
            <div
              key={good.id}
              className="bg-white h-16 w-5/6 shadow-xl rounded m-2 flex items-center justify-start"
            >
              <div className="bg-gray-500 h-16 w-5 mr-5">
                {good.id === todoEditing ? (
                  <button
                    onClick={() => submitEdits(good.id)}
                    className="bg-gray-500 h-16 w-5 mr-5"
                  ></button>
                ) : (
                  <button
                    onClick={() => setTodoEditing(good.id)}
                    className="bg-gray-500 h-16 w-5 mr-5"
                  ></button>
                )}
              </div>
              <div className="flex flex-row justify-between w-full">
                <div className="flex flex-col justify-start items-start">
                  {good.id === todoEditing ? (
                    <>
                      <input
                        type="text"
                        onChange={(e) => setEditingText(e.target.value)}
                        className="border-b border-black rounded w-32"
                      />
                      <input
                        type="text"
                        // onChange={(e) => setEditingText(e.target.value)}
                        className="border border-black rounded w-32"
                      />
                    </>
                  ) : (
                    <>
                      <h2 className="text-lg mt-1">{good.text}</h2>
                      <h2 className="text-lg mt-1">Menge:</h2>
                    </>
                  )}
                </div>
                <div className="flex flex-row justify-center items-center w-24">
                  <input
                    type="checkbox"
                    id="completed"
                    checked={good.completed}
                    onChange={() => toggleComplete(good.id)}
                  />
                  <button onClick={() => deleteTodo(good.id)} className="ml-3">
                    <img src={Trash} alt="trashcan" className="w-6"></img>
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

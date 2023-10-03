import { useState } from "react";
import "./index.css";
// const initialItems = [
//   { id: 1, description: "Passports", quantity: 2, packed: false },
//   { id: 2, description: "Socks", quantity: 12, packed: true },
//   { id: 3, description: "clothes", quantity: 5, packed: false },
//   { id: 4, description: "charger", quantity: 8, packed: true },
// ];
function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }
  function sortedByKey(items = [], key) {
    const result = [...items.sort((a, b) => a[key] - b[key])];
    console.log({ result });
    return result;
  }

  function HandleClearAll() {
    const confirm = window.confirm("Do you want to proceed?");
    if (confirm) setItems((items) => []);
  }
  function sortedList(value) {
    console.log(value);

    const sortedBy = {
      quantity: (items) => sortedByKey(items, value),
      description: (items) => [
        ...items.sort((a, b) => a.description.localeCompare(b.description)),
      ],
      packed: (items) => sortedByKey(items, value),
    };
    setItems((items) => sortedBy[value](items));
  }

  function handleDeleteItem(id) {
    setItems((items) => [...items.filter((item) => item.id !== id)]);
  }
  function handlePackedItem(id) {
    setItems((items) => {
      const updatedItem = items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      );

      return updatedItem;
    });
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <BakingList
        items={items}
        packedItem={handlePackedItem}
        deleteItem={handleDeleteItem}
        sortedList={sortedList}
        clearAllItems={HandleClearAll}
      />

      <Stats items={items} />
    </div>
  );
}

export default App;

function Logo() {
  return <h1>🏝️Far Away💼</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  ///////////
  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };

    setDescription("");
    setQuantity(1);
    onAddItem(newItem);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>what do you want need😍for trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}
//////////////////////////////////////////////
function BakingList({
  items,
  deleteItem,
  packedItem,
  sortedList,
  clearAllItems,
}) {
  // function handleClickClear() {
  //   if (window.confirm("Do you want to proceed?")) {
  //     clearAllItems();
  //   }
  // }
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            deleteItem={deleteItem}
            packedItem={packedItem}
            item={item}
            key={item.id}
          />
        ))}
      </ul>
      <div
        className="actions"
        style={items.length <= 0 ? { display: "none" } : { display: "inline" }}
      >
        <select onChange={(e) => sortedList(e.target.value)}>
          <option value="quantity">Sort By Input Order</option>
          <option value="description"> Sort By Desciption</option>
          <option value="packed">Sort By packed Status</option>
        </select>
        <button onClick={clearAllItems}>clearAll</button>
      </div>
    </div>
  );
}
//////////////////////////////////////////////
function Item({ item, deleteItem, packedItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={(e) => {
          packedItem(item.id);
        }}
      />

      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity}
        {item.description}
      </span>
      <button onClick={() => deleteItem(item.id)}>❌</button>
    </li>
  );
}
function Stats({ items }) {
  if (!items.length)
    return (
      <div className="stats">
        <em>starting add some item </em>
      </div>
    );
  const num = items.length;
  const numberItemPacked = [...items].filter((item) => item.packed).length;
  const percentage = Math.round((numberItemPacked * 100) / num);

  return (
    <footer className="stats">
      {percentage === 100
        ? "you are ready to go"
        : ` You have ${num} item in your
      list,and you are already backed ${numberItemPacked} (${
            items.length && percentage
          }%)`}
    </footer>
  );
}

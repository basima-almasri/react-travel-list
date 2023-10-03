import { useState } from "react";
import "../index.css";
import Logo from "./Logo";
import Form from "./Form";
import BakingList from "./BakingList";
import Stats from "./Stats";
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

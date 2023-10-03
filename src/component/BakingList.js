import Item from "./Item";

//////////////////////////////////////////////
export default function BakingList({
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

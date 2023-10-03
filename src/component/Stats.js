export default function Stats({ items }) {
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

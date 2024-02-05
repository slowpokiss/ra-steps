interface props {
  items: { time: string, distance: number}[]
  onClick: (index: number) => void;
}

export default function Item({ items, onClick }: props) {
  const sortedItems = [...items].sort((a, b) => {
    const dateA = new Date(...a.time.split(".").reverse().map(Number));
    const dateB = new Date(...b.time.split(".").reverse().map(Number));
    return dateA - dateB;
  });
  
  return (
    sortedItems.map((el, ind) => (
      <div className="form-item" key={ind}>
        <div className="item-time">{el.time}</div>
        <div className="item-distance">{el.distance}</div>
        <div className="item-actions">
          <div className="action action-edit" key={ind}>&#9998;</div>
          <div className="action action-delete" onClick={() => onClick(ind)}>&#10008;</div>
        </div>
      </div>
    ))
  );
}



interface props {
  items: { time: number, distance: number}[]
  //onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onClick: (index: number) => void;
 // onClick: () => {}
}

export default function Item({ items, onClick }: props) {
  
  // const sortedItems = [...items].sort((a, b) => {
  //   let dateA = a.time.split('.');
  //   let dateB = b.time.split('.');
  //   return new Date(dateB[2], dateB[1], dateB[0]) - new Date
  // });
  
  return (
    items.map((el, ind) => (
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

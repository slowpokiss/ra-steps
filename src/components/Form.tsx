import { useRef, useState } from "react";
import { FormEvent } from "react";
import "./Form.css";
import Input from "./Input";
import Item from "./Item";

interface ItemState {
  time: string;
  distance: number;
}

export default function Form() {
  const [state, SetState] = useState<ItemState>({
    time: "20.20.2020",
    distance: 321,
  });
  const [items, SetItem] = useState([{ time: "20.20.2020", distance: 321 }]);
  const inputRef = useRef(null);

  const onChange = (ev: FormEvent<HTMLInputElement>) => {
    const el = ev.target as HTMLInputElement;
    SetState((prevData) => ({
      ...prevData,
      [el.name.split("-")[1]]:
        el.name === "input-distance"
          ? Number(el.value)
          : el.value.split("-").reverse().join("."),
    }));
  };

  const onSubmit = (ev: FormEvent<HTMLFormElement>): void => {
    ev.preventDefault();
    if (inputRef.current && isNaN(inputRef.current.value)) {
      return;
    }

    const checkDate = items.findIndex((item) => item.time === state.time);
    if (checkDate !== -1) {
      SetItem((prevItems) => {
        return prevItems.map((el, ind) => {
          if (ind === checkDate) {
            return {
              ...el,
              distance: (Number(el.distance) + Number(state.distance)).toFixed(
                3
              ),
            };
          }
          return el;
        });
      });
    } else {
      SetItem((prevItems) => [...prevItems, state]);
    }
  };

  const deleteItem = (index: number): void => {
    SetItem((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });
  };

  return (
    <>
      <div className="container">
        <div className="form-area">
          <form className="form-main" onSubmit={onSubmit}>
            <div className="form-main-item">
              <p>Дата (ДД.ММ.ГГ)</p>
              <Input classic="input-time" type={"date"} onChange={onChange} />
            </div>
            <div className="form-main-item">
              <p>Пройдено км</p>
              <Input
                classic="input-distance"
                type={"text"}
                onChange={onChange}
                ref={inputRef}
              />
            </div>
            <input
              type="submit"
              value="OK"
              className="form-input input-submit"
            />
          </form>
        </div>

        <div className="form-table">
          <div className="form-table-headers">
            <p>Дата (ДД.ММ.ГГ)</p>
            <p>Пройдено км</p>
            <p>Действия</p>
          </div>
          <div className="form-info">
            <Item items={items} onClick={deleteItem} />
          </div>
        </div>
      </div>
    </>
  );
}

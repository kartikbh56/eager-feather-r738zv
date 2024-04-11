import "./styles.css";
import { useState } from "react";
export default function App() {
  const [items, setItems] = useState([]);
  return (
    <div className="App">
      <Logo />
      <Form items={items} setItems={setItems} />
      <PackingList items={items} setItems={setItems} />
      <Stats items={items} />
    </div>
  );
}
function Logo() {
  return <h1>🌴Far Away🧳</h1>;
}
function Form({ items, setItems }) {
  const [quantity, setQuantity] = useState(1)
  const [description, setDescription] = useState('')
  return (
    <div className="add-form">
      <h3>What do you need for your trip?</h3>
      <input min={1} type="number" value={quantity} name="quantity" placeholder="Quantity" onChange={(e) => {
        setQuantity(e.target.value)
      }} />
      <input type="text" name="item" value={description} placeholder="Item" onChange={(e) => {
        setDescription(e.target.value)
      }} />
      <button onClick={() => {
        if (description) {
          setItems([...items, { quantity, description, packed: false, id: items.length > 0 ? items[items.length - 1].id + 1 : 1 }])
          setDescription(desc => '')
          setQuantity(num => 1)
        }
      }}>Add</button>
    </div>
  );
}
function PackingList({ items, setItems }) {
  let view
  const [sortBy, setSortBy] = useState('input')
  if (sortBy === 'input') {
    view = items
  }
  if (sortBy === 'desc') {
    view = items.slice().sort((a, b) => {
      return a.description.toLowerCase() < b.description.toLowerCase() ? -1 : a.description.toLowerCase() > b.description.toLowerCase() ? 1 : 0
    })
  }
  if (sortBy === 'status') {
    view = items.slice().sort((a, b) => {
      return a.packed && !b.packed ? -1 : !a.packed && b.packed ? 1 : 0
    })
  }
  return (
    <div className="list">
      <ul>
        {view.map((item) => (
          <li key={item.id}>
            <input type="checkbox" checked={item.packed} onChange={() => {
              setItems((items.map(element =>
                element.id === item.id ? { ...element, packed: !element.packed } : element
              )))
            }} />
            {item.packed ? <s>{item.quantity + ' ' + item.description}</s> : item.quantity + ' ' + item.description}
            <button onClick={() => {
              setItems(items.filter(element => element.id !== item.id))
            }}>✖️</button>
          </li>
        ))}
      </ul>
      <div className="actions">
        <select onChange={(e) => {
          setSortBy(e.target.value)
        }}>
          <option value='input'>Sort by Input value</option>
          <option value='desc'>Sort by Description</option>
          <option value='status'>Sort packing status</option>
        </select>
        <button onClick={() => {
          setItems([])
        }}>Clear list</button>
      </div>
    </div>
  );
}
function Stats({ items }) {
  const packedItems = items.filter(item => item.packed === true).length
  const totalItems = items.length
  return (
    <footer className="stats">
      {(totalItems > 0) ?
        <em> You have {totalItems} items in your list, and you already packed {packedItems}  ({Math.floor((packedItems * 100) / totalItems)}%)</em>
        : <em>Start adding some items to your packing list 🚀</em>
      }
    </footer>
  );
}

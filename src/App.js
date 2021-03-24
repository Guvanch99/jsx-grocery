import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'
const getItem = () => {
  let list = localStorage.getItem('list');
  if (list) {
    return JSON.parse(list)
  } else {
    return []
  }
}
function App() {
  const [name, setname] = useState('')
  const [list, setlist] = useState(getItem)
  const [isEditing, setisEditing] = useState(false)
  const [editID, seteditID] = useState(null)
  const [alert, setalert] = useState({ show: false, msg: '', type: 'success' })
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, 'danger', 'please enter value')
    }
    else if (name && isEditing) {
      setlist(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );

      setname('');
      seteditID(null);
      setisEditing(false);
      showAlert(true, 'success', 'value changed');

    }
    else {
      //show alert
      showAlert(true, 'success', 'item added')
      const newItem = { id: new Date().getTime().toString(), title: name }
      setlist([...list, newItem])
      setname('')
    }
  }
  const showAlert = (show = false, type = "", msg = "") => {
    setalert({ show, type, msg })
  }
  const clearList = () => {
    showAlert(true, 'danger', "item not")
    setlist([])
  }
  const removeid = (id) => {
    showAlert(true, 'danger', 'item was removed')
    const newItems = list.filter(item => item.id !== id)
    setlist(newItems)
  }
  const changer = (id) => {
    const spec = list.find(x => x.id === id)
    setisEditing(true)
    seteditID(id)
    setname(spec.title)
  }
  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])
  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} lists={list} removeAlert={showAlert} />}
        <h3>Grocery Bud</h3>
        <div className="form-control">
          <input value={name} onChange={e => setname(e.target.value)} className="grocery" placeholder="e.g eggs" type='text' />
          <button type="submit" className="submit-btn">
            {isEditing ? 'edit' : 'Submit'}
          </button>
        </div>

      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeid={removeid} editID={changer} />
          <button onClick={clearList} className="clear-btn">Clear btn</button>
        </div>)}
    </section>
  )
}

export default App

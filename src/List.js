import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({ items, removeid, editID }) => {
  return (
    <div className="grocery-list">
      {items.map((item) => {
        const { id, title } = item
        return (
          <article className="grocery-item" key={id}>
            <p className="btn-container"> {title} </p>
            <div>
              <button onClick={() => editID(id)} className="edit-btn" type="button">
                <FaEdit />
              </button>
              <button onClick={() => removeid(id)} className="delete-btn" type="button">
                <FaTrash />
              </button>
            </div>
          </article>
        )
      })}
    </div>
  )
}

export default List

import {useState} from "react"
import {useDispatch} from "react-redux"
import {
    useDeleteToDoMutation,
    useToggleIsCompletedMutation,
    useEditToDoMutation
} from "../../services/toDo"
import {editText} from "../../redux/textSlice"

const buttonStyle = {height: '20px'}

const Task = ({ID: id, title, isCompleted}) => {
    const dispatch = useDispatch()
    const [deleteToDo] = useDeleteToDoMutation()
    const [toggleIsCompleted] = useToggleIsCompletedMutation()
    const [editTask] = useEditToDoMutation()
    const [isChanged, setIsChanged] = useState(false)
    const [changedText, setChangedText] = useState(title)
    const saveChanges = (id, title) => {
        dispatch(editText({id, title}))
        setIsChanged(!isChanged)
        editTask({id, title})
    }

  return (
    <li style={{display:'flex', alignItems: 'center'}}>
      <input
          checked={isCompleted}
          onChange={() => toggleIsCompleted(id)} type="checkbox"
      />
        {isChanged ?
            <input
                value={changedText}
                onChange={(e) => setChangedText(e.target.value)}
            />
            :
            <p>{title}</p>
        }

        <button
            style={buttonStyle}
            onClick={() => deleteToDo(id)}
        >
            Delete
        </button>
      {isChanged ?
          <button
              style={buttonStyle}
              onClick={() => saveChanges(id, changedText)}
          >
              Сохранить
          </button>
          :
          <button
              style={buttonStyle}
              onClick={() => setIsChanged(!isChanged)}
          >
              Изменить
          </button>
      }
    </li>
  )
}

export default Task
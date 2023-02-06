import { useDeleteToDoMutation, useToggleIsCompletedMutation, useEditToDoMutation } from "../../services/toDo";
import {editText} from "../../redux/textSlice";
import {useState} from "react";
import { useDispatch } from "react-redux";


const Task = ({ ID: id, title, isCompleted}) => {
    const [isChanged, setIsChanged] = useState(false)
    const [deleteToDo] = useDeleteToDoMutation();
    const [toggleIsCompleted] = useToggleIsCompletedMutation();
    const dispatch = useDispatch();
    const [editTask] = useEditToDoMutation()
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
          onChange={() => toggleIsCompleted(id)} type={"checkbox"}
      />

        {!isChanged ?
            <p>{title}</p>
            :
            <input
                value={changedText}
                onChange={(e) => setChangedText(e.target.value)}
            />
        }


        <button style={{height: '20px'}} onClick={() => deleteToDo(id)}>delete</button>
      {
          !isChanged ?
          <button style={{height: '20px'}} onClick={() => setIsChanged(!isChanged)}>Изменить</button>
          :
          <button style={{height: '20px'}} onClick={() => saveChanges(id, changedText)}>Сохранить</button>
      }
    </li>
  );
}

export default Task
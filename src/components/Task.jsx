import Checkbox from "./Checkbox";
import Trash from "./Trash";

export default function Task({ task, onTaskClick, handleCheckTask, handleDeleteTask }) {


    return (
        <>
            {/*
                key={task.id} is redudant, as the key should be passed to the component at the highest
                possible level
             */}
            <li className={'task ' + (task.completed ? 'done' : '')} >
                <Checkbox onCheck={() => handleCheckTask(task.id)} status={task.completed} />
                <div className='name-area' onClick={onTaskClick}>

                    <span className="task-name" >{task.name}</span>
                </div>
                <Trash onDelete={() => handleDeleteTask(task.id)} />
            </li>
        </>
    )

}
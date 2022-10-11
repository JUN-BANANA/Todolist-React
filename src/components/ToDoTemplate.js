import '../css/ToDoTemplate.scss';//className으로 scss파일을 불러온다.

function TodoTemplate({children}) {
    return (
        <div className="TodoTemplate">
            <div className="app-title">일정관리</div>
            <div className="content">{children}</div>
        </div>
    )
}

export default TodoTemplate; 
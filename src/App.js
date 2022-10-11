import { useState, useRef, useCallback } from 'react';
import ToDoEdit from './components/ToDoEdit';
import ToDoInsert from './components/ToDoInsert';
import TodoList from './components/TodoList';
import TodoTemplate from './components/ToDoTemplate';

function App() {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [insertToggle, setInsertToggle] = useState(false);


  const nextId = useRef(4);

  const onInsertToggle = useCallback(() => {
    if (selectedTodo) {
      setSelectedTodo((selectedTodo) => null);
    }
    setInsertToggle((prev) => !prev);
  }, [selectedTodo]);

  const onChangeSelectedTodo = (todo) => {
    setSelectedTodo((selectedTodo) => todo);
  };

  const onInsert = (text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    setTodos((todos) => todos.concat(todo)); 
    nextId.current++;
  }

  const onRemove = (id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }

  const onUpdate = (id, text) => {
      onInsertToggle();
      setTodos((todos) => 
                todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)),
      );
    }

  const onToggle = (id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  }
  
  return (
    <TodoTemplate>
      <ToDoInsert onInsert={onInsert} />
      <TodoList
        todos={todos} //props
        onToggle={onToggle}
        onRemove={onRemove}
        onChangeSelectedTodo={onChangeSelectedTodo}
        onInsertToggle={onInsertToggle}
      />
      {insertToggle && (
        <ToDoEdit
          onInsert={onInsert}
          selectedTodo={selectedTodo}
          onInsertToggle={onInsertToggle}
          onUpdate={onUpdate}
          insertToggle={insertToggle}
        />
      )}
    </TodoTemplate>
  );
}

export default App;

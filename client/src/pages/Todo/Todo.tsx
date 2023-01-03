import React, { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoItem from '../../components/TodoItem/TodoItem';
import css from './Todo.module.scss';
import { BASE_URL } from '../../config';
import instance from '../../apis/axios';

interface TodoProps {
  id: string;
  title: string;
  content: string;
}

function Todo() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const handleTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const handleContent = (e: ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  useEffect(() => {
    if (token === null) navigate('/auth');
  }, []);

  const [isUpdated, setIsUpdated] = useState(false);
  const createTodo = () => {
    if (title !== '' && content !== '') {
      instance.post(`${BASE_URL}/todos`, { title, content }).then(res => {
        if (res.status === 200) {
          setIsUpdated(true);
          setTitle('');
          setContent('');
        }
      });
    } else alert('할 일을 입력해주세요!');
  };

  const [todoList, setTodoList] = useState<TodoProps[]>([]);
  useEffect(() => {
    setIsUpdated(false);
    instance.get(`${BASE_URL}/todos`).then(res => {
      if (res.status === 200) {
        setTodoList(res.data.data);
      }
    });
  }, [isUpdated]);

  return (
    <div className={css.container}>
      <div className={css.inputWrap}>
        <input
          className={css.input}
          value={title}
          onChange={handleTitle}
          placeholder="제목"
        />
        <input
          className={css.input}
          value={content}
          onChange={handleContent}
          placeholder="내용"
        />
        <button className={css.btn} onClick={createTodo}>
          추가
        </button>
      </div>
      {todoList.map(todo => {
        return (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            content={todo.content}
            setIsUpdated={setIsUpdated}
          />
        );
      })}
    </div>
  );
}

export default Todo;

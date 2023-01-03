import React, { ChangeEvent, useState } from 'react';
import css from './TodoItem.module.scss';
import { todoApi } from '../../apis/Todo/todo';

interface TodoProps {
  id: string;
  title: string;
  content: string;
  setIsUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

function TodoItem(props: TodoProps) {
  const { id, title, content, setIsUpdated } = props;

  const [newTitle, setNewTitle] = useState(title);
  const handleTitleInput = (e: ChangeEvent<HTMLInputElement>) =>
    setNewTitle(e.target.value);

  const [newContent, setNewContent] = useState(content);
  const handleContentInput = (e: ChangeEvent<HTMLInputElement>) =>
    setNewContent(e.target.value);

  const deleteTodo = () => {
    todoApi.deleteTodo(id).then(res => {
      if (res.status === 200) setIsUpdated(true);
    });
  };

  const [update, setUpdate] = useState(false);
  const updateBtn = () => {
    update ? updateTodo() : setUpdate(true);
  };

  const cancelBtn = () => {
    setUpdate(false);
    setNewTitle(title);
  };

  const updateTodo = () => {
    if (newTitle !== '' && newContent !== '') {
      todoApi
        .updateTodo(id, { title: newTitle, content: newContent })
        .then(res => {
          if (res.status === 200) {
            setIsUpdated(true);
            setUpdate(false);
          }
        });
    } else alert('할 일을 입력해주세요.');
  };

  return (
    <div className={css.container}>
      <li className={css.list}>
        <span
          className={`${css.text} ${update ? css.inline : css.inlineBlock}`}
        >
          {!update && title}
        </span>
        {update && (
          <input
            className={css.input}
            value={newTitle}
            onChange={handleTitleInput}
          />
        )}
        <br />
        <span
          className={`${css.text} ${update ? css.inline : css.inlineBlock}`}
        >
          {!update && content}
        </span>
        {update && (
          <input
            className={css.input}
            value={newContent}
            onChange={handleContentInput}
          />
        )}
      </li>
      <button className={css.updateBtn} onClick={updateBtn}>
        {update ? '제출' : '수정'}
      </button>
      {update && (
        <button className={css.cancelBtn} onClick={cancelBtn}>
          취소
        </button>
      )}
      <button className={css.deleteBtn} onClick={deleteTodo}>
        삭제
      </button>
    </div>
  );
}

export default TodoItem;

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

  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const handleUpdate = () => {
    isUpdateMode ? updateTodo() : setIsUpdateMode(true);
  };

  const cancelUpdateTodo = () => {
    setIsUpdateMode(false);
    setNewTitle(title);
  };

  const updateTodo = () => {
    if (newTitle !== '' && newContent !== '') {
      todoApi
        .updateTodo(id, { title: newTitle, content: newContent })
        .then(res => {
          if (res.status === 200) {
            setIsUpdated(true);
            setIsUpdateMode(false);
          }
        });
    } else alert('할 일을 입력해주세요.');
  };

  return (
    <div className={css.container}>
      <li className={css.list}>
        <span
          className={`${css.text} ${
            isUpdateMode ? css.inline : css.inlineBlock
          }`}
        >
          {!isUpdateMode && title}
        </span>
        {isUpdateMode && (
          <input
            className={css.input}
            value={newTitle}
            onChange={handleTitleInput}
          />
        )}
        <br />
        <span
          className={`${css.text} ${
            isUpdateMode ? css.inline : css.inlineBlock
          }`}
        >
          {!isUpdateMode && content}
        </span>
        {isUpdateMode && (
          <input
            className={css.input}
            value={newContent}
            onChange={handleContentInput}
          />
        )}
      </li>
      <button className={css.updateBtn} onClick={handleUpdate}>
        {isUpdateMode ? '제출' : '수정'}
      </button>
      {isUpdateMode && (
        <button className={css.cancelBtn} onClick={cancelUpdateTodo}>
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

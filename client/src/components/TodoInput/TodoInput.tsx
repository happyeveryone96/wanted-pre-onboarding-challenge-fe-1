import React from 'react';
import css from './TodoInput.module.scss';

interface TodoInputProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
}

function TodoInput(props: TodoInputProps) {
  const { value, onChange, placeholder } = props;
  return (
    <input
      className={css.input}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default TodoInput;

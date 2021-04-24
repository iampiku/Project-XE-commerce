import React from "react";

interface InputBoxProps {
  name: string;
  type: string;
  classType: string;
  placeholder: string;
  value: string | number | readonly string[] | undefined;
  onchangeFn: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const InputBox: React.FC<InputBoxProps> = ({
  name,
  classType,
  onchangeFn,
  placeholder,
  type,
  value,
}: InputBoxProps) => {
  return (
    <React.Fragment>
      <div>
        <label htmlFor={name} className="sr-only">
          Username
        </label>
        <input
          id={name}
          name={name}
          type={type}
          autoComplete={type}
          required
          className={classType}
          placeholder={placeholder}
          value={value}
          onChange={onchangeFn}
        />
      </div>
    </React.Fragment>
  );
};

export default InputBox;

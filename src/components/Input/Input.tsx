/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";
import Select from "react-select";

interface InputProps {
  label: string;
  name: string;
  options?: { value: string | number; label: string }[];
  control: any;
  type: "text" | "password" | "select";
  error?: any;
  onChange?: any;
  placeholder?: string;
  value?: string;
  isMultiple?: boolean;
}

function Input({ label, name, options, control, isMultiple, type, error, ...rest }: InputProps) {
  return (
    <Container>
      <>
        {label && <label htmlFor={name}>{label}</label>}
        {type == "select" && (
          <>
            <SelectInput
              name={name}
              {...rest}
              {...control.register(name)}
              options={options}
              isMulti={isMultiple}
              styles={{
                border: error ? "1px solid red" : "1px solid #ccc",
              }}
            />
          </>
        )}

        {/* {label && <label htmlFor={name}>{label}</label>} */}
        {type === "text" && (
          <>
            <InputStyle
              id={name}
              name={name}
              {...rest}
              {...control.register(name)}
              style={{
                border: error ? "1px solid red" : "1px solid #ccc",
                padding: "8px",
                width: "100%",
                boxSizing: "border-box",
              }}
            />
          </>
        )}
        {error && <span style={{ color: "red", fontSize: "12px" }}>{error?.message}</span>}
      </>
    </Container>
  );
}

export default Input;

const Container = styled.div`
  margin-bottom: 1rem;
  border: none;
`;

export const InputStyle = styled.input`
  background: #dde1e7;
  /* box-shadow: inset -5px -5px 9px rgba(255, 255, 255, 0.45), inset 5px 5px 9px rgba(94, 104, 121, 0.3); */
  border-radius: 3px !important;
  border: none;
  padding: 10px 20px;
  height: 40px;
  color: #000;
  outline: none;
  border: none;
  font-size: medium;
  &:focus {
    background: none;
    border: none;
  }
`;

export const SelectInput = styled(Select)`
  .css-13cymwt-control {
    background: #dde1e7;
    box-shadow: inset -5px -5px 9px rgba(255, 255, 255, 0.45), inset 5px 5px 9px rgba(94, 104, 121, 0.3);
  }
  padding: "8px";
  width: "100%";
  box-sizing: "border-box";
`;

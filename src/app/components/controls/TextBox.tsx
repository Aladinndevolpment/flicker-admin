import { InputHTMLAttributes } from "react";

interface ITextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  formik: any;
  id: string;
}
export default function TextInput(props: ITextInputProps) {
  const { formik, id, ...otherProps } = props;
  const fieldValue = formik.values[id];
  const error = formik.errors[id];
  const touched = formik.touched[id];

  const handleChange = (value: any) => {
    formik.handleChange(id)(value);
  };

  const handleBlur = () => {
    formik.handleBlur(id);
  };

  const classes = `block px-2 w-full rounded-md border-0 py-1.5 text-muted-foreground shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6   ${
    props.className
  }
     ${
       props.formik &&
       props.formik.errors[props.id] &&
       props.formik.touched[props.id] &&
       "ring-red-500"
     }`;

  return (
    <div>
      <label
        htmlFor={props.name}
        className="block text-sm font-medium leading-6 text-muted-foreground"
      >
        {props.label}
      </label>
      <div className="">
        <input
          {...props}
          id={props.name}
          enterKeyHint="next"
          {...otherProps}
          value={fieldValue}
          onBlur={handleBlur}
          onChange={handleChange}
          className={classes}
        />
      </div>
      {error && touched ? <p className="text-red-500">{error}</p> : null}
    </div>
  );
}

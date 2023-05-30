import { useForm, useFieldArray } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
// import { useEffect } from "react";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    // watch,
    setValue,
    control,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      social: {
        facebook: "www.example.facebook.com",
        twitter: "www.example.twitter.com",
      },
      phone: [{ number: "" }],
    },
    mode: "onTouched",
  });

  const { fields, append, remove } = useFieldArray({
    name: "phone",
    control,
  });

  const onSubmit = (data) => console.log(data);
  const onError = (errors) => {
    console.log("Form errors", errors);
  };

  const handleSetValue = () => {
    setValue("username", "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  // useEffect(() => {
  //   const subscription = watch((value, { name, type }) =>
  //     console.log(value, name, type)
  //   );
  //   return () => subscription.unsubscribe();
  // }, [watch]);

  return (
    <>
      <h1>Normal form</h1>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="form-control">
          {" "}
          <label htmlFor="">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: { value: true, message: "username is required" },
            })}
          />
          <p className="error">{errors.username?.message}</p>
        </div>

        <div className="form-control">
          {" "}
          <label htmlFor="">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: { value: true, message: "email is required" },
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email format",
              },
              validate: {
                notAdmin: (fieldValue) => {
                  return (
                    fieldValue !== "admin@example.com" ||
                    "Enter a different email address"
                  );
                },
                notBlackListed: (fieldValue) => {
                  return (
                    !fieldValue.endsWith("baddomain.com") ||
                    "This domain is not supported"
                  );
                },
              },
            })}
          />
          <p className="error">{errors.email?.message}</p>
        </div>

        <label htmlFor="">facebook</label>
        <input type="text" id="facebook" {...register("social.facebook")} />

        <label htmlFor="">twitter</label>
        <input
          type="text"
          id="twitter"
          {...register("social.twitter", { disabled: true })}
        />

        <label>List of phone numbers</label>
        <div>
          {fields.map((field, index) => (
            <div className="form-control" key={field.id}>
              <input type="text" {...register(`phone.${index}.number`)} />

              {index > 0 && (
                <button type="button" onClick={() => remove(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              append({
                number: "",
              })
            }
          >
            Add phone number
          </button>
        </div>

        <button type="button" onClick={handleSetValue}>
          Set value
        </button>
        <button disabled={!isDirty || !isValid}>submit</button>
      </form>

      <DevTool control={control} />
    </>
  );
}

import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

export default function Form() {
  const { register, handleSubmit, formState: { errors }, control } = useForm({
    defaultValues: {
      username: "",
      email: "",
      social: {
        facebook: "www.example.facebook.com",
        twitter: "www.example.twitter.com"
      }
    }
  }

  );
  const onSubmit = data => console.log(data);
  return (
    <>
      <h1>Normal form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="">Username</label>
        <input type="text" id="username" {...register("username", { required: { value: true, message: "username is required" } })} />
        <p>{errors.username?.message}</p>


        <label htmlFor="">Email</label>
        <input type="email" id="email" {...register("email", {
          required: { value: true, message: "email is required" }, pattern: { value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, message: "Invalid email format" }, validate: {
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
        })} />
        <p>{errors.email?.message}</p>

        <label htmlFor="">facebook</label>
        <input type="text" id="facebook" {...register("social.facebook")} />


        <label htmlFor="">twitter</label>
        <input type="text" id="twitter" {...register("social.twitter")} />


        <button>submit</button>
      </form>


      <DevTool control={control} />
    </>

  );
}

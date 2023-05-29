import React from "react";

const Form = () => {
  return (
    <div>
      <h1>Normal form</h1>
      <form>
        <label htmlFor="">Username</label>
        <input type="text" id="username" name="username" />
        <label htmlFor="">Email</label>
        <input type="email" id="email" name="email" />
        <button>submit</button>
      </form>
    </div>
  );
};

export default Form;

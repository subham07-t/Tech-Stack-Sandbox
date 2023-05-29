import React from "react";

const Form = () => {
  return (
    <div>
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

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function Login() {
  
const {login} = useAuth();
const navigate = useNavigate();

const [form, setForm] = useState({email: "", password: ""});

const handleChange = (e) => {
  const {name, value} = e.target;
  setForm({...form, [name]: value});
};

const handleSubmit = (e) => {
  e.preventDefault();

  if(!form.email || !form.password){
      alert("ایمیل و رمز عبور را وارد کنید.");
      return;
  }

  login({email: form.email});
  navigate("/"); 
};

 return (
    <div className="p-6 max-w-md mx-auto">

      <h1 className="text-xl font-bold mb-4">ورود</h1>

      <form className="space-y-4" 
      onSubmit={handleSubmit}>

        <input type="text" 
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="ایمیل..."
        className="w-full border rounded p-2"/>

         <input type="text" 
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="رمز عبور..."
        className="w-full border rounded p-2"/>

          <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
        >
          ورود
        </button>

      </form>

    </div>
  );

}

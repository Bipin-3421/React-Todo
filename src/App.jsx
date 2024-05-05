import React, { useEffect, useState } from "react";
import Todo from "./components/Todo";
import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  query,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase/firebase";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInputValue] = useState("");
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  const [updatedText, setUpdatedText] = useState(todos);

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unSubscribe = onSnapshot(q, (querySnapshot) => {
      const todoarr = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodos(todoarr);
    });
    return () => unSubscribe();
  }, []);

  // For adding todo in firestore
  const addTodoHandler = async () => {
    if (!input.trim()) {
      alert("Enter Valid Todo");
    } else {
      const addTodo = await addDoc(collection(db, "todos"), {
        value: input,
        completed: false,
      });
    }
    // console.log("Todo added with ID: ", addTodo.id);
    setInputValue("");
    setToggleSubmit(true);
    setIsEditItem(null);
  };

  // For deleting todo

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };

  // for updating values in todo
  // const todoReference = doc(db, "todos");
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  // For edit and update

  const updateItem = async (todo) => {
    setInputValue(todo.value);
    setToggleSubmit(false);
    setIsEditItem(todo.id);
  };

  const editItemHandler = async () => {
    if (input && !toggleSubmit) {
      await updateDoc(doc(db, "todos", isEditItem), {
        value: input,
      });
      setInputValue("");
      setToggleSubmit(true);
      setIsEditItem(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (toggleSubmit) {
      addTodoHandler();
    } else {
      editItemHandler();
    }
  };
  // // This is edit item handler
  // const editItem = (id) => {
  //   const newEditItem = todos.find((value) => {
  //     return value.id === id;
  //   });
  //   setToggleSubmit(false);
  //   setInputValue(newEditItem.value);
  //   setIsEditItem(id);
  //   console.log(newEditItem);
  // };

  // /  else if (input && !ToggleSubmit) {
  //   setTodos(
  //     todos.map((elem) => {
  //       if (elem.id === isEditItem) {
  //         return { ...elem, value: input };
  //       }
  //       return elem;
  //     })
  //   );

  return (
    <div className=" relative  w-full h-screen bg-gradient-to-r from-[#060630] to-[#495e7b] overflow-hidden   ">
      <div className=" absolute sm:w-[400px] sm:left-[22%]  left-10 top-[10%]  max-h-[500px] p-3 md:p-5 bg-fuchsia-50 shadow-xl rounded-[15px] overflow-y-auto md:left-[350px] md:w-[800px] hide-scrollbar ">
        <div>
          <div className="text-center">
            <h1 className="md:text-5xl md:mb-8 bg-[hsla(230,79%,89%,1)] text-3xl font-bold mb-4  uppercase  shadow-xl rounded-lg ">
              Todo App
            </h1>
          </div>
          <form className="flex justify-between " onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter the todo"
              onChange={(e) => setInputValue(e.target.value)}
              value={input}
              className=" flex-1 rounded-[20px] w-[150px] border-2 border-dashed border-blue-500 text-center outline-none md:text-2xl "
            />
            {toggleSubmit ? (
              <button
                disabled={!input}
                className="border-none rounded sm:rounded md:rounded-lg ml-2 md:ml-5 p-2 md:p-3 md:w-[120px] md:text-2xl bg-[#5865F2] text-slate-50 font-semibold   "
              >
                Add
              </button>
            ) : (
              <button className="border-none rounded sm:rounded md:rounded-lg ml-2 md:ml-5 p-2 md:p-3 md:w-[120px] md:text-2xl bg-[#5865F2] text-slate-50 font-semibold  ">
                Edit
              </button>
            )}
          </form>
        </div>
        <ul className="mt-[30px] md:mt-[45px] p-2">
          {todos.map((todo, index) => (
            <Todo
              todo={todo}
              key={index}
              deleteTodo={() => deleteTodo(todo.id)}
              // editItem={() => editItem(todo.id)}
              updateItem={updateItem}
              toggleComplete={toggleComplete}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;

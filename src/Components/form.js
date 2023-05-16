import {
  Box,
  Button,
  Card,
  Checkbox,
  Grid,
  Input,
  InputLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
const Form = () => {
  const [inputVal, setInputVal] = useState("");
  const [list, setList] = useState([]);

  const handleChange = (e) => {
    setInputVal(e.target.value);
  };

  const saveData = (newList) => {
    setList(newList);
    localStorage.setItem("list", JSON.stringify(newList));
  };

  const handleAdd = () => {
    const newList = [...list, { name: inputVal, isCompleted: false }];
    saveData(newList);
  };

  const handleDelete = (name) => {
    const newList = list.filter((x) => x.name !== name);
    saveData(newList);
  };

  const handleCheckbox = (value, name) => {
    const index = list.findIndex((x) => x.name === name);
    const newList = [...list];
    newList[index].isCompleted = value;
    saveData(newList);
  };

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("list"));
    if (storedList && storedList.length > 0) {
      setList(storedList);
    }
  }, []);

  return (
    <>
      <Grid container sx={{ ml: "40%", mt: "10%", p: 2 }}>
        <Card sx={{ width: 300 }}>
          <Grid item xs={12} md={6} sx={{ p: 2 }}>
            <label>
              Add Task <br />
              <input type="text" onChange={handleChange} />
            </label>
          </Grid>
          <Button onClick={handleAdd}>Add</Button>
        </Card>
      </Grid>

      <Grid md={12}>
        <Card sx={{ width: 300, ml: "41%" }}>
          <p>Incomplete Tasks : {list.filter((x) => !x.isCompleted).length}</p>
          <ul>
            {list.map((item, i) => (
              <div>
                <input
                  type="checkbox"
                  onChange={(e) => handleCheckbox(e.target.checked, item.name)}
                  checked={item.isCompleted}
                />
                <span style={{ margin: "5px 30px 20px 5px" }} key={i}>
                  {item.name}
                </span>
                <button onClick={() => handleDelete(item.name)}>X</button>
              </div>
            ))}
          </ul>
        </Card>
      </Grid>
    </>
  );
};

export default Form;

import { useEffect, useState } from "react"; //Reading list from firebase firestore
import { Typography, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import "./wtRightbar.scss";

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

// firebase에서 그대로 소스 복사해오기
import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  addDoc, //firebase 저장
  setDoc,
  doc, //list 아이템의 완료상태가 바꼈을때 Firestore 업데이트 하기
  deleteDoc, //삭제할때 Firestore 에서도 지우기
  getDocs, //Firestore 에서 list 읽어오기
  where,
  query,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUuSn7lcqeY6nczuc73eoOqXPVJC9nH_o",
  authDomain: "well-1d1a7.firebaseapp.com",
  projectId: "well-1d1a7",
  storageBucket: "well-1d1a7.appspot.com",
  messagingSenderId: "286446763260",
  appId: "1:286446763260:web:5be55e328653831709ab79",
  measurementId: "G-NVFPZ8CC3E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app); //firebase initialize

const TodoItemInputField = (props) => {
  const [date, setDate] = useState("");
  const [exercise, setExercise] = useState("");
  const [time, setTime] = useState("");
  const [sets, setSets] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const formatDate = (input) => {
    const formattedDate = input.replace(/\D/g, "");
    if (formattedDate.length >= 2 && formattedDate.length <= 4) {
      setDate(formattedDate.slice(0, 2) + "/" + formattedDate.slice(2));
    } else if (formattedDate.length > 4) {
      setDate(
        formattedDate.slice(0, 2) +
          "/" +
          formattedDate.slice(2, 4) +
          "/" +
          formattedDate.slice(4)
      );
    } else {
      setDate(formattedDate);
    }
  };

  const onSubmit = () => {
    if (!date || !exercise || !time || !sets || !content) {
      setError("Please enter all fields.");
      return;
    }

    const newTodoItem = {
      date: date,
      exercise: exercise,
      time: parseInt(time),
      sets: parseInt(sets),
      content: content,
    };

    props.onSubmit(newTodoItem);
    setDate("");
    setExercise("");
    setTime("");
    setSets("");
    setContent("");
    setError("");
  };

  return (
    <div>
      <div style={{ marginBottom: "15px", color: "red" }}>
        {error && <div>{error}</div>}
      </div>
      <TextField
        id="date-input"
        label="mm/dd/yyyy"
        variant="outlined"
        type="text"
        onChange={(e) => formatDate(e.target.value)}
        value={date}
      />
      <TextField
        id="exercise-input"
        label="Exercise"
        variant="outlined"
        onChange={(e) => setExercise(e.target.value)}
        value={exercise}
      />
      <TextField
        id="time-input"
        label="Time(minutes)"
        variant="outlined"
        type="number"
        inputProps={{ min: 0 }}
        onChange={(e) => setTime(e.target.value)}
        value={time}
      />
      <TextField
        id="sets-input"
        label="Set(s)"
        variant="outlined"
        type="number"
        inputProps={{ min: 0 }}
        onChange={(e) => setSets(e.target.value)}
        value={sets}
      />
      <TextField
        id="content-input"
        label="Write"
        variant="outlined"
        onChange={(e) => setContent(e.target.value)}
        value={content}
      />

      <Button variant="outlined" onClick={onSubmit}>
        Submit
      </Button>
    </div>
  );
};

const TodoItem = (props) => {
  const style = props.todoItem.isFinished
    ? { textDecoration: "line-through" }
    : {};
  return (
    <li>
      <span style={style} onClick={() => props.onTodoItemClick(props.todoItem)}>
        {props.todoItem.date.slice(0, 2)}
        {props.todoItem.date.slice(2, 4)}
        {props.todoItem.date.slice(4)} {props.todoItem.exercise} ({" "}
        {props.todoItem.time}minutes - {props.todoItem.sets}set(s) ){" "}
        {props.todoItem.content}
      </span>
      <Button
        variant="outlined"
        onClick={() => props.onRemoveClick(props.todoItem)}
      >
        Delete
      </Button>
    </li>
  );
};

const TodoItemList = (props) => {
  const sortedTodoItemList = props.todoItemList.sort((a, b) =>
    a.date > b.date ? -1 : 1
  );

  return (
    <div>
      <ul>
        {sortedTodoItemList.map((todoItem, index) => (
          <TodoItem
            key={index}
            todoItem={todoItem}
            onTodoItemClick={props.onTodoItemClick}
            onRemoveClick={props.onRemoveClick}
          />
        ))}
      </ul>
    </div>
  );
};

const WTRightbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [todoItemList, setTodoItemList] = useState([]);

  const syncTodoItemListStateWithFirestore = () => {
    getDocs(
      query(collection(db, "todoItem"), where("userId", "==", currentUser.uid))
    ).then((querySnapshot) => {
      const firestoreTodoItemList = [];
      querySnapshot.forEach((doc) => {
        firestoreTodoItemList.push({
          id: doc.id,
          date: doc.data().date,
          exercise: doc.data().exercise,
          time: doc.data().time,
          sets: doc.data().sets,
          content: doc.data().content,
          isFinished: doc.data().isFinished,
          userId: doc.data().userId,
        });
      });
      setTodoItemList(
        firestoreTodoItemList.sort((a, b) => (a.date > b.date ? -1 : 1))
      );
    });
  };

  useEffect(() => {
    syncTodoItemListStateWithFirestore();
  }, [currentUser]);

  const onSubmit = async (newTodoItem) => {
    await addDoc(collection(db, "todoItem"), {
      date: newTodoItem.date,
      exercise: newTodoItem.exercise,
      time: newTodoItem.time,
      sets: newTodoItem.sets,
      content: newTodoItem.content,
      isFinished: false,
      userId: currentUser.uid,
    });
    syncTodoItemListStateWithFirestore();
  };

  const onTodoItemClick = async (clickedTodoItem) => {
    const todoItemRef = doc(db, "todoItem", clickedTodoItem.id);
    await setDoc(
      todoItemRef,
      { isFinished: !clickedTodoItem.isFinished },
      { merge: true }
    );

    syncTodoItemListStateWithFirestore();
  };

  const onRemoveClick = async (removedTodoItem) => {
    const todoItemRef = doc(db, "todoItem", removedTodoItem.id);
    await deleteDoc(todoItemRef);

    syncTodoItemListStateWithFirestore();
  };

  return (
    <div className="wtRightbar">
      <Typography
        alignItems="center"
        fontWeight={700}
        sx={{ fontSize: { lg: "30px", xs: "30px" } }}
        mt="37px"
        mb="60px"
        textAlign="center"
      >
        Workout Tracker
      </Typography>
      <Typography textAlign="center" mb="50px" marginLeft="20px">
        <TodoItemInputField onSubmit={onSubmit} />
      </Typography>
      <Typography marginLeft="20px">
        <TodoItemList
          todoItemList={todoItemList}
          onTodoItemClick={onTodoItemClick}
          onRemoveClick={onRemoveClick}
        />
      </Typography>
    </div>
  );
};

export default WTRightbar;

import axios from 'axios';
import { CONFIG } from '../constants/constant';
import { User, Board, Column, Task, File } from '../typings/typings';
// Users
export async function getUsers() {
  try {
    const response = await axios.get(`${CONFIG.basicURL}/users`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${CONFIG.token}`,
      },
    });
    const {status, data} = response;
    return {status, data};
  } catch (error) {
    console.log(error)
  }
}

export async function getUserByID(id:string) {
  try {
    const response = await axios.get(`${CONFIG.basicURL}/users/${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${CONFIG.token}`,
      },
    });
    const {status, data} = response;
    return {status, data};
  } catch (error) {
    console.log(error)
  }
}

export async function deleteUser(id:string) {
  try {
    const response = await axios.delete(`${CONFIG.basicURL}/users/${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${CONFIG.token}`,
      },
    });
    const {status, data} = response;
    return {status, data};
  } catch (error) {
    console.log(error)
  }
}

export async function updateUserData(id: string, user: User) {
  try {
    const response = await axios.put(`${CONFIG.basicURL}/users/${id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${CONFIG.token}`,
      },
      data:  user,
    });
    console.log('put', response)
    const {status, data} = response;
    return {status, data};
  } catch (error) {
    console.log(error)
  }
}
// Authorization
export async function singIn(user: User) { // создание токена на нового пользователя
  try {
    const response = await axios.post(`${CONFIG.basicURL}/signin`, {
      headers: {
        Accept: 'application/json',
      },
      data:  user,
    });
    const {status, data} = response;
    return {status, data};
  } catch (error) {
    console.log(error)
  }
}

export async function singUp(user: User) { // авторизация
  try {
    const response = await axios.post(`${CONFIG.basicURL}/signup`, {
      headers: {
        Accept: 'application/json',
      },
      data:  user,
    });
    const {status, data} = response;
    return {status, data};
  } catch (error) {
    console.log(error)
  }
}

// Board
export async function getBoards() {
  try {
    const response = await axios.get(`${CONFIG.basicURL}/boards`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${CONFIG.token}`,
      },
    });
    const {status, data} = response;
    return {status, data};
  } catch (error) {
    console.log(error)
  }
}

export async function getBoardsById(id: string) {
  try {
    const response = await axios.get(`${CONFIG.basicURL}/boards/${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${CONFIG.token}`,
      }
    });
    const {status, data} = response;
    return {status, data};
  } catch (error) {
    console.log(error)
  }
}

export async function createBoards(board: Board) {
  try {
    const response = await axios.post(`${CONFIG.basicURL}/boards`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${CONFIG.token}`,
      },
      data : board,
    });
    const {status, data} = response;
    return {status, data};
  } catch (error) {
    console.log(error)
  }
}

export async function deleteBoards(id: string) {
  try {
    const response = await axios.delete(`${CONFIG.basicURL}/boards/${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${CONFIG.token}`,
      },
    });
    const {status, data} = response;
    return {status, data};
  } catch (error) {
    console.log(error)
  }
}

export async function updateBoards(id: string, board: Board) {
  try {
    const response = await axios.put(`${CONFIG.basicURL}/boards/${id}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${CONFIG.token}`,
      },
      data: board,
    });
    const {status, data} = response;
    return {status, data};
  } catch (error) {
    console.log(error)
  }
}

// Columns
export async function getAllColumns(idBoard: string) {
  try {
    const response = await axios.get(`${CONFIG.basicURL}/boards/${idBoard}/columns`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${CONFIG.token}`,
      },
    });
    const {status, data} = response;
    return {status, data};
  } catch (error) {
    console.log(error)
  }
}

export async function getColumnById(idBoard: string, idColumn: string) {
  try {
    const response = await axios.get(`${CONFIG.basicURL}/boards/${idBoard}/columns/${idColumn}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${CONFIG.token}`,
      },
    });
    const {status, data} = response;
    return {status, data};
  } catch (error) {
    console.log(error)
  }
}

export async function createColumn(idBoard: string, column: Column) {
  try {
    const response = await axios.post(`${CONFIG.basicURL}/boards/${idBoard}/columns`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${CONFIG.token}`,
      },
      data: column,
    });
    const {status, data} = response;
    return {status, data};
  } catch (error) {
    console.log(error)
  }
}

export async function deleteColumnById(idBoard: string, idColumn: string) {
  try {
    const response = await axios.delete(`${CONFIG.basicURL}/boards/${idBoard}/columns/${idColumn}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${CONFIG.token}`,
      },
    });
    const {status, data} = response;
    return {status, data};
  } catch (error) {
    console.log(error)
  }
}

export async function updateColumnById(idBoard: string, idColumn: string, column: Column) {
  try {
    const response = await axios.put(`${CONFIG.basicURL}/boards/${idBoard}/columns/${idColumn}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${CONFIG.token}`,
      },
      data: column,
    });
    const {status, data} = response;
    return {status, data};
  } catch (error) {
    console.log(error)
  }
}

// Task
export async function getAllTask(idBoard: string, idColumn: string) {
  try {
    const response = await axios.get(`${CONFIG.basicURL}/boards/${idBoard}/columns/${idColumn}/task`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${CONFIG.token}`,
      },
    });
    const {status, data} = response;
    return {status, data};
  } catch (error) {
    console.log(error)
  }
}

export async function getTaskById(idBoard: string, idColumn: string, idTask: string) {
  try {
    const response = await axios.get(`${CONFIG.basicURL}/boards/${idBoard}/columns/${idColumn}/task${idTask}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${CONFIG.token}`,
      },
    });
    const {status, data} = response;
    return {status, data};
  } catch (error) {
    console.log(error)
  }
}

export async function createTask(idBoard: string, idColumn: string, task: Task) {
  try {
    const response = await axios.post(`${CONFIG.basicURL}/boards/${idBoard}/columns${idColumn}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${CONFIG.token}`,
      },
      data: task,
    });
    const {status, data} = response;
    return {status, data};
  } catch (error) {
    console.log(error)
  }
}

export async function deleteTask(idBoard: string, idColumn: string, idTask: string) {
  try {
    const response = await axios.delete(`${CONFIG.basicURL}/boards/${idBoard}/columns/${idColumn}/task${idTask}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${CONFIG.token}`,
      },
    });
    const {status, data} = response;
    return {status, data};
  } catch (error) {
    console.log(error)
  }
}

export async function updateTask(idBoard: string, idColumn: string, idTask: string, task: Task) {
  try {
    const response = await axios.delete(`${CONFIG.basicURL}/boards/${idBoard}/columns/${idColumn}/task${idTask}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${CONFIG.token}`,
      },
      data: task,
    });
    const {status, data} = response;
    return {status, data};
  } catch (error) {
    console.log(error)
  }
}

// Uploads file
export async function getFile(idTask: string, filename: string) {
  try {
    const response = await axios.get(`${CONFIG.basicURL}/file/${idTask}/${filename}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${CONFIG.token}`,
      },
    });
    const {status, data} = response;
    return {status, data};
  } catch (error) {
    console.log(error)
  }
}

export async function uploadFile(file: File) {
  try {
    const response = await axios.post(`${CONFIG.basicURL}/file`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${CONFIG.token}`,
      },
      data: file,
    });
    const {status, data} = response;
    return {status, data};
  } catch (error) {
    console.log(error)
  }
}
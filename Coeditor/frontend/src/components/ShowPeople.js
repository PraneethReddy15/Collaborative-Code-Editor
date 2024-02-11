import React, { useState, useEffect } from "react";
import roomService from "../services/room";
import userService from "../services/user";
import "./ShowPeople.css";

function ShowPeople({ roomId, currUser, setNotification }) {
  const [currentUsers, setCurrentUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const rooms = await roomService.getRooms();

        const room = rooms.find((room) => room.roomId === roomId);
        if (room) {
          const users = await roomService.getOneRoom(room.id);

          setCurrentUsers(users);
        } else {
        }

        const allUsers = await userService.getUsers();

        setAllUsers(allUsers);
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, [roomId]);

  return (
    <div className="ShowPeople">
      <div className="currUsers-div">
        <h2 className="heading">Current Users</h2>
        <ul className="mainList">
          {[...new Set(currentUsers.users)].map((userId) => {
            const user = allUsers.find((u) => u.id === userId);
            return user ? (
              <li className="listItem" key={user.id}>
                {user.username}
              </li>
            ) : null;
          })}
        </ul>
      </div>
    </div>
  );
}

export default ShowPeople;

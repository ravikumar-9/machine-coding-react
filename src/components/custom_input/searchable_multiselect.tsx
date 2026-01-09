import React, { useRef, useState } from "react";
import Pill from "./pill";
import type { MultiselectProps, User } from "../../types";

function SearchableMultiSelect(props: MultiselectProps) {
  const {
    suggestions,
    selectedUsers,
    searchTerm,
    setSearchTerm,
    setSelectedUsers,
  } = props;
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  //here by using the set we can have the unique emails of the users which will helpful to show not selected users ony
  const [selectedUsersSet, setSelectedUsersSet] = useState(new Set());

  const handleselectedUsers = (user: User) => {
    setSelectedUsers([...selectedUsers, user]);
    setSelectedUsersSet(new Set([...selectedUsersSet, user?.email]));
    setSearchTerm("");
    // setSuggestions([]);
    inputRef?.current?.focus();
  };

  const handleRemoveUser = (user: any) => {
    const updateUsers = selectedUsers?.filter(
      (selectedUSer: any) => selectedUSer?.id !== user?.id
    );
    setSelectedUsers(updateUsers);
    const updatedUsersSet = new Set(selectedUsersSet);
    updatedUsersSet?.delete(user?.email);
    setSelectedUsersSet(updatedUsersSet);
  };

  const handleKeyDown = (e: any) => {
    if (
      e.key === "Backspace" &&
      selectedUsers?.length > 0 &&
      e.target.value === ""
    ) {
      const lastuser = selectedUsers[selectedUsers?.length - 1];
      handleRemoveUser(lastuser);
    } else if (e.key === "ArrowDown" && suggestions?.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prevIndex) =>
        prevIndex < suggestions?.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp" && suggestions?.length > 0) {
      e.preventDefault();
      setActiveSuggestion((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
    } else if (
      e.key === "Enter" &&
      activeSuggestion >= 0 &&
      activeSuggestion < suggestions?.length
    ) {
      handleselectedUsers(suggestions[activeSuggestion]);
    }
  };

  return (
    <div className="flex relative p-4">
      <div className="border border-slate-400 rounded-2xl focus:outline-0 w-full p-2 flex gap-2 items-center flex-wrap">
        {/* Pill */}
        {selectedUsers?.map((user: any) => (
          <Pill
            key={user?.email}
            image={user?.image}
            text={`${user?.firstName} ${user?.lastName}`}
            onClick={() => handleRemoveUser(user)}
          />
        ))}
        <div>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            className="focus:outline-0"
            ref={inputRef}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <ul className="max-h-80 list-none absolute border border-t-0 border-slate-300 overflow-y-scroll mt-2 z-10 w-64 bg-white shadow-md rounded-b-lg">
            {suggestions?.map((user: any, index: number) =>
              !selectedUsersSet?.has(user?.email) ? (
                <li
                  key={user?.email}
                  className={
                    activeSuggestion === index
                      ? "flex items-center gap-3 border-b border-b-gray-300 last:border-b-0 bg-slate-200 p-2 cursor-pointer"
                      : "flex items-center gap-3 border-b border-b-gray-300 last:border-b-0 hover:bg-slate-200 p-2 cursor-pointer"
                  }
                  onClick={() => handleselectedUsers(user)}
                >
                  <img
                    src={user?.image}
                    alt={`${user?.firstName} ${user?.lastName}`}
                    className="h-10 w-10"
                  />
                  <span>{`${user?.firstName} ${user?.lastName}`}</span>
                </li>
              ) : (
                <></>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default React.memo(SearchableMultiSelect);

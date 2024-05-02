import React, { useEffect, useState } from 'react';

const Home = () => {
    const [todoList, setTodoList] = useState([]);
    const [newEntry, setNewEntry] = useState('');

    const generateId = function(){
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    };

    const handleAddEntry = async () => {
        const response = await fetch('/todo', {
            method: "POST",
            body: JSON.stringify({
                id: generateId(),
                content: newEntry,
                status: 'PENDING',
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            return res.json();
        });
        setTodoList(response);
        setNewEntry('');
    };

    const handleMarkComplete = async (id) => {
        const selectedEntry = todoList.find((entry) => entry.id === id);
        const response = await fetch(`todo/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                ...selectedEntry,
                status: 'COMPLETE',
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((res) => {
            return res.json();
        });
        setTodoList(response);
    };

    useEffect(() => {
        const getTodoList = async () => {
            const response = await fetch('/todo').then((res) => {
                return res.json();
            });
            setTodoList(response);
        }
        getTodoList();
    }, []);

    return (
        <div>
            <div>
                <input type="text" id="entry" value={newEntry} onChange={(e) => setNewEntry(e.target.value)} />
                <button onClick={handleAddEntry}>Add</button>
            </div>
            {todoList?.map((todoItem) => {
                const { id, content, status } = todoItem;
                return (
                    <div key={id}>
                        {content} ({status})
                        <button onClick={() => handleMarkComplete(id)}>Complete</button>
                    </div>
                );
            })}
        </div>
    );
};

export default Home;
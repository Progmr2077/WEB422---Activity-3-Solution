import { useState, useEffect } from "react";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  };

  const addUser = async () => {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    if (res.ok) {
      fetchUsers();
      setName("");
      setEmail("");
    }
  };

  const updateUser = async () => {
    if (!editingUser) return;

    const res = await fetch(`/api/users?id=${editingUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    if (res.ok) {
      fetchUsers();
      setName("");
      setEmail("");
      setEditingUser(null);
    }
  };

  const deleteUser = async (id) => {
    await fetch(`/api/users?id=${id}`, { method: "DELETE" });
    fetchUsers();
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>User Management</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: "8px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "8px", fontSize: "16px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        {editingUser ? (
          <button 
            onClick={updateUser} 
            style={{ padding: "10px", fontSize: "16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Update User
          </button>
        ) : (
          <button 
            onClick={addUser} 
            style={{ padding: "10px", fontSize: "16px", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Add User
          </button>
        )}
      </div>

      <ul style={{ listStyle: "none", padding: "0" }}>
        {users.map((user) => (
          <li 
            key={user.id} 
            style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              padding: "10px", 
              border: "1px solid #ddd", 
              borderRadius: "5px", 
              marginBottom: "10px" 
            }}
          >
            <div>
              <strong>{user.name}</strong> <br />
              <small>{user.email}</small>
            </div>
            <div>
              <button 
                onClick={() => {
                  setName(user.name);
                  setEmail(user.email);
                  setEditingUser(user);
                }} 
                style={{ marginRight: "5px", padding: "5px 10px", fontSize: "14px", backgroundColor: "#ffc107", color: "black", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                Edit
              </button>
              <button 
                onClick={() => deleteUser(user.id)} 
                style={{ padding: "5px 10px", fontSize: "14px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
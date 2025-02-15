// pages/api/users.js
let users = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" }
  ];
  
  export default function handler(req, res) {
    const { method } = req;
    const { id } = req.query;
  
    switch (method) {
      case "GET":
        res.status(200).json(users);
        break;
  
      case "POST":
        const newUser = { id: Date.now(), ...req.body };
        users.push(newUser);
        res.status(201).json(newUser);
        break;
  
      case "PUT":
        const index = users.findIndex((user) => user.id === parseInt(id));
        if (index !== -1) {
          users[index] = { ...users[index], ...req.body };
          res.status(200).json(users[index]);
        } else {
          res.status(404).json({ message: "User not found" });
        }
        break;
  
      case "DELETE":
        users = users.filter((user) => user.id !== parseInt(id));
        res.status(204).end();
        break;
  
      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  }
  
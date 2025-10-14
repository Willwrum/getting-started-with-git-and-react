// backend.js
import express from "express";
import cors from "cors";
import userServices from "./user-services.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", (req, res) => {
  try {
    const name = req.query.name;
    const job = req.query.job;
    const users = await userServices.getUsers(name, job);
    res.status(200).json({users_list: users});
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.get("/users/:id", (req, res) => {
  try {
    const id = req.params.id;
    const user = await userServices.findUserById(id);
    if (!user) {
      res.status(404).send("Resource not found.");
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.post("/users", (req, res) => {
  try {
    const {name, job} = req.body;
    if (!name || !job) {
      return res.status(400).send("Missing name or job.");
    }
    const newUser = await userServices.addUser({name, job});
    res.status(201).json(newUser);
  } catch(error) {
    res.status(400).send(error.message);
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await userServices.deleteUserById(id);
    if (!deleted) {
      return res.status(404).send("User not found.");
    }
    res.status(204).send();
  } catch(error) {
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

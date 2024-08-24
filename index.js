import express from "express";
const app = express();
const PORT = 3400;
app.use(express.json());

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://iwpjfdfkjswfurssfiur.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml3cGpmZGZranN3ZnVyc3NmaXVyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNDQwNTczNCwiZXhwIjoyMDM5OTgxNzM0fQ.SXzBjVv82GeKpAlvC1VNF6RF0DF7lIUN77VXFzZWcbQ";
const db = createClient(supabaseUrl, supabaseKey);

// respond with "hello world" when a GET request is made to the homepage
app.get("/", async (req, res) => {
  const getData = await db.from("user").select();
  console.log(getData);
  res.json({ getData });
});
app.post("/", async (req, res) => {
  const { usernama, noHP, email } = req.body;
  const insertData = await db.from("user").insert({ usernama, noHP, email });
  console.log("~ app.post ~ insertData:", insertData);
  res.json({ insertData });
});
app.get("/digiWUH/daftar", async (req, res) => {
  const { usernama, noHP, email } = req.body;
  const getData = await db.from("user").select(usernama, noHP, email);
  console.log(getData);
  res.json({ getData });
});
app.post("/digiWUH/daftar", async (req, res) => {
  const { usernama, noHP, email, password } = req.body;
  const insertData = await db
    .from("user")
    .insert({ usernama, noHP, email, password });
  console.log("~ app.post ~ insertData:", insertData);
  res.send("Berhasil");
});
app.listen(3400, function () {
  console.log("Example app listening on port 3400!");
});

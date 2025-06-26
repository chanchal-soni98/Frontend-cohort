export const createUser = (req, res) => {
  const { name, role, phone, email, password } = req.body;
  res.json({ name, role, phone, email, password });
};

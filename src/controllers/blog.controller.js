import { pool } from "../db.js";

export const getDatasBlog = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Blog");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getDataBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM Blog WHERE id=?", [
      req.params.id,
    ]);

    if (rows.length <= 0)
      return res.status(404).json({
        message: "Data no found",
      });

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const CreateDataBlog = async (req, res) => {
  const {
    Title,
    Description,
    MainImageURL,
    Content,
    Tags,
    Category,
    AuthorID,
  } = req.body;
  try {
    const [rows] = await pool.query(
      "INSERT INTO Blog (Title, Description, MainImageURL, Content, Tags, Category, AuthorID) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [Title, Description, MainImageURL, Content, Tags, Category, AuthorID]
    );
    res.send({
      id: rows.insertId,
      Title,
      Description,
      MainImageURL,
      Content,
      Tags,
      Category,
      AuthorID,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const DeleteDataBlog = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM Blog WHERE id=?", [
      req.params.id,
    ]);
    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: "Data no found" });
    }
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const updateDataBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      Title,
      Description,
      MainImageURL,
      Content,
      Tags,
      Category,
      AuthorID,
    } = req.body;

    const [result] = await pool.query(
      "UPDATE Blog SET Title = IFNULL(?, Title), Description = IFNULL(?, Description), MainImageURL= IFNULL(?, MainImageURL),Content = IFNULL(?, Content), Tags= IFNULL(?, Tags), Category= IFNULL(?, Category), AuthorID= IFNULL(?, AuthorID)  WHERE id = ?",
      [Title, Description, MainImageURL, Content, Tags, Category, AuthorID, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "data not found" });

    const [rows] = await pool.query("SELECT * FROM Blog WHERE id = ?", [id]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

import { pool } from "../db.js";

// Función asíncrona para obtener los blogs con información de los autores
export const getBlogsWithAuthors = async (req, res) => {
  try {
    // Realiza la consulta SQL que combina la información de los blogs y los autores
    const query = `
      SELECT 
        b.PostID,
        b.Title,
        b.Description AS BlogDescription,
        b.MainImageURL,
        b.Content,
        b.Tags,
        b.Category,
        b.Date AS PostDate,
        a.AuthorID,
        a.Name AS AuthorName,
        a.LinkedIn AS AuthorLinkedIn,
        a.Description AS AuthorDescription,
        a.PhotoURL AS AuthorPhotoURL
      FROM 
        Blog b
      JOIN 
      Autores a ON b.AuthorID = a.AuthorID
    `;

    // Ejecutar la consulta SQL y obtener el resultado
    const [rows] = await pool.query(query);

    // Devolver el resultado como JSON
    res.json(rows);
  } catch (error) {
    // Manejar los errores
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Obtener todos los blogs
export const getDatasBlog = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Blog");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

// Obtener un blog por su ID
export const getDataBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const [blogRows] = await pool.query("SELECT * FROM Blog WHERE PostID=?", [
      req.params.id,
    ]);

    if (blogRows.length <= 0)
      return res.status(404).json({
        message: "Data not found",
      });

    const [authorRows] = await pool.query(
      "SELECT * FROM Authors WHERE AuthorID=?",
      [blogRows[0].AuthorID]
    );

    if (authorRows.length <= 0)
      return res.status(404).json({
        message: "Author data not found",
      });

    const blogData = {
      ...blogRows[0],
      author: authorRows[0],
    };

    res.json(blogData);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

// Crear un nuevo blog
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

// Eliminar un blog por su ID
export const DeleteDataBlog = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM Blog WHERE PostID=?", [
      req.params.id,
    ]);
    if (result.affectedRows <= 0) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

// Actualizar un blog por su ID
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
      "UPDATE Blog SET Title = IFNULL(?, Title), Description = IFNULL(?, Description), MainImageURL = IFNULL(?, MainImageURL), Content = IFNULL(?, Content), Tags = IFNULL(?, Tags), Category = IFNULL(?, Category), AuthorID = IFNULL(?, AuthorID) WHERE PostID = ?",
      [Title, Description, MainImageURL, Content, Tags, Category, AuthorID, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Data not found" });

    const [rows] = await pool.query("SELECT * FROM Blog WHERE PostID = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

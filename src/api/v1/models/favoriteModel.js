import pool from "../../../../config/database/connection.js";

// verify an existing favorite
const existingFavorite = async (id_user, id_product) => {
  const SQLquery = {
      text: "SELECT * FROM favorites WHERE id_user = $1 AND id_product = $2",
      values: [id_user, id_product],
  };
  try {
      const response = await pool.query(SQLquery);
      return response.rows.lenght > 0;
  } catch (error) {
      throw new Error("Error finding favorite: " + error.message);
  }
};

// add product as favorite
const addFavorite = async (id_user, id_product) => {
  const SQLquery = {
      text: "INSERT INTO favorites (id_user, id_product) VALUES ($1, $2)",
      values: [id_user, id_product],
  };
  try {
      await pool.query(SQLquery);
      return { success: true, message: "Favorite added successfully"};
  } catch (error) {
      throw new Error("Error adding favorite: " + error.message);
  }
};


const removeFavorite = async (id_user, id_product) => {
    const SQLquery = {
        text: "DELETE FROM favorites WHERE id_user =$1 AND id_product = $2",
        values: [id_user, id_product],
    };
    try {
        await pool.query(SQLquery);
        return { success: true, message: "Favorite removed successfully"};
    } catch (error) {
        throw new Error("Error updating favorite: " + error.message);
    }
};

export const favoriteModel = { existingFavorite, addFavorite, removeFavorite };

/*
::editFavorite()


request
{
  "favorite": {
    "id_user": 1,
    "id_product": 1
  }
}

response
{
  "id_user": 1,
  "id_product": 1
}
*/

const db = require('../../config/db')
const fs = require('fs')

module.exports ={
    create(filename, path, product_id  ) {
        const query = `
            INSERT INTO file(
            name,
            path,
            product_id    
            )VALUE ($1, $2, $3)
            RETURNING.id
         `

        const valeus = [
               
            filename,
            path,
            product_id
          ]

          return db.query(query, values)
    },

    async delete(id) {
        try {
          const result = await db.query(`SELECT * FROM files WHERE id = $1`, [id])
          const file = result.rows[0]

          fs.unlinkSync(file.path)

          return db.query(`
              DELET FROM files WHERE id = $1
          `), [id]

        }catch(err){
            console.error(err)
        }
    }
}
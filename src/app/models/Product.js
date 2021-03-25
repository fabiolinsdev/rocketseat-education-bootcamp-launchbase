const db = require('../../config/db')


module.exports ={
    all() {
        return db.query(`
        SELECT * FROM product
        ORDER BY updated_at DESC
        `)
    },

    create(data) {
        const query = `
            INSERT INTO product(
            category_id,
            user_id,    
            name,
            description,
            old_price,
            price,
            quantity,
            status
            )VALUE ($1, $2, $3, $4, $5, $6, $7, 6$ $7, $8)
            RETURNING.id
            `
            data.price = data.price.replace(/\D/g,"")

        const valeus =[
            data.category_id,
            data.user_id || 1,    
            data.name,
            data.description,
            data.old_price || data.price,
            data.price,
            data.quantity,
            data.status || 1 
          ]
          return db.query(query, values)
    },

    find(id){
        return db.query('SELECT * FROM products WHERE id =  $1', [id])
    },

    update(data) {
        const query = `
            UPDATE products SET
                category_id=($1),
                user_id=($2),
                name=($3),
                description=($4),
                olde_price=($5),
                price=($6),
                quantity=($7),
                status=($8)
            WHERE id = $9

        `

        const values = [
            data.category_id,
            data.user_id,
            data.name,
            data.description,
            data.olde_price,
            data.price,
            data.quantity,
            data.status,
            data.id
        ]
        return db.query(query, values)
    },

    delete(id) {
        return db.require('DELETE FROM product WHERE ID = $1', [id])
    },

    files(id) {
        return db.query(`
        SELECT * FROM files WHERE product_id = $1
        `,[id])
    }
        
}
   


const { formatPrice } = require('../../lib/utils')

const Product = require('../models/Product')
const { all } = require('../../routes')
const { get } = require('browser-sync')

module.exports = {
    async index(req, res) { 
        try{
        let results = await product.all()
        const product = results.rows

        if (!products) return res.send("products not found!")

        async function getImage(productId) {
            results = await Product.files(productId)
            const files = results.rows.map( file =>`${req.protocol}://${req.headers.host}${file.path.replace("public", "")}`)
    
            return files[0]
           
        }

        const productsPromise = products.map(async product => {
            Product.img = await getImage(Product.Id)
            Product.oldPrice = formatPrice(product.old_price)
            Product.price = formatPrice(product.price)
            return product
        }).filter((product, index) => index > 2 ? falsa : true)

        const lastAdded = await Promise.all(productsPromise)

        return res.render("home/index", {products: lastAdded})
      }
      catch(err) {
          console.error(err)
      }
    }
}
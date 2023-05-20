const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const bodyParser = require('body-parser');

router.use(bodyParser.json());

async function readProducts() {
  try {
    const data = await fs.readFile('./public/data/products.json', 'utf8');
    return JSON.parse(data).product_data;
  } catch (error) {
    console.error('Error reading products file', error);
    throw error;
  }
}

router.post('/api/products', async (req, res) => {
  try {
    const products = await readProducts();

    const newProduct = req.body;

    const requiredKeys = ['brand', 'description', 'id', 'image', 'list_price', 'name', 'country', 'year', 'category', 'price', 'url'];
    const missingKeys = requiredKeys.filter((key) => !(key in newProduct));

    if (missingKeys.length > 0) {
      return res.status(400).json({ message: `Missing attributes: ${missingKeys.join(', ')}`});
    }

    products.push(newProduct);

    await fs.writeFile('./public/data/products.json', JSON.stringify({ products }));

    res.json(newProduct);
  } catch (error) {
    console.error('Error adding new product', error);
    res.status(500).json({ message: 'Error adding new product'});
  }
});



router.get('/api/products', async (req, res) => {
  const { ...filterAttributes } = req.query;

  if (filterAttributes.year && Array.isArray(filterAttributes.year)) {
    return res.json([]);
  }

  try {
    const products = await readProducts();

    const filteredProducts = products.filter((wine) => {
      for (let [key, value] of Object.entries(filterAttributes)) {
        if(typeof wine[key] === 'undefined') {
          return false;
        }
        if (key === 'year') {
          if (wine.year !== parseInt(value, 10)) {
            return false;
          }
        } else if (typeof wine[key] === 'number') {
          if (wine[key] !== parseInt(value, 10)) {
            return false;
          }
        } else if (typeof wine[key] === 'string') {
          if (!wine[key].toLowerCase().includes(value.toLowerCase())) {
            return false;
          }
        } else {
          // unsupported type
          return false;
        }
      }
      return true;
    });

    if (filteredProducts.length === 0) {
      return res.status(404).json({ message: 'Product not found'});
    }

    res.json(filteredProducts);
  } catch (error) {
    console.error('Error filtering products', error);
    res.status(500).json({ message: 'Error filtering products'});
  }
});

router.get('/api/products/:attribute', async (req, res) => {
  try {
    const products = await readProducts();
    
    const attribute = req.params.attribute;
    
    if (!products || !attribute) {
      return res.status(400).json({ message: 'Missing products or attribute parameter.'})
    }
    
    const attributesSet = new Set();
    
    for (let product of products) {
      if (product[attribute]) {
        attributesSet.add(product[attribute]);
      }
    }
    
    if (attributesSet.size === 0) {
      return res.status(404).json({ message: `No ${attribute} found.`});
    }
    
    res.json([...attributesSet]);
  } catch(error) {
    console.error('Error getting attribute values', error);
    res.status(500).json({ message: 'Error getting attribute values'});
  }
});


module.exports = router;

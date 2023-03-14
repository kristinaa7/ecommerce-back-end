const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  try {
  const productData = await Product.findAll({
    include: [{
      model: Category
    },
    {
      model: Tag,
      through: ProductTag,
    },
    ]
  });

  res.status(200).json(productData);
} catch (err) {
  console.log(err);
  res.status(500).json(err);
}
});

// get one product
router.get('/:id',  (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
 Product.findOne({
    where: {
      id: req.params.id,
    },
    include: [ Category,
    {
      model: Tag,
      through: ProductTag,
    },
    ]})

 .then((products) => res.json(products)) 
 .catch((err) => {
  console.log(err);
  res.status(400).json(err);
});
});

// create new product
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
 try {
  const userData = await Product.create(req.body)
  res.status(200).json(categoryData);
} catch (err) {
  res.status(400).json(err);
}
});

// update product
router.put('/:id', async (req, res) => {
  // update product data
  try {
  const userData = await Product.update(req.body, {
    where: {
      id: req.params.id,
    }
  });
  
  if (!userData) {
    res.status(404).json({ message: 'No product with this id!' });
    return;
  }
  res.status(200).json(userData);
} catch (err) {
  res.status(500).json(err);
}
});
  

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const productData = await Product.destroy({
    where: {
      id: req.params.id,
    },
  });

  if (!productData) {
    res.status(404).json({ message: 'No product with this id!' });
    return;
  }
  res.status(200).json(productData);
} catch (err) {
  res.status(500).json(err);
}
});

module.exports = router;

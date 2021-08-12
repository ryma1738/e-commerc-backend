const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    include: [{
      model: Product,
      required: false
    }]
  }).then((data) => {
    res.status(200).json(data);
  }).catch((err) => {
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: Product,
      required: false
    }]
  }).then((data) => {
    if (!data) {
      res.status(404).json({message: 'Tag not found!'})
    }
    res.status(200).json(data);
  }).catch((err) => {
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body).then((data) => {
    res.status(200).json(data);
  }).catch((err) => {
    res.status(500).json(err)
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(data => {
    if (!data) {
      res.status(404).json({ message: 'No tag found with this id' });
      return;
    }
    res.json({message: 'Tag updated Successfully!'});
  }).catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.status(200).json({message: 'Deleted Successfully'});
  }).catch((err) => {
    res.status(500).json(err);
  });
});

module.exports = router;

const items =[
  { "id": 1, "name":  "Omena" },
  { "id": 2, "name": "Banaani" },
  { "id": 3, "name": "Kiivi" },
  { "id": 4, "name": "Appelsiini" },
];

const getItems = (req, res) => {
  res.json(items);
};

const addItem = () => {
  console.log('addItem request body', req.body);
  if (req.body.name) {
    const latestID = items[3].id

    const newItem = {id: latestID + 1, name: req.body.name};
    items.push(newItem);
  };
  res.status(201);
  res.json({message: 'Item added'});
};

// TODO: add getById, post, put & delete

export{getItems, addItem};

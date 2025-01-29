const items =[
  { "id": 1, "name":  "Omena" },
  { "id": 2, "name": "Banaani" },
  { "id": 3, "name": "Kiivi" },
  { "id": 4, "name": "Appelsiini" },
];

const getItems = (req, res) => {
  res.json(items);
};

// itemin lisääminen
const addItem = (req, res) => {
  console.log('addItem request body', req.body);
  if (req.body.name) {
    const latestID = items[items.length - 1].id

    const newItem = {id: latestID + 1, name: req.body.name};
    items.push(newItem);

    res.status(201);
    return res.json({message: 'Item added'});
  };
  res.status(400);
  return res.json({message: 'Request is missing name property!'});
};

// itemin haku id:llä
const getItemById = (req, res) => {
  console.log('getItemById', req.params.id);
  const item = items.find(item => item.id == req.params.id);
  console.log('item found', item);
  if (item){
    res.json(item);
  } else {
    res.status(404).json({message: 'Item not found'});
  }
};


// TODO viikko 2: put & delete endpoints (pal. 29.1.2025)
const putItem = (req, res) => {
  console.log('putItem', req.params.id);
  const item = items.find(item => item.id == req.params.id);
  console.log('item found', item);
  if (item){
    item.name = req.body.name;
    res.json({message: 'Item updated'});
  } else {
    res.status(404).json({message: 'Item not found'});
  }
};

// itemin poisto id:n perusteella
const deleteItem = (req, res) => {
  console.log('deleteItem', req.params.id);
  const index = items.findIndex((item) => item.id == req.params.id);
  // findIndex returns -1 if item is not found
  if (index !== -1) {
    items.splice(index, 1);
    res.json({message: 'Item deleted.'});
  } else {
    res.status(404).json({message: "Item not found"});
  }
};


export{getItems, addItem, getItemById, putItem, deleteItem};

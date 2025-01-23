const items =
  [{ "id": 1, "name":  "Omena" },
  { "id": 2, "name": "Banaani" },
  { "id": 3, "name": "Kiivi" }
  { "id": 4, "name": "Appelsiini" }];

  const getItems = (req, res) => {
    res.json(items);
  };

  // TODO: add getById, post, put & delete

  export{getItems};

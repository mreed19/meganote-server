var router = require('express').Router();

// READ all notes
router.get('/', function(req, res) {
  res.json(req.user.notes);
});

// READ one note
router.get('/:id', function(req, res) {
  res.json(req.user.notes.id(req.params.id));
});

// CREATE a note
router.post('/', function(req, res) {
  var payload;
  if (req.body.note) { payload = req.body.note; }
  else { payload = req.body }
  var note = req.user.notes.create({
    title: payload.title,
    body_html: payload.body_html
  });

  req.user.notes.push(note);

  req.user.save().then(() => res.json(note));
});

// UPDATE a note
router.put('/:id', function(req, res) {
  var payload;
  if (req.body.note) { payload = req.body.note; }
  else { payload = req.body }
  var note = req.user.notes.id(req.params.id);
  note.title = payload.title;
  note.body_html = payload.body_html;
  note.updated_at = Date.now();
  req.user.save().then(() => res.json(note));
});

// DELETE a note
router.delete('/:id', function(req, res) {
  var note = req.user.notes.id(req.params.id);
  note.remove();

  req.user.save().then(() => res.json(note));
});

module.exports = router;

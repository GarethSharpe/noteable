// routes/note_routes.js

var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {

  app.get('/notes/:id', (request, result) => {
  	const id = request.params.id;
  	if (!id) return;
  	const details = { '_id': new ObjectID(id) };
    db.collection('notes').findOne(details, (error, note) => {
      if (error)
        result.send({'error':'An error has occurred'});
      else
        result.send(note);
    }); 
  });

	app.post('/notes/', (request, response) => {
	    const note = { 
	    	text: request.query.body, 
	    	title: request.query.title
	    };
	    if (!request.query.body && !request.query.title) return;
	    db.collection('notes').insert(note, (error, result) => {
	    if (error)
        response.send({ 'error': 'An error has occurred' }); 
      else
        response.send(result.ops[0]);
    });
  });

  app.delete('/notes/:id', (request, result) => {
  	const id = request.params.id;
  	if (!id) return;
  	const details = { '_id': new ObjectID(id) };
    db.collection('notes').remove(details, (error, note) => {
      if (error)
        result.send({'error':'An error has occurred'});
      else
        res.send('Note ' + id + ' deleted!');
    }); 
  });

  app.put('/notes/:id', (request, result) => {
    const id = request.params.id;
    if (!id) return;
    const details = { '_id': new ObjectID(id) };
    const note = { text: request.body.body, title: request.body.title };
    db.collection('notes').update(details, note, (error, result) => {
      if (error)
          result.send({'error':'An error has occurred'});
      else
          result.send(note);
    });
  });

}

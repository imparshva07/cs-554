//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getPeople() function in the /data/data.js file to return the list of people.  You can also import your getPersonById(id) function and call it in the :/id route.
import {Router} from 'express';
const router = Router();
import {getPeople, getPersonById} from '../data/data.js';

router.route('/')
.get(async (req, res) => {
    try {
      const peopleList = await getPeople();
      return res.json(peopleList);
    } catch (e) {
      return res.status(500).send(e);
    }
  })
  .post(async (req, res) => {
    return res.send('POST request to http://localhost:3000/people');
  })
  .delete(async (req, res) => {
    return res.send('DELETE request to http://localhost:3000/people');
  })
  .put(async (req, res) => {
    return res.send('PUT request to http://localhost:3000/people');
  })
  .patch(async (req, res) => {
    return res.send('PATCH request to http://localhost:3000/people');
  });;  
// Implement GET Request Method and send a JSON response  See lecture code!



router.route('/:id')
.get(async (req, res) => {
    if(!(req.params.id)) throw ('Error : id param missing from GET request to http://localhost:3000/people/:id');
    let id = req.params.id;
    if(typeof id !== 'string') throw('Error : type of id must be a string');
    id = id.trim();
    if(id.length === 0) throw('Error : id can not be just an empty string');
    try {
      const people = await getPersonById(id);
      if(people.length === 0) {
        return res.status(404).json('Person Not Found!');
      }
      return res.json(people);
    } catch (e) {
      return res.status(404).json(e);
    }
  })
  .post(async (req, res) => {
    return res.send(
      `POST request to http://localhost:3000/people/${id}`
    );
  })
  .delete(async (req, res) => {
    return res.send(
      `DELETE request to http://localhost:3000/people/${id}`
    );
  })
  .patch(async (req, res) => {
    return res.send(
      `PATCH request to http://localhost:3000/people/${id}`
    );
  });
// Implement GET Request Method and send a JSON response See lecture code!

export default router;

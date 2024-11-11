//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/routes

//You can import your getComapnies() function in the /data/data.js file 3 to return the list of comapnies and call it in the /companies route.  You can also import your getComapny(id) function and call it in the :/id route.
import express from 'express';
const router = express.Router();
import {getCompanies, getCompanyById} from '../data/data.js'

router.route('/')
.get(async (req, res) => {
    try {
      const companiesList = await getCompanies();
      return res.json(companiesList);
    } catch (e) {
      return res.status(500).send(e);
    }
  })
  .post(async (req, res) => {
    return res.send('POST request to http://localhost:3000/companies');
  })
  .delete(async (req, res) => {
    return res.send('DELETE request to http://localhost:3000/companies');
  })
  .put(async (req, res) => {
    return res.send('PUT request to http://localhost:3000/companies');
  })
  .patch(async (req, res) => {
    return res.send('PATCH request to http://localhost:3000/companies');
  });
// Implement GET Request Method and send a JSON response See lecture code!

router.route('/:id')
.get(async (req, res) => {
 
  if(!(req.params.id)) throw ('Error : id param missing from GET request to http://localhost:3000/companies/:id');
  let id = req.params.id;
  if(typeof id !== 'string') throw('Error : type of id must be a string');
  id = id.trim();
  if(id.length === 0) throw('Error : id can not be just an empty string');  
    try {
      const company = await getCompanyById(id);
      if(company.length === 0) {
        return res.status(404).json('Company Not Found!');
      }
      return res.json(company);
    } catch (e) {
      return res.status(404).json('Company Not Found!');
    }
  })
  .post(async (req, res) => {
    return res.send(
      `POST request to http://localhost:3000/companies/${id}`
    );
  })
  .delete(async (req, res) => {
    return res.send(
      `DELETE request to http://localhost:3000/companies/${id}`
    );
  })
  .patch(async (req, res) => {
    return res.send(
      `PATCH request to http://localhost:3000/companies/${id}`
    );
  });
//Implement GET Request Method and send a JSON response See lecture code!

export default router;

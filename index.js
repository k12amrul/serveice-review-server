const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// require('dotenv').config()
const app = express()
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 5000
require('dotenv').config()


app.use(cors())
app.use(express.json())


// console.log(process.env.DB_USER)
// console.log(process.env.DB_PASSWORD)

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.uftqkre.mongodb.net/?retryWrites=true&w=majority`;
// console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        // const serviceCollection=client.db('serviceDB').collection('services')
        const serviceCollection = client.db('serviceDB').collection('service')
        const reviewCollection = client.db('serviceDB').collection('reviews')
        //  const serviceCollection=client.db('serviceDB').collection('service')


        app.get('/', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query).limit(3) // .skip(1)
            const services = await cursor.toArray()
            res.send(services)
        })
        app.get('/services', async (req, res) => {
            const query = {} //{ price: { $lt: 100 } }
            const services = await serviceCollection.find(query).toArray()  // .skip(1)
            // const services = await cursor.toArray()
            res.send(services)
        })

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const service = await serviceCollection.findOne(query)
            res.send(service)
        })

        // app.get('/service/:id', async (req, res) => {
        //     const id = req.params.id
        //     const query = { categoryId :  ObjectId(id)  }
        //     // console.log("id" , query)
        //     const service = await serviceCollection.findOne(query)//.toArray()
        //     res.send(service) 
        // })

        // app.get('/services/:id', async (req, res) => {
        //     const id = req.params.id
        //     const query = { _id: ObjectId(id) }
        //     const service = await serviceCollection.findOne(query)
        //       const fil = service.filter( c._id == id )
               
        //     res.send(fil)
        // })

        // reviews  api 

        app.get('/review/:id', async (req, res) => {
            const id = req.params.id
            const query = { serviceId: id }
            const reviews = await reviewCollection.find(query).toArray()
            res.send(reviews)
        })
        
        app.get('/reviews/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const reviews = await reviewCollection.findOne(query)
            res.send(reviews)
        })
       

        app.get('/reviews', async (req, res) => {
            // console.log(req.query )
            let query = {}
            if (req.query.email) {
                query = {
                    email: req.query.email
                }

            }
            const cursor = reviewCollection.find(query)
            const reviews = await cursor.toArray()
            res.send(reviews)
        })
        app.get("/reviews", async(req, res) => {
            const query = {}
            const result =await reviewCollection.find( query).toArray()
            res.send(result)

        })
        app.post('/reviews', async (req, res) => {
            const review = req.body
            const result = await reviewCollection.insertOne(review)
            res.send(result)

        })
        app.delete('/review/:id', async (req, res) => {
            const id = req.params.id
            console.log(id)
            const query = { _id: ObjectId(id) }
            const result = await reviewCollection.deleteOne(query)
            res.send(result)

        })
        app.post('/addService', async (req, res) => {
            const service = req.body
            const result = await serviceCollection.insertOne(service)
            res.send(result)

        })
    }
    finally {

    }
}
run().catch(err => console.error(err))

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });




app.get('/', (req, res) => {
    res.send('aaaaaaaaasssssss')
})

app.listen(port, () => {
    console.log(`mmmmmmmmmmm ${port}`)
})


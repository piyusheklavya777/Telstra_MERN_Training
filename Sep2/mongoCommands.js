this is run in command prompt at any location. I did in Sep2 folder.

show dbs

use persons

db.person.insertOne({ name: "John",
     age:32
})

//making relationships b/w objects
db.person.insertOne({ name: "Jane",
     age:28,
    spouse :  ObjectId("5f4f39c8b1a2ac66397f41e0") })
//
db.person.find();
db.person.find().pretty(); //displays better

db.person.findOne({name:"John"})

db.person.insertOne({object to insert})
db.person.insertMany()
db.person.deleteOne()
db.person.deleteMany()


//EMBEDDED DOCUMENTS

db.persons.insertOne({
    name: 'Jack',
    age: 4,
    numTeeth : { // embeddings
        milk:  4,
        molar: 2
    }
})

db.person.insertOne({
    name: 'Jill',
    age: 4,
    favoriteToys : ['toy-robo', 'hotwheels'] 
})

//Change John's Name : UpdateOne()
filterDoc2 = {name: 'John'}
updateDoc2 = {
    $set: {
        name: 'Johnathan'
    }
};
db.person.updateOne(filterDoc2, updateDoc2 )


db.person.updateOne({
    "_id" : ObjectId("5f4f3e49b1a2ac66397f41e4")
},{
    $set: {
        "numTeeth.milk" : 5  // since . is there so the key has to be in ""
    }
})
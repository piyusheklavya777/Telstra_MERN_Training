//Create a data/db location. In the folder that contains data, cmd and
//mongod --dbpath "./data/db".
//then in any place (maybe your work directory), do these :
show dbs

use persons

//making single enty
db.person.insertOne({ name: "John",
     age:32
})

//replacing an entry
db.person.replaceOne({name:"Johnathan"},{name:"Johnny"})

//making relationships b/w objects
db.person.insertOne({ name: "Jane",
     age:28,
    spouse :  ObjectId("5f4f39c8b1a2ac66397f41e0") })
//finding an entry
db.person.findOne({name:"John"});
db.person.findOne({name:"John"}).pretty(); //displays better

//making multiple entries
db.person.insertMany()

//deleting an entry
db.person.deleteOne()
db.person.deleteMany()
//end

//EMBEDDED DOCUMENTS

db.persons.insertOne({
    name: 'Jack',
    age: 4,
    numTeeth : { // embeddings
        milk:  4,
        molar: 2
    }
})
//end

////Change / Update an entry : UpdateOne()
filterDoc2 = {name: 'John'}
updateDoc2 = {
    $set: {
        name: 'Johnathan'
    }
};
db.person.updateOne(filterDoc2, updateDoc2 )

db.person.updateOne({ //when an embedded entry has to be updated 
                      // put "" around it as . in numTeeth.milk will be
                      //treated as an operator
    "_id" : ObjectId("5f4f3e49b1a2ac66397f41e4")
},{
    $set: {
        "numTeeth.milk" : 5  // since . is there so the key has to be in ""
    }
})
//end

///////////////////////////////////////////////////////////////////

db.person.updateOne({
    "_id" : ObjectId("5f4f3e49b1a2ac66397f41e4")
},{
    $set: {
        "numTeeth.milk" : 5  // since . is there so the key has to be in ""
    }
})

//replacing an entry
db.person.replaceOne({name:"Johnathan"},{name:"Johnny"})

//Create a data/db location. In the folder that contains data, cmd and
//mongod --dbpath "./data/db".
//then in any place (maybe your work directory), do these :

//the following command is run in folder which contains shows.js... last argument is the relative address. "./" is optional .
//it will also include this db in your list of existing dbs.
//to add a json or any db file, put it in data folder, as a sibling of db.
// mongoimport -d exercises -c shows --drop --jsonArray shows.json

//to simply start : choose a folder that contains data/db data/logs mongod.conf (contents of conf file are given in end of this doc)
//and then cmd in that folder and run :
//mongod -f ./mongod.conf
//then:  mongo in cmd...then use d. then db.<collectionName>.insertOne({})


show dbs

use persons

// 


//making single entry
db.person.insertOne(
   
    {
         name: "John",
         age:32
    }
)
//insertMany([{},{},{}], {ordered:false}) array of objects to push
//end

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

//iterating hasNext() next()
cursor1 = db.person.find()
if(cursor1.hasNext()) {
    cursor1.next();
    printjson(cursor1)
}
//end

//skip 0 document from start and return 20docs. Selective iterating
const cursor3 = db.person.find(); 
cursor3.skip(0).limit(20);
//end

//sorting the view / projetions
let sortOrder = {price:1, name: -1} // priority in that order
db.testData.find().sort(sortOrder)
//end 

///////////////////////////////////////////////////////////////////

db.testData.find({}, {price: 1}) //returns price and id
//id is always returned by default. To avoid: {price: 1, _id:0}

//Q3
db.albums.insertOne({ 
    yearOfRelease: 2002,
    musicDirector: 'director C',
    lyricist: 'writer C', 
    songs: ['songC1','songC2','songC3'],    
})

//Q5
db.quesfive.insertMany([{_id:1,x:1},{_id:2, x:2}])
db.quesfive.insertMany([{_id:3,x:3},{_id:2, x:2}, {_id:4,x:4}, {_id:5,x:5}])
db.quesfive.find()
db.quesfive.insertMany([{_id:3,x:3},{_id:2, x:2}, {_id:4,x:4}, {_id:5,x:5}], {ordered:false})
db.quesfive.find()

//CONTENTS OF mongod.conf file. with indentation & fwd slashes.
// #https://docs.mongodb.com/manual/reference/configuration-options/
// storage: 
//     dbPath: "C:/Users/ d960791/Desktop/All my Code/PRACTICE/data/db"
// systemLog:
//     destination : file
//     path: "C:/Users/d960791/Desktop/All my Code/PRACTICE/logs/mongod.log"

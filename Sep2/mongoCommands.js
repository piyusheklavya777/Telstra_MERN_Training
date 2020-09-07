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

//CONTENTS OF mongod.conf file. with indentation & fwd slashes.
// #https://docs.mongodb.com/manual/reference/configuration-options/
// storage: 
//     dbPath: "C:/Users/ d960791/Desktop/All my Code/PRACTICE/data/db"
// systemLog:
//     destination : file
//     path: "C:/Users/d960791/Desktop/All my Code/PRACTICE/logs/mongod.log"

//Journal Writing
db.person.insertOne({name: 'John'},{journal:true})
//writeConcern
db.person.insertOne({name: 'John'},{w:1})
///////////////////////////////////////////////////////////////////
THEORY ENDS
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



//Q6 
db.shows.find({runtime:{$lt:60}}).pretty()
db.shows.find({runtime:{$gt:30 , $lt:60}}, {runtime: true}).pretty()
db.shows.find({"rating.average":{$gte:8}}).pretty()
db.shows.find({genres:"Drama"},  {name:true})
db.shows.find({genres:["Horror"]},{genres:true}) // only drama. So full array to be compared.
db.shows.find({genres: {$in: ["Drama", "Horror"]}}, {genres:true})
db.shows.find({type: {$in:["Animation", "Reality"] } } ).count() // output:24
db.shows.find({type: {$nin:["Drama", "Horror"] } } ).count() //nin - not in
db.shows.find({"network.name": {$nin:["HBO", "FOX"] } } ).count() // 202
db.shows.find({    $or: [ {genres:'Drama'},{genres:'Horror'} ]   }).count() // 159
db.shows.find( {
    genres: { $not: { $in: ['Drama','Horror'] } }
} ).count() // 81
db.shows.find({    $and: [ {genres:'Drama'},{genres:'Horror'} ]   }, {genres:true}) //17
//iv
db.shows.find({    $and: [ {genres:'Drama'},{genres: ${ne: 'Horror'}} ]   }, {genres:true})
//v !!!!
db.shows.find({$and: [
        {   $and: [ {genres:'Drama'},{genres: {$ne: 'Horror'}} ]  }
       ,{   $and: [ {genres:'Horror'},{genres:{$ne: 'Drama' }} ]  }
    ]
}).count() //not working as and is not a top level operator
//v | same, re-iterating
db.shows.find({$and: [
    {   $and: [ {genres:'Drama'},{genres: {$ne: 'Horror'}} ]  }
   ,{   $and: [ {genres:'Horror'},{genres:{$ne: 'Drama' }} ]  }
]
},{genres: true})
//
//Q6d
//i
db.shows.find({
     webChannel: {
        $exists: true,
        $ne : null
    }
},{webChannel:true}) //10
//ii
db.shows.find({
    "webChannel.country": {
       $ne : null
   }
},{webChannel:true}) //5
//iii
db.shows.find({
    webChannel: null
   }
,{webChannel:true}).count() //230
//iv
db.shows.find({
    webChannel: {$ne: null},
    $type: 'object'
   }
,).count() //not working

//reg-ex :
//Q6e
//i
db.shows.find(
    {name: {$regex: /Last/i}},
    {name:true}
) //3

//ii iii
db.shows.find(
    {
        name: {
            $regex: /Last/,  options : i
              }
    },
    {name:true}
)

// iv
db.shows.find({
    $expr: {
            $gt : [  "$weight", { $multiply: ["$rating.average", 10] } ]
           }
    },{ weight:1 , "rating.average":1 }
)
//v homework

// Use of $all Q6f i :
db.shows.find({
    genres: {$all: ['Drama','Horror'] }
},{genres:1, _id:0})//17

//Q 6f ii
db.shows.find({
    "schedule.days": {$all: ['Monday','Tuesay'] }
},{"schedule.days":1, _id:0}) //4

//Q 6f next part Create a collection...
db.students.insertMany([
    {
        name: "Ram",
        scores: [
            {subject:'History', score: 100},
            {subject: 'Geography', score: 95}
        ]
    },
    {
        name: "Shyam",
        scores: [
            {subject:'History', score: 92},
            {subject:'Science', score: 100},
            {subject:'English', score: 80}
        ]
    },
    {
        name: "Sita",
        scores: [
            {subject:'Commerce', score: 99},
            {subject: 'Maths', score: 85},
            {subject:'English', score: 85}
        ]
    }
])
//Q 6f i

db.students.find({
    "scores.subject" : "History",
    "scores.score": {$gt: 90}
},{name:1, _id: 0}) //Ram Shyam

//Q 6f ii
db.students.find(
    {
        scores: {
            $elemMatch: {   subject: "History", score : {$gt: 90}   }
        }
    },{name:1, _id: 0}) //ram n shyam

//Q 6f iii
db.students.find({
    scores: { $size: 2 }
},{name:1, _id: 0}) //ram

//Q6g i
db.students.find({
    "scores.subject": 'History'
},{name:1, _id:0, "scores.$":1}) // shows history subjects of ram n shyam

//Q6g ii
db.students.find(
    { "scores.subject": 'History'},{ name:1, scores:{$slice:2} }
).pretty() // ram's and shyam's first 2 subjects.

//nodejs, express, mongoDB, simple queries for coding assessment
///////////////
//skip 0 document from start and return 20docs. Selective iterating
// const cursor3 = db.person.find(); 
// cursor3.skip(0).limit(20);
// //end

// //sorting the view / projetions
// let sortOrder = {price:1, name: -1} // priority in that order
// db.testData.find().sort(sortOrder)
//end 
//////////////
//Q7 i
//skip(), limit() etc...
//Q8 a i
db.shows.updateMany({
    "network.country.code" : "US"
},{
    $set: {
        language: 'English (US)',
        locale: 'en-US'
    }
})//matched and modified 217 entries...

//Q8 a ii
db.shows.updateOne({
    weight: {$lt:40},
    "rating.average": {$gt: 7}
},{
    $inc: {weight: 10}, $set: {criticsChoice: true}
}) // matched-one, modified-one

//Q8a iii
db.shows.updateOne({
    weight: {$gt: 80},
    "rating.average" : {$lt: 6}
},{
    $set: {criticsChoice: false},
    $inc: {weight: -10}
}) // matched-one, modified-one

//Q8a iv change in Q : condition on weight 40<weight<60, rather than w<50

db.shows.updateMany({
    weight: {$lt: 60, $gt: 40}, "rating.average" : {$gt: 7}
},{
    $max: {weight: 50}
}) // matched-8, modified-one

//Q8a v
db.shows.updateMany({
    weight: {$lt: 60}, "rating.average" : {$gt: 8}
},{
    $mul : { weight: 1.33 }
}) //matched &modified 6

//Q8a vi
db.shows.updateMany({}, {
    $rename: { criticChoice: "cc" }
}) // matched-240, modified-one

//Q8a vii
db.shows.updateMany({}, {
    $unset: { cc:1 }
}) 

//Q8a viii with a lot of changes
db.shows.updateOne({
    name: 'Kapil Sharma Show', language: 'English'
}, { $set: {
    
    "rating.average" : 8,
    genres: ['HComedy']
    }
}, { upsert: true
}) // upserted an item. total count is 241 now,

////Q8b

db.shows.updateMany({
    "schedule.days" : 'Monday'
}, {
    $set: {
        "schedule.days.$": "monday"
    }
}) //matched & modified 36

//Q8b ii
db.shows.updateMany({
    genres: "Horror"
},{
    $push: {genres: "Supernatural"}
}) //matched & modified 23

//Q8b ii
db.shows.updateMany({
    genres: "Horror"
},{
    $push: {
        genres: {
            $each: ['Supernatural', 'Spook']
        }
    },

}) //matched & modified 23

//Q8b iii
db.shows.updateMany({
    genres: "Horror"
},{
    $push: {
        genres: {
            $each: ['Supernatural', 'Spook'],
            $sort:1
        }
    },

})

//Q8b iv
db.shows.updateOne({genres: "Supernatural"},{
    $pull: {
        genres: "Supernatural"
    }
}) //matched and modified 1

//Q8b v
db.shows.updateMany({},{
    $pop: {
        genres: 1
    }
}) //matched and modified 1

//
//Q8b v
db.shows.updateMany({},{
    $addtoset: {
        genres: {
            $each: ['Supernatural', 'Spook']
        }
    }
})
//////////////////////////////////////////////////////
AGGREGATE
//////////////////////////////////////////////////////
db.shows.aggregate( //syntax err
    [
        {
            $match:{ "genres": 'Drama' }
        },
        {$count: 1}
    ]
)
//
db.shows.aggregate(
    [
        {
            $group:{
                _id: "$network.name",
                numShows: {$sum: 1}
            }
        }
        
    ]
)

//Q 9b ii
db.shows.aggregate(
    [
        {
            $group:{
                _id: {
                    network: "$network.name",
                    country: "$network.country.name"
                },
                numShows: {$sum: 1},
                averageRuntime : {$avg: "$runtime"},
            }
        },{
            $sort: {"_id.network": 1}
        }
        
    ]
)


//Q 9b iii
db.shows.aggregate(
    [
        {
            $group:{
                _id: {
                    network: "$network.name",
                    country: "$network.country.name"
                },
                stats: {
                    numShows: {$sum: 1},
                    averageRuntime : {$avg: "$runtime"},
                }
            }
        },{
            $sort: {"_id.network": 1}
        }       
    ]
)

//Q 9b iv
//

/////////////

db.shows.aggregate(
    [
        {
            $project : {
                name:'$name',
                newWorkname:{ 
                    $concat: [
                        "$network.name",
                         "(",
                          "$network.country.code",
                           ")"]
                },
                schedule: "$schedule.day",
                runtime: "$runtime"
            }
        }
    ]
)





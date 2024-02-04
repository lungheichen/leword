// load( "scripts/db_init.js" )

db = connect( 'mongodb://localhost/leword' );

db.createUser( 
  {
    user: "lwadmin",
    pwd: "admin",
    roles: [
      { role: "userAdmin", db: "leword" }
    ],
  },
)

db.users.insertOne( 
   {
      name: "test",
      pass: "unsalted",
      lastModified: new Date(Date.now())
   },
)

userId = db.users.findOne()._id

db.guesses.insertOne( 
  {
    userId: userId,
    attempt: 1,
    guesses: { '1': '', '2': '', '3': '', '4': '', '5': '', '6': '' },
  },
)



db.scores.insertOne( 
  {
    userId: userId,
    winAtTry: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0 },
    lastPlayed: new Date(Date.now()),
  },
)

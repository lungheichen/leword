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
      last_modified: ""
   },
)

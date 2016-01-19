# idealist-api
List your project ideas and rank them based on feasibility or interest

## Routes

### Users
    User: {
        username: String,
        first_name: String,
        last_name: String,
        email: String,
        password: String,
        password_change_token: String,
        date_updated: Date,
        date_created: Date,
        profile_picture: String
    }
___
    /api/users
POST - Create a new user
PATCH - Update current user

    /api/users/:id
GET - Get public info for a user account (username, profile picture)

### Auth
    /api/login
POST - Login user with username and password specified in the body
    /api/logout
POST - Logout the currently logged in user

### Projects
    Project: {
        title: String,             
        owner: {                   
          type: ObjectId,
          ref: 'User'
        },
        contributors: [{           
          type: ObjectId,
          ref: 'User'
        }],
        summary: String,           
        description: String,       
        images: [String],          
        urls: [String],            
        tags: [String],            
        owner_feasibility: Number, 
        owner_upvotes: Number,     
        owner_downvotes: Number,   
        public_feasibility: Number,
        upvoted: [{                
          type: ObjectId,
          ref: 'User'
        }],
        downvoted: [{              
          type: ObjectId,
          ref: 'User'
        }],
        points_estimate: Number,   
        source: String,            
        visibility: Number,        
        date_created: Date,        
        date_updated: Date         
    }
___
    /api/projects
GET - Get projects for current user
POST - Create a new project with current user set as owner
PUT - Update an existing project. Overwrites existing project based on _id property in request body

    /api/projects/:id
GET - Get the project with given id. Current user must be authorized to access the project
PATH - Update an existing project based on id parameter. Only specified properties in body are overwritten
DELETE - Delete the project with given id. Current user must be the project owner in order to delete.

    /api/projects/upvote/:id
POST - Upvote the specified project. Removes existing downvote

    /api/projects/upvote/:id
POST - Downvote the specified project. Removes existing upvote

### Comments
    Comment: {
        body: String,
        owner: {
        type: ObjectId,
        ref: 'User'
        },
        project_id: {
        type: ObjectId,
        ref: 'Project'
        },
        date_created: Date,
        date_updated: Date
    }
___
    /api/comments/:id
PUT - Update an existing comment. Overwrites existing comment based on _id property in request body

    /api/comments/:id
GET - Get comment by id. Current user must have access
PATCH - Update an existing comment based on id parameter. Only specified properties in body are overwritten
DELETE - Delete comment by id. Current user must be comment owner or project owner
POST - Create a new comment inside the current project with current user set as comment owner. Project must be public or user must have access

    /api/projectComments/:id
GET - Get all comments for the project specified by the id parameter

    /api/userComments
GET - Get all comments for the current user

## Installing

    npm i

## Running

Idealist can be run with gulp in your local environment or with docker:

### Gulp
Gulp for development with local mongoDB, sass interpreter, livereload, and nodemon:
    
    gulp dev
   
Gulp for production just builds into `/dist` directory:
    
    gulp build-prod
    
Then to run it use node, nodemon, or pm2
    
    nodemon dist/server.js
    
### Docker

    npm run-script docker

or
    
    docker build -t idealist-api
    
then
    
    docker run -i -p 8080:80 idealist-api
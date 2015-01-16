ReActive project (Innobis)

#User Routes
GET  /api/v1/users (Get all users)
POST /api/v1/users (Create new user) (this route doesn't need authentication)

GET    /api/v1/users/:id  (Show user by id)
PATCH  /api/v1/users/:id  (Update user by id)
DELETE /api/v1/users/:id  (Remove user by id)

#Report Routes
GET  /api/v1/reports      (All reports by user)
PUT  /api/v1/reports/:id  (Update report by id)

GET  /api/v1/projects  (all projects by user)

GET  /api/v1/projects/:id/templates  (all templates by user and project)

GET  /api/v1/projects/:id/templates/:id/reports  (all reports by user and project and template)
POST /api/v1/projects/:id/templates/:id/reports  (create report by user and project and template)

GET  /api/v1/projects/:id/reports  (all reports by user and project)

#Here's the basic actions of a user:
1. GET  /api/v1/projects to get all projects defined for the currently authenticated user
2. GET  /api/v1/projects/:idProject/templates to get all the templates defined for that user and project
3. POST /api/v1/projects/:idProject/templates/:idTemplate/reports to create a report by a user for a project based on a template
4. PUT  /api/v1/reports/:id to fill up the report with all the fields






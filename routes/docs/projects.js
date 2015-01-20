/**
 * @api {get} /projects/ Get all projects
 * @apiVersion 1.0.0
 * @apiPermission user
 * @apiName GetAllProjects
 * @apiGroup Projects
 *
 * @apiSuccess {Array[]} projects List of projects related to the current user according to the permissions defined, not the user who creates the project.
 * @apiSuccess {String} projects.id Id of the Project.
 * @apiSuccess {String} projects.name Name of the Project.
 * @apiSuccess {String} projects.created_at Date the project was created.
 * @apiSuccess {String} projects.updated_at Date the project was last updated.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "id": "63d9f499-3f8b-4a9d-9d63-3f2ccc83e980",
 *         "name": "this is the project name",
 *         "created_at": "2015-01-20T16:58:25.229Z",
 *         "updated_at": "2015-01-20T16:58:25.229Z"
 *       },
 *       {
 *         "id": "8389f499-4f8b-4a9d-9d63-3f2ccc83e980",
 *         "name": "this is another project name",
 *         "created_at": "2015-01-20T16:58:25.229Z",
 *         "updated_at": "2015-01-20T16:58:25.229Z"
 *       }
 *     ]
 *     
 * @apiError (Error 401) UnauthorizedUser User not authenticated
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     
 * @apiError (Error 404) ProjectNotFound Projects not found for the current authenticated user.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 404,
 *       "message": "projects not found",
 *       "description": "No projects found for user: <username>",
 *       "errors": []
 *     }
 *     
 * @apiError (Error 500) DbConnectionError There was a problem connecting to the database
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "code": 1001,
 *       "message": "db connection error",
 *       "description": "<database message>",
 *       "errors": []
 *     }
 *
 * @apiError (Error 500) DbQueryError There was a problem accesing to the database
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "code": 1002,
 *       "message": "db query error",
 *       "description": "<database message>",
 *       "errors": []
 *     }
 */


/**
 * @api {post} /projects/ Create new project
 * @apiVersion 1.0.0
 * @apiPermission admin
 * @apiName CreateProject
 * @apiGroup Projects
 *
 * @apiParam {String} name Name of the Project (4-255 chars).
 * @apiParamExample {json} Request-Example:
 *     {
 *       "name": "New Project"
 *     }
 *
 * @apiSuccess (Success 201) {String} id Id of the Project.
 * @apiSuccess (Success 201) {String} name Name of the Project.
 * @apiSuccess (Success 201) {String} created_at Creation date of the Project.
 * @apiSuccess (Success 201) {String} updated_at Update date of the Project.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "id": "6f73705d-4a8b-414a-ac8a-ec63395319cc",
 *       "name": "New Project",
 *       "created_at": "2015-01-20T16:58:25.229Z",
 *       "updated_at": "2015-01-20T16:58:25.229Z"
 *     }
 *     
 * @apiError (Error 401) UnauthorizedUser User not authenticated
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     
 * @apiError (Error 403) ForbiddenUser User does not has rights to access this endpoint
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Not Found
 *     {
 *       "code": 403,
 *       "message": "Forbidden",
 *       "description": "You don't have permissions to carry this action.",
 *       "errors": [ ]
 *     }
 *     
 * @apiError (Error 500) ValidatorError Project data is not valid
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "code": 2001,
 *       "message": "validation error",
 *       "description": "project validation error",
 *       "errors": [
 *         {
 *           "param": "name",
 *           "msg": "must have 4-255 chars",
 *           "value": "ex"
 *         }
 *       ]
 *     }
 *     
 * @apiError (Error 500) DbConnectionError There was a problem connecting to the database
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "code": 1001,
 *       "message": "db connection error",
 *       "description": "<database message>",
 *       "errors": []
 *     }
 *
 * @apiError (Error 500) DbQueryError There was a problem accesing to the database
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "code": 1002,
 *       "message": "db query error",
 *       "description": "<database message>",
 *       "errors": []
 *     }
 */

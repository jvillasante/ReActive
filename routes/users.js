'use strict';

const
  _ = require('lodash'),
  errTo = require('errto'),
  Err = require('custom-err'),
  publicAttributes = ['id', 'username', 'email', 'role'];

/**
 * @api {get} /users/ Get all users
 * @apiVersion 1.0.0
 * @apiPermission admin
 * @apiName GetAllUsers
 * @apiGroup User
 *
 * @apiSuccess {Array[]} users List of users
 * @apiSuccess {String} users.id Id of the User.
 * @apiSuccess {String} users.username Username of the User.
 * @apiSuccess {String} users.email Email of the User.
 * @apiSuccess {String} users.role Role of the User.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "id": "63d9f499-3f8b-4a9d-9d63-3f2ccc83e980",
 *         "username": "admin",
 *         "email": "admin@example.com",
 *         "role": "admin"
 *       },
 *       {
 *         "id": "9f62563f-7509-4c39-b90c-8c5351b12c3a",
 *         "username": "user",
 *         "email": "user@example.com",
 *         "role": "user"
 *       }
 *     ]
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
exports.all = function(req, res, next) {
  req.userProvider.findAll(errTo(next, function(userData) {
    if (!userData) {
      return next(Err("user not found", { code: 404, description: "No user found.", errors: []}));
    }

    res.status(200).send(userData);
  }));
};

/**
 * @api {get} /users/:id Get User
 * @apiVersion 1.0.0
 * @apiPermission user 
 * @apiPermission admin
 * @apiName GetSingleUser
 * @apiGroup User
 *
 * @apiParam {UUID} id Users unique ID. 
 *
 * @apiSuccess {String} id Id of the User.
 * @apiSuccess {String} username Username of the User.
 * @apiSuccess {String} email Email of the User.
 * @apiSuccess {String} role Role of the User.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": "6f73705d-4a8b-414a-ac8a-ec63395319cc",
 *       "username": "admin-user",
 *       "email": "admin@example.com",
 *       "role": "admin"
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
 * @apiError (Error 400) UserNotFound The <code>id</code> of the User was not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 404,
 *       "message": "user not found",
 *       "description": "User 6f73705d-4a8b-414a-ac8a-ec63395319cc not found",
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
exports.show = function(req, res, next) {
  req.userProvider.findById(req.params.id, errTo(next, function(userData) {
    if (!userData) {
      return next(Err("user not found", { code: 404, description: "User " + req.params.id + " not found.", errors: []}));
    }

    res.status(200).send(userData);
  }));
};

/**
 * @api {post} /users/ Create new user
 * @apiVersion 1.0.0
 * @apiPermission admin
 * @apiName CreateUser
 * @apiGroup User
 *
 * @apiParam {String} username Username of the User (4-255 chars).
 * @apiParam {String} email Email of the User (valid email address).
 * @apiParam {String} password Password of the User (6-255 chars).
 * @apiParam {String} role Role of the User (one of ['user', 'admin']).
 * @apiParamExample {json} Request-Example:
 *     {
 *       "username": "example-user",
 *       "email": "example-user@gmail.com",
 *       "password": "supersecretpass",
 *       "role": "user"
 *     }
 *
 * @apiSuccess (Success 201) {String} id Id of the User.
 * @apiSuccess (Success 201) {String} username Username of the User.
 * @apiSuccess (Success 201) {String} email Email of the User.
 * @apiSuccess (Success 201) {String} role Role of the User.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "id": "6f73705d-4a8b-414a-ac8a-ec63395319cc",
 *       "username": "admin-user",
 *       "email": "admin@example.com",
 *       "role": "admin"
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
 * @apiError (Error 500) ValidatorError User data is not valid
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "code": 2001,
 *       "message": "validation error",
 *       "description": "user validation error",
 *       "errors": [
 *         {
 *           "param": "username",
 *           "msg": "must have 4-255 chars",
 *           "value": "ex"
 *         },
 *         {
 *           "param": "email",
 *           "msg": "must be a valid email address",
 *           "value": "example-usergmail.com"
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
exports.create = function(req, res, next) {
  let user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role
  };

  req.userProvider.save(user, errTo(next, function(result) {
    if (!result || !result.id) {
      return next(Err("an error has ocurred", { code: 500, description: "User " + user.username + " can't be saved.", errors: []}));
    }
    
    _.assign(user, result);
    res
      .status(201)
      .set('Location', '/users/' + user.id)
      .send(_.pick(user, publicAttributes));
  }));
};

/**
 * @api {patch} /users/:id Update user
 * @apiVersion 1.0.0
 * @apiPermission user, admin
 * @apiName UpdateUser
 * @apiGroup User
 *
 * @apiParam {String} id Id of the User to update (url param)
 * @apiParam {String} username Username of the User (4-255 chars).
 * @apiParam {String} email Email of the User (valid email address).
 * @apiParam {String} password Password of the User (6-255 chars).
 * @apiParamExample {json} Request-Example:
 *     [{
 *       "op": "replace",
 *       "path": "/username",
 *       "value": "new-user-name" 
 *     }, {
 *       "op": "replace",
 *       "path": "/email",
 *       "value": "new-email@example.com"
 *     }]
 *
 * @apiSuccess (Success 204) {String} id Id of the User.
 * @apiSuccess (Success 204) {String} username Username of the User.
 * @apiSuccess (Success 204) {String} email Email of the User.
 * @apiSuccess (Success 204) {String} role Role of the User.
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 No Content
 *     {
 *       "id": "6f73705d-4a8b-414a-ac8a-ec63395319cc",
 *       "username": "admin-user",
 *       "email": "admin@example.com",
 *       "role": "admin"
 *     }
 *     
 * @apiError (Error 401) UnauthorizedUser User not authenticated
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *
 * @apiError (Error 403) ForbiddenUser Users can only update themselves
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 403 Forbidden
 *     {
 *       "code": 403,
 *       "message": "cannot update other users",
 *       "description": "Log in as the user you are trying to update",
 *       "errors": []
 *     }
 *     
 * @apiError (Error 400) BadRequest Only accepts JSON Patch
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Bad Request
 *     {
 *       "code": 400,
 *       "message": "use JSON Patch",
 *       "description": "JSON Patch protocol: http://tools.ietf.org/html/rfc6902",
 *       "errors": []
 *     }
 *     
 * @apiError (Error 422) UnprocessableEntity Only accepts JSON Patch replace
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 422 Unprocessable Entity
 *     {
 *       "code": 422,
 *       "message": "only replace is supported atm",
 *       "description": "JSON Patch protocol: http://tools.ietf.org/html/rfc6902",
 *       "errors": []
 *     }
 * 
 * @apiError (Error 400) UserNotFound The <code>id</code> of the User was not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 404,
 *       "message": "user not found",
 *       "description": "User 6f73705d-4a8b-414a-ac8a-ec63395319cc not found",
 *       "errors": []
 *     }
 *     
 * @apiError (Error 500) ValidatorError User data is not valid
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "code": 2001,
 *       "message": "validation error",
 *       "description": "user validation error",
 *       "errors": [
 *         {
 *           "param": "username",
 *           "msg": "must have 4-255 chars",
 *           "value": "ex"
 *         },
 *         {
 *           "param": "email",
 *           "msg": "must be a valid email address",
 *           "value": "example-usergmail.com"
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
exports.update = function(req, res, next) {
  if (req.params.id !== req.user.id) {
    return next(Err("cannot update other users", { code: 403, description: "Log in as the user you are trying to update.", errors: []}));
  }

  if (!Array.isArray(req.body)) {
    return next(Err("use JSON Patch", { code: 400, description: "JSON Patch protocol: http://tools.ietf.org/html/rfc6902", errors: []}));
  }

  if (req.body.some(function(item) { return item.op !== 'replace'; })) {
    return next(Err("only replace is supported atm", { code: 422, description: "JSON Patch protocol: http://tools.ietf.org/html/rfc6902", errors: []}));
  }
  
  let userData = {};
  req.body.forEach(function(item) {
    if (item.path === '/username' || item.path === '/email' || item.path === '/password') {
      userData[item.path.replace(/^\//, '')] = item.value;
    }
  });

  req.userProvider.update(req.params.id, userData, errTo(next, function(result) {
    if (!result || !result.id) {
      return next(Err("user not found...", { code: 404, description: "User " + req.params.id + " not found.", errors: []}));
    }
    
    res.status(204).end();
  }));
};

/**
 * @api {delete} /users/:id Remove user
 * @apiVersion 1.0.0
 * @apiPermission admin
 * @apiName RemoveUser
 * @apiGroup User
 * 
 * @apiParam {String} id Id of the User to update (url param)
 *
 * @apiSuccess (Success 204) none none
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 204 No Content
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
 * @apiError (Error 400) UserNotFound The <code>id</code> of the User was not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "code": 404,
 *       "message": "user not found",
 *       "description": "User 6f73705d-4a8b-414a-ac8a-ec63395319cc not found",
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
exports.remove = function(req, res, next) {
  req.userProvider.remove(req.params.id, errTo(next, function(result) {
    if (!result || !result.id) {
      return next(Err("user not found", { code: 404, description: "User " + req.params.id + " not found.", errors: []}));
    }

    res.status(204).end();
  }));
};

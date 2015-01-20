define({ "api": [
  {
    "type": "post",
    "url": "/projects/",
    "title": "Create new project",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "CreateProject",
    "group": "Projects",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Project (4-255 chars).</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"name\": \"New Project\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the Project.</p> "
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the Project.</p> "
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "created_at",
            "description": "<p>Creation date of the Project.</p> "
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "updated_at",
            "description": "<p>Update date of the Project.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n{\n  \"id\": \"6f73705d-4a8b-414a-ac8a-ec63395319cc\",\n  \"name\": \"New Project\",\n  \"created_at\": \"2015-01-20T16:58:25.229Z\",\n  \"updated_at\": \"2015-01-20T16:58:25.229Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "UnauthorizedUser",
            "description": "<p>User not authenticated</p> "
          }
        ],
        "Error 403": [
          {
            "group": "Error 403",
            "optional": false,
            "field": "ForbiddenUser",
            "description": "<p>User does not has rights to access this endpoint</p> "
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "optional": false,
            "field": "ValidatorError",
            "description": "<p>Project data is not valid</p> "
          },
          {
            "group": "Error 500",
            "optional": false,
            "field": "DbConnectionError",
            "description": "<p>There was a problem connecting to the database</p> "
          },
          {
            "group": "Error 500",
            "optional": false,
            "field": "DbQueryError",
            "description": "<p>There was a problem accesing to the database</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Not Found\n{\n  \"code\": 403,\n  \"message\": \"Forbidden\",\n  \"description\": \"You don't have permissions to carry this action.\",\n  \"errors\": [ ]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"code\": 2001,\n  \"message\": \"validation error\",\n  \"description\": \"project validation error\",\n  \"errors\": [\n    {\n      \"param\": \"name\",\n      \"msg\": \"must have 4-255 chars\",\n      \"value\": \"ex\"\n    }\n  ]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"code\": 1001,\n  \"message\": \"db connection error\",\n  \"description\": \"<database message>\",\n  \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"code\": 1002,\n  \"message\": \"db query error\",\n  \"description\": \"<database message>\",\n  \"errors\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/docs/projects.js",
    "groupTitle": "Projects"
  },
  {
    "type": "get",
    "url": "/projects/",
    "title": "Get all projects",
    "version": "1.0.0",
    "permission": [
      {
        "name": "user"
      }
    ],
    "name": "GetAllProjects",
    "group": "Projects",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "projects",
            "description": "<p>List of projects related to the current user according to the permissions defined, not the user who creates the project.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "projects.id",
            "description": "<p>Id of the Project.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "projects.name",
            "description": "<p>Name of the Project.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "projects.created_at",
            "description": "<p>Date the project was created.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "projects.updated_at",
            "description": "<p>Date the project was last updated.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"id\": \"63d9f499-3f8b-4a9d-9d63-3f2ccc83e980\",\n    \"name\": \"this is the project name\",\n    \"created_at\": \"2015-01-20T16:58:25.229Z\",\n    \"updated_at\": \"2015-01-20T16:58:25.229Z\"\n  },\n  {\n    \"id\": \"8389f499-4f8b-4a9d-9d63-3f2ccc83e980\",\n    \"name\": \"this is another project name\",\n    \"created_at\": \"2015-01-20T16:58:25.229Z\",\n    \"updated_at\": \"2015-01-20T16:58:25.229Z\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "UnauthorizedUser",
            "description": "<p>User not authenticated</p> "
          }
        ],
        "Error 404": [
          {
            "group": "Error 404",
            "optional": false,
            "field": "ProjectNotFound",
            "description": "<p>Projects not found for the current authenticated user.</p> "
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "optional": false,
            "field": "DbConnectionError",
            "description": "<p>There was a problem connecting to the database</p> "
          },
          {
            "group": "Error 500",
            "optional": false,
            "field": "DbQueryError",
            "description": "<p>There was a problem accesing to the database</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"code\": 404,\n  \"message\": \"projects not found\",\n  \"description\": \"No projects found for user: <username>\",\n  \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"code\": 1001,\n  \"message\": \"db connection error\",\n  \"description\": \"<database message>\",\n  \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"code\": 1002,\n  \"message\": \"db query error\",\n  \"description\": \"<database message>\",\n  \"errors\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/docs/projects.js",
    "groupTitle": "Projects"
  },
  {
    "type": "post",
    "url": "/users/",
    "title": "Create new user",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "CreateUser",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the User (4-255 chars).</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the User (valid email address).</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the User (6-255 chars).</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>Role of the User (one of [&#39;user&#39;, &#39;admin&#39;]).</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n  \"username\": \"example-user\",\n  \"email\": \"example-user@gmail.com\",\n  \"password\": \"supersecretpass\",\n  \"role\": \"user\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the User.</p> "
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the User.</p> "
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the User.</p> "
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>Role of the User.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n{\n  \"id\": \"6f73705d-4a8b-414a-ac8a-ec63395319cc\",\n  \"username\": \"admin-user\",\n  \"email\": \"admin@example.com\",\n  \"role\": \"admin\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "UnauthorizedUser",
            "description": "<p>User not authenticated</p> "
          }
        ],
        "Error 403": [
          {
            "group": "Error 403",
            "optional": false,
            "field": "ForbiddenUser",
            "description": "<p>User does not has rights to access this endpoint</p> "
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "optional": false,
            "field": "ValidatorError",
            "description": "<p>User data is not valid</p> "
          },
          {
            "group": "Error 500",
            "optional": false,
            "field": "DbConnectionError",
            "description": "<p>There was a problem connecting to the database</p> "
          },
          {
            "group": "Error 500",
            "optional": false,
            "field": "DbQueryError",
            "description": "<p>There was a problem accesing to the database</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Not Found\n{\n  \"code\": 403,\n  \"message\": \"Forbidden\",\n  \"description\": \"You don't have permissions to carry this action.\",\n  \"errors\": [ ]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"code\": 2001,\n  \"message\": \"validation error\",\n  \"description\": \"user validation error\",\n  \"errors\": [\n    {\n      \"param\": \"username\",\n      \"msg\": \"must have 4-255 chars\",\n      \"value\": \"ex\"\n    },\n    {\n      \"param\": \"email\",\n      \"msg\": \"must be a valid email address\",\n      \"value\": \"example-usergmail.com\"\n    }\n  ]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"code\": 1001,\n  \"message\": \"db connection error\",\n  \"description\": \"<database message>\",\n  \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"code\": 1002,\n  \"message\": \"db query error\",\n  \"description\": \"<database message>\",\n  \"errors\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/docs/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users/",
    "title": "Get all users",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "GetAllUsers",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Array[]",
            "optional": false,
            "field": "users",
            "description": "<p>List of users</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.id",
            "description": "<p>Id of the User.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.username",
            "description": "<p>Username of the User.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.email",
            "description": "<p>Email of the User.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.role",
            "description": "<p>Role of the User.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n  {\n    \"id\": \"63d9f499-3f8b-4a9d-9d63-3f2ccc83e980\",\n    \"username\": \"admin\",\n    \"email\": \"admin@example.com\",\n    \"role\": \"admin\"\n  },\n  {\n    \"id\": \"9f62563f-7509-4c39-b90c-8c5351b12c3a\",\n    \"username\": \"user\",\n    \"email\": \"user@example.com\",\n    \"role\": \"user\"\n  }\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "UnauthorizedUser",
            "description": "<p>User not authenticated</p> "
          }
        ],
        "Error 403": [
          {
            "group": "Error 403",
            "optional": false,
            "field": "ForbiddenUser",
            "description": "<p>User does not has rights to access this endpoint</p> "
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "optional": false,
            "field": "DbConnectionError",
            "description": "<p>There was a problem connecting to the database</p> "
          },
          {
            "group": "Error 500",
            "optional": false,
            "field": "DbQueryError",
            "description": "<p>There was a problem accesing to the database</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Not Found\n{\n  \"code\": 403,\n  \"message\": \"Forbidden\",\n  \"description\": \"You don't have permissions to carry this action.\",\n  \"errors\": [ ]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"code\": 1001,\n  \"message\": \"db connection error\",\n  \"description\": \"<database message>\",\n  \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"code\": 1002,\n  \"message\": \"db query error\",\n  \"description\": \"<database message>\",\n  \"errors\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/docs/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "Get User",
    "version": "1.0.0",
    "permission": [
      {
        "name": "user"
      },
      {
        "name": "admin"
      }
    ],
    "name": "GetSingleUser",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "UUID",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the User.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the User.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the User.</p> "
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>Role of the User.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"id\": \"6f73705d-4a8b-414a-ac8a-ec63395319cc\",\n  \"username\": \"admin-user\",\n  \"email\": \"admin@example.com\",\n  \"role\": \"admin\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "UnauthorizedUser",
            "description": "<p>User not authenticated</p> "
          }
        ],
        "Error 403": [
          {
            "group": "Error 403",
            "optional": false,
            "field": "ForbiddenUser",
            "description": "<p>User does not has rights to access this endpoint</p> "
          }
        ],
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The <code>id</code> of the User was not found.</p> "
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "optional": false,
            "field": "DbConnectionError",
            "description": "<p>There was a problem connecting to the database</p> "
          },
          {
            "group": "Error 500",
            "optional": false,
            "field": "DbQueryError",
            "description": "<p>There was a problem accesing to the database</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Not Found\n{\n  \"code\": 403,\n  \"message\": \"Forbidden\",\n  \"description\": \"You don't have permissions to carry this action.\",\n  \"errors\": [ ]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"code\": 404,\n  \"message\": \"user not found\",\n  \"description\": \"User 6f73705d-4a8b-414a-ac8a-ec63395319cc not found\",\n  \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"code\": 1001,\n  \"message\": \"db connection error\",\n  \"description\": \"<database message>\",\n  \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"code\": 1002,\n  \"message\": \"db query error\",\n  \"description\": \"<database message>\",\n  \"errors\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/docs/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Remove user",
    "version": "1.0.0",
    "permission": [
      {
        "name": "admin"
      }
    ],
    "name": "RemoveUser",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the User to update (url param)</p> "
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 204": [
          {
            "group": "Success 204",
            "optional": false,
            "field": "none",
            "description": "<p>none</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "UnauthorizedUser",
            "description": "<p>User not authenticated</p> "
          }
        ],
        "Error 403": [
          {
            "group": "Error 403",
            "optional": false,
            "field": "ForbiddenUser",
            "description": "<p>User does not has rights to access this endpoint</p> "
          }
        ],
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The <code>id</code> of the User was not found.</p> "
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "optional": false,
            "field": "DbConnectionError",
            "description": "<p>There was a problem connecting to the database</p> "
          },
          {
            "group": "Error 500",
            "optional": false,
            "field": "DbQueryError",
            "description": "<p>There was a problem accesing to the database</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Not Found\n{\n  \"code\": 403,\n  \"message\": \"Forbidden\",\n  \"description\": \"You don't have permissions to carry this action.\",\n  \"errors\": [ ]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"code\": 404,\n  \"message\": \"user not found\",\n  \"description\": \"User 6f73705d-4a8b-414a-ac8a-ec63395319cc not found\",\n  \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"code\": 1001,\n  \"message\": \"db connection error\",\n  \"description\": \"<database message>\",\n  \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"code\": 1002,\n  \"message\": \"db query error\",\n  \"description\": \"<database message>\",\n  \"errors\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/docs/users.js",
    "groupTitle": "Users"
  },
  {
    "type": "patch",
    "url": "/users/:id",
    "title": "Update user",
    "version": "1.0.0",
    "permission": [
      {
        "name": "user, admin"
      }
    ],
    "name": "UpdateUser",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the User to update (url param)</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the User (4-255 chars).</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the User (valid email address).</p> "
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the User (6-255 chars).</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "[{\n  \"op\": \"replace\",\n  \"path\": \"/username\",\n  \"value\": \"new-user-name\" \n}, {\n  \"op\": \"replace\",\n  \"path\": \"/email\",\n  \"value\": \"new-email@example.com\"\n}]",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 204": [
          {
            "group": "Success 204",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the User.</p> "
          },
          {
            "group": "Success 204",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Username of the User.</p> "
          },
          {
            "group": "Success 204",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the User.</p> "
          },
          {
            "group": "Success 204",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>Role of the User.</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 204 No Content\n{\n  \"id\": \"6f73705d-4a8b-414a-ac8a-ec63395319cc\",\n  \"username\": \"admin-user\",\n  \"email\": \"admin@example.com\",\n  \"role\": \"admin\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 401": [
          {
            "group": "Error 401",
            "optional": false,
            "field": "UnauthorizedUser",
            "description": "<p>User not authenticated</p> "
          }
        ],
        "Error 403": [
          {
            "group": "Error 403",
            "optional": false,
            "field": "ForbiddenUser",
            "description": "<p>Users can only update themselves</p> "
          }
        ],
        "Error 400": [
          {
            "group": "Error 400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>Only accepts JSON Patch</p> "
          },
          {
            "group": "Error 400",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The <code>id</code> of the User was not found.</p> "
          }
        ],
        "Error 422": [
          {
            "group": "Error 422",
            "optional": false,
            "field": "UnprocessableEntity",
            "description": "<p>Only accepts JSON Patch replace</p> "
          }
        ],
        "Error 500": [
          {
            "group": "Error 500",
            "optional": false,
            "field": "ValidatorError",
            "description": "<p>User data is not valid</p> "
          },
          {
            "group": "Error 500",
            "optional": false,
            "field": "DbConnectionError",
            "description": "<p>There was a problem connecting to the database</p> "
          },
          {
            "group": "Error 500",
            "optional": false,
            "field": "DbQueryError",
            "description": "<p>There was a problem accesing to the database</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 403 Forbidden\n{\n  \"code\": 403,\n  \"message\": \"cannot update other users\",\n  \"description\": \"Log in as the user you are trying to update\",\n  \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"code\": 400,\n  \"message\": \"use JSON Patch\",\n  \"description\": \"JSON Patch protocol: http://tools.ietf.org/html/rfc6902\",\n  \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Unprocessable Entity\n{\n  \"code\": 422,\n  \"message\": \"only replace is supported atm\",\n  \"description\": \"JSON Patch protocol: http://tools.ietf.org/html/rfc6902\",\n  \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n  \"code\": 404,\n  \"message\": \"user not found\",\n  \"description\": \"User 6f73705d-4a8b-414a-ac8a-ec63395319cc not found\",\n  \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"code\": 2001,\n  \"message\": \"validation error\",\n  \"description\": \"user validation error\",\n  \"errors\": [\n    {\n      \"param\": \"username\",\n      \"msg\": \"must have 4-255 chars\",\n      \"value\": \"ex\"\n    },\n    {\n      \"param\": \"email\",\n      \"msg\": \"must be a valid email address\",\n      \"value\": \"example-usergmail.com\"\n    }\n  ]\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"code\": 1001,\n  \"message\": \"db connection error\",\n  \"description\": \"<database message>\",\n  \"errors\": []\n}",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 500 Internal Server Error\n{\n  \"code\": 1002,\n  \"message\": \"db query error\",\n  \"description\": \"<database message>\",\n  \"errors\": []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/docs/users.js",
    "groupTitle": "Users"
  }
] });
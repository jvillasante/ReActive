'use strict';

const
  _ = require('lodash'),
  async = require('async'),
  faker = require('faker'),
  PermissionProvider = require('../data/permissionProvider').PermissionProvider,
  config = require('../config.json')[process.env.NODE_ENV || 'development'],
  permissionProvider = new PermissionProvider(config.connectionStr),
  uuids = require('./uuids');

faker.locale = "es";

exports.create = function(callback) {
  permissionProvider.removeAll(function(err) {
    if (err) { throw err; }

    let projects = [47];
    let templates = [2, 3, 7, 8, 9, 10, 11, 12, 13, 1];
    projects.forEach(function(p) {
      templates.forEach(function(t) {
        permissionProvider.userAndTemplateAndProject(uuids.users[0], uuids.projects[p], uuids.templates[t], function(err) {
          if (err) { return callback(err); }
        });
      });
    });

    projects = [56];
    templates = [2, 3, 7, 8, 9, 10, 11, 12, 13, 1];
    projects.forEach(function(p) {
      templates.forEach(function(t) {
        permissionProvider.userAndTemplateAndProject(uuids.users[1], uuids.projects[p], uuids.templates[t], function(err) {
          if (err) { return callback(err); }
        });
      });
    });

    projects = [60];
    templates = [2, 3, 7, 8, 9, 10, 11, 12, 13, 1];
    projects.forEach(function(p) {
      templates.forEach(function(t) {
        permissionProvider.userAndTemplateAndProject(uuids.users[2], uuids.projects[p], uuids.templates[t], function(err) {
          if (err) { return callback(err); }
        });
      });
    });

    projects = [26, 27, 28, 29, 30];
    templates = [2, 3, 7, 8, 9, 10, 11, 12, 13, 1];
    projects.forEach(function(p) {
      templates.forEach(function(t) {
        permissionProvider.userAndTemplateAndProject(uuids.users[3], uuids.projects[p], uuids.templates[t], function(err) {
          if (err) { return callback(err); }
        });
      });
    });

    projects = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    templates = [14, 3, 7, 8, 9, 10, 11, 12, 13, 1];
    projects.forEach(function(p) {
      templates.forEach(function(t) {
        permissionProvider.userAndTemplateAndProject(uuids.users[4], uuids.projects[p], uuids.templates[t], function(err) {
          if (err) { return callback(err); }
        });
      });
    });

    projects = [];
    templates = [2, 3, 7, 8, 9, 10, 11, 12, 13, 1];
    projects.forEach(function(p) {
      templates.forEach(function(t) {
        permissionProvider.userAndTemplateAndProject(uuids.users[5], uuids.projects[p], uuids.templates[t], function(err) {
          if (err) { return callback(err); }
        });
      });
    });

    projects = [57];
    templates = [2, 3, 7, 8, 9, 10, 11, 12, 13, 1];
    projects.forEach(function(p) {
      templates.forEach(function(t) {
        permissionProvider.userAndTemplateAndProject(uuids.users[6], uuids.projects[p], uuids.templates[t], function(err) {
          if (err) { return callback(err); }
        });
      });
    });

    projects = [59];
    templates = [2, 3, 7, 8, 9, 10, 11, 12, 13, 1];
    projects.forEach(function(p) {
      templates.forEach(function(t) {
        permissionProvider.userAndTemplateAndProject(uuids.users[7], uuids.projects[p], uuids.templates[t], function(err) {
          if (err) { return callback(err); }
        });
      });
    });

    projects = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
      27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53,
      54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
      81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105,
      106, 107, 108, 109, 110, 111, 112, 113];
    templates = [2, 3, 7, 8, 9, 10, 11, 12, 13, 1];
    projects.forEach(function(p) {
      templates.forEach(function(t) {
        permissionProvider.userAndTemplateAndProject(uuids.users[8], uuids.projects[p], uuids.templates[t], function(err) {
          if (err) { return callback(err); }
        });
      });
    });

    projects = [46, 48, 49, 50];
    templates = [2, 3, 7, 8, 9, 10, 11, 12, 13, 1];
    projects.forEach(function(p) {
      templates.forEach(function(t) {
        permissionProvider.userAndTemplateAndProject(uuids.users[9], uuids.projects[p], uuids.templates[t], function(err) {
          if (err) { return callback(err); }
        });
      });
    });

    projects = [53, 54];
    templates = [2, 3, 7, 8, 9, 10, 11, 12, 13, 1];
    projects.forEach(function(p) {
      templates.forEach(function(t) {
        permissionProvider.userAndTemplateAndProject(uuids.users[10], uuids.projects[p], uuids.templates[t], function(err) {
          if (err) { return callback(err); }
        });
      });
    });

    projects = [105, 106, 107, 108, 109, 110, 111, 112, 113];
    templates = [2, 3, 7, 8, 9, 10, 11, 12, 13, 1];
    projects.forEach(function(p) {
      templates.forEach(function(t) {
        permissionProvider.userAndTemplateAndProject(uuids.users[11], uuids.projects[p], uuids.templates[t], function(err) {
          if (err) { return callback(err); }
        });
      });
    });

    projects = [31, 32, 33, 34, 35];
    templates = [2, 3, 7, 8, 9, 10, 11, 12, 13, 1];
    projects.forEach(function(p) {
      templates.forEach(function(t) {
        permissionProvider.userAndTemplateAndProject(uuids.users[12], uuids.projects[p], uuids.templates[t], function(err) {
          if (err) { return callback(err); }
        });
      });
    });

    projects = [51, 52];
    templates = [2, 3, 7, 8, 9, 10, 11, 12, 13, 1];
    projects.forEach(function(p) {
      templates.forEach(function(t) {
        permissionProvider.userAndTemplateAndProject(uuids.users[13], uuids.projects[p], uuids.templates[t], function(err) {
          if (err) { return callback(err); }
        });
      });
    });

    projects = [96, 97, 98, 99, 100, 101, 102, 103, 104];
    templates = [2, 3, 7, 8, 9, 10, 11, 12, 13, 1];
    projects.forEach(function(p) {
      templates.forEach(function(t) {
        permissionProvider.userAndTemplateAndProject(uuids.users[14], uuids.projects[p], uuids.templates[t], function(err) {
          if (err) { return callback(err); }
        });
      });
    });

    projects = [36, 37];
    templates = [2, 3, 7, 8, 9, 10, 11, 12, 13, 1];
    projects.forEach(function(p) {
      templates.forEach(function(t) {
        permissionProvider.userAndTemplateAndProject(uuids.users[15], uuids.projects[p], uuids.templates[t], function(err) {
          if (err) { return callback(err); }
        });
      });
    });

    projects = [58];
    templates = [2, 3, 7, 8, 9, 10, 11, 12, 13, 1];
    projects.forEach(function(p) {
      templates.forEach(function(t) {
        permissionProvider.userAndTemplateAndProject(uuids.users[16], uuids.projects[p], uuids.templates[t], function(err) {
          if (err) { return callback(err); }
        });
      });
    });

    projects = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
    templates = [2, 3, 7, 8, 9, 10, 11, 12, 13, 1];
    projects.forEach(function(p) {
      templates.forEach(function(t) {
        permissionProvider.userAndTemplateAndProject(uuids.users[17], uuids.projects[p], uuids.templates[t], function(err) {
          if (err) { return callback(err); }
        });
      });
    });

    projects = [90, 91, 92, 93, 94, 95];
    templates = [2, 3, 7, 8, 9, 10, 11, 12, 13, 1];
    projects.forEach(function(p) {
      templates.forEach(function(t) {
        permissionProvider.userAndTemplateAndProject(uuids.users[18], uuids.projects[p], uuids.templates[t], function(err) {
          if (err) { return callback(err); }
        });
      });
    });

    projects = [66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89];
    templates = [2, 3, 7, 8, 9, 10, 11, 12, 13, 1];
    projects.forEach(function(p) {
      templates.forEach(function(t) {
        permissionProvider.userAndTemplateAndProject(uuids.users[19], uuids.projects[p], uuids.templates[t], function(err) {
          if (err) { return callback(err); }
        });
      });
    });

    projects = [13, 14, 15, 16, 17, 18, 19, 20, 21];
    templates = [14, 3, 7, 8, 9, 10, 11, 12, 13, 1];
    projects.forEach(function(p) {
      templates.forEach(function(t) {
        permissionProvider.userAndTemplateAndProject(uuids.users[20], uuids.projects[p], uuids.templates[t], function(err) {
          if (err) { return callback(err); }
        });
      });
    });

    projects = [22, 23, 24, 25];
    templates = [14, 3, 7, 8, 9, 10, 11, 12, 13, 1];
    projects.forEach(function(p) {
      templates.forEach(function(t) {
        permissionProvider.userAndTemplateAndProject(uuids.users[21], uuids.projects[p], uuids.templates[t], function(err) {
          if (err) { return callback(err); }
        });
      });
    });

    projects = [95];
    templates = [2, 3, 7, 8, 9, 10, 11, 12, 13, 1];
    projects.forEach(function(p) {
      templates.forEach(function(t) {
        permissionProvider.userAndTemplateAndProject(uuids.users[22], uuids.projects[p], uuids.templates[t], function(err) {
          if (err) { return callback(err); }
        });
      });
    });

    projects = [];
    templates = [2, 3, 7, 8, 9, 10, 11, 12, 13, 1];
    projects.forEach(function(p) {
      templates.forEach(function(t) {
        permissionProvider.userAndTemplateAndProject(uuids.users[23], uuids.projects[p], uuids.templates[t], function(err) {
          if (err) { return callback(err); }
        });
      });
    });

    projects = [61, 62];
    templates = [2, 3, 7, 8, 9, 10, 11, 12, 13, 1];
    projects.forEach(function(p) {
      templates.forEach(function(t) {
        permissionProvider.userAndTemplateAndProject(uuids.users[24], uuids.projects[p], uuids.templates[t], function(err) {
          if (err) { return callback(err); }
        });
      });
    });

    projects = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
      27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53,
      54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
      81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105,
      106, 107, 108, 109, 110, 111, 112, 113];
    templates = [2, 3, 7, 8, 9, 10, 11, 12, 13, 1];
    projects.forEach(function(p) {
      templates.forEach(function(t) {
        permissionProvider.userAndTemplateAndProject(uuids.users[25], uuids.projects[p], uuids.templates[t], function(err) {
          if (err) { return callback(err); }
        });
      });
    });

    projects = [114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129];
    templates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    projects.forEach(function(p) {
      templates.forEach(function(t) {
        permissionProvider.userAndTemplateAndProject(uuids.users[26], uuids.projects[p], uuids.templates[t], function(err) {
          if (err) { return callback(err); }
        });
      });
    });

    callback();
  });
};

exports.removeAll = function(callback) {
  permissionProvider.removeAll(callback);
};

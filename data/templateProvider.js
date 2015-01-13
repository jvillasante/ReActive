'use strict';

const 
  _ = require('lodash'),
  async = require('async'),
  Err = require('custom-err'),
  validator = require('validator'),
  db = require('../lib/db');

const TemplateProvider = function(connStr) {
  this.connStr = connStr;
};

TemplateProvider.prototype.findAllByUserAndProject = function(userId, projectId, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    let sql = [];
    sql.push("SELECT id, name FROM templates t");
    sql.push("INNER JOIN users_templates ut ON t.id = ut.id_template");
    sql.push("WHERE ut.id_user = $1 AND ut.id_project = $2");
    client.query(sql.join(' '), [userId, projectId], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result.rows);
    });
  });
};

TemplateProvider.prototype.findByUserAndProject = function(userId, projectId, templateId, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    let template = { sections: [] }, sql = [];
    sql.push("SELECT id, name FROM templates t");
    sql.push("INNER JOIN users_templates ut ON t.id = ut.id_template");
    sql.push("WHERE ut.id_user = $1 AND ut.id_project = $2 AND t.id = $3");
    client.query(sql.join(' '), [userId, projectId, templateId], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      if (!result.rows[0]) {
        done(client);
        return callback(Err("no such template", { code: 404, description: "Template " + templateId + " not found", errors: []}));
      }

      _.assign(template, result.rows[0]);
      sql = [];
      sql.push("SELECT id, name FROM t_sections s");
      sql.push("INNER JOIN t_templates_sections ts ON s.id = ts.id_section");
      sql.push("WHERE ts.id_template = $1");
      client.query(sql.join(' '), [template.id], function(err, result) {
        if (err) { 
          done(client);
          return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
        }
        
        async.each(result.rows, function(section, next) {
          section.subsections = [];
          sql = [];
          sql.push("SELECT id, name FROM t_subsections s");
          sql.push("INNER JOIN t_sections_subsections ss ON s.id = ss.id_subsection");
          sql.push("WHERE ss.id_section = $1");
          client.query(sql.join(' '), [section.id], function(err, result) {
            if (err) { 
              done(client);
              return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
            }
            
            let sectionNext = next;
            async.each(result.rows, function(subsection, next) {
              subsection.groups = [];
              sql = [];
              sql.push("SELECT id, name FROM t_groups g");
              sql.push("INNER JOIN t_subsections_groups sg ON g.id = sg.id_group");
              sql.push("WHERE sg.id_subsection = $1");
              client.query(sql.join(' '), [subsection.id], function(err, result) {
                if (err) { 
                  done(client);
                  return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
                }
                
                let subSectionNext = next;
                async.each(result.rows, function(group, next) {
                  group.fields = [];
                  sql = [];
                  sql.push("SELECT id, name, field_type FROM t_fields f");
                  sql.push("INNER JOIN t_groups_fields gf ON f.id = gf.id_field");
                  sql.push("WHERE gf.id_group = $1");
                  client.query(sql.join(' '), [group.id], function(err, result) {
                    if (err) { 
                      done(client);
                      return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
                    }

                    let groupNext = next;
                    async.each(result.rows, function(field, next) {
                      group.fields.push(field);
                      subsection.groups.push(group);
                      section.subsections.push(subsection);
                      template.sections.push(section);
                      next();
                    }, function(err) {
                      if (err) { done(); return callback(Err("async error", { code: 4001, description: err.message, errors: []})); }
                      groupNext();
                    });
                  });
                }, function(err) {
                  if (err) { done(); return callback(Err("async error", { code: 4001, description: err.message, errors: []})); }
                  subSectionNext();
                });
              });
            }, function(err) {
              if (err) { done(); return callback(Err("async error", { code: 4001, description: err.message, errors: []})); }
              sectionNext();
            });
          });
        }, function(err) {
          if (err) { done(); return callback(Err("async error", { code: 4001, description: err.message, errors: []})); }
          done();
          callback(null, template);
        });
      });
    });
  });
};

TemplateProvider.prototype.findAll = function(callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    client.query("SELECT id, name FROM templates", function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result.rows);
    });
  });
};

TemplateProvider.prototype.findByName = function(name, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    client.query("SELECT id, name FROM templates WHERE name=$1", [name], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result.rows);
    });
  });
};

TemplateProvider.prototype.findById = function(id, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }
    
    client.query("SELECT id, name FROM templates WHERE id=$1 LIMIT 1", [id], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result.rows[0]);
    });
  });
};

TemplateProvider.prototype.save = function(template, callback) {
  let self = this;
  
  this.validate(template, function(err, template) {
    if (err) { return callback(Err("validation error", { code: 2001, description: "template validation error", errors: err})); }

    db.connect(self.connStr, function(err, client, done) {
      if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

      if (template.id) {
        client.query("INSERT INTO templates(id, name) VALUES($1, $2) RETURNING id", [template.id, template.name], function(err, result) {
          if (err) { 
            done(client);
            return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
          }

          done();
          callback(null, result.rows[0]);
        });
      } else {
        client.query("INSERT INTO templates(name) VALUES($1) RETURNING id", [template.name], function(err, result) {
          if (err) { 
            done(client);
            return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
          }

          done();
          callback(null, result.rows[0]);
        });
      }
    });
  });
};

TemplateProvider.prototype.update = function(id, templateData, callback) {
  let self = this;
  
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }
    
    client.query("SELECT id, name FROM templates WHERE id=$1 LIMIT 1", [id], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      let template = result.rows[0];
      if (!template) {
        done(client); 
        return callback(Err("no such template", { code: 404, description: "Template " + id + " not found", errors: []}));
      }
      
      _.assign(template, templateData);
      self.validate(template, function(err, template) {
        if (err) { done(client); return callback(Err("validation error", { code: 2001, description: "template validation error", errors: err})); }

        client.query("UPDATE templates SET name=$1 WHERE id=$2 RETURNING id", [template.name, template.id], function(err, result) {
          if (err) {
            done(client);
            return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
          }

          done();
          callback(null, result.rows[0]);
        });
      });
    });
  });
};

TemplateProvider.prototype.remove = function(id, callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }
    
    client.query("DELETE FROM templates WHERE id=$1 RETURNING id", [id], function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result.rows[0]);
    });
  });
};

TemplateProvider.prototype.removeAll = function(callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }
    
    client.query("TRUNCATE templates", function(err, result) {
      if (err) { 
        done(client);
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result);
    });
  });
};

TemplateProvider.prototype.validate = function(template, callback) {
  let errors = [];

  async.parallel([
    function(next) {
      if (template.name) {
        if (!validator.isLength(template.name, 4, 255)) {
          errors.push({ param: 'name', msg: 'must have 4-255 chars', value: template.name });
        }
      }
      next();
    }
  ], function(err, results) {
    return (errors.length > 0) ? callback(errors) : callback(null, template);
  });
};

exports.TemplateProvider = TemplateProvider;

'use strict';

const
  _ = require('lodash'),
  moment = require('moment'),
  async = require('async'),
  Err = require('custom-err'),
  validator = require('validator'),
  db = require('../lib/db');

const DashboardProvider = function(connStr) {
  this.connStr = connStr;
};

DashboardProvider.prototype.findAllProjects = function(callback) {
  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    client.query("SELECT DISTINCT id, name, address, image, to_char(created_at,'YYYY-MM-DD HH24:MI:SS') AS created_at, to_char(updated_at,'YYYY-MM-DD HH24:MI:SS') AS updated_at FROM projects",
    function(err, result) {
      if (err) {
        done();
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      done();
      callback(null, result.rows);
    });
  });
};

DashboardProvider.prototype.findProjectData = function(start, end, projects, callback) {
  let data = {};
  start = moment(Number(start)).format('MM/DD/YYYY');
  end = moment(Number(end)).format('MM/DD/YYYY');

  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    async.each(projects, function(project, cb) {
      data[project] = {};

      async.parallel([
        function(next) {
          let sql = "SELECT getTable1('" + start + "','" + end + "','" + project + "');";
          client.query(sql, function(err, result) {
            if (err) { return next(Err("db query error", { code: 1002, description: err.message, errors: []})); }
            data[project].table1 = result.rows.map(function(value) { return Number(value.gettable1); });
            next();
          });
        },
        function(next) {
          let sql = "SELECT getTable2('" + start + "','" + end + "','" + project + "');";
          client.query(sql, function(err, result) {
            if (err) { return next(Err("db query error", { code: 1002, description: err.message, errors: []})); }
            data[project].table2 = result.rows.map(function(value) { return Number(value.gettable2); });
            next();
          });
        },
        function(next) {
          let sql = "SELECT getTable3('" + start + "','" + end + "','" + project + "');";
          client.query(sql, function(err, result) {
            if (err) { return next(Err("db query error", { code: 1002, description: err.message, errors: []})); }
            data[project].table3 = result.rows.map(function(value) { return Number(value.gettable3); });
            next();
          });
        },
        function(next) {
          let sql = "SELECT getBenchmarkTable('" + start + "','" + end + "','" + project + "');";
          client.query(sql, function(err, result) {
            if (err) { return next(Err("db query error", { code: 1002, description: err.message, errors: []})); }
            data[project].benchmarkTable = result.rows.map(function(value) { return Number(value.getbenchmarktable); });
            next();
          });
        }
      ], function(err) {
        console.log(err);
        cb(err);
      });
    }, function(err) {
      console.log(err);
      if (err) { done(); return callback(err); }

      done();
      callback(null, data);
    });
  });
};

DashboardProvider.prototype.findProjectDataForGraphic = function(tableNumber, start, end, project, callback) {
  let data = [];
  start = moment(Number(start)).format('MM/DD/YYYY');
  end = moment(Number(end)).format('MM/DD/YYYY');

  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    let sql;
    if (tableNumber === '1' || tableNumber === '2' || tableNumber === '3') {
      sql = "SELECT * FROM getTable" + tableNumber + "Graphic('" + start + "','" + end + "','" + project + "');";
    } else if (tableNumber === '4') {
      sql = "SELECT * FROM getBenchmarkTableGraphic('" + start + "','" + end + "','" + project + "');";
    }

    if (sql) {
      client.query(sql, function(err, result) {
        if (err) { done(); return callback(Err("db query error", { code: 1002, description: err.message, errors: []})); }

        let series = [];
        let grouped = _.groupBy(result.rows, function(row) { return row.col; });
        for (let obj in grouped) {
          if (grouped.hasOwnProperty(obj)) {
            series.push({ name: obj, data: grouped[obj].map(function(val) { return [val.thedate, val.percent]; })});
          }
        }

        done();
        callback(null, series);
      });
    } else {
      done();
      callback(null, []);
    }
  });
};//}}}

let tableItems = [
  // table1 - template2
  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
  [25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66],
  [67,68,69,70,71,72,73,74,75,76,77,78],
  [79,80,81,82,83,84,85,86,87],
  [88,89,90,91,92,93],

  // table2 - template3
  [1,3,5,7,9,11,13],
  [15,17,19,21,23,25,27,29,31,33,35,37,39,41,43],
  [45,47,49,51,53,55,57,59],
  [61,63,65,67,69,71,73,75,77],
  [79,81,83,85,87,89],
  [91,93,95,97],

  // table3 - templates 8, 9, 10, 11, 12, 13
  [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49],
  [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39],
  [1,3,5,7,9,11,13,15,17,19,21],
  [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57],
  [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37],
  [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35,37,39,41,43,45,47,49,51,53,55,57,59,61,63,65,67,69,71,73,75,77,79,81,83,85,87,89,91,93,95,97,99],
];

let reportData = [
  // table1 - template2
  [
    "Visitador de obra - Asiste",
    "Visitador de obra - Cumple",
    "Administrador de obra - Asiste",
    "Administrador de obra - Cumple",
    "Jefe de terreno - Asiste",
    "Jefe de terreno - Cumple",
    "Jefe de obra - Asiste",
    "Jefe de obra - Cumple",
    "Supervisión, capataces, jefe trazados - Asisten",
    "Supervisión, capataces, jefe trazados - Cumplen",
    "Representante de Of. Técnica - Asiste",
    "Representante de Of. Técnica - Cumple",
    "Adquisiciones (Bodega) - Asiste",
    "Adquisiciones (Bodega) - Cumple",
    "Encargado de programación - Asiste",
    "Encargado de programación - Cumple",
    "Subcontratistas - Asisten",
    "Subcontratistas - Cumplen",
    "Encargado de urbanización - Asiste",
    "Encargado de urbanización - Cumple",
    "Encargado de calidad - Asiste",
    "Encargado de calidad - Cumple",
    "Prevencionista de riesgo - Asiste",
    "Prevencionista de riesgo - Cumple",
  ],
  [
    "Registro de asistencia en acta de restricciones - Existe en formato Manquehue",
    "Registro de asistencia en acta de restricciones - Actualizado",
    "Registro de asistencia en acta de restricciones - Visible",
    "Registro del estado de restricciones - Existe en formato Manquehue",
    "Registro del estado de restricciones - Actualizado",
    "Registro del estado de restricciones - Visible",
    "Programa intermedio (lookahead) - Existe en formato Manquehue",
    "Programa intermedio (lookahead) - Actualizado",
    "Programa intermedio (lookahead) - Visible",
    "Programa semanal - Existe en formato Manquehue",
    "Programa semanal - Actualizado",
    "Programa semanal - Visible",
    "Curvas de avance (\"S\") por fases - Existe en formato Manquehue",
    "Curvas de avance (\"S\") por fases - Actualizado",
    "Curvas de avance (\"S\") por fases - Visible",
    "Gráfico de ritmos de partidas claves por la casa - Existe en formato Manquehue",
    "Gráfico de ritmos de partidas claves por la casa - Actualizado",
    "Gráfico de ritmos de partidas claves por la casa - Visible",
    "Gráfico de rendimientos de partidas claves por la casa - Existe en formato Manquehue",
    "Gráfico de rendimientos de partidas claves por la casa - Actualizado",
    "Gráfico de rendimientos de partidas claves por la casa - Visible",
    "Gráfico de rendimientos de partidas claves por subcontrato - Existe en formato Manquehue",
    "Gráfico de rendimientos de partidas claves por subcontrato - Actualizado",
    "Gráfico de rendimientos de partidas claves por subcontrato - Visible",
    "Gráfico de productividad de mano de obra partidas claves - Existe en formato Manquehue",
    "Gráfico de productividad de mano de obra partidas claves - Actualizado",
    "Gráfico de productividad de mano de obra partidas claves - Visible",
    "Seguimiento visual de avance (planos pintados) - Existe en formato Manquehue",
    "Seguimiento visual de avance (planos pintados) - Actualizado",
    "Seguimiento visual de avance (planos pintados) - Visible",
    "Gráfico cumplimiento de liberación de restricciones - Existe en formato Manquehue",
    "Gráfico cumplimiento de liberación de restricciones - Actualizado",
    "Gráfico cumplimiento de liberación de restricciones - Visible",
    "Reporte de \"Rendimiento Semanal\" - Existe en formato Manquehue",
    "Reporte de \"Rendimiento Semanal\" - Actualizado",
    "Reporte de \"Rendimiento Semanal\" - Visible",
    "Gráfico de causas de NO cumplimiento - Existe en formato Manquehue",
    "Gráfico de causas de NO cumplimiento - Actualizado",
    "Gráfico de causas de NO cumplimiento - Visible",
    "Gráfico de evolución de % de checklist autocontrol Last Planner - Existe en formato Manquehue",
    "Gráfico de evolución de % de checklist autocontrol Last Planner - Actualizado",
    "Gráfico de evolución de % de checklist autocontrol Last Planner - Visible"
  ],
  [
    "Actividades comprometidas de la semana anterior - Se sevisa",
    "Actividades comprometidas de la semana anterior - Responsable lo presenta",
    "Actividades comprometidas de la semana anterior - Responsable llega preparado",
    "Causas de desviaciones o no cumplimiento - Se identifican",
    "Causas de desviaciones o no cumplimiento - Responsable lo presenta",
    "Causas de desviaciones o no cumplimiento - Responsable llega preparado",
    "Identificación de causa raíz de causa de incumplimiento - Se identifican",
    "Identificación de causa raíz de causa de incumplimiento - Responsable lo presenta",
    "Identificación de causa raíz de causa de incumplimiento - Responsable llega preparado",
    "Propuesta de acciones correctivas inmediatas - Se proponen",
    "Propuesta de acciones correctivas inmediatas - Responsable lo presenta",
    "Propuesta de acciones correctivas inmediatas - Responsable llega preparado"
  ],
  [
    "Programa intermedio (lookahead) - Se entrega antes de la reunión",
    "Programa intermedio (lookahead) - Está actualizado",
    "Programa intermedio (lookahead) - Se analiza o revisa",
    "Restricciones - Se identifican",
    "Restricciones - Responsable las presenta",
    "Restricciones - Responsable llega preparado",
    "Gestión Restricciones - Se asigna responsable",
    "Gestión Restricciones - Responsable presente",
    "Gestión Restricciones - Gestión Restricciones"
  ],
  [
    "Programa semanal propuesto - Se entraga",
    "Programa semanal propuesto - Se revisa",
    "Programa realista - Cantidad a ejecutar clara",
    "Programa realista - Recursos a utilizar claros",
    "Compromiso de ejecutores - Se asigna responsable",
    "Compromiso de ejecutores - Responsables aceptan compromiso"
  ],

  // table2 - template3
  [
    "¿Existe sólo mobiliario necesario?",
    "¿Existe sólo documentos vigentes o necesarios?",
    "¿Existe Sector de acopio de cartones, papeles y material de envoltorios?",
    "¿Existe área de acopio de restos de materiales sobrantes?",
    "¿Existe área destinada a materiales no conformes?",
    "¿Están los materiales, repuestos, herramientas y equipos innecesarios separados de los que son necesarios?",
    "¿Están los materiales, repuestos, herramientas y equipamiento innecesarios colocados en receptáculos adecuados?"
  ],
  [
    "¿Existe sector de materiales de alta rotación?",
    "¿Existe sector de materiales de baja rotación?",
    "¿Está claramente definido Patios de acopio exterior no techado?",
    "¿Está claramente definido Patio de acopio exterior techado?",
    "¿Materiales en patios están protegido de posibles daños?",
    "¿Los materiales están debidamente clasificados y en su sitio?",
    "¿Están las herramientas debidamente clasificado, en su sitio y disponible de manera inmediata?",
    "¿La maquinaria está debidamente clasificada y en su sitio?",
    "¿Existe estante de archivadores?",
    "¿Están los documentos bien archivados?",
    "¿Existe Archivadores por separado para materiales, equipos y herramientas?",
    "¿Existe espacio adecuado para manipulación manual de materiales y herramientas?",
    "¿Existe espacio adecuado para circulación de equipos de carga (radios de giro, accesos, alturas)?",
    "¿Existen espacios adecuados para las labores en área de recepción, administración, carga y entrega de materiales?",
    "¿Existen Kit de Materiales para: Cerámicos de, fitting, artefactos y accesorios de baño y cocina, puertas y quincallería?"
  ],
  [
    "¿Lugar libre de polvo, virutas, aceite, etc., en el suelo, máquinas, techo, paredes, mobiliario, etc.?",
    "¿Equipos y estanterías están libres de oxidados o elementos estropeados?",
    "¿Espacios libres de útiles de limpieza abandonadas fuera de su sitio?",
    "¿La ropa de los trabajadores tiene buen aspecto?",
    "¿El suelo está en óptimas condiciones y libre goteras en el techo?",
    "¿Están las áreas de circulación limpias y mantenidas?",
    "¿Hay suficientes contenedores de basura para mantener limpio el lugar de trabajo? ¿Están debidamente usados?",
    "¿Está el área de acopio en patio limpia y ordenada?"
  ],
  [
    "¿Existe señalética de bodegas exteriores, patios y lugares de acopio?",
    "¿Existe la señalización y rotulación de los distintas zonas de acopio?",
    "¿Existe Rotulación de código de materiales?",
    "¿Todas las Estanterías están con su identificación?",
    "¿Existen tabla de cubicaciones de partidas principales por cada tipo de casa o dpto. para el control de entrega de materiales?",
    "¿Existe tarjetas de señalización de situaciones anómalas?",
    "¿Existen elementos visuales para controlar herramientas o equipos faltantes?",
    "¿Existen elementos visuales para advertir de reposición de materiales?",
    "¿Existen señales visuales que controlen documentación faltante?"
  ],
  [
    "¿Hay indicadores de nivel de orden y limpieza objetivos (auditorías, etc.)?",
    "¿Las tendencias de los indicadores son positivas?",
    "¿Se hace limpieza en forma sistemática?",
    "¿Se cumplen planes de mantenimiento de la bodega (safari)?",
    "¿Hay reconocimiento por las mejoras?",
    "¿Hay sanciones para los que incumplen sistemáticamente?"
  ],
  [
    "¿Están los elementos de seguridad en su sitio?",
    "¿Extintores operativos y lugar señalizado?",
    "¿Iluminación Interior Adecuada?",
    "¿Iluminación Exterior Adecuada?"
  ],

  // table3 - templates ...
  [
    "Layout de la obra ubicado en sala de reuniones - Cumple",
    "Layout de la obra ubicado en terreno, a la vista de todos los trabajadores y visitas - Cumple",
    "Layout de bodegas en obra - Cumple",
    "Tránsito y seguridad vial de peatones y vehículos - Cumple",
    "Señalética de riesgos en el área de trabajo (matriz de riesgos) - Cumple",
    "Señalética de riesgos para uso de equipos y maquinarias (matriz de riesgos) - Cumple",
    "Vías de evacuación de emergencia - Cumple",
    "Zonas de seguridad - Cumple",
    "Demarcación y señalética de ubicación para estacionamientos de subcontratos - Cumple",
    "Demarcación y señalética de ubicación para estacionamientos de visitas y equipo de obra - Cumple",
    "Ubicación de oficinas de profesionales de obra - Cumple",
    "Ubicación de baños de oficinas - Cumple",
    "Ubicación sala de reuniones - Cumple",
    "Ubicación de bodega principal - Cumple",
    "Ubicación de patio techado para almacenamiento de materiales - Cumple",
    "Ubicación de bodegas intermedias en frente de trabajo (ejemplo: lugar de descarga y almacenamiento de ladrillos) - Cumple",
    "Ubicación de comedor - Cumple",
    "Ubicación de zona de acopio de tierra - Cumple",
    "Ubicación de zona de acopio de escombros - Cumple",
    "Ubicación de zona de basura doméstica - Cumple",
    "Ubicación de zona de residuos peligrosos - Cumple",
    "Ubicación de zona de accidente - Cumple",
    "Vías de evacuación de emergencia - Cumple",
    "Zonas de seguridad incendios - Cumple",
    "Zonas de seguridad terremotos - Cumple"
  ],
  [
    "Prevención de Incendios: se cuenta con los extintores mínimos por m2 de instalación de faena - Cumple",
    "Primeros Auxilios: se cuenta con kit de primeros auxilios exigidos por la normativa - Cumple",
    "Se cuenta con Vías de Evacuación de Emergencia, acorde con el avance de obra - Cumple",
    "Se cumple con la normativa en cuando al número mínimo de duchas por trabajador - Cumple",
    "Se cumple con la normativa en cuando al número mínimo de baños por trabajador - Cumple",
    "Se cumple con la normativa en cuando al número mínimo de puntos de agua potable por trabajador - Cumple",
    "Existe análisis de cantidad mínima y máxima de m2 necesario para comedores, según cantidad de M.O. - Cumple",
    "Se cumple con la normativa en cuando al número camarines o lugares disponibles para uso de trabajadores y/o subcontratos - Cumple",
    "Se cuenta con Zonas de Seguridad (Incendios, Terremotos, etc - Cumple)",
    "Caseta de Control de Acceso con Estándar Sello Manquehue - Cumple",
    "Caseta de Control de Acceso : Guardia Inducido por RRHH en los procedimientos Manquehue de Ingreso - Cumple",
    "Cierres provisorios con Estándar Manquehue (Altura mínima, materialidad, color, etc - Cumple)",
    "Existe un análisis de la probabilidad de falla del sistema de wi-fi - Cumple",
    "Existe un plan para mitigar la probabilidad de falla del wi-fi - Cumple",
    "Existe un análisis de la probabilidad de falla del abastecimiento de electricidad desde empalmes (es decir, no de generadores) - Cumple",
    "Existe un plan para mitigar la probabilidad de falla abastecimiento de electricidad desde empalmes (es decir, no de generadores) - Cumple",
    "Existe un análisis de la probabilidad de lluvia en la zona donde se ubica la obra - Cumple",
    "Existe un plan para mitigar la probabilidad de lluvia en la zona donde se ubica la obra - Cumple",
    "Existe un análisis de la probabilidad de fuertes vientos que puedan afectar las instalaciones de la obra - Cumple",
    "Existe un plan para mitigar la probabilidad de fuertes vientos que puedan afectar las instalaciones de la obra - Cumple"
  ],
  [
    "Definición de radios de giro mínimos y máximos - Cumple",
    "Definición de Altura - Cumple",
    "Definición de Ancho - Cumple",
    "Definición de materialidad de la carpeta (Ripio? Tierra? Pavimentado? Asfaltado? Riego Asfálfito?) - Cumple",
    "Definición de rutas internas (layout de las vías) - Cumple",
    "Definición de cómo será el acceso a bodega (ruta, zona de carga/descarga y caracterísiticas anteriormente señaladas) - Cumple",
    "Definición de programa de cambio de vías, según avance de obra - Cumple",
    "Estimación de tiempo desde control de acceso hasta bodega y/o frente de trabajo - Cumple",
    "Existe plan de mantención (riego diario con agua? Sellante de carpeta antipolvo?) y el tipo de acceso (tierra? Ripio? Pavimentado?) - Cumple",
    "Definición de ubicación de reductores de velocidad - Cumple",
    "Vías de acceso se cruzan y no interfieren con el programa de urbanización - Cumple"
  ],
  [
    "Definición de cantidad de Frentes de Trabajo - Cumple",
    "Definición número de cuadrillas, materiales. maquinaria, equipo y otros recursos necesarios, para cumplir ritmo programado - Cumple",
    "Existen al menos 3 alternativas de plan de ataque, es decir, si será en serie o en paralelo, o si serán 1, 2,...n frentes de trabajo - Cumple",
    "Estimación del ritmo de trabajo de especialidades de O.G., según sea el frente de trabajo - Cumple",
    "Estimación del ritmo de trabajo de especialidades de Terminaciones, según sea el frente de trabajo - Cumple",
    "Carga de trabajo por cuadrilla y capataz - Cumple",
    "Secuencia constructiva - Cumple",
    "Definición del lugar dónde se percharán los materiales de techumbre (tejas) en frente de trabajo - Cumple",
    "Definición del lugar dónde se percharán los ladrillos en frente de trabajo - Cumple",
    "Definición del lugar dónde se perchará la enfierradura en frente de trabajo - Cumple",
    "Definición de ubicación de bodegas intermedias para materiales de terminaciones - Cumple",
    "Definición de cuidado de materiales de terminación en terreno - Cumple",
    "Definición de la ubicación y cantidad de postes de electricidad - Cumple",
    "Definición de los puntos de agua en los diferentes puntos del frente de trabajo - Cumple",
    "Definición de los puntos de electricidad en los diferentes puntos del frente de trabajo - Cumple",
    "Análisis de variabilidad de las partidas de trabajo - Cumple",
    "Definición de cuáles son las partidas críticas de obra - Cumple",
    "Definición de cuánta holgura tienen cada una de las partidas críticas - Cumple",
    "Definición de cuáles son los ritmos de trabajo para las partidas críticas - Cumple",
    "Tiempo estimado promedio diario de transporte entre frente de trabajo y baños - Cumple",
    "Tiempo estimado promedio diario de transporte entre frente de trabajo y duchas - Cumple",
    "Tiempo estimado promedio diario de transporte entre frente de trabajo y comedor - Cumple",
    "Se cuenta con Bodegas intermedias entre la bodega principal y el frente de trabajo - Cumple",
    "Existe análisis de tiempo de transporte entre Bodega Principal y Bodegas Intermedias con el Frente de Trabajo - Cumple",
    "Ubicación del reloj control para posterior análsis de transportes internos y tiempos de traslado - Cumple",
    "Existe análisis de HH perdidas en por transportes o traslados - Cumple",
    "Estimación de rendimientos - Cumple",
    "Existe análisis de costos asociados HH perdidas en por trabajos re-hecho - Cumple",
    "Existe análisis de costos asociados HH perdidas en por transportes o traslados - Cumple"
  ],
  [
    "Existe zona de acopio de tierra - Cumple",
    "Existe zona de acopio de escombros - Cumple",
    "Existe zona de acopio de basura - Cumple",
    "Demarcación zona de acopio de tierra - Cumple",
    "Demarcación zona de acopio de escombros - Cumple",
    "Demarcación zona de acopio de basura doméstica - Cumple",
    "Tierra: Existe análisis de tiempo de transporte desde zona de acopio hasta Frente de Trabajo - Cumple",
    "Escombros: Existe análisis de tiempo de transporte desde zona de acopio hasta Frente de Trabajo - Cumple",
    "Basura: Existe análisis de tiempo de transporte desde zona de acopio hasta Frente de Trabajo e Instalación de Faenas - Cumple",
    "Cuantificación de cuántos m3 de tierra de son capaces de almacenarse en la zona de acopio de tierra - Cumple",
    "Cuantificación de cuántos m3 de escombros son capaces de almacenarse en la zona de acopio de escombros - Cumple",
    "Cuantificación de cuántos m3 de basura cotidiana son capaces de almacenarse en la zona de acopio de basura doméstica - Cumple",
    "Vertedero (o destino final) de la tierra - Cumple",
    "Botadero final de escombros - Cumple",
    "Vertedero donde se destinará la basura doméstica - Cumple",
    "Cuantificación de la cantidad y frecuencia de camiones semanales a contratar, necesaria para el retiro de tierra (para la fase en que se encuentre la obra) - Cumple",
    "Cuantificación de la cantidad y frecuencia de camiones semanales a contratar, necesaria para el retiro de escombros (para la fase en que se encuentre la obra) - Cumple",
    "Cuantificación de la cantidad y frecuencia de camiones semanales a contratar, necesaria para el retiro de basura cotidiana (para la fase en que se encuentre la obra) - Cumple",
    "Existe estimación de ahorro monetario por separación de la tierra de los escombros y basura doméstica - Cumple"
  ],
  [
    "ES LA INDICADA POR CATALOGO SELLO MANQUEHUE, PINTADA GRIS, CUATRICROMIA",
    "UBICADA CON VENTANA HACIA INGRESO DE PEATONES Y PREFERENTEMENTE PARALELA AL SENTIDO DE INGRESO DE TRANSITO",
    "LIMPIA, SIN CARTELES O ELEMENTOS NO AUTORIZADOS EN SUS PAREDES.",
    "CLOSET CASCOS PARA VISITAS",
    "CASILLEROS",
    "MASA LABORAL(SUBC Y CASA)",
    "10 CASCOS BLANCOS Y 10 CASCOS GRISES EN CLOSET",
    "kit de primeros auxilios exigidos por la normativa HABILITADO",
    "PERSONAL EN OBRA COMPETENTE PARA ASISTIR PRIMEROS AUXILIOS",
    "PORTERO ENTRENADO CUMPLE PROCEDIMIENTO DE ACCESO",
    "MEDIO DE CONTROL DE POLVO",
    "TARJETAS DE ACCESO / CREDENCIAL DE ACCESO",
    "KANBAN DE ACCESO",
    "CIERRE RIGIDO MALLA ACMA",
    "PORTON DE ACCESO DE CIERRE ACMA",
    "MALLA RASCHEL GRIS GRAFITO EN TODO EL PERIMETRO Y EN BUEN ESTADO",
    "CIERRE DE ALTURA ADECUADA Y PANTALLAS SEGÚN SEA CONTIGUA A ZONAS HABITADAS",
    "LETRERO DE ACERCAMIENTO: INSTALADO, VISIBLE, EN BUEN ESTADO",
    "LETRERO ACCESO A OBRA: INSTALADO, VISIBLE, EN BUEN ESTADO.",
    "OFICINAS",
    "COMEDOR",
    "BAÑOS",
    "CAMARINES",
    "ESTACIONAMIENTO VISITAS",
    "ESTACIONAMIENTO SUBCONTRATISTAS",
    "BODEGA",
    "BASURA DOMICILIARIA",
    "LETREROS EN BUEN ESTADO DE CONSERVACION",
    "LETREROS UBICADOS EN TODOS LOS FRENTES DE TRABAJO Y BIEN DISTRIBUIDOS  POR AREAS DE AVANCE",
    "LETREROS DE AUTOCONTROL DE CALIDAD",
    "LETREROS DE PRODUCTIVIDAD",
    "LETEROS DE PREVENCION DE RIESGOS Y MEDIOAMBIENTE",
    "STATUS PLAN DE INDUCCION MANQUEHUE SOBRE 75%",
    "STICKERS PDR EN CASCOS",
    "STICKERS RRHH  EN CASCOS",
    "STICKERS DE AUTOCONTROL EN CASCOS",
    "STICKERS DE MEJORA CONTINUA EN CASCOS",
    "LICENCIAS DE ACCESO TODO EL EQUIPO",
    "CONECTIVIDAD A INTERNET EFECTIVA",
    "CASCOS MANQUEHUE",
    "CASCOS SUBCONTRATOS",
    "CHALECOS GEOLOGOS TERRENO",
    "POLERA MAESTROS",
    "CREDENCIAL MANQUEHUE",
    "CREDENCIAL SUBCONTRATO",
    "BASUREROS SEGÚN TABLA MINIMA CATALOGO",
    "LIMPIEZA EFECTIVA DE CONTENEDORES A BOTADERO",
    "ZONAS DE ESTACIONAMIENTO SUBCONTRATOS SIN BASURA",
    "OBRA RECOLECTA Y RETIRA BASURA DOMICILIARIA EN FAENA",
    "OBRA RECOLECTA Y RETIRA BASURA DOMICILIARIA EN FAENA",],
];

DashboardProvider.prototype.findProjectReports = function(templateId, col, start, end, project, callback) {
  templateId = Number(templateId);
  col = Number(col);
  start = moment(Number(start)).format('MM/DD/YYYY');
  end = moment(Number(end)).format('MM/DD/YYYY');

  db.connect(this.connStr, function(err, client, done) {
    if (err) { return callback(Err("db connection error", { code: 1001, description: err.message, errors: []})); }

    let sql = ["SELECT u.username AS username, u.photo AS userImage,"];
    sql.push("r.id AS reportId, r.title AS reportTitle, to_char(r.created_at, 'YYYY-MM-DD') AS created, to_char(r.updated_at, 'YYYY-MM-DD') AS updated,");
    sql.push("v.item AS item, v.value AS value");
    sql.push("FROM values v INNER JOIN fields f ON f.id = v.id_field");
    sql.push("INNER JOIN reports r ON r.id = f.id_report");
    sql.push("INNER JOIN users u ON u.id = r.id_user");
    sql.push("INNER JOIN projects p ON p.id = r.id_project");
    sql.push("WHERE r.id_template = $1 AND (r.updated_at::date BETWEEN $2 AND $3)");
    sql.push("AND p.name = $4");
    sql.push("AND v.item IN (" + tableItems[col].join(',') + ")");

    client.query(sql.join(' '), [templateId, start, end, project], function(err, result) {
      if (err) {
        done();
        return callback(Err("db query error", { code: 1002, description: err.message, errors: []}));
      }

      let reports = [];
      let grouped = _.groupBy(result.rows, function(row) { return row.reportid; });
      for (let obj in grouped) {
        if (grouped.hasOwnProperty(obj)) {
          reports.push({
            title: grouped[obj][0].reporttitle,
            created: moment(grouped[obj][0].created).format('DD/MM/YYYY'),
            updated: moment(grouped[obj][0].updated).format('DD/MM/YYYY'),
            userImage: grouped[obj][0].userimage,
            userName: grouped[obj][0].username,
            data: grouped[obj].map(function(val) {
              let question = reportData[col][tableItems[col].indexOf(val.item)];
              let className = "badge ";
              if (val.value.toLowerCase() === "si") {
                className += "progress-bar-info";
              } else if (val.value.toLowerCase() === "no") {
                className += "progress-bar-danger";
              } else {
                className += "progress-bar-warning";
              }
              return {
                question: question,
                answer: val.value,
                className: className
              };
            })
          });
        }
      }

      done();
      callback(null, reports);
    });
  });
};

exports.DashboardProvider = DashboardProvider;

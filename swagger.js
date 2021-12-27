// CONFIG FOR SWAGER DOCS
module.exports.swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Employee Management System",
        version: "1.0.0",
        description: "Api for employee management system",
        contact: {
          name: "Syed Zain Ali Bokhari",
          email: "zain.ali@invozone.com",
        },
        servers: ["http://localhost:3000"],
      },
    },
    apis: ["./routes/*.js"],
  };
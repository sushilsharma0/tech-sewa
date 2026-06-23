module.exports = {
  apps: [
    {
      name: "techsewa-api",
      cwd: "./backend",
      script: "dist/server.js",
      instances: "max",
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production"
      },
      max_memory_restart: "512M",
      error_file: "../logs/api-error.log",
      out_file: "../logs/api-out.log"
    }
  ]
};

const path = require('path');

module.exports = {
  apps: [
    {
      name: 'AI-Lab',
      script: path.join(__dirname, 'node_modules', 'next', 'dist', 'bin', 'next'),
      args: 'start',
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      interpreter: 'node'
    }
  ]
}


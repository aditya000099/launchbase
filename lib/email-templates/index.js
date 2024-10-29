const templates = {
  welcome: {
    subject: 'Welcome to Launch Base! 🚀',
    html: (username) => `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            /* Add your email styles here */
          </style>
        </head>
        <body>
          <div class="email-container">
            <h1>Welcome to Launch Base, ${username}!</h1>
            <p>We're excited to have you on board. Here's what you can do next:</p>
            <ul>
              <li>Explore our dashboard</li>
              <li>Set up your profile</li>
              <li>Check out our documentation</li>
            </ul>
          </div>
        </body>
      </html>
    `
  },
  passwordReset: {
    subject: 'Password Reset Request',
    html: (resetLink) => `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            /* Add your email styles here */
          </style>
        </head>
        <body>
          <div class="email-container">
            <h1>Password Reset Request</h1>
            <p>Click the button below to reset your password:</p>
            <a href="${resetLink}" class="button">Reset Password</a>
          </div>
        </body>
      </html>
    `
  }
};

export default templates; 
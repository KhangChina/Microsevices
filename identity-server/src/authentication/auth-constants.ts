const authConstants = {
    jwt: {
      secret: 'XkoVE93o4qLrYZQcj8ZLuOxOHSi0nHuk13BOVyOK8R82fiFeaQ',
      expirationTime: {
        accessToken: '1d',
        refreshToken: '7d',
      },
      secrets: {
        accessToken: '4R9p6aMoNwGp3VKQLidm9PM59wo1Vr5SU6mOXswuhiuGTDKn7C',
        refreshToken: '4694YvkAnJZpi3YP7Og0Kgjj4dG83Fa0tW0DjvDy7hL8zBxPCY',
      },
    },
    mailer: {
      verifyEmail: {
        subject: 'Email Verification',
        template: `${process.cwd()}/dist/templates/verify-password`,
      },
      createNewPassword: {
        subject: 'Create Password',
        template: `${process.cwd()}/dist/templates/create-password`,
      },
      selectHost: {
        subject: 'Select Host in Platform',
        template: `${process.cwd()}/dist/templates/select-host`,
      },
    },
    mailgunConfig: {
      api: '51f39008110e6a451f887b9858de6b5f-45f7aa85-0c8ebf1b',
      domain: 'no-reply.scx.digital',
      host: 'api.mailgun.net',
    },
  };
  
  export default authConstants;

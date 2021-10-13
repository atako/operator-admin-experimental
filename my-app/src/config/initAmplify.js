import Amplify from 'aws-amplify'

// Amplify.Logger.LOG_LEVEL = 'DEBUG'

const init = ({ accessToken }) => {
  try {
    Amplify.configure({
      API: {
        endpoints: [
          {
            name: process.env.REACT_APP_API_ENDPOINT_NAME,
            region: process.env.REACT_APP_AWS_REGION,
            endpoint: process.env.REACT_APP_API_ENDPOINT,
            custom_header: async () => {
              return {
                Authorization: `Bearer ${accessToken}`,
              }
            },
          },
        ],
      },
    })
  } catch (err) {
    console.log(err)
  }
}

export default init

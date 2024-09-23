import { app } from './src/app'

/**
 * Port number for the server to listen on.
 * Default is 3002, can be overridden with the PORT environment variable.
 */
const PORT = process.env.PORT || 3002

/**
 * Start the server and listen on the specified port.
 */
app.listen(PORT, () =>
  console.log(`Server is running in http://localhost:${PORT}`),
)

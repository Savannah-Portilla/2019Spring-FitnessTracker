module.exports = {
    port: process.env.PORT || 8080,
    db: {
        database: process.env.portills1_db || '2019Spring-FitnessTracker',
        user: process.env.portills1_db || '2019Spring-FitnessTracker',
        password: process.env.portills1_db || '2019Spring-FitnessTracker',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            host: process.env.HOST || 'localhost',
            storage: './2019Spring-FitnessTracker.sqlite'

        }
    }
}

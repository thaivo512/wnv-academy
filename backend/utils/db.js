const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'ec2-3-211-167-220.compute-1.amazonaws.com',
        user: 'scrlzhmfijhmrf',
        password: '6bc8cee4449096d4859ce59f316213112d70e96b863f30d3b94ddfcc8803e109',
        database: 'd3lls1km7hgpeo',
        port: 5432,
        ssl: { rejectUnauthorized: false }
    },
    pool: {
        min: 0,
        max: 50
    }
});

module.exports = knex;
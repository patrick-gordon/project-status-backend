const db = require('./dbConfig')

module.exports = {
    add,
    find,
    findBy,
    findById,
    findByUser,
    updateById,
}

async function add(user) {
    const [id] = awaitdb("users").insert(user);
    return findById(id);
}

// async function find() {
//     const users = await db("users");

//     const 
// }

function findBy(filter) {
    return db("users").where(filter);
}


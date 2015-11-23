module.exports = function(Issue) {
    Issue.createFakeData = function (faker) {
        return Issue.create({
            project: {
                name: faker.name.findName()
            },
            type: {
                name: 'Type'
            },
            summary: faker.lorem.words(),
            assignee: faker.internet.userName(),
            author: faker.internet.userName(),
            created: faker.date.past()
        });
    }
};

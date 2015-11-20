'use strict';

module.exports = function (Workflow) {

    Workflow.createFakeData = function (faker) {
        return Workflow.create({
            title: faker.lorem.sentence(),
            body: faker.lorem.paragraph()
        });
    }

};

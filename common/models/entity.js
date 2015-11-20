module.exports = function (Entity) {

    Entity.observe('before delete', function (context, next) {

        var Field = context.Model.app.models.Field;
        Field.find({
            where: {
                entityId: context.where.id
            }
        }, function (err, fields) {
            fields.forEach(function (field) {
                Field.destroyById(field.id);
            });
        });
        next();
    });

};

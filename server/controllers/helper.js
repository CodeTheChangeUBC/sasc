exports.checkBlankRequiredFields = function (obj) {
    var requiredFieldsBlankError = false;

    Object.keys(obj).forEach(function (property) {
        if (property === null || property === undefined || property === "") {
            requiredFieldsBlankError = true;
        }
    });

    return requiredFieldsBlankError;
}
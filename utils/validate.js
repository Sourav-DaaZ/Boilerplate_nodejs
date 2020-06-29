const Validator = require('validatorjs');
const validator_function = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};
const validator = (req_data,res,rules,callback) => {
    validator_function(req_data, rules, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        }
        else{
            callback();
        }
    });
}
module.exports = validator;
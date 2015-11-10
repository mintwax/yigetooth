var Contact = require('../app/models/Contact'),
    md5 = require('md5');

module.exports = {
    index: function(req, res) {
        Contact.Contact.find({}, function(err, data) {
            res.json(data);
        });
    },
    getById: function(req, res) {
        Contact.Contact.find({ _id: req.params.id }, function(err, contact) {
            if (err) {
                res.json({error: 'Contact not found.'});
            } else {
                res.json(contact);
            }
        });
    },
    add: function(req, res) {
        var newContact = new Contact.Contact(req.body);
        newContact.gravatar = md5(newContact.email);
        newContact.save(function(err, contact) {
            if (err) {
                res.json({error: 'Error adding contact.'});
            } else {
                res.json(contact);
            }
        });
    },
    // update: function(req, res) {
    //     console.log(req.body);
    //     models.Contact.update({ _id: req.body.id }, req.body, function(err, updated) {
    //         if (err) {
    //             res.json({error: 'Contact not found.'});
    //         } else {
    //             res.json(updated);
    //         }
    //     })
    // },
    delete: function(req, res) {
        Contact.Contact.findOne({ _id: req.params.id }, function(err, contact) {
            if (err) {
                res.json({error: 'Contact not found.'});
            } else {
                contact.remove(function(err, contact){
                    res.json(200, {status: 'Success'});
                })
            }
        });
    }
};

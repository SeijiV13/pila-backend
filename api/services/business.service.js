
var businessData = [
    {
        id: 1,
        name: 'Mcdo',
        userId: 'mcdo-group',
        category: 'Fast foor',
        dateCreated: '11/10/2018',
        dateModified: '11/20/2018'
    }
];

exports.getBusiness = (args) => {
    var id = args.id;
    return businessData.filter(course => {
        return course.id == id;
    })[0];
}


exports.getAllBusiness = (args) => {
    if (args.topic) {
        var topic = args.topic;
        return businessData.filter(course => course.topic === topic);
    } else {
        return businessData;
    }
}
const Dev = require('../models/Dev');

module.exports = {
    async create(request, response) {
        const {user} = request.headers;
        const {devId} = request.params;

        let loggedDev = null;
        let targetDev = null;

        try {
            loggedDev = await Dev.findById(user);
            targetDev = await Dev.findById(devId);
        }
        catch(e) {
            return response.status(400).json({error: e.name});
        }

        if (!targetDev) 
            return response.status(400).json({error: 'Developer does not exist in database'});

        if (targetDev.likes.includes(loggedDev._id))
            console.log('match')

        loggedDev.likes.push(targetDev._id);

        await loggedDev.save();

        return response.send(loggedDev);
    }
};
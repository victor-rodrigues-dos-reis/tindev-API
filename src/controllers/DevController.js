const axios = require('axios');
const Dev = require('../models/Dev')

module.exports = {
    // Cadastra o Dev no banco
    async create(request, response) {
        const {username} = request.body;
        const userExists = await Dev.findOne({user: username});
        let githubResponse;

        // Verifica se o desenvolvedor já está cadastrado no banco de dados
        if (userExists)
            return response.json(userExists);

        else {
            // Verifica que a pesquisa no GitHub ocorreu corretamente
            try {
                // Pega as informações do desenvolvedor no GitHub
                githubResponse = await axios.get(`https://api.github.com/users/${username}`)
                    // Se ocorrer algum erro executa essa função
                    .catch((error) => {
                            throw error // Joga as informações de erro para o catch do Try/Catch

                    });
            }
            catch(error) {
                // Caso o usuário não for encontrado no GitHub retorna um erro
                if (error.response.status == 404)
                    return response.status(404).json({'error': 'Developer not found on GitHub'})
            }

            const {name, bio, avatar_url:avatar} = githubResponse.data;

            // Cadastra o desenvolvedor no banco
            const dev = await Dev.create({
                name,
                user: username,
                bio,
                avatar
            });

            return response.json(dev);
        }
    },

    // Mostra todos os Devs que o usuário não deu like nem dislike
    async index(request, response) {
        const {user} = request.headers;
        let loggedDev;
        
        // Verifica se ocorreu tudo certo na hora de encontrar o usuário no banco
        try {
            loggedDev = await Dev.findById(user)
                .catch((error) => {
                    throw error;
                });

        }
        catch(error) {
            if (error.name == 'CastError')
                return response.status(400).json({'error': `${error.value} is not a valid _id`})
        }

        // Verifica se o usuário existe no banco
        if (loggedDev) {
            const users = await Dev.find({
                // Filtro para não vir os Devs que já tenha
                // dado like, dislike e que sejá o usuário logado
                $and: [
                    {_id: {$ne: loggedDev._id}},        // $ne significa "Not Equal"
                    {_id: {$nin: loggedDev.likes}},     // $nin significa "Not inside / Not in" 
                    {_id: {$nin: loggedDev.dislikes}}
                ]
            });

            return response.json(users);

        }
        else
            return response.status(404).json({'error': 'Developer does not exist in database'})
    }
};
const {Schema, model} = require('mongoose');

// Criação da estrutura da tabela Dev
const DevSchema = new Schema(
    {
    name: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    bio: String,
    avatar: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,   // Adiciona a criação automática das colunas "createdAt" e "updateAt"
});

module.exports = model('Dev', DevSchema);
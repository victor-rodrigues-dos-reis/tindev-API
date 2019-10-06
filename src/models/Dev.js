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
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev'  // Referencia para um dado da tabela 'Dev' (É tipo uma chave estrangeira)
    }],
    dislikes: [{
        type: Schema.Types.ObjectId,
        ref: 'Dev'  // Referencia para um dado da tabela 'Dev' (É tipo uma chave estrangeira)
    }]
}, {
    timestamps: true,   // Adiciona a criação automática das colunas "createdAt" e "updateAt"
});

module.exports = model('Dev', DevSchema);
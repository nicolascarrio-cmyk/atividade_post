
import express from 'express';
import type { Request, Response } from 'express';
import { readFileSync } from 'fs';
import path from 'path';

const app = express();

app.use(express.json());

interface LoginBody {
    usuario: string;
    senha: string;
}

app.post('/login', (req: Request, res: Response) => {
    try {
        const { usuario, senha } = req.body as LoginBody;

        if (
            typeof usuario !== 'string' || usuario.trim() === '' ||
            typeof senha !== 'string' || senha.trim() === ''
        ) {
            return res.status(400).json({
                erro: 'Informe o usuário e a senha.'
            });
        }

        // Lê o arquivo JSON
        const caminho = path.join(__dirname, '../dados.json');

        const arquivo = readFileSync(caminho, 'utf-8');

        const dados = JSON.parse(arquivo) as LoginBody;

        // Verifica os dados
        if (
            usuario === dados.usuario &&
            senha === dados.senha
        ) {
            return res.status(200).json({
                mensagem: 'Login realizado com sucesso!',
                usuario: usuario
            });
        }

        return res.status(401).json({
            erro: 'Usuário ou senha incorretos.',
            usuario: usuario
        });

    } catch (erro) {
        return res.status(500).json({
            erro: 'Erro interno do servidor.'
        });
    }
});

app.use((erro: any, req: Request, res: Response, next: any) => {
    if (erro instanceof SyntaxError && 'status' in erro && erro.status === 400) {
        return res.status(400).json({
            erro: 'JSON inválido.'
        });
    }

    return res.status(500).json({
        erro: 'Erro interno do servidor.'
    });
});

app.listen(3003, () => {
    console.log('Servidor 3 rodando na porta 3003');
});

import express from 'express';
import type { Request, Response } from 'express';
const app = express();

app.use(express.json());

interface MensagemBody {
    nome: string;
    idade: number;
    time: string;
}

app.post('/mensagem', (req: Request, res: Response) => {
    try {
        const { nome, idade, time } = req.body as MensagemBody;

        if (
            typeof nome !== 'string' || nome.trim() === '' ||
            typeof time !== 'string' || time.trim() === '' ||
            typeof idade !== 'number' || !Number.isFinite(idade) ||
            idade < 0
        ) {
            return res.status(400).json({
                erro: 'Informe nome, idade e time corretamente.'
            });
        }

        const mensagem = `Olá, ${nome}! Você tem ${idade} anos e torce para o ${time}!`;

        return res.status(200).json({
            mensagem: mensagem
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

app.listen(3001, () => {
    console.log('Servidor 1 rodando na porta 3001');
});

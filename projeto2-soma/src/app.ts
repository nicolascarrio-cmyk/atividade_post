import express from 'express';
import type { Request, Response } from 'express';

const app = express();

app.use(express.json());

interface SomaBody {
    numero1: number;
    numero2: number;
    numero3: number;
}

app.post('/soma', (req: Request, res: Response) => {
    try {
        const { numero1, numero2, numero3 } = req.body as SomaBody;

        if (
            typeof numero1 !== 'number' || !Number.isFinite(numero1) ||
            typeof numero2 !== 'number' || !Number.isFinite(numero2) ||
            typeof numero3 !== 'number' || !Number.isFinite(numero3)
        ) {
            return res.status(400).json({
                erro: 'Informe três valores numéricos válidos.'
            });
        }

        const resultado = numero1 + numero2 + numero3;

        return res.status(200).json({
            numero1,
            numero2,
            numero3,
            resultado
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

app.listen(3002, () => {
    console.log('Servidor 2 rodando na porta 3002');
});

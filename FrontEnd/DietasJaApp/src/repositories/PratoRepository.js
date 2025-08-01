import { PratoService } from '../services/PratoService';

class PratoRepository {
    static instance = null;

    constructor() {
        if (PratoRepository.instance) {
            return PratoRepository.instance;
        }
        PratoRepository.instance = this;
    }

    static getInstance() {
        if (!PratoRepository.instance) {
            PratoRepository.instance = new PratoRepository();
        }
        return PratoRepository.instance;
    }
    /**
     * Busca a lista de alimentos.
     */
    async getAlimentos() {
        try {
            const response = await PratoService.getAlimentos();
            if (response.status === 200) {
                return response.data.map(item => ({
                    id: item.id,
                    nome: item.nome,
                    quantidade: item.porcao,
                    kcal: (item.qtd_calorias / 1000).toFixed(2),
                    proteinas: item.qtd_proteinas,
                    carboidratos: item.qtd_carboidratos,
                    gorduras: item.qtd_gorduras,
                }));
            }
            return [];
        } catch (error) {
            console.log('Erro no repositório ao buscar alimentos: ', error);
            throw error;
        }
    }

    /**
     * Adiciona um novo alimento.
     * @param {object} novoPratoData - Os dados do novo prato.
     */
    async addAlimento(novoPratoData) {
        // A responsabilidade é apenas passar os dados para o Service.
        return PratoService.addAlimento(novoPratoData);
    }

    /**
     * Deleta um alimento pelo seu ID.
     * @param {number} idAlimento - O ID do alimento a ser deletado.
     */
    async deleteAlimento(idAlimento) {
        return PratoService.deleteAlimento(idAlimento);
    }
}

// Exporta a instância única para ser usada em todo o app.
export default PratoRepository.getInstance();
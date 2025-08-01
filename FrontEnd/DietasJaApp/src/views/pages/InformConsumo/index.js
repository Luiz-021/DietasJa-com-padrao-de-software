import { View, Text, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Button, List, Title, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import styles from './styles';
import { useInformarConsumoViewModel } from '../../../viewModels/InformarConsumoViewModel';

const InformarConsumoScreen = () => {
    const {
        filtroAlimentos, setFiltroAlimentos,
        alimentosFiltrados,
        alimentosSelecionados,
        alimentoSelecionado,
        quantidadeAlimento, setQuantidadeAlimento,
        nomeRefeicao, setNomeRefeicao,
        mostrarCampoRefeicao,
        selecionarAlimentoDaLista,
        adicionarAlimentoNaRefeicao,
        limparTudo,
        concluirRefeicao
    } = useInformarConsumoViewModel();

    const theme = {
        ...DefaultTheme,
        colors: { ...DefaultTheme.colors, primary: '#38acbe' },
    };

    const renderAlimentoSelecionado = ({ item }) => (
        <List.Item
            title={item.nome}
            description={`${item.porcao}g - ${(item.qtd_calorias / 1000).toFixed(2)} kcal`}
            style={[styles.listItem, styles.listItemSelecionado]}
            titleStyle={styles.listItemTitle}
            descriptionStyle={styles.listItemDescription}
        />
    );

    return (
        <PaperProvider theme={theme}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <View style={styles.header}>
                    <Title style={styles.title}>Informar Consumo</Title>
                </View>

                {mostrarCampoRefeicao && (
                    <>
                        <Text style={styles.titleRefeicao}>Nome da Refeição</Text>
                        <TextInput
                            style={styles.inputBusca}
                            value={nomeRefeicao}
                            placeholder="Ex: Almoço de Domingo"
                            placeholderTextColor={'#B0B0B0'}
                            onChangeText={setNomeRefeicao}
                        />
                    </>
                )}
                
                <Text style={styles.titleRefeicao}>Selecione os alimentos consumidos</Text>
                <TextInput
                    style={styles.inputBusca}
                    placeholder="Pesquise e adicione um alimento"
                    placeholderTextColor={'#B0B0B0'}
                    value={filtroAlimentos}
                    onChangeText={setFiltroAlimentos}
                />

                <FlatList
                    style={styles.alimentosList}
                    data={alimentosFiltrados()}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <List.Item
                            title={item.nome}
                            description={`${item.porcao}g - ${(item.qtd_calorias / 1000).toFixed(2)} kcal`}
                            style={styles.listItem}
                            onPress={() => selecionarAlimentoDaLista(item)}
                        />
                    )}
                />

                {alimentoSelecionado && (
                    <>
                        <TextInput
                            style={styles.inputQuantidade}
                            value={quantidadeAlimento}
                            onChangeText={setQuantidadeAlimento}
                            keyboardType="numeric"
                            placeholder="Digite a quantidade (ex: 1, 2, 3...)"
                        />
                        <Button mode="contained" onPress={adicionarAlimentoNaRefeicao} style={styles.button}>
                            Adicionar
                        </Button>
                    </>
                )}

                {alimentosSelecionados.length > 0 && (
                    <>
                        <Text style={styles.listaAlimentosTitulo}>Alimentos Selecionados: {nomeRefeicao}</Text>
                        <FlatList
                            style={styles.alimentosSelecionadosList}
                            data={alimentosSelecionados}
                            keyExtractor={(item) => item.key}
                            renderItem={renderAlimentoSelecionado}
                        />
                    </>
                )}
                
                <View style={{marginTop: 'auto', paddingBottom: 10}}>
                    <Button onPress={limparTudo} style={styles.buttonClean} labelStyle={styles.buttonLabelClean}>
                        Limpar Consumo
                    </Button>
                    <Button
                        mode="contained"
                        onPress={concluirRefeicao}
                        disabled={alimentosSelecionados.length === 0}
                        style={styles.button}
                    >
                        Concluir Refeição
                    </Button>
                </View>
            </KeyboardAvoidingView>
        </PaperProvider>
    );
};

export default InformarConsumoScreen;
# DietasJá - Aplicativo de Nutrição

O **DietasJá** é um aplicativo móvel multiplataforma, desenvolvido em React Native, focado em auxiliar usuários no controle de suas dietas e no acompanhamento de sua saúde nutricional. A aplicação permite o monitoramento detalhado do consumo de calorias e macronutrientes, o estabelecimento de metas personalizadas e a visualização do progresso através de um dashboard moderno e interativo.

## ✨ Funcionalidades

* **Autenticação Completa:** Sistema de cadastro e login de usuários.
* **Perfil de Saúde Detalhado:** O usuário insere dados como peso, altura, idade e gênero, que são usados para cálculos personalizados.
* **Dashboard Visual:** Uma tela inicial moderna com um gráfico circular de progresso para calorias e barras de progresso para macronutrientes, oferecendo um feedback visual imediato.
* **Metas Calóricas:** Funcionalidade completa para o usuário cadastrar e editar sua meta de calorias diárias.
* **Registro de Consumo:** Uma interface intuitiva para pesquisar alimentos, definir a porção consumida e registrar refeições completas com nome personalizado.
* **Cadastro de Alimentos:** Permite que os usuários adicionem seus próprios alimentos à base de dados, informando seus respectivos macronutrientes.
* **Histórico Semanal:** Tela com o resumo do consumo dos últimos 7 dias, destacando o cumprimento das metas diárias.
* **Índices de Saúde:** Cálculo e exibição automática do IMC (Índice de Massa Corporal) e TMB (Taxa de Metabolismo Basal) em cards informativos.

## 🚀 Arquitetura e Padrões de Projeto

O projeto foi arquitetado para ser escalável, testável e de fácil manutenção, utilizando padrões de design modernos que separam as responsabilidades de forma clara:

* **MVVM (Model-View-ViewModel):** A arquitetura principal que separa a interface do usuário (View), a lógica de estado e apresentação (ViewModel) e os dados (Model).
    * **View:** As telas, localizadas em `src/views/pages`.
    * **ViewModel:** A lógica e o estado de cada tela, localizados em `src/viewModels`.
    * **Model:** A camada de dados, abstraída pelos Repositórios.
* **Repository Pattern:** Cria uma camada de abstração para o acesso a dados. Os ViewModels não interagem diretamente com a API, mas sim com um Repositório, que centraliza a lógica de onde e como buscar as informações. Os repositórios estão em `src/repositories`.
* **Singleton Pattern:** Cada repositório é implementado como um Singleton, garantindo que exista apenas uma única instância e um ponto de acesso global e consistente aos dados em todo o aplicativo, evitando inconsistências de estado.

## 🛠️ Tecnologias e Bibliotecas

* [**React Native**](https://reactnative.dev/)
* [**React Navigation**](https://reactnavigation.org/): Gerenciamento de navegação (Stack, Tab e Drawer).
* [**Axios**](https://axios-http.com/): Cliente HTTP para comunicação com a API.
* [**React Native Paper**](https://reactnativepaper.com/): Biblioteca de componentes de UI baseada em Material Design.
* [**React Native Animatable**](https://github.com/oblador/react-native-animatable): Para animações declarativas.
* [**React Native Progress**](https://github.com/oblador/react-native-progress): Para os componentes visuais de progresso (círculos e barras).
* [**AsyncStorage**](https://react-native-async-storage.github.io/async-storage/): Para armazenamento local de dados persistentes (ex: token de autenticação).

## 📂 Estrutura de Pastas

src/
|-- assets/         # Imagens, fontes e outros recursos estáticos
|-- components/     # Componentes de UI reutilizáveis
|-- navigation/     # Configuração das rotas e navegação do app
|-- repositories/   # Camada de abstração de dados (Repository)
|-- services/       # Camada de comunicação com a API
|-- viewModels/     # Lógica e estado das telas (ViewModel)
|-- views/          # Telas e seus estilos (View)
|-- config.js       # Configurações globais (ex: URL da API)


## ⚙️ Como Executar o Projeto

**Pré-requisitos:** Você precisa ter o [Node.js](https://nodejs.org/), [Docker](https://www.docker.com/products/docker-desktop/) e [Python](https://www.python.org/downloads/) instalados na sua máquina.

### 1. Preparação do Ambiente

1. Clone o repositório:**
```bash
git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
cd seu-repositorio
```
2.  **Instale as dependências:**
    # Navegue até a pasta do frontend e instale os pacotes
    ```
    cd Base/FrontEnd/FrontEnd
    npm install
    ```
3.  **Configure a API:**
    * Abra o arquivo `src/config.js`.
    * Altere a variável `API_BASE_URL` para o endereço da sua API backend.

4.  **Execute o aplicativo:**

    * **Para Android:**
        ```bash
        npx react-native run-android
        ```
    * **Para iOS:**
        ```bash
        npx react-native run-ios
        ```



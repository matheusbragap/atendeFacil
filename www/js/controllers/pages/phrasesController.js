angular.module('atendeFacil').controller('phrasesController', ['$scope', '$routeParams', '$location', 'localDatabase', '$timeout', function ($scope, $routeParams, $location, localDatabase, $timeout) {

    // Inicializa os dados
    $scope.categoryId = parseInt($routeParams.categoryId) // converte o id da url para número (ex: '/phrases/123' → 123)
    $scope.data = localDatabase.getData() // pega todos os dados salvos no localstorage
    $scope.categories = $scope.data.categories // armazena a lista de categorias
    $scope.currentCategory = $scope.categories.find(object => object.id === $scope.categoryId) // encontra a categoria atual pelo id
    $scope.phrases = $scope.data.phrases[$scope.categoryId] || [] // pega a lista de frases da categoria atual ou usa array vazio se não existir


    // ######################## ADD PHRASES ##############################
    $scope.savePhrase = function (phraseText) {
        localDatabase.addPhrases($scope.categoryId, phraseText)
        $scope.phrases = [...(localDatabase.getData().phrases[$scope.categoryId] || [])]
        let modal = bootstrap.Modal.getInstance(document.getElementById('modalPhrases')) // seta modal na variavel
        modal.hide() // fecha modal
        $scope.resetModal()
    }



    // ######################## DELETE PHRASES ##############################
    $scope.deletePhrase = function (phrase) {
        if (confirm('Você tem certeza que deseja apagar a frase?')) {
            localDatabase.deletePhrases($scope.categoryId, phrase)
            $scope.phrases = [...(localDatabase.getData().phrases[$scope.categoryId] || [])]
        }
    }
    // ######################## COPY ##############################
    // Variáveis para controle
    var currentTooltip = null
    var currentTimeout = null

    $scope.copyPhrase = function (phrase, $event) {
        // Copia o texto
        navigator.clipboard.writeText(phrase)

        // Remove notificação anterior
        if (currentTooltip) {
            currentTooltip.remove()
            $timeout.cancel(currentTimeout)
        }

        // Determina se foi ativado por mouse ou teclado
        const isKeyboardEvent = !$event.clientX || !$event.clientY

        // Cria a nova notificação
        currentTooltip = angular.element('<div class="copied-tooltip">Copiado!</div>')

        // Adiciona classe de posicionamento adequado
        currentTooltip.addClass(isKeyboardEvent ? 'keyboard-position' : 'mouse-position')

        // Posiciona de acordo com o tipo de evento
        if (isKeyboardEvent) {
            // Centralizado na parte inferior
            currentTooltip.css({
                bottom: '30px',
                left: '50%',
                transform: 'translateX(-50%)'
            });
        } else {
            // Ao lado do cursor do mouse
            currentTooltip.css({
                left: $event.clientX + 'px',
                top: $event.clientY + 'px'
            });
        }

        // Adiciona ao body
        angular.element(document.body).append(currentTooltip)

        // Remove após 2 segundos
        currentTimeout = $timeout(function () {
            if (currentTooltip) {
                currentTooltip.remove()
                currentTooltip = null
            }
        }, 2000)
    }
    // ######################## MODAL ##############################
    $scope.confirmClearText = function () { //confirm clear text
        if (confirm('Tem certeza que limpar o texto?')) {
            $scope.resetModal()
        }
    }
    $scope.resetModal = function () { //clear text
        $scope.newPhraseText = ""
    }
    //######################## go to main menu ##############################
    $scope.goBack = function () {
        $location.path('/')
    }
    // // teste para ler mais ###########################################
    // $scope.expandedCards = {};

    // // Verifica se o texto precisa do "ler mais"
    // $scope.shouldCollapse = function (text) {
    //     const lineCount = (text.match(/\n/g) || []).length + 1;
    //     return lineCount > 10 || text.length > 500;
    // };

    // // Alterna entre expandido/recolhido
    // $scope.toggleExpand = function (index, event) {
    //     $scope.expandedCards[index] = !$scope.expandedCards[index];
    //     event.stopPropagation(); // Evita que o clique propague para outros elementos
    // };

    // // Função para editar frase (você precisará implementar a lógica completa)
    // $scope.editPhrase = function (index, event) {
    //     // Exemplo básico - você deve adaptar para sua implementação
    //     const phraseToEdit = $scope.phrases[index];
    //     $scope.newPhraseText = phraseToEdit;
    //     $('#modalPhrases').modal('show');
    //     $scope.editingIndex = index;
    //     event.stopPropagation();
    // };

    // //
    // $scope.savePhrase = function (text) {
    //     if ($scope.editingIndex !== undefined) {
    //         // Edição de frase existente
    //         $scope.phrases[$scope.editingIndex] = text;
    //         $scope.editingIndex = undefined;
    //     } else {
    //         // Adição de nova frase
    //         $scope.phrases.push(text);
    //     }
    //     $scope.newPhraseText = '';
    //     $('#modalPhrases').modal('hide');
    // };

}])
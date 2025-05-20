angular.module('atendeFacil').controller('phrasesController', ['$scope', '$routeParams', '$location', 'localDatabase', function ($scope, $routeParams, $location, localDatabase) {

    // Inicializa os dados
    $scope.categoryId = parseInt($routeParams.categoryId) // converte o id da url para número (ex: '/phrases/123' → 123)
    $scope.data = localDatabase.getData() // pega todos os dados salvos no localstorage
    $scope.categories = $scope.data.categories // armazena a lista de categorias
    $scope.currentCategory = $scope.categories.find(object => object.id === $scope.categoryId) // encontra a categoria atual pelo id
    $scope.phrases = $scope.data.phrases[$scope.categoryId] || [] // pega a lista de frases da categoria atual ou usa array vazio se não existir


    // ######################## ADD PHRASES ##############################
    $scope.savePhrase = function (phraseText) {
        localDatabase.addPhrases($scope.categoryId, phraseText)
        $scope.phrases = [...(localDatabase.getData().phrases[$scope.categoryId] || [])];
        let modal = bootstrap.Modal.getInstance(document.getElementById('modalPhrases')) // seta modal na variavel
        modal.hide() // fecha modal
        $scope.resetModal()
    }


    $scope.confirmClearText = function () {
        if (confirm('Tem certeza que limpar o texto?')) {
            $scope.resetModal()
        }
    }
    $scope.resetModal = function () {
        $scope.newPhraseText = ""
    }



    //######################## go to main menu ##############################
    $scope.goBack = function () {
        $location.path('/')
    }


}])
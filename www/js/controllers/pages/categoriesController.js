angular.module('atendeFacil').controller('categoriesController', ['$scope', '$timeout', 'localDatabase', '$location', function ($scope, $timeout, localDatabase, $location) {
    // Inicialização
    localDatabase.initialData() // cria caso n exista o banco de dados
    $scope.data = localDatabase.getData()
    $scope.categories = $scope.data.categories
    $scope.phrases = $scope.data.phrases

    $scope.goToPhrases = function (categoryId) {
        $location.path('/phrases/' + categoryId)
    }
    //######################## CARDS CATEGORY ############################################


    $scope.removeCategory = function (categoryId, $event) {
        $event.stopPropagation() // impede de clicar no card 
        if (confirm('Tem certeza que deseja remover esta categoria e todas suas frases?')) {
            localDatabase.deleteCategories(categoryId)
            $scope.categories = localDatabase.getData().categories
        }
    }

    //######################## MODAL ############################################
    $scope.saveCategory = function (newCategoryName) { // salva nova categoria
        localDatabase.addCategories(newCategoryName) // add no database
        $scope.data = localDatabase.getData() //pega banco
        $scope.categories = $scope.data.categories //atualiza categories
        $scope.phrases = $scope.data.phrases //atualiza frases
        let modal = bootstrap.Modal.getInstance(document.getElementById('modalCategories')) // seta modal na variavel
        modal.hide() // fecha modal
        $scope.resetModal()
    }
    $scope.resetModal = function () {     // reset input modalCategory ao fechar com delay
        $timeout(function () {
            $scope.newCategoryName = ""
        }, 200)
    }
}])

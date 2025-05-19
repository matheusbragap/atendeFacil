angular.module('atendeFacil').controller('categoriesController', ['$scope', '$timeout', 'localDatabase', function ($scope, $timeout, localDatabase) {
    // Inicialização
    localDatabase.initialData() // cria caso n exista o banco de dados
    $scope.data = localDatabase.getData()
    $scope.categories = $scope.data.categories

    //######################## CARDS CATEGORY ############################################
    $scope.removeCategory = function (categoryId) {     // Remove categoria
        if (confirm('Tem certeza que deseja remover esta categoria e todas suas frases?')) {
            localDatabase.deleteCategories(categoryId)
            $scope.categories = localDatabase.getData().categories // atualiza
        }
    }

    //######################## MODAL ############################################
    $scope.saveCategory = function (newCategoryName) { // salva nova categoria
        localDatabase.addCategories(newCategoryName) // add no database
        $scope.categories = localDatabase.getData().categories //atualiza
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
